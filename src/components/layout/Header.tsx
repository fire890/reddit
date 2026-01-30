import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-headline text-2xl font-bold text-primary transition-opacity hover:opacity-80"
          >
            레딧번역마을
          </Link>
        </div>
      </div>
    </header>
  );
}
