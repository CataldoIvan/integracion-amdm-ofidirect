import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const [active,setActive]=useState(null)

   
    return (
        <div className='navbar'>
            <img src="https://i.postimg.cc/nVBKSJNH/logo.jpg" alt=""   height="81"/>
            <Link 
            className={`${active === "home" ? 'navbarItem active' : 'navbarItem'}`} onClick={(e) => {
                console.log(e.target)
                setActive("home")}}
            to="/integracion-amdm-ofidirect/">Home</Link>
            <Link
            className={`${active === "importar" ? 'navbarItem active' : 'navbarItem'}`} onClick={(e) =>{
                console.log(e.target) 
                setActive("importar")}}
              to="/integracion-amdm-ofidirect/ImportarDesdeExcel">Importar desde Excel</Link>
            <Link 
            className={`${active === "result" ? 'navbarItem active' : 'navbarItem'}`} onClick={(e) =>{
                console.log(e.target)
                 setActive("result")}}
             to="/integracion-amdm-ofidirect/ResultadosDeEnvios">Detalle de resultados de envios</Link>
            <hr />
        </div>
    );
};

export default Navbar;