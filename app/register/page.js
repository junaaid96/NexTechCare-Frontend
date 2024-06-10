import Link from "next/link";

export default function Register() {
  return (
    <div className="hero min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 pb-12">
        <div className="hero-content w-full flex-col">
            <div className="text-center">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <p className="py-6">Join us and enjoy a seamless IT support experience. Fill in the form below to create
                    your account.</p>
            </div>
            <div className="card shrink-0 lg:w-1/2 max-sm:w-full shadow-2xl bg-base-100">
                <form className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input type="text" placeholder="Username" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input type="text" placeholder="First Name" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input type="text" placeholder="Last Name" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="Email" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="Password" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Gender</span>
                        </label>
                        <select className="select select-primary" required>
                            <option disabled selected>Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input type="date" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Occupation</span>
                        </label>
                        <input type="text" placeholder="Occupation" className="input input-primary" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Type</span>
                        </label>
                        <select className="select select-primary" required>
                            <option disabled selected>Select User Type</option>
                            <option>Customer</option>
                            <option>Engineer</option>
                        </select>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className="mb-5 text-center">
                    <p>Already an account? Please, <Link className="text-primary hover:underline" href="/login">login.</Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}
