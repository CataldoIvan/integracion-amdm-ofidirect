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
        <h1>Este es el home, se veran los estado <br/>de los pedidos enviados</h1>
       
    </>
    );
};

export default Home;