import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MusicList from "./MusicList";


const MusicSearch = ({ toggleSidebar,isSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(null);
  const audioRef = useRef(null);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        "https://deezerdevs-deezer.p.rapidapi.com/search",
        {
          params: { q: searchQuery },
          headers: {
            "X-RapidAPI-Key":
              "cee49f2ee0msh2ffbb11d8a4cf9ap1d640ajsn2198f772c171",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      setSearchResults(response.data.data || []);
      setSelectedTrackIndex(null);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  useEffect(() => {
    if (selectedTrackIndex !== null) {
      audioRef.current.play();
    }
  }, [selectedTrackIndex]);

  const playTrack = (index) => {
    setSelectedTrackIndex(index);
  };

  const handlePrevious = () => {
    if (selectedTrackIndex !== null && selectedTrackIndex > 0) {
      playTrack(selectedTrackIndex - 1);
    }
  };

  const handleNext = () => {
    if (
      selectedTrackIndex !== null &&
      selectedTrackIndex < searchResults.length - 1
    ) {
      playTrack(selectedTrackIndex + 1);
    }
  };

  return (
    <>
      <div class="sm:ml-64  bg-gray-900 ">
        <div class="p-4 border-2 border-blue-700">
          <div className="container px-4 pt-2 bg-gray-900 text-white">
            <div className="flex md:flex-row md:items-center gap-10">
              <div className="flex  md:justify-around ">
                <img src="logo.svg" alt="" className="mb-3 sm:hidden" />
              </div>
              <div className="flex items-center justify-center mx-auto">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-500 mb-2"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="search the song"
                  className="border-b-2 border-gray-600 p-2 mb-4 outline-none focus:border-blue-700 bg-transparent"
                />
              </div>
              <button
                onClick={toggleSidebar}
                type="button"
                class={`inline-flex items-center p-auto text-sm text-gray-500 menu sm:hidden focus:outline-none  dark:text-gray-400 ${isSidebarOpen? 'hidden':'block'} `}
              >
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <button className={`${isSidebarOpen? 'block':'hidden'} sm:hidden  text-gray-500 `} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              { searchResults.map((result, index) => (
                <li
                  key={result.id}
                  className={`bg-gray-800 p-4 rounded shadow-md m-auto ${
                    selectedTrackIndex === index ? "selected" : ""
                  }`}
                  onClick={() => playTrack(index)}
                >
                  <p className="text-lg font-semibold mb-2 text-center">
                    Title: {result.title}
                  </p>
                  <marquee behavior="" direction="">
                    <p className="text-gray-500 mb-2">
                      Artist: {result.artist.name}
                    </p>
                  </marquee>

                  <img
                    src={result.artist.picture_medium}
                    alt=""
                    className="mb-4"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {searchResults.length=== 0 &&<MusicList/>}
        {selectedTrackIndex !== null && (
          <div className="mt-8 fixed bottom-0  w-full bg-gray-800  text-center">
            <p className="text-xl font-bold mb-2">
              Now Playing: {searchResults[selectedTrackIndex].title}
            </p>
            <div className="flex items-center animated-container">
              <img
                src={searchResults[selectedTrackIndex].artist.picture_medium}
                alt=""
                className="rounded-full  w-12 h-12 ml-7 spin-animation"
              />
              <audio
                controls
                ref={audioRef}
                src={searchResults[selectedTrackIndex].preview}
                style={{ width: "50%" }}
                className="mx-auto "
              ></audio>
            </div>
            <div className="">
              <button
                onClick={handlePrevious}
                className=" text-white px-4 py-2 rounded  mr-2"
                disabled={selectedTrackIndex === 0}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={handleNext}
                className=" text-white px-4 py-2 rounded "
                disabled={selectedTrackIndex === searchResults.length - 1}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        )}
        
      </div>

    </>
  );
};

export default MusicSearch;
