import { useState } from "react";
import { useEffect } from "react";

const ResultadosDeEnvios = () => {
  const [list, setList] = useState([]);
  const [filter,setFilter]=useState("todos")
  let nueva = null;
  useEffect(() => {
    nueva = [];
    for (let i = 0; i < localStorage.length; i++) {
      //console.log(localStorage.key(i));
      nueva.push(window.localStorage.key(i));
    }

    setList(nueva.map((i) => parseInt(i)).sort((a, b) => b - a));
    console.log(list);
  }, []);

  const handleSelect=(e)=>{
    e.preventDefault()
    console.log(e.target.selectedOptions[0].value);
    setFilter(e.target.selectedOptions[0].value)
  }
  return (
    <>
    {list.length!=0?<div>

      <button
        className="btn btn-danger cleanNot"
        onClick={(e) => {
          localStorage.clear();
          setList([]);
        }}
      >
        Limpiar resultados
      </button>
      
      <select className="form-control" onChange={handleSelect}>
        <option  value={'todos'} >Todos los resultados</option>

        <option value={'procesados'} >✅ Precesados</option>
        <option value={'errores'}>❌ Errores</option>
      </select>
    </div>:
    <h4 >

      No hay resultados de envio aun
    </h4>
    }
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Estado</th>
            <th scope="col">Remito</th>

            <th scope="col">Mensaje</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {list?.map((item) => {
            if(filter=='todos'){
              return (
                  <tr>
                    <td scope="col">
                      {localStorage.getItem(item) == "Procesado" ? "✅" : "❌"}
                    </td>
                    <td scope="col">{item}</td>
                    <td scope="col">{localStorage.getItem(item)}</td>
                  </tr>
                );
            }else if(filter=='procesados' && localStorage.getItem(item) == "Procesado"){
              return (
                <tr>
                  <td scope="col">
                    {localStorage.getItem(item) == "Procesado" ? "✅" : "❌"}
                  </td>
                  <td scope="col">{item}</td>
                  <td scope="col">{localStorage.getItem(item)}</td>
                </tr>
              );
            }else if(filter=='errores' && localStorage.getItem(item) != "Procesado"){
              return (
                <tr>
                  <td scope="col">
                    {localStorage.getItem(item) == "Procesado" ? "✅" : "❌"}
                  </td>
                  <td scope="col">{item}</td>
                  <td scope="col">{localStorage.getItem(item)}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default ResultadosDeEnvios;
