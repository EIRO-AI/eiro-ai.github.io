using GLMakie
using FileIO
using Printf
using LinearAlgebra


# Water drop mesh
function water_drop(nu=100, nv=50)
    u = LinRange(0, π, nu)
    v = LinRange(0, 2π, nv)
    r(u) = 0.6 * sin(u) * (1 + 0.2cos(u)^2)
    z(u) = -cos(u) + 0.3 * cos(u)^3

    x = [r(ui) * cos(vj) for ui in u, vj in v]
    y = [r(ui) * sin(vj) for ui in u, vj in v]
    z = [z(ui) for ui in u, _ in v]
    return x, y, z
end

function wormhole(b0=1.0, rmax=4.0, nr=100, nv=80)
    r = LinRange(b0, rmax, nr)
    v = LinRange(0, 2π, nv)

    z(r) = b0 * sqrt(r / b0 - 1)  # embedding function

    # Concatenate upper and lower halves for full wormhole
    r_all = vcat(reverse(r), r)
    z_all = vcat(-z.(reverse(r)), z.(r))

    x = [ri * cos(vj) for ri in r_all, vj in v]
    y = [ri * sin(vj) for ri in r_all, vj in v]
    z = [zi for zi in z_all, _ in v]

    return x, y, z
end

function wormhole_wriggly(b0=1.0, rmax=4.0; nr=50, nv=40, twist_amp=0.2, z_wiggle=0.4)
    r = LinRange(b0, rmax, nr)
    v = LinRange(0, 2π, nv)

    # Base wormhole z-profile (embedding)
    base_z(r) = b0 * sqrt(r / b0 - 1)

    # Create wriggle by modulating radius and height
    function perturb(r, θ)
        dr = 1.0 + twist_amp * sin(3θ + 2r)
        dz = z_wiggle * sin(2r - 2θ)
        return dr, dz
    end

    # Build top and bottom halves
    r_all = vcat(reverse(r), r)
    θ = v

    x = Matrix{Float32}(undef, 2nr, nv)
    y = similar(x)
    z = similar(x)

    for (i, ri) in enumerate(r_all)
        for (j, θj) in enumerate(θ)
            dr, dz = perturb(ri, θj)
            rj = ri * dr
            x[i, j] = rj * cos(θj)
            y[i, j] = rj * sin(θj)
            zbase = base_z(abs(ri))
            z[i, j] = 10*(ri ≤ b0 ? -zbase : zbase) + dz
        end
    end

    return x, y, z
end


function flythrough_cylinder(frame::Int, max_frames::Int;
                     turns::Real = 1.0,      # how many full revolutions
                     z_bottom::Real = 0)  # final height
    # --- constants -----------------------------------------------------------
    start_pos = [-7.0, -7.0, 15.0]
    radius    = hypot(start_pos[1], start_pos[2])          # ≈ 7.07
    start_ang = atan(start_pos[2], start_pos[1])           # initial θ
    p         = clamp(frame / max_frames, 0.0, 1.0)        # 0 → 1 progress
    # --- position ------------------------------------------------------------
    angle   = start_ang + 2π * turns * p                   # θ(t)
    x, y    = radius * cos(angle), radius * sin(angle)
    z       = start_pos[3] + (z_bottom - start_pos[3]) * p # linear z
    position = [x, y, z]
    # --- view direction ------------------------------------------------------
    lookat  = [0.0, 0.0, z]                          # always 8 below
    up      = [0.0, 0.0, 1.0]                              # fixed “up”
    return (lookat, position, up)
end

function run()
    x, y, z = wormhole_wriggly()


    fig = Figure(size=(1200, 1200), backgroundcolor=:cornsilk)
    lscene = LScene(fig[1, 1], show_axis=false)
    wireframe!(lscene, x, y, z, color=:black, linewidth=1.0)

    frame_dir = "frames"
    isdir(frame_dir) || mkdir(frame_dir)

    n_frames = 100

    pattern   = joinpath("frames", "frame")   # no extension here!

    #record(fig, pattern, 1:n_frames; format = :png, framerate = 30) do i
    for i in 1:n_frames
        lookat, pos, up = flythrough_cylinder(i, n_frames)
        cam = Camera3D(lscene.scene; eyeposition = pos, lookat      = lookat, up          = up)
        update_cam!(lscene.scene, cam)
        fname = joinpath("frames", @sprintf("frame_%03d.png", i))
        save(fname, fig)
    end


    #@record(fig, "flythrough.mp4", 1:n_frames) do i

    #@    lookat, pos, up = flythrough_cylinder(i, n_frames)
    #@    cam = Camera3D(lscene.scene; eyeposition=pos, lookat=lookat, up=up)
    #@    update_cam!(lscene.scene, cam)
    #@end

end

