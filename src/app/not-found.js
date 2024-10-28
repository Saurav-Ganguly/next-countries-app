import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</p>
        <p className="text-gray-500 mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Go back home
        </Link>
      </div>
    </div>
  );
}
