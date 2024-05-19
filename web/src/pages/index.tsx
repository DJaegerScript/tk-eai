import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  link: string; // Added link property
}

const categories: Category[] = [
  { name: 'All', link: '/' },
  { name: 'Programmer', link: '/search-job?filter=Programmer' }, // Added link for Programmer
  { name: 'Data Scientist', link: '/search-job?filter=Data Scientist' },
  { name: 'Network', link: '/search-job?filter=Network' },
  { name: 'Cyber Security', link: '/search-job?filter=Cyber Security' },
];

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category: Category) => {
    router.push(category.link); // Use router.push to redirect with filter
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-8 py-4 text-gray-900 bg-white border-b border-gray-400 md:px-16">
        <div className="flex items-center">
          <button type="button">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7 2 2M3 12l4 4v3h3a2 2 0 0 0 2-2v-3z" />
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
        <button type="button">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
          </svg>
        </button>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center md:mr-8">
          <a href="/" className="flex flex-col items-center space-x-2 mb-4">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">EAI Job Scrapper</span>
          </a>
          <p className="text-lg leading-6">
            EAI Job Scrapper adalah platform yang menyediakan informasi lowongan pekerjaan seputar programmer, data science, network, dan siber di Indonesia secara terpusat. Kami mengumpulkan data dari berbagai situs pencarian lowongan kerja populer seperti karir.com, jobstreet.co.id, kalibrr.com, dan linkedin.com/jobs.
          </p>
        </div>

        {/* Category Buttons */}
        <nav className="flex flex-wrap justify-center mt-4 md:mt-0">
          {categories.map((category) => (
            <button
              key={category.name}
              className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-2 md:mx-0 mb-2 md:mb-0"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
