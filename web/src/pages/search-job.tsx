import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { DefaultQuery, JobPostingAttributes, QueryInterface } from "@/lib/model";
import { Filter } from "@/components/filter";
import { Card } from "@/components/card";
import { queryBuilder } from "@/lib/queryBuilder";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState<QueryInterface>(DefaultQuery);
  const [data, setData] = useState<JobPostingAttributes[]>([]);
  useEffect(() => {
    onSearch();
  }, []);
  useEffect(() => {
    console.log(query);
  }, [query]);
  const onSearch = async () => {
    try {
      const result = await fetch("https://tk-eai-production.up.railway.app/" + queryBuilder(query), {
        method: "GET",
      });
      const resultData = await result.json();
      console.log(resultData);
      setData(resultData);
    } catch (error) {
      console.log("EROR");
      console.error(error);
    }
  };
  return (
    <>
      <Head>
        <title>EAI Job Scrapper</title>
        <meta name="description" content="Tugas Kelompok Mata Kuliah EAI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.ico" />
      </Head>
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


      <main id="search" className="bg-gray-900 text-white min-h-screen w-full p-8 md:p-16 md:pt-8 mt-10">
        <Filter setQuery={setQuery} query={query} />
        <div className="w-full flex items-center justify-center my-10">
          <div
            onClick={onSearch}
            className="rounded-lg border-2 border-gray-200 cursor-pointer text-gray-200 px-6 py-3 font-bold text-xl"
          >
            Cari Pekerjaan
          </div>
        </div>
        <div className="text-gray-300 font-medium  text-sm mb-2">{`Ditemukan ${data.length} Pekerjaan Terkait`}</div>
        {data.length > 0 && (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.map((x, idx) => (
                <Card {...x} key={x.id} />
              ))}
            </div>
          </section>
        )}
      </main>
      <footer id="footer" className="w-full bg-gray-800 text-white p-8 md:p-16 pb-10">
        <ul className="list-disc">
          <li>Syifa Afra Kamila Mumtaz - Adjie Djaka Permana - Adillah Putri</li>
        </ul>
      </footer>
    </>
  );
}
