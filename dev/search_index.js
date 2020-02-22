var documenterSearchIndex = {"docs": [

{
    "location": "#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "#TaylorIntegration.jl-1",
    "page": "Home",
    "title": "TaylorIntegration.jl",
    "category": "section",
    "text": "ODE integration using Taylor\'s method, and more, in Julia."
},

{
    "location": "#Authors-1",
    "page": "Home",
    "title": "Authors",
    "category": "section",
    "text": "Jorge A. Pérez, Instituto de Ciencias Físicas, Universidad Nacional Autónoma de México (UNAM)\nLuis Benet, Instituto de Ciencias Físicas, Universidad Nacional Autónoma de México (UNAM)"
},

{
    "location": "#License-1",
    "page": "Home",
    "title": "License",
    "category": "section",
    "text": "TaylorIntegration is licensed under the MIT \"Expat\" license."
},

{
    "location": "#Installation-1",
    "page": "Home",
    "title": "Installation",
    "category": "section",
    "text": "TaylorIntegration.jl is a registered package, and is simply installed by runningpkg> add TaylorIntegration"
},

{
    "location": "#Supporting-and-citing-1",
    "page": "Home",
    "title": "Supporting and citing",
    "category": "section",
    "text": "This package is developed as part of academic research. If you would like to help supporting it, please star the repository as such metrics may help us secure funding. If you use this software, we would be grateful if you could cite our work as follows (Bibtex entry can be found here):J.A. Pérez-Hernández and L. Benet\nTaylorIntegration.jl: Taylor Integration in Julia\nhttps://github.com/PerezHz/TaylorIntegration.jl\nDOI:[10.5281/zenodo.2562352](https://doi.org/10.5281/zenodo.2562352)"
},

{
    "location": "#Acknowledgments-1",
    "page": "Home",
    "title": "Acknowledgments",
    "category": "section",
    "text": "We acknowledge financial support from the DGAPA-PAPIIT (UNAM) grant IG-100616. LB acknowledges support through a Cátedra Marcos Moshinsky (2013)."
},

{
    "location": "taylor_method/#",
    "page": "Taylor\'s method",
    "title": "Taylor\'s method",
    "category": "page",
    "text": ""
},

{
    "location": "taylor_method/#taylormethod-1",
    "page": "Taylor\'s method",
    "title": "Taylor\'s method",
    "category": "section",
    "text": "Taylor\'s integration method is a quite powerful method to integrate ODEs which are smooth enough, allowing to reach a precision comparable to round-off errors per time-step. A high-order Taylor approximation of the solution (dependent variable) is constructed such that the error is quite small. A time-step is constructed which guarantees the validity of the series; this is used to sum up the Taylor expansion to obtain an approximation of the solution at a later time."
},

{
    "location": "taylor_method/#rec_rel-1",
    "page": "Taylor\'s method",
    "title": "The recurrence relation",
    "category": "section",
    "text": "Let us consider the followingbeginequation\nlabeleq-ODE\ndotx = f(t x)\nendequationand define the initial value problem with the initial condition x(t_0) = x(0).We write the solution of this equation asbeginequation\nlabeleq-solution\nx = x_0 + x_1 (t-t_0) + x_2 (t-t_0)^2 + cdots +\nx_k (t-t_0)^k + cdots\nendequationwhere the initial condition imposes that x_0 = x(0). Below, we show how to obtain the coefficients x_k of the Taylor expansion of the solution.We assume that the Taylor expansion around t_0 of f(t x(t)) is known, which we write asbeginequation\nlabeleq-rhs\nf(t x(t)) = f_0 + f_1 (t-t_0) + f_2 (t-t_0)^2 + cdots\n+ f_k (t-t_0)^k + cdots\nendequationHere, f_0=f(t_0x_0), and the Taylor coefficients f_k = f_k(t_0) are the k-th normalized derivatives at t_0 given bybeginequation\nlabeleq-normderiv\nf_k = frac1k fracrm d^k f rm d t^k(t_0)\nendequationThen, we are assuming that we know how to obtain f_k; these coefficients are obtained using TaylorSeries.jl.Substituting Eq. (\\ref{eq-solution}) in (\\ref{eq-ODE}), and equating powers of t-t_0, we obtainbeginequation\nlabeleq-recursion\nx_k+1 = fracf_k(t_0)k+1 quad k=01dots\nendequationTherefore, the coefficients of the Taylor expansion (\\ref{eq-solution}) are obtained recursively using Eq. (\\ref{eq-recursion})."
},

{
    "location": "taylor_method/#time-step-1",
    "page": "Taylor\'s method",
    "title": "Time step",
    "category": "section",
    "text": "In the computer, the expansion (\\ref{eq-solution}) has to be computed to a finite order. We shall denote by K the order of the series. In principle, the larger the order K, the more accurate the obtained solution is.The theorem of existence and uniqueness of the solution of Eq.~(\\ref{eq-ODE}) ensures that the Taylor expansion converges. Then, assuming that K is large enough to be within the convergent tail, we introduce the parameter epsilon_textrmtol  0 to control how large is the last term. The idea is to set this parameter to a small value, usually smaller than the machine-epsilon. Denoting by h = t_1-t_0 the time step, then imposing  x_K  h^K le epsilon_textrmtol we obtainbeginequation\nlabeleq-h\nh le Big(fracepsilon_textrmtol x_K Big)^1K\nendequationEquation (\\ref{eq-h}) represents the maximum time-step which is consistent with epsilon_textrmtol, K and the assumption of being within the convergence tail. Notice that the arguments exposed above simply ensure that h is a maximum time-step, but any other smaller than h can be used since the series is convergent in the open interval tin(t_0-ht_0+h).Finally, from Eq. (\\ref{eq-solution}) with (\\ref{eq-h}) we obtain x(t_1) = x(t_0+h), which is again an initial value problem."
},

{
    "location": "lyapunov_spectrum/#",
    "page": "Lyapunov spectrum",
    "title": "Lyapunov spectrum",
    "category": "page",
    "text": ""
},

{
    "location": "lyapunov_spectrum/#lyap-1",
    "page": "Lyapunov spectrum",
    "title": "Lyapunov spectrum",
    "category": "section",
    "text": "Here we describe the background of the Lyapunov spectra computations in TaylorIntegration.jl. Our implementation follows the numerical method of Benettin et al. [1], [2], which itself is based on Oseledet\'s multiplicative ergodic theorem [3]. Namely, simultaneously to the integration of the equations of motion, we integrate the 1st-order variational equations associated to them.In general, given a dynamical system defined by the equations of motionbeginequation\nlabeleq-ODE-l\ndotx = f(t x)\nendequationalong with the initial condition x(t_0) = x_0, then the first-order variational equations associated to this system arebeginequation\nlabelvar-eqs\ndotxi = (operatornameDf)(x(t))cdot xi\nendequationwhere (operatornameDf)(x(t)) is the Jacobian of the function f with respect to the dependent variable x, evaluated at time t, for a given solution x(t) to the equations of motion. The variable xi denotes a matrix, whose initial condition is xi(t_0) = mathbb1_n, the ntimes n identity matrix, where n is the degrees of freedom or number of dependent variables x.For the actual computation of the Lyapunov spectrum, we proceed as follows. During the simultaneous numerical integration of the equations of motion and the variational equations, at fixed time intervals t_k = kcdot Delta t, k = 1 2 ldots we perform a QR decomposition over xi(t_k), the solution of the variational equations at time t_k. That is, we factorize xi(t_k) as xi(t_k)=Q_kcdot R_k, where Q_k is an orthogonal ntimes n matrix and R_k is an upper triangular ntimes n matrix with positive diagonal elements. The diagonal elements R_iik are the growth factors from which the l-th Lyapunov exponent is computed at time t_kbeginequation\nlabellyap-spec\nlambda_l = sum_m=1^k fraclog (R_llm)kcdot Delta t\nendequationIn turn, the matrix Q is substituted into xi(t_k) as the new (scaled) initial condition.The equations of motion together with the variational equations are integrated up to time t_k+1 using Taylor\'s method. We note that each time step of the integration is determined using the normalized derivatives of x and the tolerance epsilon_textrmtol. This process is repeated until a prescribed t_textrmmax is reached.This example illustrates the computation of the Lyapunov spectrum for the Lorenz system."
},

{
    "location": "lyapunov_spectrum/#refsL-1",
    "page": "Lyapunov spectrum",
    "title": "References",
    "category": "section",
    "text": "[1] Benettin G., Galgani L., Giorgilli A., Strelcyn J.M., 1980, Meccanica, 15, 9[2] Benettin G., Galgani L., Giorgilli A., Strelcyn J.M., 1980, Meccanica, 15, 21[3] Oseledets V. I., 1968, Trudy Moskovskogo Matematicheskogo Obshchestva, 19, 179"
},

{
    "location": "jet_transport/#",
    "page": "Jet transport",
    "title": "Jet transport",
    "category": "page",
    "text": ""
},

{
    "location": "jet_transport/#jettransport-1",
    "page": "Jet transport",
    "title": "Jet transport",
    "category": "section",
    "text": "In this section we describe the jet transport capabilities included in TaylorIntegration.jl. Jet transport is a tool that allows the propagation under the flow of a small neighborhood in phase space around a given initial condition, instead of propagating a single initial condition only.To compute the propagation of mathbfx_0 + delta mathbfx, where delta mathbfx are independent small displacements in phase space around the initial condition mathbfx_0, one has to solve high-order variational equations. The idea is to treat mathbfx_0 + delta mathbfx as a truncated polynomial in the delta mathbfx variables. The maximum order of this polynomial has to be fixed in advance.Jet transport works in general with any ordinary ODE solver, provided the chosen solver supports computations using multi-variate polynomial algebra."
},

{
    "location": "jet_transport/#A-simple-example-1",
    "page": "Jet transport",
    "title": "A simple example",
    "category": "section",
    "text": "Following D. Pérez-Palau et al [1], let us consider the differential equations for the harmonic oscillator:begineqnarray*\ndotx  =  y \ndoty  =  -x\nendeqnarray*with the initial condition mathbfx_0=x_0 y_0^T. We illustrate jet transport techniques using Euler\'s methodbeginequation*\nmathbfx_n+1 = mathbfx_n + h mathbff(mathbfx_n)\nendequation*Instead of considering the initial conditions mathbfx_0, we consider the time evolution of the polynomialbeginequation*\nP_0mathbfx_0(deltamathbfx) = x_0+delta x y_0 + delta y^T\nendequation*where delta x and delta y are small displacements. Below we concentrate in polynomials of order 1 in delta x and delta y; since the equations of motion of the harmonic oscillator are linear, there are no higher order terms.Using Euler\'s method we obtainbegineqnarray*\n  mathbfx_1  = \n  left(\n    beginarrayc\n    x_0 + h y_0 \n    y_0 - h x_0\n    endarray\n  right)\n  + left(\n      beginarraycc\n         1  h \n        -h  1\n      endarray\n    right)\n    left(\n      beginarrayc\n        delta x\n        delta y\n      endarray\n    right) \n  mathbfx_2  = \n  left(\n    beginarrayc\n    1-h^2 x_0 + 2 h y_0 \n    1-h^2 y_0 - 2 h x_0\n    endarray\n  right)\n  + left(\n    beginarraycc\n      1-h^2  2 h \n      -2 h  1-h^2\n    endarray\n    right)\n    left(\n      beginarrayc\n        delta x\n        delta y\n      endarray\n    right)\nendeqnarray*The first terms in the expressions for mathbfx_1 and mathbfx_2 above correspond to the result of an Euler integration step using the initial conditions only. The other terms are the (linear) corrections which involve the small displacements delta x and delta y.In general, for differential equations involving non-linear terms, the resulting expansions in delta x and delta y will reflect aspects of the non-linearities of the ODEs. Clearly, jet transport techniques allow to address stability properties beyond the linear case, though memory constraints may play a role. See this example illustrating the implementation for the simple pendulum, and this one illustrating the construction of a Poincaré map with Jet transport techniques."
},

{
    "location": "jet_transport/#refsJT-1",
    "page": "Jet transport",
    "title": "References",
    "category": "section",
    "text": "[1] D. Pérez-Palau, Josep J. Masdemont, Gerard Gómez, 2015, Celest. Mech. Dyn. Astron. 123, 239."
},

{
    "location": "simple_example/#",
    "page": "Infinity in finite time",
    "title": "Infinity in finite time",
    "category": "page",
    "text": ""
},

{
    "location": "simple_example/#example1-1",
    "page": "Infinity in finite time",
    "title": "Infinity in finite time",
    "category": "section",
    "text": ""
},

{
    "location": "simple_example/#Illustration-of-the-method-1",
    "page": "Infinity in finite time",
    "title": "Illustration of the method",
    "category": "section",
    "text": "We shall illustrate first with a simple example how the method explicitly constructs the solution, and how to use the package to obtain it.We consider the differential equation given bybeginequation\nlabeleq-example1\ndotx = x^2\nendequationwith the initial condition x(0)=x_0, whose exact solution readsbeginequation\nlabeleq-sol1\nx(t) = fracx_01-x_0t\nendequationWe shall implement the construction of this example explicitly, which illustrates the way TaylorIntegration.jl is conceived.The initial condition defines the 0-th order approximation, i.e., x(t) = x_0 + mathcalO(t^1). We now write the solution as x(t) = x_0 + x_1t + mathcalO(t^2), and we want to determine x_1. Substituting this solution into the RHS of (\\ref{eq-example1}), yieldsx^2 = x_0^2 + 2 x_0 x_1 t + x_1^2 t^2 =\n x_0^2 + mathcalO(t^1)where in the last equality we have kept all terms up to order 0, since we want to determine x_1, and the recursion formula requires for that the 0-th order term of the Taylor expansion of the RHS of the equation of motion. Hence, we have f_0=x_0^2, which using the recursion relation x_k+1 = f_k(k+1) yields x_1 = x_0^2.Following the same procedure, we write x(t) = x_0 + x_1 t + x_2 t^2 + mathcalO(t^3), andx^2 = x_0^2 + 2 x_0 x_1 t + mathcalO(t^2)where we kept all terms up to order 1. We thus have f_1=2 x_0 x_1 = 2 x_0^3, which then yields x_2 = x_0^3. Repeating this calculation, we obtainbeginequation\nlabeleq-solTaylor\nx(t) = x_0 + x_0^2 t + x_0^3 t^2 + cdots + x_0^k+1 t^k + cdots\nendequationThe solution given by Eq. (\\ref{eq-solTaylor}) is a geometrical series, which is identical to the exact solution, Eq. (\\ref{eq-sol1}). Yet, it is not obvious from the solution that it is only defined for t1x_0. To see this, we obtain the step size, as described previously, for the series truncated to order k. The Taylor coefficient of order k is x_k=x_0^k+1, so the time step ish  Big(fracepsilon_textrmtolx_0^k+1Big)^1k =\nfracepsilon_textrmtol^1kx_0^1+1kIn the limit ktoinfty we obtain h  h_textrmmax=1x_0, which is the domain of existence of the exact solution.Below, we shall fix a maximum order for the expansion. This entails a truncation error which is somewhat controlled through the absolute tolerance epsilon_textrmtol. The key to a correct use of Taylor\'s method is to impose a quite small value of epsilon_textrmtol together with a large enough order of the expansion."
},

{
    "location": "simple_example/#implementation_ex1-1",
    "page": "Infinity in finite time",
    "title": "Implementation",
    "category": "section",
    "text": "We shall illustrate how to use TaylorIntegration.jl to integrate Eq. (\\ref{eq-example1}) for the initial condition x(0)=3. Notice that according to the exact solution Eq. (\\ref{eq-sol1}), the solution only exists for tt_mathrmmax =13; in addition, we note that this number can not be represented exactly as a floating-point number.We first load the required packages and define a function which represents the equation of motion.using TaylorIntegration, Plots\ndiffeq(x, p, t) = x^2;note: Note\nIn TaylorIntegration.jl we use the same convention of DifferentialEquations.jl when writing the function representing the equations of motion.We now integrate the equations of motion using taylorinteg; note that, despite of the fact that the solution only exists for tt_textrmmax, below we shall try to compute it up to t_textrmend=034; as we shall see, Taylor\'s method takes care of this. For the integration presented below, we use a 25-th series expansion, with epsilon_textrmtol = 10^-20, and compute up to 150 integration steps.tT, xT = taylorinteg(diffeq, 3.0, 0.0, 0.34, 25, 1e-20, maxsteps=150) ;We first note that the last point of the calculation does not exceed t_textrmmax.tT[end]Increasing the maxsteps parameter pushes tT[end] closer to t_textrmmax but it actually does not reach this value.Figure 1 displays the computed solution as a function of time, in log scale.plot(tT, log10.(xT), shape=:circle)\nxlabel!(\"t\")\nylabel!(\"log10(x(t))\")\nxlims!(0,0.34)\ntitle!(\"Fig. 1\")Clearly, the solution diverges without bound when tto t_textrmmax = 13, i.e., x(t) approaches infinity in finite time.Figure 2 shows the relative difference between the numerical and the analytical solution in terms of time.exactsol(t, x0) = x0 / (1 - x0 * t)\nδxT = abs.(xT .- exactsol.(tT, 3.0)) ./ exactsol.(tT, 3.0);\nplot(tT[6:end], log10.(δxT[6:end]), shape=:circle)\nxlabel!(\"t\")\nylabel!(\"log10(dx(t))\")\nxlims!(0, 0.4)\ntitle!(\"Fig. 2\")To put in perspective how good is the constructed solution, we impose (arbitrarily) a relative accuracy of 10^-13; the time until such accuracy is satisfied is given by:indx = findfirst(δxT .> 1.0e-13);\nesol = exactsol(tT[indx-1],3.0);\ntT[indx-1], esol, eps(esol)Note that, the accuracy imposed in terms of the actual value of the exact solution means that the difference of the computed and the exact solution is essentially due to the eps of the computed value."
},

{
    "location": "kepler/#",
    "page": "The Kepler problem",
    "title": "The Kepler problem",
    "category": "page",
    "text": ""
},

{
    "location": "kepler/#kepler_problem-1",
    "page": "The Kepler problem",
    "title": "The Kepler problem",
    "category": "section",
    "text": "The Kepler problem corresponds to the study of the motion of two bodies which are influenced by their mutual gravitational attraction. In the center of mass and relative coordinates, the problem is reduced to the motion of one body of mass m = m_1 m_2  M, which we shall refer as particle below, attracted gravitationally by another located at rest at the origin of mass M=m_1+m_2.In cartesian coordinates, the equations of motion can be written asbegineqnarray*\ndotx = v_x\ndoty = v_y\ndotv_x = - fracG M x(x^2 + y^2)^32\ndotv_y = - fracG M y(x^2 + y^2)^32\nendeqnarray*For concreteness, we fix mu = G M = 1. The coordinates x and y are the relative coordinates (to the center of mass) of the particle, and v_x and v_y its velocity. The function kepler_eqs! mutates the vectors corresponding to the LHS of the equations of motion.function kepler_eqs!(dq, q, params, t)\n    dq[1] = q[3]\n    dq[2] = q[4]\n    rr = ( q[1]^2 + q[2]^2 )^(3/2)\n    dq[3] = - q[1] / rr\n    dq[4] = - q[2] / rr\nend;For suitable initial conditions (such that the total energy is negative) the solutions are ellipses with one focus at the origin, which can be parameterized in terms of its semi-major axis a and its eccentricity e. We set the initial conditions for the particle at periapse, which we locate on the positive x-axis. Using the semimajor axis and the eccentricity, we write them asbegineqnarray*\nx_0  =  a (1-e)\ny_0  =  0\nv_x_0  =  0\nv_y_0  =  fracl_zx_0 = m fracsqrtmu a (1-e^2)x_0\nendeqnarray*where l_z is the angular momentum. We set the mass of the particle m=1, the semi-major axis a=1 and the eccentricity e=08. Kepler\'s third law defines the period of the motion as T= 2pi a^32.const mu = 1.0\nconst mass = 1.0\nconst aKep = 1.0\nconst eKep = 0.8;The initial conditions are then set using ini_condfunction ini_cond(a, e)\n    x0  = a*(one(e)-e)\n    vy0 = mass * sqrt( mu * a * (1-e^2) ) / x0\n    y0  = zero(vy0)\n    vx0 = zero(vy0)\n    return [x0, y0, vx0, vy0]\nend\nq0 = ini_cond(aKep, eKep)We now perform the integration, using a 25 order expansion and absolute tolerance of 10^-20.using TaylorIntegration, Plots\nt, q = taylorinteg(kepler_eqs!, q0, 0.0, 10000*2pi, 25, 1.0e-20, maxsteps=700_000);\nt[end], q[end,:]We first plot the orbit.x = view(q, :, 1)\ny = view(q, :, 2)\nvx = view(q, :, 3)\nvy = view(q, :, 4)\nplot(x, y, legend=false)\nscatter!([0], [0], shape=:circle, ms=5)\nxaxis!(\"x\", (-2.0, 0.5))\nyaxis!(\"y\", (-1.0, 1.0))\ntitle!(\"Fig. 1\")The following functions allow us to calculate the energy and angular momentum using cartesian coordinates.function energy( x, y, vx, vy )\n    kinetic = 0.5 * (vx*vx + vy*vy)\n    r = sqrt( x*x + y*y)\n    potential = - mu * mass / r\n    return kinetic + potential\nend\nlz( x, y, vx, vy ) = mass * ( x*vy - y*vx ) ;We use the change in energy and angular momentum of the orbit with respect to the initial value of the corresponding quantity as a function of time. These quantities are expressed in units of the local epsilon of the initial energy or angular momentum, respectively. This serves to illustrate the accuracy of the calculation, shown in Figure 2 and 3.e0 = energy(q0...)\nδE = (energy.(x,y,vx,vy) .- e0) ./ eps(e0)\nplot(t, δE)\nxlabel!(\"t\")\nylabel!(\"dE\")\ntitle!(\"Fig. 2\")lz0 = lz(q0...)\nδlz = (lz.(x,y,vx,vy) .- lz0) ./ eps(lz0)\nplot(t, δlz)\nxlabel!(\"t\")\nylabel!(\"dlz\")\ntitle!(\"Fig. 3\")These errors are reminiscent of random walks.The maximum absolute errors of the energy and angular momentum aremaximum( abs.(energy.(x,y,vx,vy) .- e0) ), maximum( abs.(lz.(x,y,vx,vy) .- lz0) )"
},

{
    "location": "lorenz_lyapunov/#",
    "page": "Lyapunov spectrum of Lorenz system",
    "title": "Lyapunov spectrum of Lorenz system",
    "category": "page",
    "text": ""
},

{
    "location": "lorenz_lyapunov/#lyap_lorenz-1",
    "page": "Lyapunov spectrum of Lorenz system",
    "title": "Lyapunov spectrum of Lorenz system",
    "category": "section",
    "text": "Here, we present the calculation of the Lyapunov spectrum of the Lorenz system, using TaylorIntegration.jl. The computation involves evaluating the 1st order variational equations dot xi = J cdot xi for this system, where J = operatornameDf is the Jacobian. By default, the numerical value of the Jacobian is computed using automatic differentiation techniques implemented in TaylorSeries.jl, which saves us from writing down explicitly the Jacobian. Conversely, this can be used to check a function implementing the Jacobian. As an alternative, specially important if performance is critical, the user may provide a Jacobian function.The Lorenz system is the ODE defined as:begineqnarray*\n    dotx_1  =  sigma(x_2-x_1) \n    dotx_2  =  x_1(rho-x_3)-x_2 \n    dotx_3  =  x_1x_2-beta x_3\nendeqnarray*where sigma, rho and beta are constant parameters.First, we write a Julia function which evaluates (in-place) the Lorenz system:#Lorenz system ODE:\nfunction lorenz!(dq, q, params, t)\n    σ, ρ, β = params\n    x, y, z = q\n    dq[1] = σ*(y-x)\n    dq[2] = x*(ρ-z)-y\n    dq[3] = x*y-β*z\n    nothing\nend\nnothing #hideBelow, we use the the parameters sigma = 160, beta = 4 and rho = 4592.#Lorenz system parameters\n#we use the `const` prefix in order to help the compiler speed things up\nconst params = [16.0, 45.92, 4.0]\nnothing # hideWe define the initial conditions, the initial and final integration times for the integration:const x0 = [19.0, 20.0, 50.0] #the initial condition\nconst t0 = 0.0     #the initial time\nconst tmax = 100.0 #final time of integration\nnothing # hideSince the diagonal of the Jacobian is constant, the sum of the Lyapunov spectrum has to be equal to that value. We calculate this trace using TaylorSeries.jl, and after the numerical integration, we will come back to check if this value is conserved (or approximately conserved) as a function of time.# Note that TaylorSeries.jl is @reexport-ed by TaylorIntegration.jl\n# Calculate trace of Lorenz system Jacobian via TaylorSeries.jacobian:\nimport LinearAlgebra: tr\nusing TaylorIntegration\nxi = set_variables(\"δ\", order=1, numvars=length(x0))\nx0TN = x0 .+ xi\ndx0TN = similar(x0TN)\nlorenz!(dx0TN, x0TN, params, t0)\njjac = TaylorSeries.jacobian(dx0TN)\nlorenztr = tr(jjac) #trace of Lorenz system Jacobian matrix\nnothing # hideAs explained above, the user may provide a function which computes the Jacobian of the ODE in-place:#Lorenz system Jacobian (in-place):\nfunction lorenz_jac!(jac, x, params, t)\n    σ, ρ, β = params\n    jac[1,1] = -σ + zero(x[1])\n    jac[1,2] = σ + zero(x[1])\n    jac[1,3] = zero(x[1])\n    jac[2,1] = ρ - x[3]\n    jac[2,2] = -1.0 + zero(x[1])\n    jac[2,3] = -x[1]\n    jac[3,1] = x[2]\n    jac[3,2] = x[1]\n    jac[3,3] = -β + zero(x[1])\n    nothing\nend\nnothing # hidenote: Note\nWe use of zero(x[1]) in the function lorenz_jac! when the RHS consists of a numeric value; this is needed to allow the proper promotion of the variables to carry out Taylor\'s method.We can actually check the consistency of lorenz_jac! with the computation of the jacobian using automatic differentiation techniques. Below we use the initial conditions x0, but it is easy to generalize this.lorenz_jac!(jjac, x0, params, t0)  # update the matrix `jjac` using Jacobian provided by the user\nTaylorSeries.jacobian(dx0TN) == jjac    # `dx0TN` is obtained via automatic differentiationNow, we are ready to perform the integration using lyap_taylorinteg function, which integrates the 1st variational equations and uses Oseledets\' theorem. The expansion order will be 28 and the local absolute tolerance will be 10^-20. lyap_taylorinteg will return three arrays: one with the evaluation times, one with the values of the dependent variables (at the time of evaluation), and another one with the values of the Lyapunov spectrum.We first carry out the integration computing internally the Jacobiantv, xv, λv = lyap_taylorinteg(lorenz!, x0, t0, tmax, 28, 1e-20, params; maxsteps=2000000);\nnothing # hideNow, the integration is obtained exploiting lorenz_jac!:tv_, xv_, λv_ = lyap_taylorinteg(lorenz!, x0, t0, tmax, 28, 1e-20, params, lorenz_jac!; maxsteps=2000000);\nnothing # hideIn terms of performance the second method is about ~50% faster than the first.We check the consistency of the orbits computed by the two methods:tv == tv_, xv == xv_, λv == λv_As mentioned above, a more subtle check is related to the fact that the trace of the Jacobian is constant in time, which must coincide with the sum of all Lyapunov exponents. Using its initial value lorenztr, we compare it with the final Lyapunov exponents of the computation, and obtainsum(λv[end,:]) ≈ lorenztr, sum(λv_[end,:]) ≈ lorenztr, sum(λv[end,:]) ≈ sum(λv_[end,:])Above we checked the approximate equality; we now show that the relative error is quite small and comparable with the local machine epsilon value around lorenztr:abs(sum(λv[end,:])/lorenztr - 1), abs(sum(λv_[end,:])/lorenztr - 1), eps(lorenztr)Therefore, the numerical error is dominated by roundoff errors in the floating point arithmetic of the integration. We will now proceed to plot our results. First, we plot Lorenz attractor in phase spaceusing Plots\nplot(xv[:,1], xv[:,2], xv[:,3], leg=false)We display now the Lyapunov exponents as a function of time:using Plots\nnothing # hide\nplot(tv, λv[:,1], label=\"L_1\", legend=:right)\nplot!(tv, λv[:,2], label=\"L_2\")\nplot!(tv, λv[:,3], label=\"L_3\")\nxlabel!(\"time\")\nylabel!(\"L_i, i=1,2,3\")\ntitle!(\"Lyapunov exponents vs time\")This plot shows that the calculation of the Lyapunov exponents has converged."
},

{
    "location": "pendulum/#",
    "page": "Jet transport: the simple pendulum",
    "title": "Jet transport: the simple pendulum",
    "category": "page",
    "text": ""
},

{
    "location": "pendulum/#pendulum-1",
    "page": "Jet transport: the simple pendulum",
    "title": "Jet transport: the simple pendulum",
    "category": "section",
    "text": "In this example we illustrate the use of jet transport techniques in TaylorIntegration.jl for the simple pendulum. We propagate a neighborhood U_0 around an initial condition q_0 parametrized by the sum q_0+xi, where q_0=(x_0p_0) represents the coordinates of the initial condition in phase space, and xi=(xi_1xi_2) represents an small variation with respect to this initial condition. We re-interpret each component of the sum q_0+xi as a multivariate polynomial in the variables xi_1 and xi_2; below, the maximum order of the multivariate polynomial is fixed at 8. We propagate these multivariate polynomials in time using Taylor\'s method.The simple pendulum is defined by the Hamiltonian H(x p) = frac12p^2-cos x; the corresponding equations of motion are given bybegineqnarray*\ndotx = p \ndotp = -sin x\nendeqnarray*We integrate this problem for a neighborhood U_0 around the initial condition q_0 = (x(t_0) p(t_0)) = (x_0 p_0). For concreteness we take p_0=0 and choose x_0 such that the pendulum librates; that is, we will choose a numerical value for the energy E=H(x_0p_0)=-cos x_0 such that the pendulum\'s motion in phase space is \"below\" (inside) the region bounded by the separatrix. In this case, the libration period T of the pendulum isbeginequation*\nT=frac4sqrt2int_0^x_0fracdxsqrtcos x_0-cos x\nendequation*which can be expressed in terms of the complete elliptic integral of the first kind, K:beginequation*\nT=4K(sin(x_02))\nendequation*The Hamiltonian for the simple pendulum is:H(x) = 0.5x[2]^2-cos(x[1])\nnothing # hideThe equations of motion are:function pendulum!(dx, x, p, t)\n    dx[1] = x[2]\n    dx[2] = -sin(x[1])\nend\nnothing # hideWe define the TaylorN variables necessary to perform the jet transport; varorder represents the maximum order of expansion in the variations xi.const varorder = 8\nusing TaylorIntegration\nξ = set_variables(\"ξ\", numvars=2, order=varorder)Note that TaylorSeries.jl is @reexport-ed internally by TaylorIntegration.jl.The nominal initial condition is:q0 = [1.3, 0.0]The corresponding initial value of the energy is:H0 = H(q0)The parametrization of the neighborhood U_0 is represented byq0TN = q0 .+ ξTo understand how the jet transport technique works, we shall evaluate the Hamiltonian at q_0+xi in order to obtain the 8-th order Taylor expansion of the Hamiltonian with respect to the variations xi, around the initial condition q_0:H(q0TN)Note that the 0-th order term of the expression above is equal to the value H(q0), as expected.Below, we set some parameters for the Taylor integration. We use a method of taylorinteg which returns the solution at t0, t0+integstep, t0+2integstep,...,tmax, where t0 and tmax are the initial and final times of integration, whereas integstep is a time interval chosen by the user; we use the variable tv = t0:integstep:tmax for this purpose and choose integstep as fracT8.order = 28     #the order of the Taylor expansion wrt time\nabstol = 1e-20 #the absolute tolerance of the integration\nusing Elliptic # we use Elliptic.jl to evaluate the elliptic integral K\nT = 4*Elliptic.K(sin(q0[1]/2)^2) #the libration period\nt0 = 0.0        #the initial time\ntmax = 6T       #the final time\nintegstep = T/8 #the time interval between successive evaluations of the solution vector\nnothing # hideWe perform the Taylor integration using the initial condition x0TN, during 6 periods of the pendulum (i.e., 6T), exploiting multiple dispatch:tv = t0:integstep:tmax # the times at which the solution will be evaluated\nxv = taylorinteg(pendulum!, q0TN, tv, order, abstol)\nnothing # hideThe integration above works for any initial neighborhood U_0 around the nominal initial condition q_0, provided it is sufficiently small.We will consider the particular case where U_0 is a disk of radius r = 005, centered at q_0; that is U_0= q_0+xixi=(rcosphirsinphi) phiin02pi)  for a given radius r0. We will denote by U_t the propagation of the initial neighborhood U_0 evaluated at time t. Also, we denote by q(t) the coordinates of the nominal solution at time t: q(t)=(x(t)p(t)). Likewise, we will denote the propagation at time t of a given initial variation xi_0 by xi(t). Then, we can compute the propagation of the boundary partial U_t of the neighborhood U_t.polar2cart(r, ϕ) = [r*cos(ϕ), r*sin(ϕ)] # convert radius r and angle ϕ to cartesian coordinates\nr = 0.05 #the radius of the neighborhood\nϕ = 0.0:0.1:(2π+0.1) #the values of the angle\nξv = polar2cart.(r, ϕ)\nnothing # hideWe evaluate the jet at partial U_x(t) (the boundary of U_x(t)) at each value of the solution vector xv; we organize these values such that we can plot them later:xjet_plot = map(λ->λ.(ξv), xv[:,1])\npjet_plot = map(λ->λ.(ξv), xv[:,2])\nnothing # hideAbove, we have exploited the fact that Array{TaylorN{Float64}} variables are callable objects. Now, we evaluate the jet at the nominal solution, which corresponds to xi=(00), at each value of the solution vector xv:x_nom = xv[:,1]()\np_nom = xv[:,2]()\nnothing # hideFinally, we shall plot the nominal solution (black dots), as well as the evolution of the neighborhood U_0 (in colors), each frac18th of a period T. The initial condition corresponds to the black dot situated at q_0=(130)using Plots\nplot( xjet_plot, pjet_plot,\n    xaxis=(\"x\",), yaxis=(\"p\",),\n    title=\"Simple pendulum phase space\",\n    leg=false, aspect_ratio=1.0\n)\nscatter!( x_nom, p_nom,\n    color=:black,\n    m=(1,2.8,stroke(0))\n)"
},

{
    "location": "root_finding/#",
    "page": "Poincaré maps",
    "title": "Poincaré maps",
    "category": "page",
    "text": ""
},

{
    "location": "root_finding/#rootfinding-1",
    "page": "Poincaré maps",
    "title": "Poincaré maps",
    "category": "section",
    "text": "In this example, we shall illustrate how to construct a Poincaré map associated with the surface of section x=0, dot x0, for E=01025 for the Hénon-Heiles system. This is equivalent to find the roots of an appropriate function g(dx, x, params, t). We illustrate the implementation using many initial conditions (Monte Carlo like implementation), and then compare the results with the use of jet transport techniques."
},

{
    "location": "root_finding/#Monte-Carlo-simulation-1",
    "page": "Poincaré maps",
    "title": "Monte Carlo simulation",
    "category": "section",
    "text": "The Hénon-Heiles system is a 2-dof Hamiltonian system used to model the (planar) motion of a star around a galactic center. The Hamiltonian is given by H = (p_x^2+p_y^2)2 + (x^2+y^2)2 + lambda (x^2y-y^33), from which the equations of motion can be obtained; below we concentrate in the case lambda=1.# Hamiltonian\nV(x,y) = 0.5*( x^2 + y^2 )+( x^2*y - y^3/3)\nH(x,y,p,q) = 0.5*(p^2+q^2) + V(x, y)\nH(x) = H(x...)\n\n# Equations of motion\nfunction henonheiles!(dq, q, p, t)\n    x, y, px, py = q\n    dq[1] = px\n    dq[2] = py\n    dq[3] = -x-2y*x\n    dq[4] = -y-(x^2-y^2)\n    nothing\nend\nnothing # hideWe set the initial energy, which is a conserved quantity; x0 corresponds to the initial condition, which will be properly adjusted to be in the correct energy surface.# initial energy and initial condition\nconst E0 = 0.1025\nx0 = [0.0, 0.45335, 0.0, 0.0]\nnothing # hideIn order to be able to generate (random) initial conditions with the appropriate energy, we write a function px, which depends on x, y, py and the energy E, that returns the value of px>0 for which the initial condition [x, y, px, py] has energy E:# px: select px0>0 such that E=E0\npx(x, E) = sqrt(2(E-V(x[1], x[2]))-x[4]^2)\n\n# px!: in-place version of px; returns the modified initial condition `x0`\nfunction px!(x, E)\n    mypx = px(x, E)\n    x[3] = mypx\n    return x\nend\n\n# run px!\npx!(x0, E0)Let\'s check that the initial condition x0 has actually energy equal to E0, up to roundoff accuracy:H(x0)The scalar function g, which may depend on the time t, the vector of dependent variables x, the velocities dx, and perhaps some parameters params, following again the convention of DifferentialEquations.jl, defines the surface of section by means of the condition g(dx x params t) = 0. Internally, the function g is assumed to return a Tuple{Bool, Taylor1{T}}, where T corresponds to eltype(x[1]) (x::Vector{Taylor1{T}}). In the particular case that the user wishes to discard a particular crossing (or crossings), the function g must return a false value, as will be illustrated below.For the present example, we are looking for crossings through the surface x=0, which corresponds to x[1]==0, restricting the crossings to satisfy dot x  0. i.e., x[3]>0. We thus define the function g as# x=0, px>0 section\nfunction g(dx, x, p, t)\n    px_ = constant_term(x[3])\n    # if px > 0...\n    if px_ > zero(px_)\n        return (true, x[1])\n    else\n        #otherwise, discard the crossing\n        return (false, x[1])\n    end\nend\nnothing # hidenote: Note\nNote that in the definition of g we want to make sure that we only take the \"positive\" crossings through the surface of section x=0; hence the if...else... block.We initialize some auxiliary arrays, where we shall save the solutions:# number of initial conditions\nnconds = 100\ntvSv = Vector{Vector{Float64}}(undef, nconds)\nxvSv = Vector{Matrix{Float64}}(undef, nconds)\ngvSv = Vector{Vector{Float64}}(undef, nconds)\nx_ini = similar(x0)\nnothing # hideWe generate nconds random initial conditions in a small neighborhood around x0 and integrate the equations of motion from t0=0 to tmax=135, using a polynomial of order 25 and absolute tolerance 1e-25:using TaylorIntegration\n\nfor i in 1:nconds\n    rand1 = rand()\n    rand2 = rand()\n    x_ini .= x0 .+ 0.005 .* [0.0, sqrt(rand1)*cos(2pi*rand2), 0.0, sqrt(rand1)*sin(2pi*rand2)]\n    px!(x_ini, E0)   # ensure initial energy is E0\n\n    tv_i, xv_i, tvS_i, xvS_i, gvS_i = taylorinteg(henonheiles!, g, x_ini, 0.0, 135.0,\n        25, 1e-25, maxsteps=30000);\n    tvSv[i] = vcat(0.0, tvS_i)\n    xvSv[i] = vcat(transpose(x_ini), xvS_i)\n    gvSv[i] = vcat(0.0, gvS_i)\nend\nnothing # hideWe generate an animation with the solutionsusing Plots\npoincare_anim1 = @animate for i=1:21\n    scatter(map(x->x[i,2], xvSv), map(x->x[i,4], xvSv), label=\"$(i-1)-th iterate\",\n        m=(1,stroke(0)), ratio=:equal)\n    xlims!(0.08, 0.48)\n    ylims!(-0.13, 0.13)\n    xlabel!(\"y\")\n    ylabel!(\"py\")\n    title!(\"Hénon-Heiles Poincaré map (21 iterates)\")\nend\ngif(poincare_anim1, \"poincareanim1.gif\", fps = 2);\nnothing # hide(Image: Poincaré map for the Hénon Heiles system)"
},

{
    "location": "root_finding/#jettransport2-1",
    "page": "Poincaré maps",
    "title": "Jet transport",
    "category": "section",
    "text": "Now, we illustrate the use of jet transport techniques in the same example, that is, we propagate a neighborhood around x0, which will be plotted in the Poincaré map. We first define the vector of small increments of the phase space variables, xTN; we fix the maximum order of the polynomial expansion in these variables to be 4. Then, x0TN is the neighborhood in the 4-dimensional phase space around x0.xTN = set_variables(\"δx δy δpx δpy\", numvars=length(x0), order=4)\nx0TN = x0 .+ xTN\nnothing # hideAs it was shown above, x0 belongs to the energy surface H(x0) = E_0 = 01025; yet, as it was defined above, the set of phase space points denoted by x0TN includes points that belong to other energy surfaces. This can be noticed by computing H(x0TN)H(x0TN)Clearly, the expression above may contain points whose energy is different from E0. As it was done above, we shall fix the px component of x0TN so all points of the neighborhood are in the same energy surface.px!(x0TN, E0) # Impose that all variations are on the proper energy shell!\nH(x0TN)We notice that the coefficients of all monomials whose order is not zero are very small, and the constant_term is E0.In order to properly handle this case, we need to extend the definition of g to be useful for Taylor1{TaylorN{T}} vectors.#specialized method of g for Taylor1{TaylorN{T}}\'s\nfunction g(dx::Array{Taylor1{TaylorN{T}},1}, x::Array{Taylor1{TaylorN{T}},1},\n        p, t) where {T<:Number}\n    px_ = constant_term(constant_term(x[3]))\n    if px_ > zero( T )\n        return (true, x[1])\n    else\n        return (false, x[1])\n    end\nend\nnothing # hideWe are now set to carry out the integration.tvTN, xvTN, tvSTN, xvSTN, gvSTN = taylorinteg(henonheiles!, g, x0TN, 0.0, 135.0, 25, 1e-25, maxsteps=30000);\nnothing # hideWe define some auxiliary arrays, and then make an animation with the results for plotting.#some auxiliaries:\nxvSTNaa = Array{Array{TaylorN{Float64},1}}(undef, length(tvSTN)+1 );\nxvSTNaa[1] = x0TN\nfor ind in 2:length(tvSTN)+1\n    whatever = xvSTN[ind-1,:]\n    xvSTNaa[ind] = whatever\nend\ntvSTNaa = union([zero(tvSTN[1])], tvSTN);\n\nmyrnd  = 0:0.01:1\nnpoints = length(myrnd)\nncrosses = length(tvSTN)\nyS = Array{Float64}(undef, ncrosses+1, npoints)\npS = Array{Float64}(undef, ncrosses+1, npoints)\n\nmyrad=0.005\nξy = @. myrad * cos(2pi*myrnd)\nξp = @. myrad * sin(2pi*myrnd)\n\nfor indpoint in 1:npoints\n    yS[1,indpoint] = x0[2] + ξy[indpoint]\n    pS[1,indpoint] = x0[4] + ξp[indpoint]\n    mycond = [0.0, ξy[indpoint], 0.0, ξp[indpoint]]\n    for indS in 2:ncrosses+1\n        temp = evaluate(xvSTNaa[indS], mycond)\n        yS[indS,indpoint] = temp[2]\n        pS[indS,indpoint] = temp[4]\n    end\nend\n\npoincare_anim2 = @animate for i=1:21\n    scatter(map(x->x[i,2], xvSv), map(x->x[i,4], xvSv), marker=(:circle, stroke(0)),\n        markersize=0.01, label=\"Monte Carlo\")\n    plot!(yS[i,:], pS[i,:], width=0.1, label=\"Jet transport\")\n    xlims!(0.09,0.5)\n    ylims!(-0.11,0.11)\n    xlabel!(\"y\")\n    ylabel!(\"py\")\n    title!(\"Poincaré map: 4th-order jet transport vs Monte Carlo\")\nend\ngif(poincare_anim2, \"poincareanim2.gif\", fps = 2);\nnothing # hide(Image: Poincaré map: Jet transport vs Monte Carlo)The next animation is the same as before, adapting the scale.poincare_anim3 = @animate for i=1:21\n    scatter(map(x->x[i,2], xvSv), map(x->x[i,4], xvSv), marker=(:circle, stroke(0)),\n        markersize=0.01, label=\"Monte Carlo\")\n    plot!(yS[i,:], pS[i,:], width=0.1, label=\"Jet transport\")\n    xlabel!(\"y\")\n    ylabel!(\"py\")\n    title!(\"Poincaré map: 4th-order jet transport vs Monte Carlo\")\nend\ngif(poincare_anim3, \"poincareanim3.gif\", fps = 2);\nnothing # hide(Image: Poincaré map: Jet transport vs Monte Carlo)"
},

{
    "location": "common/#",
    "page": "Interoperability with DifferentialEquations.jl",
    "title": "Interoperability with DifferentialEquations.jl",
    "category": "page",
    "text": ""
},

{
    "location": "common/#diffeqinterface-1",
    "page": "Interoperability with DifferentialEquations.jl",
    "title": "Interoperability with DifferentialEquations.jl",
    "category": "section",
    "text": "Here, we show an example of interoperability between TaylorIntegration.jl and DifferentialEquations.jl, i.e., how to use TaylorIntegration.jl from the DifferentialEquations ecosystem. The basic requirement is to load DiffEqBase.jl, which sets-up the common interface. Below, we shall also use OrdinaryDiffEq.jl to compare the accuracy of TaylorIntegration.jl with respect to high-accuracy methods for non-stiff problems (Vern9 method). While DifferentialEquations offers many macros to simplify certain aspects, we do not rely on them simply because using properly @taylorize improves the performance.note: Note\nCurrently, the only keyword argument supported by DiffEqBase.solve that is implemented in TaylorIntegration.jl is :saveat. The keyword argument :parse_eqs is available in order to control the use of methods defined via @taylorize.The problem we will integrate in this example is the planar circular restricted three-body problem (PCR3BP, also capitalized as PCRTBP). The PCR3BP describes the motion of a body with negligible mass m_3 under the gravitational influence of two bodies with masses m_1 and m_2, such that m_1 ge m_2. It is assumed that m_3 is much smaller than the other two masses so it does not influence their motion, and therefore it is simply considered as a massless test particle. The body with the greater mass m_1 is referred as the primary, and m_2 as the secondary. These bodies are together called the primaries and are assumed to describe Keplerian circular orbits about their center of mass, which is placed at the origin of the reference frame. It is further assumed that the orbit of the third body takes place in the orbital plane of the primaries. A full treatment of the PCR3BP may be found in [1].The ratio mu = m_2(m_1+m_2) is known as the mass parameter. Using mass units such that m_1+m_2=1, we have m_1=1-mu and m_2=mu. In this example, we assume the mass parameter to have a value mu=001.using Plots\n\nconst μ = 0.01\nnothing # hideThe Hamiltonian for the PCR3BP in the synodic frame (i.e., a frame which rotates such that the primaries are at rest on the x axis) isbeginequation\nlabeleq-pcr3bp-hamiltonian\nH(x y p_x p_y) = frac12(p_x^2+p_y^2) - (x p_y - y p_x) + V(x y)\nendequationwherebeginequation\nlabeleq-pcr3bp-potential\nV(x y) = - frac1-musqrt(x-mu)^2+y^2 - fracmusqrt(x+1-mu)^2+y^2\nendequationis the gravitational potential associated to the primaries. The RHS of Eq. (\\ref{eq-pcr3bp-hamiltonian}) is also known as the Jacobi constant, since it is a preserved quantity of motion in the PCR3BP. We will use this property to check the accuracy of the solutions computed.V(x, y) = - (1-μ)/sqrt((x-μ)^2+y^2) - μ/sqrt((x+1-μ)^2+y^2)\nH(x, y, px, py) = (px^2+py^2)/2 - (x*py-y*px) + V(x, y)\nH(x) = H(x...)\nnothing # hideThe equations of motion for the PCR3BP arebegineqnarray\nlabeleqs-motion-pcr3bp\n    dotx = p_x + y \n    doty = p_y - x \n    dotp_x = - frac(1-mu)(x-mu)((x-mu)^2+y^2)^32 - fracmu(x+1-mu)((x+1-mu)^2+y^2)^32 + p_y \n    dotp_y = - frac(1-mu)y      ((x-mu)^2+y^2)^32 - fracmu y       ((x+1-mu)^2+y^2)^32 - p_x\nendeqnarrayWe define this system of ODEs using the most naive approachfunction f(dq, q, param, t)\n    local μ = param[1]\n    x, y, px, py = q\n    dq[1] = px + y\n    dq[2] = py - x\n    dq[3] = - (1-μ)*(x-μ)*((x-μ)^2+y^2)^-1.5 - μ*(x+1-μ)*((x+1-μ)^2+y^2)^-1.5 + py\n    dq[4] = - (1-μ)*y    *((x-μ)^2+y^2)^-1.5 - μ*y      *((x+1-μ)^2+y^2)^-1.5 - px\n    return nothing\nend\nnothing # hideNote that DifferentialEquations offers interesting alternatives to write these equations of motion in a simpler and more convenient way, for example, using the macro @ode_def, see ParameterizedFunctions.jl. We have not used that flexibility here because TaylorIntegration.jl has @taylorize, which under certain circumstances allows to important speed-ups.We shall define the initial conditions q_0 = (x_0 y_0 p_x0 p_y0) such that H(q_0) = J_0, where J_0 is a prescribed value. In order to do this, we select y_0 = p_x0 = 0 and compute the value of p_y0 for which H(q_0) = J_0 holds.We consider a value for J_0 such that the test particle is able to display close encounters with both primaries, but cannot escape to infinity. We may obtain a first approximation to the desired value of J_0 if we plot the projection of the zero-velocity curves on the x-axis.ZVC(x) =  -x^2/2 + V(x, zero(x)) # projection of the zero-velocity curves on the x-axis\n\nplot(ZVC, -2:0.001:2, label=\"zero-vel. curve\", legend=:topleft)\nplot!([-2, 2], [-1.58, -1.58], label=\"J0 = -1.58\")\nylims!(-1.7, -1.45)\nxlabel!(\"x\")\nylabel!(\"J\")\ntitle!(\"Zero-velocity curves (x-axis projection)\")Notice that the maxima in the plot correspond to the Lagrangian points L_1, L_2 and L_3; below we shall concentrate in the value J_0 = -158.J0 = -1.58\nnothing # hideWe define a function py!, which depends on the initial condition q_0 = (x_0 0 0 p_y0) and the Jacobi constant value J_0, such that it computes an adequate value p_y0 for which we have H(q_0)=J_0 and updates (in-place) the initial condition accordingly.function py!(q0, J0)\n    @assert iszero(q0[2]) && iszero(q0[3]) # q0[2] and q0[3] have to be equal to zero\n    q0[4] = q0[1] + sqrt( q0[1]^2-2( V(q0[1], q0[2])-J0 ) )\n    nothing\nend\nnothing # hideWe are now ready to generate an appropriate initial condition.q0 = [-0.8, 0.0, 0.0, 0.0]\npy!(q0, J0)\nq0We note that the value of q0 has been updated. We can check that the value of the Hamiltonian evaluated at the initial condition is indeed equal to J0.H(q0) == J0Following the DifferentialEquations.jl tutorial, we define an ODEProblem for the integration; TaylorIntegration.jl can be used via its common interface bindings with DiffEqBase.jl; both packages need to be loaded explicitly.tspan = (0.0, 1000.0)\np = [μ]\n\nusing TaylorIntegration, DiffEqBase\nprob = ODEProblem(f, q0, tspan, p)We solve prob using a 25-th order Taylor method, with a local absolute tolerance epsilon_mathrmtol = 10^-20.solT = solve(prob, TaylorMethod(25), abstol=1e-20);As mentioned above, we load OrdinaryDiffEq in order to solve the same problem prob now with the Vern9 method, which the DifferentialEquations.jl documentation recommends for high-accuracy (i.e., very low tolerance) integrations of non-stiff problems.using OrdinaryDiffEq\n\nsolV = solve(prob, Vern9(), abstol=1e-20); #solve `prob` with the `Vern9` methodWe plot in the x-y synodic plane the solution obtained with TaylorIntegration.jl:plot(solT, vars=(1, 2), linewidth=1)\nscatter!([μ, -1+μ], [0,0], leg=false) # positions of the primaries\nxlims!(-1+μ-0.2, 1+μ+0.2)\nylims!(-0.8, 0.8)\nxlabel!(\"x\")\nylabel!(\"y\")Note that the orbit obtained displays the expected dynamics: the test particle explores the regions surrounding both primaries, located at the red dots, without escaping to infinity. For comparison, we now plot the orbit corresponding to the solution obtained with the Vern9() integration; note that the scales are identical.plot(solV, vars=(1, 2), linewidth=1)\nscatter!([μ, -1+μ], [0,0], leg=false) # positions of the primaries\nxlims!(-1+μ-0.2, 1+μ+0.2)\nylims!(-0.8, 0.8)\nxlabel!(\"x\")\nylabel!(\"y\")We note that the orbits do not display the same qualitative features. In particular, the Vern9() integration displays an orbit which does not visit the secondary, as it was the case in the integration using Taylor\'s method, and stays far enough from m_1. The question is which integration should we trust?We can obtain a quantitative comparison of the validity of both integrations through the preservation of the Jacobi constant:ET = H.(solT.u)\nEV = H.(solV.u)\nδET = ET .- J0\nδEV = EV .- J0\nnothing # hideWe plot first the value of the Jacobi constant as function of time.plot(solT.t, H.(solT.u), label=\"TaylorIntegration.jl\")\nplot!(solV.t, H.(solV.u), label=\"Vern9()\")\nxlabel!(\"t\")\nylabel!(\"H\")Clearly, the integration with Vern9() does not conserve the Jacobi constant; actually, the fact that its value is strongly reduced leads to the artificial trapping displayed above around m_1. We notice that the loss of conservation of the Jacobi constant is actually not related to a close approach with m_1.We now plot, in log scale, the abs of the absolute error in the Jacobi constant as a function of time, for both solutions:plot(solT.t, abs.(δET), yscale=:log10, label=\"TaylorIntegration.jl\")\nplot!(solV.t, abs.(δEV), label=\"Vern9()\")\nylims!(10^-18, 10^4)\nxlabel!(\"t\")\nylabel!(\"dE\")We notice that the Jacobi constant absolute error for the TaylorIntegration.jl solution remains bounded below 5times 10^-14, despite of the fact that the solution displays many close approaches with m_2.Finally, we comment on the time spent by each integration.@elapsed solve(prob, TaylorMethod(25), abstol=1e-20);@elapsed solve(prob, Vern9(), abstol=1e-20);The integration with TaylorMethod() takes much longer than that using Vern9(). Yet, as shown above, the former preserves the Jacobi constant to a high accuracy, whereas the latter solution loses accuracy in the sense of not conserving the Jacobi constant, which is an important property to trust the result of the integration. A fairer comparison is obtained by pushing the native methods of DiffEqs to reach similar accuracy for the integral of motion, as the one obtained by TaylorIntegration.jl. Such comparable situation has a performance cost, which then makes TaylorIntegration.jl comparable or even faster in some cases; see [2].Finally, as mentioned above, a way to improve the integration time in TaylorIntegration is using the macro @taylorize; see this section for details. Under certain circumstances it is possible to improve the performance, also with the common interface with DifferentialEquations, which restricts some of the great flexibility that DifferentialEquations allows when writing the function containing the differential equations."
},

{
    "location": "common/#refsPCR3BP-1",
    "page": "Interoperability with DifferentialEquations.jl",
    "title": "References",
    "category": "section",
    "text": "[1] Murray, Carl D., Stanley F. Dermott. Solar System dynamics. Cambridge University Press, 1999.[2] DiffEqBenchmarks.jl/DynamicalODE"
},

{
    "location": "taylorize/#",
    "page": "Optimizing: @taylorize",
    "title": "Optimizing: @taylorize",
    "category": "page",
    "text": ""
},

{
    "location": "taylorize/#taylorize-1",
    "page": "Optimizing: @taylorize",
    "title": "Optimizing: @taylorize",
    "category": "section",
    "text": "Here, we describe the use of the macro @taylorize, which parses the functions containing the ODEs to be integrated, allowing to speed up taylorinteg and lyap_taylorinteg.warning: Warning\nThe macro @taylorize is still in an experimental phase; be cautious of the resulting integration, which has to be tested carefully."
},

{
    "location": "taylorize/#idea-1",
    "page": "Optimizing: @taylorize",
    "title": "Some context and the idea",
    "category": "section",
    "text": "The way in which taylorinteg works by default is by calling repeatedly the function where the ODEs of the problem are defined, in order to compute the recurrence relations that are used to construct the Taylor expansion of the solution. This is done for each order of the series in TaylorIntegration.jetcoeffs!. These computations are not optimized: they waste memory due to allocations of some temporary arrays, and perform some operations whose result has been previously computed.Here we describe one way to optimize this: The idea is to replace the default method of TaylorIntegration.jetcoeffs! by another (with the same name) which is called by dispatch, that in principle performs better. The new method is constructed specifically for the actual function defining the equations of motion by parsing its expression; the new function performs in principle exactly the same operations, but avoids the extra allocations and the repetition of some operations."
},

{
    "location": "taylorize/#An-example-1",
    "page": "Optimizing: @taylorize",
    "title": "An example",
    "category": "section",
    "text": "In order to explain how the macro works, we shall use as an example the mathematical pendulum. First, we carry out the integration using the default method, as described before.using TaylorIntegration\n\nfunction pendulum!(dx, x, p, t)\n    dx[1] = x[2]\n    dx[2] = -sin(x[1])\n    return dx\nend\n\n# Initial time (t0), final time (tf) and initial condition (q0)\nt0 = 0.0\ntf = 100.0\nq0 = [1.3, 0.0]\n\n# The actual integration\nt1, x1 = taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500); # warm-up run\ne1 = @elapsed taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500);\ne1We note that the initial number of methods defined for TaylorIntegration.jetcoeffs! is 2.length(methods(TaylorIntegration.jetcoeffs!)) == 2 # initial valueUsing @taylorize will increase this number by creating a new method.The macro @taylorize is intended to be used in front of the function that implements the equations of motion. The macro does the following: it first parses the actual function as it is, so the integration can be computed using taylorinteg as above, by explicitly using the keyword argument parse_eqs=false. It then creates and evaluates a new method of TaylorIntegration.jetcoeffs!, which is the specialized method (through Val) on the specific function passed to the macro.@taylorize function pendulum!(dx, x, p, t)\n    dx[1] = x[2]\n    dx[2] = -sin(x[1])\n    return dx\nend\n\nprintln(methods(pendulum!))println(methods(TaylorIntegration.jetcoeffs!))We see that there is only one method of pendulum!, and there is a new method of TaylorIntegration.jetcoeffs!, whose signature appears in this documentation as Val{Main.ex-taylorize.pendulum!}; it is an specialized version for the function pendulum! (with some extra information about the module where the function was created). This method is selected internally if it exists (default), exploiting dispatch, when calling taylorinteg or lyap_taylorinteg; to integrate using the hard-coded method of TaylorIntegration.jetcoeffs! of the integration above, the keyword argument parse_eqs has to be set to false.Now we carry out the integration using the specialized method; note that we use the same instruction as above.t2, x2 = taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500); # warm-up run\ne2 = @elapsed taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500);\ne2We note the difference in the performance:e1/e2We can check that both integrations yield the same results.t1 == t2 && x1 == x2As stated above, in order to allow to opt-out from using the specialized method created by @taylorize, taylorinteg and lyap_taylorinteg recognize the keyword argument parse_eqs; setting it to false imposes using the standard method.taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500, parse_eqs=false); # warm-up run\n\ne3 = @elapsed taylorinteg(pendulum!, q0, t0, tf, 25, 1e-20, maxsteps=1500, parse_eqs=false);\n\ne1/e3We now illustrate the possibility of exploiting the macro when using TaylorIntegration.jl from DifferentialEquations.jl.using DiffEqBase\n\nprob = ODEProblem(pendulum!, q0, (t0, tf), nothing) # no parameters\nsolT = solve(prob, TaylorMethod(25), abstol=1e-20, parse_eqs=true); # warm-up run\ne4 = @elapsed solve(prob, TaylorMethod(25), abstol=1e-20, parse_eqs=true);\n\ne1/e4Note that there is a marginal cost of using solve in comparison with taylorinteg.The speed-up obtained comes from the design of the new (specialized) method of TaylorIntegration.jetcoeffs! as described above: it avoids some allocations and some repeated computations. This is achieved by knowing the specific AST of the function of the ODEs integrated, which is walked through and translated into the actual implementation, where some required auxiliary arrays are created and the low-level functions defined in TaylorSeries.jl are used. For this, we heavily rely on Espresso.jl and some metaprogramming; we thank Andrei Zhabinski for his help and comments.The new jetcoeffs! method can be inspected by constructing the expression corresponding to the function, and using TaylorIntegration._make_parsed_jetcoeffs:ex = :(function pendulum!(dx, x, p, t)\n    dx[1] = x[2]\n    dx[2] = -sin(x[1])\n    return dx\nend)\n\nnew_ex = TaylorIntegration._make_parsed_jetcoeffs(ex)This function has a similar structure as the hard-coded method of TaylorIntegration.jetcoeffs!, but uses low-level functions in TaylorSeries (e.g., sincos! above) and explicitly allocates the needed temporary arrays. More complex functions become easily very difficult to read. Note that, if necessary, one can further optimize new_ex manually."
},

{
    "location": "taylorize/#Limitations-and-some-advices-1",
    "page": "Optimizing: @taylorize",
    "title": "Limitations and some advices",
    "category": "section",
    "text": "The construction of the internal function obtained by using @taylorize is somewhat complicated and limited. Here we list some limitations and advices.It is useful to have expressions which involve two arguments at most, which imposes the proper use of parenthesis: For example, res = a+b+c should be written as res = (a+b)+c.\nUpdating operators such as +=, *=, etc., are not supported. For example, the expression x += y is not recognized by @taylorize. Likewise, expressions such as x = x+y are not supported by @taylorize and should be substituted by equivalent expressions; e.g. z = x+y; x = z.\nThe macro allows to use array declarations through Array, but other ways (e.g. similar) are not yet implemented.\nAvoid using variables prefixed by an underscore, in particular _T and _S; using them may lead to name collisions with some internal variables.\nBroadcasting is not recognized by @taylorize.\nThe macro may be used in combination with the common interface with DifferentialEquations.jl, for functions using the (du, u, p, t) in-place form, as we showed above. Other extensions allowed by DifferentialEquations may not be able to exploit it.\nif-else blocks are recognized in its long form, but short-circuit conditional operators (&& and ||) are not.\nExpressions which correspond to function calls (so the head field is :call) which are not recognized by the parser are simply copied. The heuristics used, specially for vectors, may not work for all cases.\nUse local for internal parameters (simple constant values); this improves performance. Do not use it if the variable is Taylor expanded.It is recommended to skim test/taylorize.jl, which implements different cases.Please report any problems you may encounter."
},

{
    "location": "api/#",
    "page": "API",
    "title": "API",
    "category": "page",
    "text": ""
},

{
    "location": "api/#Library-1",
    "page": "API",
    "title": "Library",
    "category": "section",
    "text": "CurrentModule = TaylorIntegration"
},

{
    "location": "api/#TaylorIntegration.taylorinteg",
    "page": "API",
    "title": "TaylorIntegration.taylorinteg",
    "category": "function",
    "text": "taylorinteg(f, x0, t0, tmax, order, abstol, params[=nothing]; kwargs... )\n\nGeneral-purpose Taylor integrator for the explicit ODE dotx=f(x p t). The initial condition are specified by x0 at time t0, and any parameters encoded in params. The initial condition x0 may be of type T<:Number or Vector{T}, with T including TaylorN{T}; the latter case is of interest for jet transport applications.\n\nThe equations of motion are specified by the function f; we follow the same convention of DifferentialEquations.jl to define this function, i.e., f(x, p, t) or f!(dx, x, p, t); see the examples below.\n\nIt returns a vector with the values of time (independent variable), and a vector with the computed values of the dependent variable(s). The integration stops when time is larger than tmax, in which case the last returned value(s) correspond to that time, or when the number of saved steps is larger than maxsteps.\n\nThe integration method uses polynomial expansions on the independent variable of order order; the parameter abstol serves to define the time step using the last two Taylor coefficients of the expansions. Make sure you use a large enough order to assure convergence.\n\nCurrently, the recognized keyword arguments are:\n\nmaxsteps[=500]: maximum number of integration steps.\nparse_eqs[=true]: use the specialized method of jetcoeffs! created   with @taylorize.\n\nExamples\n\nFor one dependent variable the function f defines the RHS of the equation of motion, returning the value of dotx. The arguments of this function are (x, p, t), where x are the dependent variables, p are the paremeters and t is the independent variable.\n\nFor several (two or more) dependent variables, the function f! defines the RHS of the equations of motion, mutating (in-place) the (preallocated) vector with components of dotx. The arguments of this function are (dx, x, p, t), where dx is the preallocated vector of dotx, x are the dependent variables, p are the paremeters entering the ODEs and t is the independent variable. The function may return this vector or simply nothing.\n\nusing TaylorIntegration\n\nf(x, p, t) = x^2\n\ntv, xv = taylorinteg(f, 3, 0.0, 0.3, 25, 1.0e-20, maxsteps=100 )\n\nfunction f!(dx, x, p, t)\n    for i in eachindex(x)\n        dx[i] = x[i]^2\n    end\n    return nothing\nend\n\ntv, xv = taylorinteg(f!, [3, 3], 0.0, 0.3, 25, 1.0e-20, maxsteps=100 )\n\n\n\ntaylorinteg(f, x0, trange, order, abstol, params[=nothing]; keyword... )\n\nGeneral-purpose Taylor integrator for the explicit ODE dotx=f(tx) with initial condition specified by x0::{T<:Number} or x0::Vector{T} at time t0.\n\nThe method returns a vector with the computed values of the dependent variable(s), evaluated only at the times specified by the range trange.\n\nExamples\n\nxv = taylorinteg(f, 3, 0.0:0.001:0.3, 25, 1.0e-20, maxsteps=100 )\n\nxv = taylorinteg(f!, [3, 3], 0.0:0.001:0.3, 25, 1.0e-20, maxsteps=100 );\n\n\n\n\ntaylorinteg(f, g, x0, t0, tmax, order, abstol, params[=nothing]; kwargs... )\n\ntaylorinteg(f, g, x0, trange, order, abstol; kwargs... )\n\nRoot-finding method of taylorinteg.\n\nGiven a function g(dx, x, params, t)::Tuple{Bool, Taylor1{T}}, called the event function, taylorinteg checks for the occurrence of a root or event defined by cond2 == 0 (cond2::Taylor1{T}) if cond1::Bool is satisfied (true); g is thus assumed to return the tuple (cond1, cond2). Then, taylorinteg attempts to find that root (or event, or crossing) by performing a Newton-Raphson process. When called with the eventorder=n keyword argument, taylorinteg searches for the roots of the n-th derivative of cond2, which is computed via automatic differentiation.\n\nThe current keyword argument are:\n\nmaxsteps[=500]: maximum number of integration steps.\nparse_eqs[=true]: use the specialized method of jetcoeffs! created   with @taylorize.\neventorder[=0]: order of the derivative of g whose roots are computed.\nnewtoniter[=10]: maximum Newton-Raphson iterations per detected root.\nnrabstol[=eps(T)]: allowed tolerance for the Newton-Raphson process; T is the common   type of t0, tmax (or eltype(trange)) and abstol.\n\nExamples:\n\nusing TaylorIntegration\n\nfunction pendulum!(dx, x, params, t)\n    dx[1] = x[2]\n    dx[2] = -sin(x[1])\n    nothing\nend\n\ng(dx, x, params, t) = (true, x[2])\n\nx0 = [1.3, 0.0]\n\n# find the roots of `g` along the solution\ntv, xv, tvS, xvS, gvS = taylorinteg(pendulum!, g, x0, 0.0, 22.0, 28, 1.0E-20)\n\n# find the roots of the 2nd derivative of `g` along the solution\ntv, xv, tvS, xvS, gvS = taylorinteg(pendulum!, g, x0, 0.0, 22.0, 28, 1.0E-20; eventorder=2)\n\n# times at which the solution will be returned\ntv = 0.0:1.0:22.0\n\n# find the roots of `g` along the solution; return the solution *only* at each value of `tv`\nxv, tvS, xvS, gvS = taylorinteg(pendulum!, g, x0, tv, 28, 1.0E-20)\n\n# find the roots of the 2nd derivative of `g` along the solution; return the solution *only* at each value of `tv`\nxv, tvS, xvS, gvS = taylorinteg(pendulum!, g, x0, tv, 28, 1.0E-20; eventorder=2)\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.lyap_taylorinteg",
    "page": "API",
    "title": "TaylorIntegration.lyap_taylorinteg",
    "category": "function",
    "text": "lyap_taylorinteg(f!, q0, t0, tmax, order, abstol[, f!]; maxsteps::Int=500)\n\nSimilar to taylorinteg for the calculation of the Lyapunov spectrum. Note that the number of TaylorN variables should be set previously by the user (e.g., by means of TaylorSeries.set_variables) and should be equal to the length of the vector of initial conditions q0. Otherwise, whenever length(q0) != TaylorSeries.get_numvars(), then lyap_taylorinteg throws an AssertionError. Optionally, the user may provide a Jacobian function jacobianfunc! to evaluate the current value of the Jacobian. Otherwise, the current value of the Jacobian is computed via automatic differentiation using TaylorSeries.jl.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.@taylorize",
    "page": "API",
    "title": "TaylorIntegration.@taylorize",
    "category": "macro",
    "text": "@taylorize expr\n\nThis macro evals the function given by expr and defines a new method of jetcoeffs! which is specialized on that function. Integrating via taylorinteg of lyap_taylorinteg after using the macro yields better performance.\n\nSee the documentation for more details and limitations.\n\nwarning: Warning\nThis macro is on an experimental stage; check the integration results carefully.\n\n\n\n\n\n"
},

{
    "location": "api/#Exported-functions-1",
    "page": "API",
    "title": "Exported functions",
    "category": "section",
    "text": "taylorinteg\nlyap_taylorinteg\n@taylorize"
},

{
    "location": "api/#TaylorIntegration.__jetcoeffs!-Tuple{Val{false},Any,Any,Any,Any}",
    "page": "API",
    "title": "TaylorIntegration.__jetcoeffs!",
    "category": "method",
    "text": "__jetcoeffs!(::Val{bool}, f, t, x, params)\n__jetcoeffs!(::Val{bool}, f, t, x, dx, xaux, params)\n\nChooses a method of jetcoeffs! (hard-coded or generated by @taylorize) depending on Val{bool} (bool::Bool).\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._capture_fn_args_body!",
    "page": "API",
    "title": "TaylorIntegration._capture_fn_args_body!",
    "category": "function",
    "text": "_capture_fn_args_body!(ex, vout::Dict{Symbol, Any})\n\nCaptures the name of a function, arguments, body and other properties, returning them as the values of the dictionary dd, which is updated in place.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._defs_preamble!",
    "page": "API",
    "title": "TaylorIntegration._defs_preamble!",
    "category": "function",
    "text": "_defs_preamble!(preamble, fnargs, d_indx, v_newindx, v_arraydecl, v_preamb,     d_decl, [inloop=false])\n\nReturns a vector with expressions defining the auxiliary variables in the preamble; it may modify d_indx if new variables are introduced. v_preamb is for bookkeeping the introduced variables.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._determine_parsing!-Tuple{Bool,Any,Any,Any,Any}",
    "page": "API",
    "title": "TaylorIntegration._determine_parsing!",
    "category": "method",
    "text": "_determine_parsing!(parse_eqs::Bool, f, t, x, params)\n_determine_parsing!(parse_eqs::Bool, f, t, x, dx, params)\n\nCheck if the parsed method of jetcoeffs! exists and check it runs without error.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._extract_parts-Tuple{Expr}",
    "page": "API",
    "title": "TaylorIntegration._extract_parts",
    "category": "method",
    "text": "_extract_parts(ex::Expr)\n\nReturns the function name, the function arguments, and the body of a function passed as an Expr. The function may be provided as a one-line function, or in the long form (anonymous functions do not work).\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._make_parsed_jetcoeffs",
    "page": "API",
    "title": "TaylorIntegration._make_parsed_jetcoeffs",
    "category": "function",
    "text": "_make_parsed_jetcoeffs( ex, debug=false )\n\nThis function constructs a new function, equivalent to the differential equations, which exploits the mutating functions of TaylorSeries.jl.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._newfnbody-Tuple{Any,Any,Any}",
    "page": "API",
    "title": "TaylorIntegration._newfnbody",
    "category": "method",
    "text": "_newfnbody(fnbody, fnargs, d_indx)\n\nReturns a new (modified) body of the function, a priori unfolding the expression graph (AST) as unary and binary calls, and a vector (v_newindx) with the name of auxiliary indexed variables.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._newhead-Tuple{Any,Any}",
    "page": "API",
    "title": "TaylorIntegration._newhead",
    "category": "method",
    "text": "_newhead(fn, fnargs)\n\nCreates the head of the new method of jetcoeffs!. Here, fn is the name of the passed function and fnargs is a vector with its arguments (which are two or three).\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._parse_newfnbody!",
    "page": "API",
    "title": "TaylorIntegration._parse_newfnbody!",
    "category": "function",
    "text": "_parse_newfnbody!(ex, preex, v_vars, v_assign, d_indx, v_newindx, v_arraydecl,     [inloop=false])\n\nParses ex (the new body of the function) replacing the expressions to use the mutating functions of TaylorSeries, and building the preamble preex. This is done by traversing recursively the args of ex, updating the bookkeeping vectors v_vars and v_assign. d_indx is used to substitute back the explicit indexed variables.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._preamble_body",
    "page": "API",
    "title": "TaylorIntegration._preamble_body",
    "category": "function",
    "text": "_preamble_body(fnbody, fnargs, debug=false)\n\nReturns the preamble, the body and a guessed return variable, which will be used to build the parsed function. fnbody is the expression with the body of the original function, fnargs is a vector of symbols of the original diferential equations function.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._recursionloop-Tuple{Any,Any}",
    "page": "API",
    "title": "TaylorIntegration._recursionloop",
    "category": "method",
    "text": "_recursionloop(fnargs, retvar)\n\nBuild the expression for the recursion-loop.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._rename_indexedvars-Tuple{Any}",
    "page": "API",
    "title": "TaylorIntegration._rename_indexedvars",
    "category": "method",
    "text": "_rename_indexedvars(fnbody)\n\nRenames the indexed variables (using Espresso.genname()) that exists in fnbody. Returns fnbody with the renamed variables and a dictionary that links the new variables to the old indexed ones.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._replace_expr!-Tuple{Expr,Expr,Int64,Any,Any,Any,Any,Any}",
    "page": "API",
    "title": "TaylorIntegration._replace_expr!",
    "category": "method",
    "text": "_replace_expr!(ex, preex, i, aalhs, aarhs, v_vars, d_indx, v_newindx)\n\nReplaces the calls in ex.args[i], and updates preex with the definitions of the expressions, based on the the LHS (aalhs) and RHS (aarhs) of the base assignment. The bookkeeping vectors (v_vars, v_newindx) are updated. d_indx is used to bring back the indexed variables.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._replacecalls!-Tuple{Expr,Symbol,Any}",
    "page": "API",
    "title": "TaylorIntegration._replacecalls!",
    "category": "method",
    "text": "_replacecalls!(fnold, newvar, v_vars)\n\nReplaces the symbols of unary and binary calls of the expression fnold, which defines newvar, by the mutating functions in TaylorSeries.jl. The vector v_vars is updated if new auxiliary variables are introduced.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._second_stepsize-Union{Tuple{U}, Tuple{T}, Tuple{Taylor1{U},T}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration._second_stepsize",
    "category": "method",
    "text": "_second_stepsize(x, epsilon)\n\nCorresponds to the \"second stepsize control\" in Jorba and Zou (2005) paper. We use it if stepsize returns Inf.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration._stepsize-Union{Tuple{U}, Tuple{T}, Tuple{U,T,Int64}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration._stepsize",
    "category": "method",
    "text": "_stepsize(aux1, epsilon, k)\n\nHelper function to avoid code repetition. Returns (epsilonaux1)^(1k).\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.findroot!-NTuple{18,Any}",
    "page": "API",
    "title": "TaylorIntegration.findroot!",
    "category": "method",
    "text": "findroot!(t, x, dx, g_tupl_old, g_tupl, eventorder, tvS, xvS, gvS,\n    t0, δt_old, x_dx, x_dx_val, g_dg, g_dg_val, nrabstol,\n    newtoniter, nevents) -> nevents\n\nInternal root-finding subroutine, based on Newton-Raphson process. If there is a crossing, then the crossing data is stored in tvS, xvS and gvS and nevents, the number of events/crossings, is updated. Here t is a Taylor1 polynomial which represents the independent variable; x is an array of Taylor1 variables which represent the vector of dependent variables; dx is an array of Taylor1 variables which represent the LHS of the ODE; g_tupl_old is the last-before-current value returned by event function g and g_tupl is the current one; eventorder is the order of the derivative of g whose roots the user is interested in finding; tvS stores the surface-crossing instants; xvS stores the value of the solution at each of the crossings; gvS stores the values of the event function g (or its eventorder-th derivative) at each of the crossings; t0 is the current time; δt_old is the last time-step size; x_dx, x_dx_val, g_dg, g_dg_val are auxiliary variables; nrabstol is the Newton-Raphson process tolerance; newtoniter is the maximum allowed number of Newton-Raphson iteration; nevents is the current number of detected events/crossings.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.jetcoeffs!-Union{Tuple{U}, Tuple{T}, Tuple{Function,Taylor1{T},AbstractArray{Taylor1{U},1},AbstractArray{Taylor1{U},1},AbstractArray{Taylor1{U},1},Any}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.jetcoeffs!",
    "category": "method",
    "text": "jetcoeffs!(eqsdiff!::Function, t, x, dx, xaux, params)\n\nMutates x in-place using the recursion relation of the derivatives obtained from the differential equations dotx=dxdt=f(x p t).\n\neqsdiff! is the function defining the RHS of the ODE, x contains the Taylor1 expansion of the dependent variables and t is the independent variable, and params are the parameters appearing on the function defining the differential equation. See taylorinteg for examples and convention for eqsdiff. Note that x is of type Vector{Taylor1{U}} where U<:Number; t is of type Taylor1{T} where T<:Real. In this case, two auxiliary containers dx and xaux (both of the same type as x) are needed to avoid allocations.\n\nInitially, x contains only the 0-th order Taylor coefficient of the current system state (the initial conditions), and jetcoeffs! computes recursively the high-order derivates back into x.\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.jetcoeffs!-Union{Tuple{U}, Tuple{T}, Tuple{Function,Taylor1{T},Taylor1{U},Any}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.jetcoeffs!",
    "category": "method",
    "text": "jetcoeffs!(eqsdiff::Function, t, x, params)\n\nReturns an updated x using the recursion relation of the derivatives obtained from the differential equations dotx=dxdt=f(x p t).\n\neqsdiff is the function defining the RHS of the ODE, x contains the Taylor1 expansion of the dependent variable(s) and t is the independent variable, and params are the parameters appearing on the function defining the differential equation. See taylorinteg for examples and convention for eqsdiff. Note that x is of type Taylor1{U} where U<:Number; t is of type Taylor1{T} where T<:Real.\n\nInitially, x contains only the 0-th order Taylor coefficient of the current system state (the initial conditions), and jetcoeffs! computes recursively the high-order derivates back into x.\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.lyap_jetcoeffs!-Union{Tuple{S}, Tuple{T}, Tuple{Taylor1{T},AbstractArray{Taylor1{S},1},AbstractArray{Taylor1{S},1},Array{Taylor1{S},2},Array{Taylor1{S},3}}} where S<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.lyap_jetcoeffs!",
    "category": "method",
    "text": "lyap_jetcoeffs!(t, x, dx, jac, varsaux)\n\nSimilar to jetcoeffs! for the calculation of the Lyapunov spectrum. Updates only the elements of x which correspond to the solution of the 1st-order variational equations dotxi=J cdot xi, where J is the Jacobian matrix, i.e., the linearization of the equations of motion. jac is the Taylor expansion of J wrt the independent variable, around the current initial condition. varsaux is an auxiliary array of type Array{eltype(jac),3} to avoid allocations. Calling this method assumes that jac has been computed previously using stabilitymatrix!.\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.lyap_taylorstep!-Union{Tuple{U}, Tuple{T}, Tuple{Any,Taylor1{T},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{TaylorN{Taylor1{U}},1},Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},2},T,T,Int64,T,Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},3},Any}, Tuple{Any,Taylor1{T},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{TaylorN{Taylor1{U}},1},Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},2},T,T,Int64,T,Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},3},Any,Bool}, Tuple{Any,Taylor1{T},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{Taylor1{U},1},Array{TaylorN{Taylor1{U}},1},Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},2},T,T,Int64,T,Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},3},Any,Bool,Any}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.lyap_taylorstep!",
    "category": "method",
    "text": "lyap_taylorstep!(f!, t, x, dx, xaux, δx, dδx, jac, t0, t1, order, abstol, _δv, varsaux, params[, jacobianfunc!])\n\nSimilar to taylorstep! for the calculation of the Lyapunov spectrum. jac is the Taylor expansion (wrt the independent variable) of the linearization of the equations of motion, i.e, the Jacobian. xaux, δx, dδx, varsaux and _δv are auxiliary vectors, and params define the parameters of the ODEs. Optionally, the user may provide a Jacobian function jacobianfunc! to compute jac. Otherwise, jac is computed via automatic differentiation using TaylorSeries.jl.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.nrconvergencecriterion-Union{Tuple{T}, Tuple{U}, Tuple{U,T,Int64,Int64}} where T<:Real where U<:Number",
    "page": "API",
    "title": "TaylorIntegration.nrconvergencecriterion",
    "category": "method",
    "text": "nrconvergencecriterion(g_val, nrabstol::T, nriter::Int, newtoniter::Int) where {T<:Real}\n\nA rudimentary convergence criterion for the Newton-Raphson root-finding process. g_val may be either a Real, Taylor1{T} or a TaylorN{T}, where T<:Real. Returns true if: 1) the absolute value of g_val, the value of the event function g evaluated at the current estimated root by the Newton-Raphson process, is less than the nrabstol tolerance; and 2) the number of iterations nriter of the Newton-Raphson process is less than the maximum allowed number of iterations, newtoniter; otherwise, returns false.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.stabilitymatrix!-Union{Tuple{U}, Tuple{T}, Tuple{Any,Taylor1{T},Array{Taylor1{U},1},Array{TaylorN{Taylor1{U}},1},Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},2},Array{TaylorN{Taylor1{U}},1},Any}, Tuple{Any,Taylor1{T},Array{Taylor1{U},1},Array{TaylorN{Taylor1{U}},1},Array{TaylorN{Taylor1{U}},1},Array{Taylor1{U},2},Array{TaylorN{Taylor1{U}},1},Any,Any}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.stabilitymatrix!",
    "category": "method",
    "text": "stabilitymatrix!(eqsdiff!, t, x, δx, dδx, jac, _δv, params[, jacobianfunc!=nothing])\n\nUpdates the matrix jac::Matrix{Taylor1{U}} (linearized equations of motion) computed from the equations of motion (eqsdiff!), at time t at x; x is of type Vector{Taylor1{U}}, where U<:Number. δx, dδx and _δv are auxiliary arrays of type Vector{TaylorN{Taylor1{U}}} to avoid allocations. Optionally, the user may provide a Jacobian function jacobianfunc! to compute jac. Otherwise, jac is computed via automatic differentiation using TaylorSeries.jl.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.stepsize-Union{Tuple{U}, Tuple{T}, Tuple{Taylor1{U},T}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.stepsize",
    "category": "method",
    "text": "stepsize(x, epsilon) -> h\n\nReturns a maximum time-step for a the Taylor expansion x using a prescribed absolute tolerance epsilon and the last two Taylor coefficients of (each component of) x.\n\nNote that x is of type Taylor1{U} or Vector{Taylor1{U}}, including also the cases Taylor1{TaylorN{U}} and Vector{Taylor1{TaylorN{U}}}.\n\nDepending of eltype(x), i.e., U<:Number, it may be necessary to overload stepsize, specializing it on the type U, to avoid type instabilities.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.surfacecrossing-Union{Tuple{T}, Tuple{Tuple{Bool,Taylor1{T}},Tuple{Bool,Taylor1{T}},Int64}} where T<:Number",
    "page": "API",
    "title": "TaylorIntegration.surfacecrossing",
    "category": "method",
    "text": "surfacecrossing(g_old, g_now, eventorder::Int)\n\nDetect if the solution crossed a root of event function g. g_old represents the last-before-current value of event function g, and g_now represents the current one; these are Tuple{Bool,Taylor1{T}}s. eventorder is the order of the derivative of the event function g whose root we are trying to find. Returns true if the constant terms of g_old[2] and g_now[2] have different signs (i.e., if one is positive and the other one is negative). Otherwise, if g_old[2] and g_now[2] have the same sign or if the first component of either of them is false, then it returns false.\n\n\n\n\n\n"
},

{
    "location": "api/#TaylorIntegration.taylorstep!-Union{Tuple{U}, Tuple{T}, Tuple{Any,Taylor1{T},Taylor1{U},T,Any}, Tuple{Any,Taylor1{T},Taylor1{U},T,Any,Bool}} where U<:Number where T<:Real",
    "page": "API",
    "title": "TaylorIntegration.taylorstep!",
    "category": "method",
    "text": "taylorstep!(f, t, x, t0, order, abstol, params, parse_eqs=true) -> δt\ntaylorstep!(f!, t, x, dx, xaux, t0, order, abstol, params, parse_eqs=true) -> δt\n\nOne-step Taylor integration for the one-dependent variable ODE dotx=dxdt=f(x p t) with initial conditions x(t_0)=x_0. Returns the time-step δt of the actual integration carried out (δt is positive).\n\nHere, f is the function defining the RHS of the ODE (see taylorinteg), t is the independent variable, x contains the Taylor expansion of the dependent variable, order is the degree  used for the Taylor1 polynomials during the integration abstol is the absolute tolerance used to determine the time step of the integration, and params are the parameters entering the ODE functions. For several variables, dx and xaux, both of the same type as x, are needed to save allocations. Finally, parse_eqs is a switch to force not using (parse_eqs=false) the specialized method of jetcoeffs! created with @taylorize; the default is true (parse the equations). Finally, parse_eqs is a switch to force not using (parse_eqs=false) the specialized method of jetcoeffs! created with @taylorize; the default is true (parse the equations).\n\n\n\n"
},

{
    "location": "api/#Internal-1",
    "page": "API",
    "title": "Internal",
    "category": "section",
    "text": "Modules = [TaylorIntegration]\nPublic = false"
},

{
    "location": "api/#Index-1",
    "page": "API",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"api.md\"]\nModule = [\"TaylorIntegration\"]\nOrder = [:function]\nPublic = true"
},

]}
