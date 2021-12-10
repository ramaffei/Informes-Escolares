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
      const value = inputBuscar.value;
      let respuesta = await fetch(`https://script.google.com/macros/s/AKfycbwx92_dBQaY46hA-QZxYIXA4C2IYCWRevBsyLkz-pCWF7nzWrI7Dnd4Rf8UGJ-lhidD/exec?dni=${value}`)
      respuesta = await respuesta.json();

      const keys = Object.keys(respuesta);
      
      if (keys.length < 1){
        mensajeModal('No se encuentra en DNI especificado', 'error')
        return false
      }
      const dni = keys[0]
      const materias = respuesta[dni].MATERIAS
      document.getElementById("tituloModalInforme").innerHTML = "RESUMEN DE CALIFICACIONES"; 
      document.getElementById("nombreEstudianteInforme").value = respuesta[dni].NOMBRE;
      document.getElementById("dniEstudianteInforme").value = dni;
      document.getElementById("burbujaEstudianteInforme").value = `${respuesta[dni].CURSO} - ${respuesta[dni].TURNO}`; 
      const etapas = ['ETAPA1', 'ETAPA2']
      for (const i in etapas ){
        const cuerpoTabla = document.getElementById(`tablaInforme-${i}`);
        cuerpoTabla.innerHTML = ""
        
        const etapa = etapas[i]

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
      
            if(respuesta[dni]['NOTAS'][etapa].hasOwnProperty(materia)){
              col2.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Aprendizajes'][1];
              col3.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Aprendizajes'][2];
              col4.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Aprendizajes'][3];
              col5.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Aprendizajes'][4];
              col6.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Valoracion'];
              col7.textContent = respuesta[dni]['NOTAS'][etapa][materia]['Sumativa'];
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
      }
      
    
            M.updateTextFields();
            divRespuesta.classList.remove('hide')
            M.Tabs.init(document.getElementById('contTabs'));
            cerrarModal();
}