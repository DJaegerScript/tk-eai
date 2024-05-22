import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { useEffect, useState } from 'react';
import {
  DefaultQuery,
  JobPostingAttributes,
  QueryInterface,
  ResponseInterface,
} from '@/lib/model';
import { Filter } from '@/components/filter';
import { Card } from '@/components/card';
import Navbar from '@/components/navbar';
import { queryBuilder } from '@/lib/queryBuilder';

export default function Home() {
  const [query, setQuery] = useState<QueryInterface>(DefaultQuery);
  const [response, setResponse] = useState<ResponseInterface>();
  const handleSetQuery = (newQuery: Partial<QueryInterface>) => {
    setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
  };
  useEffect(() => {
    onSearch();
  }, [query.page]);

  const onSearch = async () => {
    try {
      const result = await fetch(
        `https://tk-eai-production.up.railway.app${queryBuilder(query)}`,
        {
          method: 'GET',
        }
      );
      const resultData = await result.json();
      setResponse(resultData);
    } catch (error) {
      console.log('ERROR');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <main
        id='search'
        className='bg-gradient-to-r from-purple-700 to-blue-400 text-white min-h-screen w-full p-8 md:p-16 md:pt-8 mt-10'
      >
        <div className='mt-10'>
          <Filter setQuery={handleSetQuery} query={query} />
        </div>
        <div className='w-full flex items-center justify-center my-10'>
          <div
            onClick={onSearch}
            className='button-20 rounded-lg border-2 border-gray-200 cursor-pointer text-gray-200 px-6 py-3 font-bold text-xl'
          >
            Cari Pekerjaan
          </div>
        </div>
        <span className='text-gray-300 font-medium text-sm mb-2'>{`Ditemukan ${response ? response.meta.total : 0} Pekerjaan Terkait`}</span>

        <section className='flex flex-col gap-2'>
          {response && response.data.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {response.data.map((x, idx) => (
                <Card {...x} key={x.id} />
              ))}
            </div>
          ) : (
            <div className='text-gray-300 font-medium text-sm justify-center'>
              <span>Pekerjaan tidak ditemukan</span>
            </div> //Tidak ditemukan pekerjaan terkait.
          )}
          <div className='w-full flex justify-end'>
            <div className='flex gap-2'>
              {response && (
                <>
                  <button
                    onClick={() =>
                      setQuery({
                        ...query,
                        page: query.page !== 1 ? query.page - 1 : query.page,
                      })
                    }
                    disabled={!response.meta.hasPrev}
                    className='py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-800 disabled:bg-slate-400'
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      setQuery({
                        ...query,
                        page:
                          query.page !== response.meta.totalPages
                            ? query.page + 1
                            : query.page,
                      })
                    }
                    disabled={!response.meta.hasNext}
                    className='py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-800 disabled:bg-slate-400'
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer
        id='footer'
        className='w-full bg-gray-800 text-white p-8 md:p-6 pb-10 text-center'
      >
        <p>Syifa Afra Kamila Mumtaz - Adjie Djaka Permana - Adillah Putri</p>
      </footer>
    </>
  );
}
