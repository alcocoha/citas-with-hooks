import React, { useState, useEffect, Fragment } from "react";
import uuid from "uuid";

function ListaCitas({ lista, eliminarCita }) {
  console.log("lista", lista);
  console.log('lista.length', lista.length)
  return (
    <Fragment>
      {
        lista.length > 0
        ?
        lista.map(item => (
          <div className="cita" key={item.id}>
            <p>
              Mascota: <span>{item.mascota}</span>
            </p>
            <p>
              Propietario: <span>{item.propietario}</span>
            </p>
            <p>
              Fecha: <span>{item.fecha}</span>
            </p>
            <p>
              Hora: <span>{item.hora}</span>
            </p>
            <p>
              Sintomas: <span>{item.sintomas}</span>
            </p>
            <button
              onClick={() => {
                eliminarCita(item.id);
              }}
              className="button eliminar u-full-width"
            >
              Eliminar
            </button>
          </div>
        ))
        :
        (
          <div className="cita">
            <p>No hay citas</p>
          </div>
        )
      }
    </Fragment>
  );
}

function Formulario({ newCita }) {
  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  };

  const [cita, actualizarCita] = useState(stateInicial);

  const handlerChange = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const handlerSendAppointment = e => {
    e.preventDefault();
    console.log(cita);
    const nuevaCita = cita;
    nuevaCita.id = uuid();

    // pasar la cita hacia el componente principal
    newCita(nuevaCita);

    // reiniciar el state
    actualizarCita(stateInicial);
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={handlerSendAppointment}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handlerChange}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handlerChange}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={handlerChange}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={handlerChange}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handlerChange}
          value={cita.sintomas}
        />

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
}

function App() {

  let initialState = JSON.parse(localStorage.getItem('citas'));
  if(!initialState){
    initialState = [];
  }

  const [citas, guardarCita] = useState(initialState);

  const newCita = cliente => {
    const nuevasCitas = [...citas, cliente];
    console.log("nuevasCitas :", nuevasCitas);
    guardarCita(nuevasCitas);
  };

  const eliminarCita = id => {
    const clonCitas = [...citas];
    const newCloneCitas = clonCitas.filter(cita => {
      if(cita.id !== id){
        console.log('cita', cita)
        return cita;
      }
    })
    console.log('newCloneCitas :', newCloneCitas);
    guardarCita(newCloneCitas);
  };

  useEffect(()=>{
    const citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario newCita={newCita} />
          </div>
          <div className="one-half column">
            <ListaCitas lista={citas} eliminarCita={eliminarCita} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
