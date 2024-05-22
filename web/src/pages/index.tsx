import React from 'react';
import { useRouter } from 'next/navigation';
import { QueryInterface } from "@/lib/model";
import Navbar from '@/components/navbar';

interface Category {
  name: string;
  link: string;
  image: string; 
}

const categories: Category[] = [
  { name: 'Programmer', link: '/search-job', image: '/images/Programmer.png' },
  { name: 'Data Science', link: '/search-job', image: '/images/DataScience.png' },
  { name: 'Network', link: '/search-job', image: '/images/Network.png' },
  { name: 'Cyber Security', link: '/search-job', image: '/images/CyberSecurity.png' },
];

interface Props {
  query: QueryInterface;
  setQuery: (newQuery: Partial<QueryInterface>) => void;
}

export default function Home({ query, setQuery }: Props) {
  const router = useRouter();
  const handleCategoryClick = (category: Category) => {
    setQuery({ ...query, profession: category.name });
    router.push(category.link);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-400 flex flex-col justify-center items-center">
      <Navbar />
      {/* Container for Content and Category Buttons */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center flex-grow">
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
      <footer id="footer" className="w-full bg-gray-800 text-white p-8 md:p-6 pb-10 text-center">
        <p>Syifa Afra Kamila Mumtaz - Adjie Djaka Permana - Adillah Putri</p>
      </footer>
    </div>
  );
}