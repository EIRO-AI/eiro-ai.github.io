#using GLMakie
using CairoMakie
using FileIO
using Printf
using LinearAlgebra
using Infiltrator

function wormhole_wriggly(b0=1.0, rmax=4.0; nr=20, nθ=35, twist_amp=0.15, z_wiggle=0.35)
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

function quadratic_spline(p1,p2,p3,p4)
    M = [0 0 1 0 0 0 0 0 0 0 0 0;
         1 1 1 0 0 0 0 0 0 0 0 0;
         0 0 0 0 0 1 0 0 0 0 0 0;
         0 0 0 1 1 1 0 0 0 0 0 0;
         0 0 0 0 0 0 0 0 1 0 0 0;
         0 0 0 0 0 0 1 1 1 0 0 0;
         0 0 0 0 0 0 0 0 0 0 0 1;
         0 0 0 0 0 0 0 0 0 1 1 1;
         0 1 0 0 0 0 0 0 0 0 0 0;
         0 0 0 2 1 0 0 0 0 0 0 0;
         0 0 0 0 0 0 0 1 0 0 0 0;
         0 0 0 0 0 0 0 0 0 2 1 0]
    b = [p1,p2,p2,p3,p3,p4,p4,p1,0,0,0,0]
    a = M\b
    s1 = a[1:3]
    s2 = a[4:6]
    s3 = a[7:9]
    s4 = a[10:12]
    (s1,s2,s3,s4)
end

function test_splines()
    x1 = 21.0
    x2 = 3.0
    x3 = 0.0
    x4 = 3.0

    y1 = 0.0
    y2 = 18.0
    y3 = 0.0
    y4 = -18.0

    (sx1, sx2, sx3, sx4) = quadratic_spline(x1,x2,x3,x4)
    (sy1, sy2, sy3, sy4) = quadratic_spline(y1,y2,y3,y4)

    T = 0:0.01:1

    X1 = map(T) do t
        [t^2,t,1]'*sx1
    end
    X2 = map(T) do t
        [t^2,t,1]'*sx2
    end
    X3 = map(T) do t
        [t^2,t,1]'*sx3
    end
    X4 = map(T) do t
        [t^2,t,1]'*sx4
    end
    Y1 = map(T) do t
        [t^2,t,1]'*sy1
    end
    Y2 = map(T) do t
        [t^2,t,1]'*sy2
    end
    Y3 = map(T) do t
        [t^2,t,1]'*sy3
    end
    Y4 = map(T) do t
        [t^2,t,1]'*sy4
    end
    f = Figure()
    ax = Axis(f[1,1])
    lines!(ax,T, X1)
    lines!(ax,T.+1,X2)
    lines!(ax,T.+2,X3)
    lines!(ax,T.+3,X4)
    lines!(ax,T, Y1)
    lines!(ax,T.+1,Y2)
    lines!(ax,T.+2,Y3)
    lines!(ax,T.+3,Y4)
    @infiltrate

end


function get_pos(frame, max_frames)
    
    x1 = 21.0
    x2 = 3.0
    x3 = 0.0
    x4 = 3.0

    y1 = 0.0
    y2 = 18.0
    y3 = 0.0
    y4 = -18.0

    (sx1, sx2, sx3, sx4) = quadratic_spline(x1,x2,x3,x4)
    (sy1, sy2, sy3, sy4) = quadratic_spline(y1,y2,y3,y4)

    p = (frame-1)/max_frames
    if p < 0.25
        t = 4*p
        x = [t^2,t,1]'*sx1
        y = [t^2,t,1]'*sy1
        lx = 0.0
        ly = 0.0
    elseif p < 0.5
        t = 4*p-1
        x = [t^2,t,1]'*sx2
        y = [t^2,t,1]'*sy2
        lx = 8*(2*t-t^2)
        ly = 0.0

    elseif p < 0.75
        t = 4*p-2
        x = [t^2,t,1]'*sx3
        y = [t^2,t,1]'*sy3
        lx = 8*(1-t^2)
        ly = 0.0
    else 
        t = 4*p-3
        x = [t^2,t,1]'*sx4
        y = [t^2,t,1]'*sy4
        lx = 0.0
        ly = 0.0
    end

    pos = Vec3(x,y,0)
    lookat = Vec3(lx,ly,0)
    pos,lookat
end


function flythrough_cylinder(frame::Int, max_frames::Int;
                     turns::Real = 1.0,      # how many full revolutions
                     z_bottom::Real = 0)  # final height
    radius = 21.0
    p         = clamp(frame / max_frames, 0.0, 1.0)        # 0 → 1 progress
    angle   = 2π * turns * p                   # θ(t)
    x, y    = radius * cos(angle), radius * sin(angle)
    z = 1.0
    position = Vec3(x, y, z)
    # --- view direction ------------------------------------------------------
    lookat  = Vec3(0.0, 0.0, 0)
    up      = [0.0, 0.0, 1.0]
    return (lookat, position, up)
end

function run()
    x, y, z = wormhole_wriggly()

    fig = Figure(size=(1400, 900), backgroundcolor=:transparent)
    ax = LScene(fig[1,1], show_axis=false, scenekw=(clear=true, backgroundcolor=:transparent))
    w = wireframe!(ax, x, y, z, color=:black, linewidth=1.0)

    frame_dir = "frames"
    isdir(frame_dir) || mkdir(frame_dir)

    for i = 1:100
        pos, lookat = get_pos(i, 100)
        @info "i = $i, pos = $pos, lookat=$lookat"
    end

    n_frames = 100
    pattern = joinpath("frames", "frame")   # no extension here!

    for i in 1:n_frames

        #lookat, pos, up = flythrough_cylinder(i, n_frames)
        pos, lookat = get_pos(i, n_frames)
        update_cam!(ax.scene, pos, lookat)
        fname = joinpath("frames", @sprintf("frame_%03d.svg", i))
        save(fname, fig, update=false)
    end

end

