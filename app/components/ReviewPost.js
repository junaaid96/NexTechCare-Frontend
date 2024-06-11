"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@/app/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTriangleExclamation,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import getReview from "@/lib/getReview";

export default function ReviewPost({ serviceId, isTaken }) {
    const userContext = useUser();
    const { loading, loggedIn, userType } = userContext;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const fetchReviews = useCallback(async () => {
        setReviewLoading(true);
        try {
            const response = await getReview({ id: serviceId });
            setError("");
            setReviews(response);
            setReviewLoading(false);
        } catch (error) {
            console.error(error);
            setError("An error occurred while fetching review!");
            setReviewLoading(false);
        }
    }, [serviceId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    function safeLocalStorage(key) {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key);
        }

        return null;
    }

    const access_token = safeLocalStorage("access_token");

    const handleRatingClick = (rate) => {
        setRating(rate);
    };

    async function handleSubmit(e) {
        setReviewLoading(true);
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://nextechcare-backend.onrender.com/reviews/${serviceId}/`,
                {
                    rating,
                    comment: review,
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            );
            console.log(response);

            //fetching reviews after submitted new one.
            fetchReviews();

            setReviewLoading(false);

            setError("");
            setSuccess("Review Submitted!");

            // clearing data after submitted
            setReview("");
            setHover(0);
            setRating(0);
        } catch (error) {
            console.error(error);
            setSuccess("");
            setError(
                error.response.data.error || "Any field may not be blank!"
            );
            setReviewLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center my-10 gap-6">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <p className="mb-10">Total Reviews: {reviews.length}</p>
            {reviewLoading && (
                <>
                    <span className="loading loading-spinner text-primary loading-lg"></span>
                    <p className="mb-12">Please wait</p>
                </>
            )}
            {error && (
                <div
                    role="alert"
                    className="alert alert-error lg:w-1/2 lg:m-auto"
                >
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                    <span>{error}</span>
                </div>
            )}
            {success && (
                <div className="alert alert-success lg:w-1/2 lg:m-auto">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>{success}</span>
                </div>
            )}
            {loggedIn && userType === "C" && isTaken && (
                <div className="bg-base-100 p-6 rounded-lg border w-full lg:w-2/3 lg:m-auto">
                    <h2 className="text-2xl font-bold mb-4">
                        Share your thoughts!
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">
                                Rating
                            </label>
                            <div className="flex">
                                {[...Array(10)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={
                                                index <= (hover || rating)
                                                    ? "text-yellow-500"
                                                    : "text-gray-300"
                                            }
                                            onClick={() =>
                                                handleRatingClick(index)
                                            }
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() =>
                                                setHover(rating)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faStar} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="review"
                            >
                                Review
                            </label>
                            <textarea
                                id="review"
                                className="w-full px-3 py-2 textarea textarea-primary"
                                rows="4"
                                placeholder="Write your review here..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-2 btn btn-primary font-bold rounded-lg"
                            >
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="w-full lg:w-2/3 space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-green-50 p-6 rounded-lg flex space-x-4 border"
                    >
                        image
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800">
                                        {review.customer}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-yellow-500">
                                    {Array(review.rating)
                                        .fill()
                                        .map((_, i) => (
                                            <FontAwesomeIcon
                                                key={i}
                                                icon={faStar}
                                            />
                                        ))}

                                    <span className="text-gray-300">
                                        {Array(10 - review.rating)
                                            .fill()
                                            .map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={faStar}
                                                />
                                            ))}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
