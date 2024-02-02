
import { useEffect, useState } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

function App() {
  const [cityName,setCityName]=useState("Rome");
  const [inputText,setInputText]=useState("");
  const [data,setData]=useState({});
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(true);

   

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2b9867724d6a0715549ea784ba81a708`)
  
  .then((res)=>{
    if(res.status === 200){
      error && setError(false);
      return res.json()
    }else{
      throw new Error("Somthing went wrong")
    }
  })
  .then((data)=>{
    setData(data)
  })
  .catch(()=>setError(true))
  .finally(()=>setLoading(false))
  },[cityName,error]);

  const handleSearch=(e)=>{
    if (e.key === "Enter"){
      setCityName(e.target.value)
      setInputText("")
    }
  }



  return (
    <div className="App ">
    {
      !loading?(
        <>
         <div>
     <h1 className='head'>WEATHER APP</h1>
     </div>
      <div className="whole">
      
      <TextField value={inputText} onChange={(e)=>setInputText(e.target.value)} error={error} onKeyDown={handleSearch} style={{width:'40%',marginTop:'7%'}} id="filled-basic" label="Search Location" variant="filled" />
      </div>
      <div>
      <h1 className='city'>{data.name}</h1>
      </div>
      
      <div className="condition">
        <img src={`https://weather-app-3293.netlify.app/Assets/${data.weather[0].icon}.png`} alt="codition" />
        
        <h3>{data.weather[0].main}</h3>
      </div>
      <div className='degree'>
      <p>{data.main.temp.toFixed()}°C</p>
      </div>
      <div className="container">
      <div className="row1">
        <p>Humidity</p>
        <h2>{data.main.humidity.toFixed()}%</h2>
      </div>
      <div className="row1">
        <p>Wind</p>
        <h2>{data.wind.speed.toFixed()} km/h</h2>
      </div>
      <div className="row1">
        <p>Feels Like</p>
        <h2>{data.main.feels_like.toFixed()} °C</h2>
      </div>
      </div>
        </>
      ):(
        <CircularProgress />
      )
    
      
    }
      

     
    </div>
  );
}

export default App;
