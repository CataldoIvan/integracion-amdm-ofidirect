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
         localStorage.clear()
         setList([])
        }}
      >
        Limpiar Notificaciones
      </button>
      <br />
      {list?.map((item) => {
        console.log(window.localStorage.key(19));
        return (
          <h4>
            Remito: {item} : Motivo: {localStorage.getItem(item)}
          </h4>
        );
      })}
    </>
  );
};

export default ResultadosDeEnvios;
