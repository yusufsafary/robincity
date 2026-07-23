import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export function BackLink({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-sm hover:text-accent transition-colors" data-testid="link-back">
      <ArrowLeft className="w-4 h-4" />
      <span>BACK TO CITY</span>
    </Link>
  );
}
