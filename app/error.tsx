'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h2 className="text-4xl font-bold text-[#da3832] mb-4">Something went wrong!</h2>
      <p className="text-[#919090] mb-8">An unexpected error occurred while calculating your retirement plan.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#224c87] text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
        >
          Try again
        </button>
        <Link 
          href="/" 
          className="px-6 py-3 border border-[#224c87] text-[#224c87] rounded-lg hover:bg-gray-50 transition-all font-bold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
