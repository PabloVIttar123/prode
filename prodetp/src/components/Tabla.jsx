import { useEffect, useState } from "react";
import createData from "../utils/CreateData";
import Partido from "./Partido";
import { manejarClick } from "../utils/manejarClick";

function Tabla() {
  const [matches, setMatches] = useState([]);
  const [acumulador, setAcumulador] = useState(0);

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
   
    setMatches(partidos);

    let nuevoAcumulador = 0;
    partidos.forEach((partido) => {
      if (!isNaN(partido.puntos)) nuevoAcumulador += partido.puntos;
    });
console.log(partidos);
    setAcumulador(nuevoAcumulador);
  };

  return (
    <div style={tablaStyle}>
      <h1>
        puntos totales: <span>{acumulador}</span>{" "}
      </h1>

      {matches.map((match) => (
        <Partido key={match.idPartido} {...match} handleChange={handleChange} />
      ))}
    </div>
  );
}

export default Tabla;

