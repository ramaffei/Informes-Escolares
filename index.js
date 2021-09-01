const divRespuesta = document.getElementById('respuesta');
const inputBuscar = document.getElementById('dni');

document.getElementById('btnBuscar').addEventListener('click', validarYEjecutar)
inputBuscar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter'){
        validarYEjecutar()
    }
});


function validarYEjecutar(){
    if (inputBuscar.value == '' || !inputBuscar.checkValidity()){
        mensajeModal('Debe ingresar un valor valido en el campo DNI', 'error')
        return
    }
    mensajeModal('Cargando Informe...', 'loader')
    generarInforme();    
}

async function generarInforme(){
      const dni = inputBuscar.value;
      let respuesta = await fetch(`https://script.google.com/macros/s/AKfycbwx92_dBQaY46hA-QZxYIXA4C2IYCWRevBsyLkz-pCWF7nzWrI7Dnd4Rf8UGJ-lhidD/exec?dni=${dni}`)
      respuesta = await respuesta.json();

      const cuerpoTabla = document.getElementById("tablaInforme");
      cuerpoTabla.innerHTML = ""
      const keys = Object.keys(respuesta);
      
      if (keys.length < 1){
        mensajeModal('No se encuentra en DNI especificado', 'error')
        return false
      }

      const materias = respuesta[keys[0]].MATERIAS
      document.getElementById("tituloModalInforme").innerHTML = "RESUMEN DE CALIFICACIONES"; 
      document.getElementById("nombreEstudianteInforme").value = respuesta[keys[0]].NOMBRE;
      document.getElementById("dniEstudianteInforme").value = keys[0];
      document.getElementById("burbujaEstudianteInforme").value = `${respuesta[keys[0]].CURSO} - ${respuesta[keys[0]].TURNO}`; 
  
    await materias.forEach(async function(materia){

    const row = document.createElement("tr");
    const col1 = document.createElement("td"); 
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");
    const col6 = document.createElement("td");
    const col7 = document.createElement("td");

          
    col1.textContent = materia;//set nombre

    if(respuesta[keys[0]].hasOwnProperty(materia)){
    col2.textContent = respuesta[keys[0]][materia]['Aprendizajes'][1];
    col3.textContent = respuesta[keys[0]][materia]['Aprendizajes'][2];
    col4.textContent = respuesta[keys[0]][materia]['Aprendizajes'][3];
    col5.textContent = respuesta[keys[0]][materia]['Aprendizajes'][4];
    col6.textContent = respuesta[keys[0]][materia]['Valoracion'];
    col7.textContent = respuesta[keys[0]][materia]['Sumativa'];
    }

    row.appendChild(col1); 
    row.appendChild(col2); 
    row.appendChild(col3); 
    row.appendChild(col4); 
    row.appendChild(col5);
    row.appendChild(col6); 
    row.appendChild(col7);     

    cuerpoTabla.appendChild(row);

  });
            M.updateTextFields();
            divRespuesta.classList.remove('hide')
            cerrarModal();
}