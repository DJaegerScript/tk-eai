import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { DefaultQuery, JobPostingAttributes, QueryInterface } from "@/lib/model";
import { Filter } from "@/components/filter";
import { Card } from "@/components/card";
import Navbar from '@/components/navbar';
import { queryBuilder } from "@/lib/queryBuilder";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [query, setQuery] = useState<QueryInterface>(DefaultQuery);
  const [data, setData] = useState<JobPostingAttributes[]>([]);
  const handleSetQuery = (newQuery: Partial<QueryInterface>) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };
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
        // headers: {
        //   "Access-Control-Allow-Origin": "*", // Consider restricting this in production
        //   "Content-Type": "application/json"
        // }
        mode: 'no-cors'  // Not recommended for production
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
      <Navbar />

      <main id="search" className="bg-gradient-to-r from-purple-700 to-blue-400 text-white min-h-screen w-full p-8 md:p-16 md:pt-8 mt-10">
        <div className="mt-10">
          <Filter setQuery={handleSetQuery} query={query}  />
        </div>
        <div className="w-full flex items-center justify-center my-10">
          <div
            onClick={onSearch}
            className="rounded-lg border-2 border-gray-200 cursor-pointer text-gray-200 px-6 py-3 font-bold text-xl"
          >
            Cari Pekerjaan
          </div>
        </div>
        {data.length > 0 && (
          <div className="text-gray-300 font-medium text-sm mb-2">{`Ditemukan ${data.length} Pekerjaan Terkait`}</div>
        )}
        {data.length > 0 ? (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.map((x, idx) => (
                <Card {...x} key={x.id} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-gray-300 font-medium text-sm">Tidak ditemukan pekerjaan terkait.</div>
        )}

      </main>
      <footer id="footer" className="w-full bg-gray-800 text-white p-8 md:p-16 pb-10">
        <p>Syifa Afra Kamila Mumtaz - Adjie Djaka Permana - Adillah Putri</p>
      </footer>
    </>
  );
}

