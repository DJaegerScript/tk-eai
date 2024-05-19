import React from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  name: string;
  link: string;
  image: string; // Added image property
}

const categories: Category[] = [
  { name: 'Programmer', link: '/search-job', image: '/images/Programmer.png' },
  { name: 'Data Science', link: '/search-job', image: '/images/DataScience.png' },
  { name: 'Network', link: '/search-job', image: '/images/Network.png' },
  { name: 'Cyber Security', link: '/search-job', image: '/images/CyberSecurity.png' },
];

export default function Home({ setQuery, query }) {
  const router = useRouter();

  const handleCategoryClick = (category: Category) => {
    // Set the profession in the query
    setQuery({
      ...query,
      profession: category.name,
    });
    // Navigate to the search-job page
    router.push(category.link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-400 flex flex-col justify-center items-center">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-8 py-4 text-gray-900 bg-white md:px-16">
        <div className="flex items-center">
          <button type="button">
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

      {/* Container for Content and Category Buttons */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center">
      {/* Container 1: Content */}
        <div className="flex flex-col md:mr-10 md:ml-20 md:mt-7">
          <h1 className="left-aligned font-bold text-4xl leading-6 text-white mx-4">EAI Job Scrapper</h1>
          <p className="left-aligned text-lg leading-6 text-white mx-4 md:mt-7">
            EAI Job Scrapper adalah platform yang menyediakan informasi lowongan pekerjaan seputar programmer, data science, network, dan siber di Indonesia secara terpusat. Kami mengumpulkan data dari berbagai situs pencarian lowongan kerja populer seperti karir.com, jobstreet.co.id, kalibrr.com, dan linkedin.com/jobs.
          </p>
        </div>

        {/* Container 2: Category Buttons */}
        <div className="flex flex-wrap justify-center">
          {/* Baris Pertama */}
          <div className="flex justify-center mb-40">
            {categories.slice(0, 2).map((category) => (
              <button
                key={category.name}
                className="h-9 w-18 mr-4"
                onClick={() => handleCategoryClick(category)}
              >
                <img src={category.image} alt={category.name} className="h-50 w-50 md:h-50 md:w-50 hover:opacity-75" />
              </button>
            ))}
          </div>
          {/* Baris Kedua */}
          <div className="flex justify-center">
            {categories.slice(2, 4).map((category) => (
              <button
                key={category.name}
                className="h-9 w-18 mr-4"
                onClick={() => handleCategoryClick(category)}
              >
                <img src={category.image} alt={category.name} className="h-50 w-50 md:h-50 md:w-50 hover:opacity-75" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
