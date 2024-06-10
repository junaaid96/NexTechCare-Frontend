import getService from "@/lib/getService";
import getReview from "@/lib/getReview";
import TakeButton from "@/app/components/TakeButton";

export default async function ServiceDetails({ params }) {
    const { id } = params;
    const service = await getService({ id });
    const reviews = await getReview({ id });

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20 px-4">
            <div className="bg-white p-10 rounded-lg shadow w-full lg:w-2/3 lg:m-auto">
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="md:w-2/3">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            {service.name}
                        </h2>
                        <p className="text-lg font-semibold text-gray-700 mb-4">
                            Engineer: {service.engineer.user.first_name}{" "}
                            {service.engineer.user.last_name}
                        </p>
                        <p className="text-gray-600 mb-6">
                            <span className="font-semibold">Description:</span>{" "}
                            {service.description}
                        </p>
                    </div>
                    <div className="md:w-1/3 flex flex-col items-start md:items-end">
                        <p className="text-xl text-gray-800 mb-4">
                            <span className="font-semibold">Price:</span> $
                            {service.price}
                        </p>
                        <p className="text-xl text-gray-800 mb-6">
                            <span className="font-semibold">Duration:</span>{" "}
                            {service.duration} Hrs
                        </p>
                        <TakeButton serviceId={service.id} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center my-10">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <p className="mb-10">Total Reviews: {reviews.length}</p>
                <div className="w-full lg:w-2/3 space-y-6">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-green-50 p-6 rounded-lg flex space-x-4 border"
                        >
                            image
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
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
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(10 - review.rating)}
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
        </div>
    );
}
