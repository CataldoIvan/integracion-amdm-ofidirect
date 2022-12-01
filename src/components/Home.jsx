import React from 'react';
import { useEffect } from 'react';
import  {useState}from 'react';
import './home.css'
const Home = () => {
    const [fecha,setFecha]=useState('')

    useEffect(()=>{
        console.log(fecha);
    },[fecha])

    const hanbleclick=(e)=>{
        e.preventDefault()
       let v= String(new Date(fecha ))

              console.log(v);
          
    }
    return (<>
        <h1>Este es el home, se haran las consultas sobre el estado de los pedidos</h1>
        <input type="text" onChange={(e)=>setFecha(e.target.value)}/>
        <input type="button" value="encviar" onClick={hanbleclick} />
    </>
    );
};

export default Home;