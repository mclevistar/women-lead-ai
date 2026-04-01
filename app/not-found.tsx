import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-32 px-6 text-center">
      <h1 className="font-display text-5xl font-bold text-foreground mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! Page not found.
      </p>
      <Link href="/" className="text-sm font-medium text-primary hover:underline">
        Back to home &rarr;
      </Link>
    </section>
  );
}
