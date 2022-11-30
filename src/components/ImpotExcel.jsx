import React, { useState } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";
import * as XLSX from "xlsx";

const ImpotExcel = () => {
  const [namesOfSheets, setNamesOfSheets] = useState([]);
  const [sheetSelected, setSheetSelected] = useState();
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(null);
  const [header, setHeader] = useState(null);
  const [excel, setExcel] = useState();

  useEffect(() => {
    if (rows) {
      let resul = Object.keys(rows[0]);
      setHeader(resul);
      // console.log(rows)
    }
  }, [rows]);

  const handleSend = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(rows));
    try {
      let userPass = btoa("191918:fw3vLr&lLVER");
      console.warn(
        "🚀 ~ file: ImpotExcel.jsx ~ line 26 ~ handleSend ~ userPass",
        `Basic ${userPass}`
      );

      console.log();
      let headersMio = new Headers();
      headersMio.append("Access-Control-Allow-Origin", "*");
      headersMio.append("Access-Control-Allow-Credentials", "true");
      fetch("app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs", {
        method: "POST",
        
        headers: {
          "Authorization":`Basic ${userPass}`,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Credentials":"true",
          "Access-Control-Allow-Methods":"GET, POST, PUT, OPTIONS",
          "Content-Type": "application/json;charset=utf-8",
          "Accept":"*/*",
          "Accept-Encoding":"gzip, deflate, br"
        },

        body: JSON.stringify(rows),
      })
        .then((res) => {
          console.log(res);
          if (res.status == 200 || res.status == 201) {
            return res.json();
          } else {
            throw res;
          }
        })
        .then((res) => console.dir(res) )
      .catch((err) => {console.log("entro en el eror"+err)
      throw(err)
    });
    } catch (error) {
      console.log("acaaaa");
      console.dir("ksnd"+error);
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
          idCliente: String(dato.idCliente || "-"),
          remito: String(dato.remito || "-"),
          fecha: String(
            new Date((dato.fecha - (25567+2)) * 86400 * 1000)
              .toISOString()
              .slice(0, -5)
              .split("T") || "-"
          ),
          nombreDestinatario: String(dato.nombreDestinatario || "-"),
          calleDestino: String(dato.calleDestino) || "-",
          nroCalleDestino: String(dato.nroCalleDestino) || "-",
          codigoPostalDestino: String(dato.codigoPostalDestino || "-"),
          Observaciones: String(dato.Observaciones || "-"),
          observacionesAdicionalesDestino: String(
            dato.observacionesAdicionalesDestino || "-"
          ),
          direccionAlternativa: String(dato.direccionAlternativa || "-"),
          localidadDestino: String(dato.localidadDestino || "-"),
          provinciaDestino: String(dato.provinciaDestino || "-"),
          telefono1: String(dato.telefono1 || "-"),
          telefono2: String(dato.telefono2 || "-"),
          telefono3: String(dato.telefono3 || "-"),
          correoDestinatario: String(dato.correoDestinatario || "-"),
          cantUnidades: String(dato.cantUnidades || "-"),
          cantM3: String(dato.cantM3 || "-"),
          cantKg: String(dato.cantKg || "-"),
          cantValorDeclarado: String(dato.cantValorDeclarado || "-"),
          contrareembolso: String(dato.contrareembolso || "-"),
          latitud: String(dato.latitud || "-"),
          longitud: String(dato.longitud || "-"),
        });
      } else {
        jsonData.push({
          ...dato,

          idTransaccion: String(dato.idTransaccion || "-"),
          idCliente: String(dato.idCliente || "-"),
          remito: String(dato.remito || "-"),
          nombreDestinatario: String(dato.nombreDestinatario || "-"),
          nroCalleDestino: String(dato.nroCalleDestino) || "-",
          calleDestino: String(dato.calleDestino) || "-",
          codigoPostalDestino: String(dato.codigoPostalDestino || "-"),
          Observaciones: String(dato.Observaciones || "-"),
          observacionesAdicionalesDestino: String(
            dato.observacionesAdicionalesDestino || "-"
          ),
          direccionAlternativa: String(dato.direccionAlternativa || "-"),
          localidadDestino: String(dato.localidadDestino || "-"),
          provinciaDestino: String(dato.provinciaDestino || "-"),
          telefono1: String(dato.telefono1 || "-"),
          telefono2: String(dato.telefono2 || "-"),
          telefono3: String(dato.telefono3 || "-"),
          correoDestinatario: String(dato.correoDestinatario || "-"),
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

    //setRows(JSON.stringify(jsonData));
    setRows(jsonData);
  };
  const handleFile = async (e) => {
    e.preventDefault();
    //console.dir(e.target.files[0]);
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
  return (
    <div>
      <button
        className="btn btn-danger"
        onClick={(e) => {
          setNamesOfSheets();
          document.querySelector("#input").value = "";
          setColumns();
          setRows();
          setExcel();
          setHeader();
        }}
      >
        Limpiar
      </button>
      <br />
      <input
        className="btn btn-secondary"
        id="input"
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFile}
      />
      <button onClick={handleSend}>enviar</button>
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

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Cant</th>
            {header?.map((item) => (
              <th scope="col">{item}</th>
            ))}
          </tr>
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
    </div>
  );
};

export default ImpotExcel;
