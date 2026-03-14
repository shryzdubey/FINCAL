import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-4xl font-bold text-[#224c87] mb-4">404 - Page Not Found</h2>
      <p className="text-[#919090] mb-8">The page you are looking for does not exist.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-[#224c87] text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
      >
        Return Home
      </Link>
    </div>
  );
}
