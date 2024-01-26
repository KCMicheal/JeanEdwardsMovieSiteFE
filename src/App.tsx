import { useState, useEffect, useRef } from 'react'

import './App.css'

function App() {
   const [searchValue, setSearchValue] = useState("");
   const [jsonResult, setJsonResult] = useState<any[]>([]);
   const [jsonSearchResult, setJsonSearchResult] = useState<any[]>([]);

   async function handleMovieSearch(event: React.FormEvent) {
     event.preventDefault();

     const response = await fetch(
       `https://localhost:7149/api/JeanEdwardsMovieSite/${searchValue}`
     );
     const data = await response.json();

     setJsonResult([data]);
      console.log(data);
   }

   async function handleLatestSearchResults() {
     const response = await fetch(
       "https://localhost:7149/api/JeanEdwardsMovieSite/latest"
     );
     const data = await response.json();

     setJsonSearchResult(data);
   }

   useEffect(() => {
     const intervalId = setInterval(handleLatestSearchResults, 5000); // Fetch every 5 seconds
     return () => clearInterval(intervalId);
   }, []);


  return (
    <>
      <div className="justify-center h-full">
        <h1 className="font-semibold">JeanEdwards Movie Site 🍿🎥</h1>
        <div className="flex-row">
          <form onSubmit={handleMovieSearch}>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-2 border border-black shadow-md"
              placeholder="Search Movie/Series Name"
            />
            <button type="submit" className="m-4 shadow-md">
              Search
            </button>
          </form>
        </div>
        <div className="flex rounded-md ">
          <div className="m-4 p-4 justify-start w-1/2 rounded-lg border border-gray-300 shadow-xl">
            {jsonSearchResult &&
              jsonSearchResult.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex place-content-between border-red-200"
                >
                  <p>{item.query}</p>
                  <p>{new Date(item.timeStamp).toLocaleString()}</p>
                </div>
              ))}
          </div>
          <div className="m-4 p-4 w-1/2 flex rounded-lg border border-gray-300 shadow-xl">
            {"Loading..." &&
              jsonResult.map((item: any, index: number) => (
                <div
                  key={index}
                  className="border border-gray-400 rounded-lg shadow-sm"
                >
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="rounded-md"
                  />
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p>{item.year}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="flex"></div>
      </div>
    </>
  );
}

export default App
