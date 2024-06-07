import Image from "next/image";

export default function SocialProof() {
    return (
        <section className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">
                    Trusted by Reputable Companies
                </h2>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    <Image
                        src="assets/logo/c1.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c2.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c3.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c4.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c5.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c6.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c7.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                    <Image
                        src="assets/logo/c8.png"
                        width={500}
                        height={500}
                        alt="Client Logo"
                        className="h-24"
                    />
                </div>
            </div>
        </section>
    );
}
