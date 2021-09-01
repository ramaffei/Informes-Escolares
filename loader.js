let modal = document.getElementById('modal1')
const mensajeModal = (mensaje, estado) => {

    document.getElementById("contenido_modal").innerHTML = ''
    
    const opciones = {
        'error': {opc: { opacity: 1, preventScrolling: false, dismissible: false, startingTop: '50%',
            onOpenEnd: async () => {
            await setTimeout(function(){
            const instance_modal = M.Modal.getInstance(modal);
            instance_modal.close()
            instance_modal.destroy()
            }, 5000);
          }}, msj: `<center><i class="medium material-icons" style="color: red">priority_high</i><h4 class="red-text flow-text"><strong>${mensaje}</strong></h4></center>`},
        'terminado': {opc:  {opacity: 1, preventScrolling: false, dismissible: false, startingTop: '50%', onOpenEnd: async () => {
            await setTimeout(function(){
            const instance_modal = M.Modal.getInstance(modal);
            instance_modal.close()
            instance_modal.destroy()
            botonAtras()
            }, 5000);
          }}, msj: `<center><i class="medium material-icons" style="color: green">done</i><h4 class="green-text flow-text"><strong>${mensaje}</strong></h4></center>`},
          'loader': {opc: {opacity: 1, preventScrolling: false, dismissible: false, startingTop: '50%'}, msj: `<center><h4 class="blue-text flow-text"><strong>${mensaje}</strong></h4><div class="progress"><div class="indeterminate" style="background-color: #1e88e5;"></div></div><center>`},
    } 

    document.getElementById("contenido_modal").innerHTML = opciones[estado].msj

    M.Modal.init(modal, opciones[estado].opc)

    const instance_modal = M.Modal.getInstance(modal);
    instance_modal.open();
  }

  function cerrarModal(){
    const instance_modal = M.Modal.getInstance(modal);
    if (instance_modal.isOpen){        
      instance_modal.close()
      instance_modal.destroy()
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }