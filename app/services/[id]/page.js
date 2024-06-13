import getService from "@/lib/getService";
import ServiceCommonComponent from "@/app/components/Common";

export const metadata = {
    title: "NexTechCare - Service Details",
    description: "NexTechCare - A seamless IT support experience",
};

export default async function ServiceDetails({ params }) {
    const { id } = params;
    const service = await getService({ id });

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
                            {service.duration} {service.duration > 1 ? "hours" : "hour"}
                        </p>
                    </div>
                </div>
            </div>
            <ServiceCommonComponent serviceId={service.id} />
        </div>
    );
}
