import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
// import React, { useState } from 'react';
// import Home from './index';
// import SearchJob from './search-job';
// import { QueryInterface, DefaultQuery } from '@/lib/model';

// const App: React.FC = () => {
//   const [query, setQuery] = useState<QueryInterface>(DefaultQuery);

//   const handleSetQuery = (newQuery: Partial<QueryInterface>) => {
//     setQuery((prevQuery) => ({ ...prevQuery, ...newQuery }));
//   };

//   return (
//     <>
//       {/* Assuming you have a router setup to switch between components */}
//       {/* Example */}
//       <Home query={query} setQuery={handleSetQuery} />
//       {/* OR */}
//       <SearchJob query={query} setQuery={handleSetQuery} />
//     </>
//   );
// };

// export default App;
