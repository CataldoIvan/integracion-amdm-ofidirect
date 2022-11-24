import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/ImportarDesdeExcel">Importar desde Excel</Link>
        </div>
    );
};

export default Navbar;