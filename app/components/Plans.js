

export default function Plans() {
    return (
        <section id="plans" className="bg-white py-16">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">Pricing Plans</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                    Choose a plan that fits your needs.
                </p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 m-6">
                    <div className="pt-6">
                        <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                            <div className="-mt-6">
                                <div className="text-center">
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 border border-primary rounded-box inline-block p-2 shadow">
                                        Basic
                                    </h3>
                                    <p className="mt-4 text-base leading-6 text-gray-500">
                                        Essential features for personal use
                                    </p>
                                    <div className="mt-6">
                                        <span className="text-4xl font-extrabold text-gray-900">
                                            $10
                                        </span>
                                        <span className="text-base font-medium text-gray-500">
                                            /month
                                        </span>
                                    </div>
                                    <div className="mt-8">
                                        <button className="btn btn-primary">
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="flow-root bg-green-200 rounded-lg px-4 pb-8">
                            <div className="-mt-6">
                                <div className="text-center">
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 border border-primary rounded-box inline-block p-2 shadow">
                                        Standard
                                    </h3>
                                    <p className="mt-4 text-base leading-6 text-gray-500">
                                        Great for small businesses
                                    </p>
                                    <div className="mt-6">
                                        <span className="text-4xl font-extrabold text-gray-900">
                                            $30
                                        </span>
                                        <span className="text-base font-medium text-gray-500">
                                            /month
                                        </span>
                                    </div>
                                    <div className="mt-8">
                                        <button className="btn btn-primary">
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="flow-root bg-gray-50 rounded-lg px-4 pb-8">
                            <div className="-mt-6">
                                <div className="text-center">
                                    <h3 className="mt-2 text-lg font-medium text-gray-900 border border-primary rounded-box inline-block p-2 shadow">
                                        Premium
                                    </h3>
                                    <p className="mt-4 text-base leading-6 text-gray-500">
                                        Comprehensive solutions for large
                                        enterprises
                                    </p>
                                    <div className="mt-6">
                                        <span className="text-4xl font-extrabold text-gray-900">
                                            $60
                                        </span>
                                        <span className="text-base font-medium text-gray-500">
                                            /month
                                        </span>
                                    </div>
                                    <div className="mt-8">
                                        <button className="btn btn-primary">
                                            Get Started
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
