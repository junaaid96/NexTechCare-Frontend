import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    return (
        <nav className="navbar bg-primary font-semibold fixed top-0 w-full z-50 shadow">
            <div className="navbar-start">
                <details className="dropdown">
                    <summary className="btn btn-ghost lg:hidden">
                        <FontAwesomeIcon icon={faBars} size="xl" />
                    </summary>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52 lg:hidden">
                        <li>
                            <Link href={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link href={"#services"}>Services</Link>
                        </li>
                        <li>
                            <Link href={"#features"}>Features</Link>
                        </li>
                        <li>
                            <Link href={"#plans"}>Plans</Link>
                        </li>
                        <li>
                            <Link href={"#about"}>About</Link>
                        </li>
                        <li>
                            <Link href={"#contact"}>Contact</Link>
                        </li>
                        {/* <hr />
                        <li className="rounded-lg shadow">
                            <a>Profile</a>
                            <ul className="p-2 bg-green-100 rounded-lg shadow">
                                <li>
                                    <p>Md. Junaidul Islam</p>
                                </li>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </li> */}
                    </ul>
                </details>
                <Link href={"/"} className="btn btn-ghost text-xl font-bold">
                    NexTechCare
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"#services"}>Services</Link>
                    </li>
                    <li>
                        <Link href={"#features"}>Features</Link>
                    </li>
                    <li>
                        <Link href={"#plans"}>Plans</Link>
                    </li>
                    <li>
                        <Link href={"#about"}>About</Link>
                    </li>
                    <li>
                        <Link href={"#contact"}>Contact</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {/* <details className="dropdown dropdown-bottom dropdown-end hidden lg:block">
                    <summary className="m-1 btn btn-accent">Profile</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-green-100 rounded-box w-52">
                        <li>
                            <p>Md. Junaidul Islam</p>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </details> */}
                <Link href={"/"} className="btn btn-accent">
                    Login
                </Link>
            </div>
        </nav>
    );
}
