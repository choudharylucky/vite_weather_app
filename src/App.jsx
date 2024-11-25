import { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



function App() {


  const [cityname, setcityname] = useState('');
  const [allcity, setallcity] = useState([]);
  const [weatherData, setweatherData] = useState([]);


  let handleform = (e) => {
    let oldweatherData = [...weatherData,]
    e.preventDefault();
    if (!allcity.includes(cityname)) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)
        .then((ress) => {

          let{name,weather,sys,main}=ress.data;
          let obj={
            name,
            weather,
            sys,
            main
          } 
          oldweatherData.push(obj)
          setallcity([...allcity, cityname])
          setweatherData(oldweatherData)
        })
        .catch((error) => {
          toast.error("city not found ")
        })
    }
    else {
      toast.error("City Already Add in Data")
    }

  }

  useEffect(() => {
    console.log(weatherData)
  }, [weatherData])

  return (
    <>

      <div className='w-[100%] h-screen bg-[#9beaf4]'>
        <ToastContainer />
        <div className='max-w-[1320px] mx-auto'>
          <h1 className='text-[34px] font-bold py-7 '>
            Simple weather app
          </h1>

          <form onSubmit={handleform} className=' grid max-w-[700px] grid-cols-[70%_auto]'>
            <input value={cityname} onChange={(e) => setcityname(e.target.value)} type="text" placeholder='Enter the city name' className='ps-4' />
            <button className='bg-[blue] text-white py-3 text-[20px]'>Save</button>
          </form>


          <div id='ress' className='pt-3 grid grid-cols-4 gap-[20px]'>

           
           
             {weatherData.map((weatherItems, index) => {
  const tempInCelsius = (weatherItems.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
  return (
    <div className='bg-white p-[28px] shadow-lg mb-6' key={index}>
      <h4 className='text-[30px] font-bold'>
        {weatherItems.name} <mark>{weatherItems.sys.country}</mark>
      </h4>
      <h1 className='text-[40px] font-bold'>
        {tempInCelsius}°C
      </h1>
      {weatherItems.weather && weatherItems.weather[0]?.icon && (
        <img src={`https://openweathermap.org/img/w/${weatherItems.weather[0].icon}.png`} alt="weather icon" />
      )}
      <p className='text-[20px]'>
        {weatherItems.weather[0]?.description || 'Description not available'}
      </p>
    </div>
  )
})
}
              


          </div>

        </div>


      </div>
    </>
  )
}

export default App
