endpoint = 'http://150.136.166.43:8080/api/Client'

function guardarNuevoCliente() {
  //recupera información del formulario
  let nameClient = document.getElementById("name").value
  let emailClient = document.getElementById("email").value
  let passClient = document.getElementById("password").value
  let ageClient = document.getElementById("age").value
  
  let objeto = {
      name: nameClient,
      email: emailClient,
      age: parseInt(ageClient),
      password: passClient
      
      
         
  };
 
  //convierto el objeto de javascript a formato json
  let objetoJson = JSON.stringify(objeto)
  console.log(objetoJson)

  url = "http://150.136.166.43:8080/api/Client/save";

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
   alert('Guardado Con exito Verifica la tabla')
      }
  }

  peticion.open("POST", url, true)
  peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  peticion.send(objetoJson)
}




function traerdatosclientes() {
    url = "http://150.136.166.43:8080/api/Client/all"
    //1 crear un objeto XMLHttpRequest
    let peticion = new XMLHttpRequest();
  
    /*2 propiedad onreadystatechange asigna a una funcion
          que funcion valida si la respuesta fue exitosa
          readyState=4 y status=200, en cuyo caso obtiene la respuesta, 
          le aplica formato y modifica la pagina o vista
      */
    peticion.onreadystatechange = function () {
      //almacena el html para generar los registros de la tabla
      let registros = "";
      //valida si la peticion fue exitosa
      if (this.readyState == 4 && this.status == 200) {
        let respuesta = JSON.parse(this.responseText);
        
        //crear html usando los datos de la respuesta que me da el servicio
        //variable 'respuesta'
        for (let i in respuesta) {
          let id = respuesta[i].idClient;
          let clientes = respuesta[i].idClient;
          
          registros +=
            '<tr>\
                          <th scope="row">' + id +
            "</th>\
             <td>" +
            respuesta[i].name +
            "</td>\
                          <td>" +
            respuesta[i].email +
            "</td>\
                          <td>" +
            respuesta[i].age +
            "</td>"
            
            
            +          
            '<td>\
            <a class="btn btn-outline-dark" onclick="Editar('+ id +')"  href="update_client.html" >Modificar</a>\                              <button class="btn btn-outline-dark" onclick="eliminarclient(' + id +')" >Borrar</button>\
                          </td>\
                          </tr>';
        }
  
        document.getElementById("registros").innerHTML = registros;
      }
    };
  
    peticion.open("GET", url, true);
    peticion.send();
  }


  function Editar(id) {
    alert('Recuerda que tu ID es'+ id )
    //1 crear un objeto XMLHttpRequest
    }
  



  function guardarEditar() {
    
    //recuperar la informacion ingresada en el formulario
    let idModif = document.getElementById("idModif").value
    let nameModif = document.getElementById("nameModif").value
    let emailModif = document.getElementById("emailModif").value
    let passwordModif = document.getElementById("passwordModif").value
    let ageModif = document.getElementById("ageModif").value
    
    //creo un objeto javascript
    let objeto = {
      idClient: idModif,
      name: nameModif,
      email: emailModif,
      password: passwordModif,
      age: ageModif
    }
    console.log(objeto)

    //convierto el objeto de javascript a formato json
    let objetoJson = JSON.stringify(objeto)
  
    url = "http://150.136.166.43:8080/api/Client/update"
  
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
      alert('Registro Cambiado')
      }
    }
  
    peticion.open("PUT", url, true)
    peticion.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    peticion.send(objetoJson)
  }


  function eliminarclient(id) {
    if (confirm("Desea Eliminar el Registro Id " + id + " ?.")) {
        console.log(id)
        
        $.ajax({
            url: "http://150.136.166.43:8080/api/Client" + "/" + id,
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            complete: alert('Eliminado Con  exito'),
            error: function (xhr) { console.log('No funciona'); } // When Service call fails 
            
        })
  
    }

}

