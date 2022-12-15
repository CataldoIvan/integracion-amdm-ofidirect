import { useState } from "react";
import { useEffect } from "react";

const ResultadosDeEnvios = () => {
  const [list, setList] = useState([]);
  let nueva = null;
  useEffect(() => {
    nueva = [];
    for (let i = 0; i < localStorage.length; i++) {
      //console.log(localStorage.key(i));
      nueva.push(window.localStorage.key(i));
    }
    setList(nueva);
    console.log(nueva.length);
  }, []);

  useEffect(() => {
    console.log("prueba");
    setList(nueva);
  }, []);
  return (
    <>
      <button
        className="btn btn-danger cleanNot"
        onClick={(e) => {
          localStorage.clear();
          setList([]);
        }}
      >
        Limpiar resultados
      </button>
      <br />

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
            return (
              <tr>
                <td scope="col">{localStorage.getItem(item)=="Procesado"?"✅":"❌"}</td>
                <td scope="col">{item}</td>
                <td scope="col">{localStorage.getItem(item)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ResultadosDeEnvios;
