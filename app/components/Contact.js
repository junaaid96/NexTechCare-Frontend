"use client";

import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuilding,
    faEnvelope,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCheckCircle,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
    const [textSubmissionLoading, setTextSubmissionLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    async function handleSubmitText(e) {
        e.preventDefault();
        setTextSubmissionLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        try {
            const response = await axios.post(
                "https://nextechcare-backend.onrender.com/contacts/create/",
                {
                    name,
                    email,
                    subject,
                    message,
                }
            );

            if (response.status === 201) {
                setError("");
                setSuccess(response.data.success);
                setTimeout(() => {
                    setSuccess("");
                }, 3000);
                setTextSubmissionLoading(false);
            }
        } catch (error) {
            console.error(error);
            setSuccess("");
            setError("An error occurred. Please try again later.");
            setTextSubmissionLoading(false);
        }
    }

    return (
        <section
            id="contact"
            className="py-10 bg-gradient-to-b from-green-50 to-white"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl mb-10">
                    Contact Us
                </h2>
                {error && (
                    <div className="toast toast-end">
                        <div role="alert" className="alert alert-error my-6">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            <span>{error}</span>
                        </div>
                    </div>
                )}
                {success && (
                    <div className="toast toast-end">
                        <div role="alert" className="alert alert-success my-6">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>{success}</span>
                        </div>
                    </div>
                )}
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
                        <form className="space-y-6" onSubmit={handleSubmitText}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="name"
                                        className="input input-bordered input-primary"
                                        required
                                        aria-label="name"
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
                                        id="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered input-primary"
                                        required
                                        aria-label="email"
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Subject"
                                    className="input input-bordered input-primary"
                                    required
                                    aria-label="subject"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Message"
                                    className="textarea textarea-bordered textarea-primary textarea-lg w-full"
                                    required
                                ></textarea>
                            </div>

                            {textSubmissionLoading && (
                                <div className="flex flex-col items-center">
                                    <span className="loading loading-spinner text-primary loading-lg"></span>
                                    <p className="mb-12">Please wait</p>
                                </div>
                            )}

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
