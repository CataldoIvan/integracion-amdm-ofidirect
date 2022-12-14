import React from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src="./public/logo.jpg" alt=""   height="81"/>
            <Link to="/">Home</Link>
            <Link to="/ImportarDesdeExcel">Importar desde Excel</Link>
            <Link to="/ResultadosDeEnvios">Detalle de resultados de envios</Link>
        </div>
    );
};

export default Navbar;