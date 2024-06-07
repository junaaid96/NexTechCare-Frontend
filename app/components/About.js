export default function About() {
    return (
        <section
            id="about"
            className="bg-gray-100 flex items-center justify-center"
        >
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">About Us</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                    We provide top-notch IT support services to help you stay
                    ahead of technology challenges.
                </p>
                <div className="mt-8">
                    <ul className="space-y-4">
                        <li className="text-base leading-6 text-gray-600">
                            Expert team with years of experience
                        </li>
                        <li className="text-base leading-6 text-gray-600">
                            24/7 customer support
                        </li>
                        <li className="text-base leading-6 text-gray-600">
                            Affordable and scalable solutions
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
