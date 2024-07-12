import React, { useEffect, useState } from "react";
import createData from "../utils/CreateData";
import Partido from "./Partido";
import { manejarClick } from "../utils/manejarClick";

function Tabla() {
  const [matches, setMatches] = useState([]);

  //const [puntos, setPuntos] = useState([]);
  // {id: idPartido, equipoVal1: equipo1, equipoVal1: equipo2,}

  useEffect(() => {
    const fetchData = async () => {
      const data = await createData();
      setMatches(data);
    };
    fetchData();
  }, []);
  const tablaStyle = {
    width: "1000px",
    border: "1px solid white",
  };

  const handleChange = ({ idPartido, puntosEquipo1, puntosEquipo2 }) => {
    const partido = matches.findIndex((match) => match.idPartido == idPartido);
    let partidos = [...matches];

    partidos[partido] = {
      ...partidos[partido],
      puntosEquipo1,
      puntosEquipo2,
      puntos: manejarClick(
        +puntosEquipo1,
        +puntosEquipo2,
        partidos[partido].equipo1_goles,
        partidos[partido].equipo2_goles
      ),
    };
    console.log(partidos[partido]);
    console.log(
      +puntosEquipo1,
      +puntosEquipo2,
      partidos[partido].goals1,
      partidos[partido].goals2
    );
    setMatches(partidos);
    // console.log(partidos[partido])
    //let contador = 0;
    console.log(partidos[partido].puntos) 
    partidos.forEach((partido,index) => (
        
        console.log(partidos[index].puntos)));


    //console.log(partidos[partido].puntos);
  };


  //console.log(matches)
  return (
    <div style={tablaStyle}>
      <h1>puntos totales </h1>

      {matches.map((match, index) => (
        <Partido key={match.idPartido} {...match} handleChange={handleChange} />
      ))}
    </div>
  );
}

export default Tabla;

//Partido llama a funcion handlechange (4 valores) en obj
// captuar en form los inputs o state equipo 1 etc
// codear handleCHange
// calcular los
