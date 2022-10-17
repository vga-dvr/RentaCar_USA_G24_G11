const endpoint = "http://150.136.166.43:8080/api/Client"

function guardarNuevo() {
    url = endpoint
    //recuperar la informacion ingresada en el formulario
    let nameClient = document.getElementById("name").value
    let emailClient = document.getElementById("email").value
    let passwordClient = document.getElementById("password").value
    let ageClient = document.getElementById("age").value
  
    //creo un objeto javascript
    let objeto = {
      name: nameClient,
      email: emailClient,
      password: passwordClient,
      age: ageClient
    }
  
    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    url = endpoint;
  
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest()
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 201) {
  
        //Configura el aspecto de la pagina
        traerdatos()
        inicial()
      }
    }
  
    peticion.open("POST", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
  }