import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="footer">
    <p>© 2026 MR. MAMURU</p>
    <p>Director · Creator · Founder</p>
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Back to top <ArrowUp size={14} />
    </button>
  </footer>
);
