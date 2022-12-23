import { useState } from "react";
import { useEffect } from "react";
import './ResultadosDeEnvios.css'
import toast, { Toaster } from 'react-hot-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ResultadosDeEnvios = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState([]);
  const [buttonSearch, setButtonSearch] = useState(true);
  let nueva = null;
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    nueva = [];
    for (let i = 0; i < localStorage.length; i++) {
      //console.log(localStorage.key(i));
      nueva.push(window.localStorage.key(i));
    }

    setList(nueva.map((i) => parseInt(i)).sort((a, b) => b - a));
    console.log(list);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.selectedOptions[0].value);
    setFilter(e.target.selectedOptions[0].value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setButtonSearch(!buttonSearch)
    if(buttonSearch && search.length>0){
      let itemSearch = list.filter((item) => item == search);
      console.log("es"+itemSearch);
      itemSearch.length>0?
      setList(itemSearch)
      :
    
      toast.error(`No se encontro nada`,{
        duration: 4000,
        position: 'top-right'
        ,style: {
          padding: '10px 60px',
        }}
        
        );
      ;
    }else{
      loadData()
    }
  };
  let styleh4={
    'text-aling':'center'
  }
  return (
    <>
      {list.length != 0 ? (
        <div>
          <button
            className="btn btn-danger cleanNot"
            onClick={(e) => {
              localStorage.clear();
              setList([]);
            }}
          >
            Eliminar resultados
          </button>

          <select className="form-control" onChange={handleSelect}>
            <option value={"todos"}>Todos los resultados</option>

            <option value={"procesados"}>✅ Precesados</option>
            <option value={"errores"}>❌ Errores</option>
          </select>

          <input
            type="text"
            className="form-control inputSearch"
            placeholder="Buscar un remito"
            aria-label="Buscar un remito"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              search.length == 0 ? loadData() : null;
              setButtonSearch(true)
            }}
          />
          <button className="btn btn-info " onClick={handleSearch}>{buttonSearch?"Buscar":"Traer todos"}</button>
         <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="envios"
                    filename="Envios a AMDM"
                    sheet="Envios"
                    buttonText="📥"
                   
                    />
          
                     
        </div>
      ) : (
        <h4 style={{textAlign:"center"}}>No hay resultados de envio aun</h4>
      )}
      <table className="table table-striped" id="envios">
        <thead>
          <tr>
            <th scope="col">Estado</th>
            <th scope="col">Fecha Envio</th>
            <th scope="col">Remito</th>

            <th scope="col">Mensaje</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {list?.map((item) => {
            if (filter == "todos") {
              {console.log(localStorage.getItem(item)?.slice(0,-18));}
              return (
                <tr>
                  <td scope="col">
                    {localStorage.getItem(item)?.slice(0,-18) == "Procesado" ? "✅" : "❌"}
                  </td>
                  <td scope="col">{localStorage.getItem(item)?localStorage.getItem(item).slice(-10):"Error"}</td>
                  <td scope="col">{item?item:"Error"}</td>
                  <td scope="col">{localStorage.getItem(item)?localStorage.getItem(item).slice(0,-17):"Error Mirar consola"}</td>
                </tr>
              );
            } else if (
              filter == "procesados" &&
              localStorage.getItem(item).slice(0,-18) == "Procesado"
            ) {
              return (
                <tr>
                  <td scope="col">
                    {localStorage.getItem(item).slice(0,-18) == "Procesado" ? "✅" : "❌"}
                  </td>
                  <td scope="col">{localStorage.getItem(item).slice(-10)}</td>
                  <td scope="col">{item}</td>
                  <td scope="col">{localStorage.getItem(item).slice(0,-18)}</td>
                </tr>
              );
            } else if (
              filter == "errores" &&
              localStorage.getItem(item).slice(0,-18) != "Procesado"
            ) {
              return (
                <tr>
                  <td scope="col">
                    {localStorage.getItem(item).slice(0,-18) == "Procesado" ? "✅" : "❌"}
                  </td>
                  <td scope="col">{localStorage.getItem(item).slice(-10)}</td>
                  <td scope="col">{item}</td>
                  <td scope="col">{localStorage.getItem(item).slice(0,-18)}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
          <Toaster />
    </>
  );
};

export default ResultadosDeEnvios;
