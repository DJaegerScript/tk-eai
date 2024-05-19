import React from 'react';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const router = useRouter();
  
  return (
    <nav className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-8 py-4 text-gray-900 bg-white md:px-16">
      <div className="flex items-center">
        <button type="button" onClick={() => router.push('/')}>
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7 2 2M3 12l4 4v3h3a2 2 0 0 0 2-2v-3z" />
          </svg>
        </button>
        <div className="hidden md:flex gap-x-4 ml-4">
          <a href="https://www.linkedin.com/jobs">
            <img src="/images/linkedin.png" alt="LinkedIn Jobs" className="h-9 w-18" />
          </a>
          <a href="https://www.karir.com/">
            <img src="/images/karir.png" alt="Karir.com" className="h-9 w-18" />
          </a>
          <a href="https://www.kalibrr.com/home/">
            <img src="/images/kalibrr.png" alt="Kalibrr" className="h-9 w-18" />
          </a>
          <a href="https://www.jobstreet.co.id/">
            <img src="/images/jobstreet.png" alt="Jobstreet" className="h-9 w-22" />
          </a>
        </div>
      </div>
      <button type="button" onClick={() => router.push('/search-job')}>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
