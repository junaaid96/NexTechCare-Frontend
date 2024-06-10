import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-10 bg-gradient-to-b from-green-50 to-white"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-10">
                    Contact Us
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-8 my-12 bg-green-100 rounded-xl p-6 shadow lg:w-2/3 m-auto">
                    <div className="flex items-center justify-center gap-6">
                        <FontAwesomeIcon icon={faBuilding} size="2x" />
                        <div>
                            <h4 className="text-2xl font-semibold text-gray-700">
                                Office
                            </h4>
                            <p className="text-gray-500">
                                123 NexTechCare St, Tech City, TX 75001
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <FontAwesomeIcon icon={faPhone} size="2x" />
                        <div>
                            <h4 className="text-2xl font-semibold text-gray-700">
                                Phone
                            </h4>
                            <p className="text-gray-500">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                        <div>
                            <h4 className="text-2xl font-semibold text-gray-700">
                                Email
                            </h4>
                            <p className="text-gray-500">
                                contact@nextechcare.com
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8397920786574!2d-122.41941568468194!3d37.77492927975917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c1d36691d%3A0x69c2e15b5c39bd27!2sRestaurant!5e0!3m2!1sen!2sus!4v1609459126636!5m2!1sen!2sus"
                            width="600"
                            height="450"
                            className="w-full rounded-md shadow-lg"
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></iframe>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="input input-primary"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="input input-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="input input-primary"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    className="textarea textarea-primary textarea-lg w-full"
                                    placeholder="Message"
                                    required
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-full sm:w-auto rounded-2xl"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
