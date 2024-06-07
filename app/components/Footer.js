import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-primary text-base-content rounded">
            <nav className="grid grid-flow-col gap-4">
                <Link href={"/"} className="link link-hover">
                    About us
                </Link>
                <Link href={"/"} className="link link-hover">
                    Contact
                </Link>
                <Link href={"/"} className="link link-hover">
                    Jobs
                </Link>
                <Link href={"/"} className="link link-hover">
                    Press kit
                </Link>
            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link href={"/"}>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </Link>
                    <Link href={"/"}>
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </Link>
                    <Link href={"/"}>
                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                    </Link>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2024 - All right reserved by NexTechCare Ltd</p>
            </aside>
        </footer>
    );
}
