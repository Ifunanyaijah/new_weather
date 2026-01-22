import React from 'react'


const SearchSection = ({getWeatherDeets, inputRef }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  //receiving props and calling function
  //FORM SUBMISSION
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input");
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
    getWeatherDeets(API_URL);//gets weather deets from the api
  };
//for finding location using long and lat
const handleLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const {latitude, longitude} = position.coords;
      const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude}, &q=${longitude}&days=2`;
      getWeatherDeets(API_URL); //weather deets from user location
     window.innerWidth >= 768 && inputRef.current.focus();
    },
    () => {
      alert("Location access denied, please enable permission to use this feature");
    }
  )
}


  return (
   <div className="search-section">
        <form action="#" className="search-form" onSubmit={handleSearch}>
          {/*insert search icon here*/}
          <input type="search" placeholder='Enter a city name' ref={inputRef} className="search-input" required/>
        </form>
        <button className="location-btn" onClick={handleLocation}>seek
          {/*insert my location icon*/}
        </button>
      </div>
  );
};

export default SearchSection

