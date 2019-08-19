import React, { useState, Fragment } from 'react';


function ListaCitas({lista}){
  console.log('lista', lista);
  return (
    <ul>
      {
        lista.map(item => 
          <div className="cita">
            <p>Mascota: <span>{item.mascota}</span></p>
            <p>propietario: <span>{item.propietario}</span></p>
            <p>fecha: <span>{item.fecha}</span></p>
            <p>hora: <span>{item.hora}</span></p>
            <p>sintomas: <span>{item.sintomas}</span></p>
          </div>
        )
      }
    </ul>
  );
}

function Formulario({newCita}){

  const stateInicial = {
    mascota:'',
    propietario:'',
    fecha:'',
    hora:'',
    sintomas:'',
 };

 const [cita, actualizarCita] = useState(stateInicial);

 const handlerChange = e => {
  actualizarCita({
    ...cita,
    [e.target.name] : e.target.value
  });
 }

 const handlerSendAppointment = e => {
  e.preventDefault();
  console.log(cita);

  // pasar la cita hacia el componente principal
  newCita(cita)

  // reiniciar el state
  actualizarCita(stateInicial);

 }


  return (
      <Fragment>
        <h2>Crear Cita</h2>
        <form
          onSubmit = { handlerSendAppointment }
        >
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
          ></textarea>

          <button type="submit" className="button-primary u-full-width">Agregar</button>
        </form>
    </Fragment>
  );
}

function App() {

  const [citas, guardarCita] = useState([]);

  const newCita = cliente => {
    const nuevasCitas = [...citas, cliente];
    console.log('nuevasCitas :', nuevasCitas);
    guardarCita(nuevasCitas);
  }

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              newCita = {newCita}
            />
          </div>
          <div className="one-half column">
            <ListaCitas
              lista={citas}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
