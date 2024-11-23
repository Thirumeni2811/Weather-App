import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Cloud from '../assets/Cloud.png'
import Drizzle from '../assets/Drizzle.png'
import Rain from '../assets/Rain.png'
import Snow from '../assets/Snow.png'
import Sun from '../assets/sun.png'
import Wind from '../assets/Wind.png'
import Humidity from '../assets/Humidity.png'
import Mist from '../assets/Mist.png'
import { API_KEY } from './api';
import axios from 'axios';

const Home = () => {
    const [formData, setFormData] = useState("Tirupur")

    const [image, setImage] = useState("")
    const [weather, setWeather] = useState("")
    const [temperature, setTemperature] = useState(0)
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("IN")
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)

    const [cityNotFound, setCityNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData(e.target.value);
    }

    const Search = async (e) => {
        if (e && e.preventDefault) e.preventDefault(); 

        setLoading(true);

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${formData}&appid=${API_KEY}&units=metric`

        try {
            const response = await axios.get(url);
            const data = response.data;
        
            if(data.cod === "404"){
                console.error("City not found");
                setCityNotFound(true)
                setLoading(false)
                return;
            }

            // Update the state value from API
            setTemperature(data.main.temp)
            setWeather(data.weather[0].main)
            setCity(data.name)
            setCountry(data.sys.country)
            setLatitude(data.coord.lat)
            setLongitude(data.coord.lon)
            setHumidity(data.main.humidity)
            setWind(data.wind.speed)
            setCityNotFound(false)

             // Set the weather image dynamically
             const weather = data.weather[0].main.toLowerCase();
             switch (weather) {
                 case "clouds":
                     setImage(Cloud);
                     break;
                 case "mist":
                     setImage(Mist);
                     break;
                 case "drizzle":
                     setImage(Drizzle);
                     break;
                 case "rain":
                     setImage(Rain);
                     break;
                 case "snow":
                     setImage(Snow);
                     break;
                 case "clear":
                     setImage(Sun);
                     break;
                 default:
                     setImage(Wind);
                     break;
             }
 
             setCityNotFound(false);

        } catch (error) {
            console.error("An error occurred:", error.message);
            setCityNotFound(true); 
        } finally {
            setLoading(false); 
        }
        
    }

    useEffect(() => {
        Search()
    },[])

    const handleKeyDown = async (e) => {
        if(e.key === "Enter"){
            Search();
        }
    }

    return (
        <>
            <section className='bg-secondary h-svh flex justify-center items-center'>
                <div className='xs:w-full xs:h-screen sm:w-3/5 md:w-6/12 xl:w-1/4 bg-primarybg shadow-2xl p-4 py-8 xs:py-4 rounded-2xl'>

                    {/* Search Bar */}
                    <form>
                        <div className='rounded-2xl flex h-12'>
                            <input
                                name='city'
                                id='city'
                                type="text"
                                placeholder='Search Your City'
                                onChange={handleChange}
                                value={formData}
                                onKeyDown={handleKeyDown}
                                className='bg-secondary4 w-full outline-none rounded-l-3xl h-full text-center text-primary font-bold text-lg flex-grow'
                            />
                            <button 
                                className='bg-primary rounded-r-3xl px-4'
                                onClick={Search}
                            >
                                <SearchIcon className='text-white' />
                            </button>
                        </div>
                    </form>

                    <div className='flex flex-col justify-center items-center gap-3'>
                        {
                            cityNotFound && (
                                <div className='text-red-400 font-bold m-2'>
                                    City Not Found
                                </div>
                            )
                        }
                        {/* Weather Image */}
                        <div className='m-2'>
                            <img src={image} alt='cloud' className='w-36 h-36' />
                            <p className='text-center text-quilborder font-semibold'>{weather}</p>
                        </div>

                        {/* Temperature */}
                        <div className='text-border font-semibold text-3xl'>
                            {temperature}°C
                        </div>

                        {/* City */}
                        <div className='text-primary text-4xl font-extrabold uppercase'>
                            {city}
                        </div>

                        {/* Country */}
                        <div className='text-quilborder font-semibold text-2xl'>
                            {country}
                        </div>

                        {/* Latitude and Longitude */}
                        <div className='flex gap-8 text-price font-semibold text-xl'>
                            <div>
                                <p>Latitude</p>
                                <p className='text-center'>{latitude}</p>
                            </div>
                            <div>
                                <p>Longitude</p>
                                <p className='text-center'>{longitude}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between my-6 mx-4 text-price text-xl font-bold'>
                        <div className='flex flex-col justify-center items-center'>
                            <img src={Humidity} alt='Humidity' className='w-12 h-12'/>
                            <p>{humidity}%</p>
                            <p>Humidity</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <img src={Wind} alt='Wind' className='w-12 h-12'/>
                            <p>{wind} Km/h</p>
                            <p>Wind Speed</p>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Home;
