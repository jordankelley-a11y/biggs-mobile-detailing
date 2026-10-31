import type { ReactNode } from 'react';
import { SITE, bookingUrlFor, type ServicePackage } from '../config/site';

interface BookButtonProps {
  /** Button text. Defaults to the primary call-to-action. */
  children?: ReactNode;
  /** Pass a package to use its own Square link (falls back to the main URL). */
  pkg?: Pick<ServicePackage, 'bookingUrl'>;
  className?: string;
  variant?: 'primary' | 'outline';
}

/**
 * EVERY booking button on the site is this component.
 * It reads the link from src/config/site.ts → SITE.squareBookingUrl
 * (or a package's own `bookingUrl` if you set one) and opens Square in a new tab.
 */
export default function BookButton({ children = 'BOOK YOUR DETAIL', pkg, className = '', variant = 'primary' }: BookButtonProps) {
  return (
    <a
      href={pkg ? bookingUrlFor(pkg) : SITE.squareBookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-booking="true"
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${className}`}
    >
      {children}
      <span className="sr-only"> (opens booking page in a new tab)</span>
    </a>
  );
}
