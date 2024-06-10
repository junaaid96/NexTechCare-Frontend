import Link from "next/link";

export default function Hero() {
    return (
        <header className="pt-16">
            <div className="hero lg:p-20 bg-banner">
                <div className="hero-content text-center">
                    <div className="max-w-sm lg:max-w-full">
                        <h1 className="text-5xl font-bold max-sm:text-3xl">
                            NexTechCare
                        </h1>
                        <p className="m-6">
                            NexTechCare serves as a central hub for users
                            seeking assistance with technical issues related to
                            software, hardware, networking, and other IT-related
                            topics. Whether it’s troubleshooting, guidance, or
                            general information, an effective IT support system
                            aims to provide timely and accurate solutions.
                        </p>
                        <Link href="/login" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
