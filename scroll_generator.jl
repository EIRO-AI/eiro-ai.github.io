#using GLMakie
using CairoMakie
using FileIO
using Printf
using LinearAlgebra
using Infiltrator

function wormhole_wriggly(b0=1.0, rmax=4.0; nr=40, nθ=35, twist_amp=0.15, z_wiggle=0.35)
    r = LinRange(b0, rmax, nr)
    θ = LinRange(0, 2π, nθ)

    # Base wormhole z-profile (embedding)
    base_z(r) = b0 * sqrt(r / b0 - 1)

    # Create wriggle by modulating radius and height
    function perturb(r, θ)
        dr = 1.0 + twist_amp * sin(3θ + 2r)
        dz = z_wiggle * sin(2r - 2θ)
        return dr, dz
    end

    # Build top and bottom halves
    r_all = vcat(reverse(r), r[2:end])
    #r_all = r

    x = Matrix{Float32}(undef, length(r_all), nθ)
    y = similar(x)
    z = similar(x)

    for (i, ri) in enumerate(r_all)
        for (j, θj) in enumerate(θ)
            dr, dz = perturb(ri, θj)
            rj = ri * dr
            x[i, j] = rj * cos(θj)
            y[i, j] = rj * sin(θj)
            zbase = base_z(abs(ri))
            z[i, j] = 6*(i ≤ nr ? -zbase : zbase) + dz
        end
    end

    return y, z, x
end


function flythrough_cylinder(frame::Int, max_frames::Int;
                     turns::Real = 1.0,      # how many full revolutions
                     z_bottom::Real = 0)  # final height
    radius = 7.0
    p         = clamp(frame / max_frames, 0.0, 1.0)        # 0 → 1 progress
    angle   = 2π * turns * p                   # θ(t)
    x, y    = radius * cos(angle), radius * sin(angle)
    z = 0.0
    position = [x, y, z]
    # --- view direction ------------------------------------------------------
    lookat  = [0.0, 0.0, 0]                          # always 8 below
    up      = [0.0, 0.0, 1.0]                              # fixed “up”
    return (lookat, position, up)
end

function run()
    x, y, z = wormhole_wriggly()

    fig = Figure(size=(1800, 1800), backgroundcolor=:transparent)
    lscene = LScene(fig[1, 1], show_axis=false)
    wireframe!(lscene, x, y, z, color=:black, linewidth=1.0)

    frame_dir = "frames"
    isdir(frame_dir) || mkdir(frame_dir)

    n_frames = 50
    pattern = joinpath("frames", "frame")   # no extension here!

    for i in 1:n_frames
        lookat, pos, up = flythrough_cylinder(i, n_frames)
        cam = Camera3D(lscene.scene; eyeposition = pos, lookat      = lookat, up          = up)
        update_cam!(lscene.scene, cam)
        fname = joinpath("frames", @sprintf("frame_%03d.svg", i))
        save(fname, fig)
    end

end

