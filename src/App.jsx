import React, { useEffect } from 'react';
import { useState } from 'react';
import SearchSection from './components/SearchSection';
import CurrentWeather from './components/CurrentWeather';
import Hourly from './components/Hourly';
import { weatherCodes } from "./constants";
import { useRef } from 'react';
import NoResultsDiv from './components/NoResultsDiv';

const App = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [currentWeather, setCurrentWeather] = useState({});
const [hourlyForecasts, setHourlyForecasts] = useState([]);
const [noResults, setNoResults] = useState(false);
const inputRef = useRef(null);


  const filterhour = (hourly) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const nexttwenty = currentHour + 24 * 60 * 60 * 1000;

    //filter hourly data to include next 24 hours
const next24hours = hourly.filter(({time}) => {
  const forecastTime = new Date(time).getTime();
  return forecastTime >=currentHour && forecastTime <= nexttwenty;
});

setHourlyForecasts(next24hours);
  };


  //getting them deets from the weather
const getWeatherDeets = async (API_URL) => {
    setNoResults(false);
    window.innerWidth >= 768 && inputRef.current.focus();
try {
const response = await fetch(API_URL);
if(!response.ok) throw new Error();
const data = await response.json();
const temperature = data.current.temp_c;
const description = data.current.condition.text;
const weatherIcon = Object.keys(weatherCodes).find((icon) => weatherCodes[icon].includes(data.current.condition.code));

setCurrentWeather({ temperature, description, weatherIcon });
//this combines the data into a single array
const combinedhour = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
inputRef.current.value = data.location.name;

filterhour(combinedhour);


} catch {
 setNoResults(true);
}
  };
  //default city to show
  useEffect(() => {
    const defaultCity = "Port Au Prince"
const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDeets(API_URL);
  }, []);


  return (
    <div className='container'>
      <SearchSection getWeatherDeets={getWeatherDeets} inputRef={inputRef}/> {/*passing props*/}
      {/* condition renders based on state*/}
      {noResults ? (
        <NoResultsDiv />
      ) : (
<div className="weather-section">
       <CurrentWeather currentWeather={currentWeather} />
<div className="hourly-forecast">
  <ul className="weather-list">
    
   {hourlyForecasts.map(hourlyWeather => (
<Hourly key={hourlyWeather.time_epoch}  hourlyWeather={hourlyWeather} />
   ))} 
   
    
    
  </ul>
</div>
      </div>
    
      )
    }

    </div>  
  );

};
export default App
