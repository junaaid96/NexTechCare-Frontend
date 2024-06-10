export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center">
            <div className="max-w-lg bg-white shadow-md rounded-md p-8">
                <h1 className="text-3xl font-bold text-red-600 mb-4">
                    404 - Page Not Found!
                </h1>
                <p className="text-gray-800">
                    Sorry, the page you are looking for could not be found.
                </p>
                <p className="text-gray-800">
                    Please check the URL or go back to the homepage.
                </p>
            </div>
        </div>
    );
}
