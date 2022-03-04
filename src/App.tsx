import React, { useEffect, useState } from 'react';
import './App.css';
import Auth from "./components/Auth/Auth"
import Home from './pages/Home/Home';



function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}

function App(){
  const [isLogged, setIsLogged]= useState<boolean>(false)
  useEffect(()=>{
    const token = getCookie("token")
    token && setIsLogged(true)
  },[document.cookie])

  return (<div>
    {isLogged ? <Home /> : <div><Auth setIsLogged ={setIsLogged} /> </div>}
  </div>)
}



export default App;