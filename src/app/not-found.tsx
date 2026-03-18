import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-black text-white/10 mb-4">404</h1>
      <p className="text-white/40 mb-6">This article doesn&apos;t exist or was removed.</p>
      <Link href="/" className="text-sm text-white hover:text-white/70 transition-colors border border-white/20 px-4 py-2 rounded-lg">
        ← Back to Home
      </Link>
    </div>
  );
}
