import Link from "next/link";

// ServiceCard component
export const ServiceCard = ({ service }) => (
    <div
        key={service.id}
        className="bg-white rounded-lg shadow p-6 w-96 h-72 flex flex-col justify-evenly"
    >
        <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
        <p className="text-md text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {service.description}
        </p>
        <p className="text-md text-gray-600">
            <span className="font-semibold">Price:</span> ${service.price}
        </p>
        <p className="text-md text-gray-600">
            <span className="font-semibold">Duration:</span> {service.duration}{" "}
            Hrs
        </p>
        <Link
            className="btn btn-primary btn-outline btn-sm mt-3 w-32"
            href={`/services/${service.id}`}
        >
            View
        </Link>
    </div>
);

// ServiceList component
export const ServiceList = ({ title, services, loading, servicesLoading }) => (
    <>
        {title && (
            <h4 className="text-lg font-semibold text-center mb-10 border shadow w-1/3 m-auto">
                {title}
            </h4>
        )}
        {loading || servicesLoading ? (
            <div className="min-h-screen w-24 m-auto">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        ) : services.length === 0 ? (
            <p className="text-center mb-6">No services found.</p>
        ) : (
            <div className="flex flex-wrap gap-6 items-center justify-center pb-10">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        )}
    </>
);