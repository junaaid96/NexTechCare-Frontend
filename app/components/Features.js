import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDesktop,
    faHeadset,
    faHouseLaptop,
    faServer,
    faShieldHalved,
    faWrench,
} from "@fortawesome/free-solid-svg-icons";

export default function Features() {
    return (
        <section
            id="features"
            className="bg-gradient-to-t from-green-50 to-white py-16"
        >
            <div className="max-w-7xl mx-auto text-center ">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Features
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                    Explore the key features that make our IT support service
                    stand out.
                </p>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 m-6">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon icon={faHeadset} size="3x" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    24/7 Availability
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Access our support team anytime, day or
                                    night, for immediate assistance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon icon={faDesktop} size="3x" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Remote Assistance
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    Get support remotely without the need for
                                    in-person visits, saving time and resources.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon
                                    icon={faShieldHalved}
                                    size="3x"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Proactive Monitoring
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We monitor your systems continuously to
                                    detect and resolve issues before they
                                    escalate.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon
                                    icon={faHouseLaptop}
                                    size="3x"
                                />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Data Security
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We implement robust security measures to
                                    protect your sensitive data from threats and
                                    breaches.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon icon={faServer} size="3x" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Backup Solutions
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We offer reliable backup solutions to
                                    safeguard your critical data and ensure
                                    business continuity.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                        <div className="p-6">
                            <div className="flex-shrink-0">
                                <FontAwesomeIcon icon={faWrench} size="3x" />
                            </div>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Customized Solutions
                                </h3>
                                <p className="mt-2 text-base text-gray-600">
                                    We tailor our IT support services to meet
                                    your specific business requirements for
                                    optimal performance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
