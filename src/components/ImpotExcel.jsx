import React, { useState } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";
import axios, { isCancel, AxiosError } from "axios";
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
    console.log(rows);
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

      let url =
        "http://app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs";
      /* axios(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer Basic ${userPass}`,
          'Access-Control-Allow-Methods': "GET, POST, PUT, OPTIONS",
          'Access-Control-Allow-Origin':"*",
          "Access-Control-Allow-Headers":"*", 
          'Content-Type': 'application/json',
       
        },
        withCredentials: false,
     
        body: JSON.stringify(rows)
      }).then(response => {
        console.log(response);
      }).catch(err=>console.log(err)) */

      console.log();
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
      /* customHeader.append("dataType", "json");
      customHeader.append("Content-Type", "30099");
      customHeader.append("Accept", "application/json");
      customHeader.append("Content-Type", "application/json; charset=utf-8");
      customHeader.append("Access-Control-Allow-Origin", "*");
      customHeader.append("Access-Control-Allow-Headers", "*");
      customHeader.append("sec-fetch-site", "same-site");
      customHeader.append("sec-fetch-mode", "cors");
      customHeader.append(
        "Accept-Language",
        "es-AR, fr;q=0.9, en;q=0.8, de;q=0.7"
      );
      customHeader.append("accept-encoding", "gzip,deflate,br");

      customHeader.append(
        "Access-Control-Allow-Origin",
        "http://localhost:5173/integracion-amdm-ofidirect/"
      );
      customHeader.append(
        "Access-Control-Allow-Methods",
        "DELETE, POST, GET, OPTIONS"
      ); */
      /* customHeader.append("Access-Control-Allow-Headers", "X-Requested-With");

      console.table(customHeader);
 */

      let axiosConfig = {
        Authorization: `Basic ${userPass}`,
        "Access-Control-Allow-Origin":'*',
        headers: {
          Accept: "application/json;charset=utf-8",
        },
      };
      console.log(rows)
      axios
        .post(
          "http://app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs",
          JSON.stringify(rows),
          {"headers" : customHeader}
        )
        .then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
          console.log(res.data[0]);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
          console.log(err.config.data);
        });
      /* fetch(
        "http://app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs",
        {
          mode: 'no-cors',
          customHeader, */
      /* headers: {
            "Authorization":`Basic `+userPass,
            'Accept': 'application/json, text/plain,',
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Origin":"http://localhost:5173/ImportarDesdeExcel",
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS"
          },  */
      /*   method: "POST",
          body: JSON.stringify({
            idTransaccion:"15",
            idCliente:"idOfidirect",
            remito:"20225",
            fecha:"2022-10-01 00:00:00",
            nombreDestinatario:"Bosack Federico",
            calleDestino:"Garibaldi",
            nroCalleDestino:"186",
            Observaciones:"Piso: Dto:2",
            observacionesAdicionalesDestino:"-",
            localidadDestino:"Villa Carlos Paz",
            codigoPostalDestino:"5152",
            telefono1:"3513070584",
            telefono2:"-",
            telefono3:"-",
            correoDestinatario:"sadorno97@gmail.com",
            cantUnidades:"-",
            cantM3:"5",
            cantKg:"9",
            cantValorDeclarado:"3305",
            contrareembolso:"-",
            latitud:"-",
            longitud:"-",
            observaciones:"-",
            direccionAlternativa:"-",
            provinciaDestino:"-"
         }), */
      /*    headers: {
          "Authorization":`Basic ${userPass}`,
          "Access-Control-Allow-Credentials":"true",
          "Access-Control-Allow-Methods":"GET, POST, PUT, OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin":"http://app.amdmconsultora.com:80/amdm/servlet/ImportacionClienteOfidirectWs",
          "Content-Type": "application/json",
           'Access-Control-Allow-Origin': '*'
        },  */
      /* body: JSON.stringify(rows), */
      /*   }
      )
        .then((res) => {
          console.log(res)
          return res.json();
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log("entro en el eror" + err);
          console.log(err);
          throw err;
        }); */
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
          calleDestino: String(dato.calleDestino),
          nroCalleDestino: String(dato.nroCalleDestino) || "-",
          codigoPostalDestino: String(dato.codigoPostalDestino || "-"),
          observaciones: String(dato.observaciones || "-"),
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
      } /* else {
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
      } */
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
      <script crossorigin src="..."></script>
    </div>
  );
};

export default ImpotExcel;
