import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
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
     const result = await fetch(`/api${queryBuilder(query)}`, {
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
      <Navbar />

      <main id="search" className="bg-gradient-to-r from-purple-700 to-blue-400 text-white min-h-screen w-full p-8 md:p-16 md:pt-8 mt-10">
        <div className="mt-10">
          <Filter setQuery={handleSetQuery} query={query}  />
        </div>
        <div className="w-full flex items-center justify-center my-10">
          <div
            onClick={onSearch}
            className="button-20 rounded-lg border-2 border-gray-200 cursor-pointer text-gray-200 px-6 py-3 font-bold text-xl"
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
          <div className="text-gray-300 font-medium text-sm"></div> //Tidak ditemukan pekerjaan terkait.
        )}
        {/* <div className="card-container">
          <div className="card">
            <a className="card1" href="https://www.linkedin.com/jobs/view/junior-react-developer-at-team-remotely-inc-3918716707">
              <span className="badge badge-light">Programmer</span>  <p className="title font-semibold mt-2">Title</p>  
              <p className="small">Perusahaan : <span>Tokopedia</span>
              </p>
             
              <p className="small">
              Lokasi : <span>location</span>
              </p >
              <p className="small">
                  Tanggal Publikasi : <span>{new Date("2024").toLocaleDateString()}</span>
              </p>
              <p className="small">
              Sumber : <span>https://www.linkedin.com/jobs/view/junior-react-developer-at-team-remotely-inc-3918716707</span>
              </p>
              <a className="go-corner" href="{url}">
                <div className="go-arrow">
                  →
                </div>
              </a>
            </a>
          </div>
          </div> */}

      </main>
      <footer id="footer" className="w-full bg-gray-800 text-white p-8 md:p-6 pb-10 text-center">
        <p>Syifa Afra Kamila Mumtaz - Adjie Djaka Permana - Adillah Putri</p>
      </footer>
    </>
  );
}

