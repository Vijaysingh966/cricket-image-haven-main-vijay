
import React from 'react';
import { LucideProps } from 'lucide-react';

export const PaypalIcon: React.FC<LucideProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 11l5-1 3 4" />
    <path d="M19.5 8.5c0 1.7-1.3 3-3 3h-5c-.4 0-.7.2-.9.5L8.3 17H4c-.6 0-1-.4-1-1v-3.5c0-.6.4-1 1-1h5.7" />
    <path d="M18.7 5.5c.6.2 1 .8 1 1.5 0 .8-.5 1.5-1.2 1.8" />
    <path d="M10.8 9H7c-.6 0-1 .4-1 1s.4 1 1 1" />
    <path d="M15 6.1c.5-.1 1-.1 1.5-.1h1c1.7 0 3 1.3 3 3" />
  </svg>
);

export const Loader2: React.FC<LucideProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-loader-2"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
