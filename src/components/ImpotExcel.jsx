import React, { useState } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
import * as XLSX from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import "./ImpotExcel.css";
import Loader from "./Loader";

const ImpotExcel = () => {
  const [namesOfSheets, setNamesOfSheets] = useState([]);
  const [sheetSelected, setSheetSelected] = useState();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(null);
  const [header, setHeader] = useState(null);
  const [excel, setExcel] = useState();
  const [errores, setErrores] = useState([]);
  const [confir, setConfir] = useState({});

  useEffect(() => {
    console.log(rows);
    console.log("errores", errores);
    if (rows) {
      let resul = Object.keys(rows[0]);
      setHeader(resul);
      // console.log(rows)
    }
  }, [rows]);

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    console.log(JSON.stringify(rows));
    try {
      let userPass = btoa("191918:fw3vLr&lLVER");
      /*  console.warn(
        "🚀 ~ file: ImpotExcel.jsx ~ line 26 ~ handleSend ~ userPass",
        `Basic ${userPass}`
      ); */

      let customHeader = new Headers();
      customHeader.append("authorization", `Basic ${userPass}`);
      customHeader.append("Access-Control-Allow-Origin", "*");
      customHeader.append(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS"
      );
      customHeader.append("Access-Control-Allow-Headers", "X-Custom-Header");
      customHeader.append("Access-Control-Max-Age", "86400");
      customHeader.append("Access-Control-Credentials", "true");
      customHeader.append("Pragma", "no-cache");
      customHeader.append("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");
      customHeader.append(
        "Cache-Control",
        "no-store, no-cache, must-revalidate"
      );
      customHeader.append("Content-Type", "application/json");
      customHeader.append("Transfer-Encoding", "chunked");
      customHeader.append("Date", "Tue, 13 Dec 2022 20:08:59 GMT");

      for (var i = 0; i <= rows.length - 1; i++) {
        var tick = function (i) {
          return function () {
            axios
              .post(
                "http://app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs",
                JSON.stringify([rows[i]]),
                { headers: customHeader }
              )
              .then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                console.log(res.data[0]);
                toast.success(
                  `creado correctamente! Remito: ${res.data[0].idTransaccion}`,
                  {
                    duration: 4000,
                    position: "top-right",
                    style: {
                      padding: "10px 60px",
                    },
                  }
                );
                localStorage.setItem(
                  res.data[0].idTransaccion,
                  res.data[0].mensaje+" fecha: "+new Date().toLocaleDateString()
                );
              })

              .catch((err) => {
                console.log("AXIOS ERROR: ", err);
                console.log(
                  "el Remito:",
                  err.response.data[0].idTransaccion,
                  " Tiene el error:",
                  err.response.data[0].mensaje
                );

                localStorage.setItem(
                  err.response.data[0].idTransaccion,
                  err.response.data[0].mensaje+" fecha: "+new Date().toLocaleDateString()
                );
                toast.error(
                  `Hubo un error 😔,Remmito:${err.response.data[0].idTransaccion}`,
                  {
                    duration: 4000,
                    position: "top-right",
                    style: {
                      padding: "10px 60px",
                    },
                  }
                );
              });
          };
        };
        setTimeout(tick(i), 2000 * i);
      }
    } catch (error) {
      console.log("acaaaa");
      console.dir("ksnd" + error);
    }
  };

  const handleSelect = (e) => {
    setSheetSelected(e.target.value);

    const data = XLSX.utils.sheet_to_json(excel.Sheets[e.target.value], {
      defval: null,
      raw: true,
    });

    let resul = Object.keys(data[0]);
    setHeader(resul);
    let jsonData = [];
    for (let i = 0; i < data.length; i++) {
      console.log(resul);
      const dato = data[i];

      if (dato.fecha) {
        jsonData.push({
          ...dato,

          idTransaccion: String(dato.idTransaccion || "-"),
          idCliente: "idOfidirect",
          remito: String(dato.remito || "-"),

          fecha: String(
            new Date((dato.fecha - (25567 + 2)) * 86400 * 1000)
              .toISOString()
              .slice(0, -5)
              .split("T")
              .join(" ")
          ),
          nombreDestinatario: String(dato.nombreDestinatario || "-"),
          correoDestinatario: String(dato.correoDestinatario || "-"),
          calleDestino: String(dato.calleDestino),
          nroCalleDestino: String(dato.nroCalleDestino) || "-",
          codigoPostalDestino: String(dato.codigoPostalDestino || "-"),
          localidadDestino: String(dato.localidadDestino || "-"),
          provinciaDestino: String(dato.provinciaDestino || "-"),
          direccionAlternativa: String(dato.direccionAlternativa || "-"),
          observaciones: String(dato.observaciones || "-"),
          observacionesAdicionalesDestino: String(
            dato.observacionesAdicionalesDestino || "-"
          ),
          telefono1: String(dato.telefono1 || "-"),
          telefono2: String(dato.telefono2 || "-"),
          telefono3: String(dato.telefono3 || "-"),
          cantUnidades: String(dato.cantUnidades || "-"),
          cantM3: String(dato.cantM3 || "-"),
          cantKg: String(dato.cantKg || "-"),
          cantValorDeclarado: String(dato.cantValorDeclarado || "-"),
          contrareembolso: String(dato.contrareembolso || "-"),
          latitud: String(dato.latitud || "-"),
          longitud: String(dato.longitud || "-"),
        });
      }
    }

    setRows(jsonData);
  };
  const handleFile = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const res = XLSX.readFile(data, { type: "base64" });
    /*  var nombreHoja=res.SheetNames
    console.log(nombreHoja[0]);
    let datos= XLSX.utils.sheet_to_json(res.Sheets['Julio'])
    console.log(datos); */

    setExcel(res);
    setNamesOfSheets(res.SheetNames);
  };
  const notify = () => toast("Here is your toast.");
  return (
    <div className="content">
      {loading ? <Loader /> : null}
      
      <br />
      <input
        className=""
        id="input"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFile}
      />

      <select
        className="form-control"
        defaultValue={sheetSelected}
        onChange={handleSelect}
      >
        <option selected>Selecciona una Hoja</option>
        {namesOfSheets?.map((option, index) => (
          <option key={index} defaultValue={option}>
            {option}
          </option>
        ))}
      </select>
      {rows ? (
        <>
          <button className="btn btn-success" onClick={handleSend}>
            Enviar
          </button>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              setNamesOfSheets();
              document.querySelector("#input").value = "";
              setColumns();
              setRows();
              setExcel();
              setHeader();
              setErrores();
            }}
          >
            Limpiar
          </button>
        </>
      ) : null}

      <table className="table table-striped">
        <thead>
          {
            <tr>
              <th scope="col">Cant</th>
              {header?.map((item) => (
                <th scope="col">{item}</th>
              ))}
            </tr>
          }
        </thead>
        <tbody className="table-striped">
          {rows?.map((e, index, array) => {
            {
              return (
                <>
                  <tr key={index}>
                    <td scope="col">{index + 1}</td>
                    {header?.map((item) => {
                      return <td scope="col">{e[item]}</td>;
                    })}
                  </tr>
                </>
              );
            }
          })}
        </tbody>
      </table>
      <Toaster />
      <script crossorigin src="..."></script>
    </div>
  );
};

export default ImpotExcel;
