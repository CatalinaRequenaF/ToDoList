const notas = "http://localhost:3000/notas";

// ================================== CREAR UNA NOTA ===================================================
async function crearNota(){
    //Extraigo datos del formulario
    let titulo = document.getElementById("titulo").value;
    let nota = document.getElementById("nota").value;
    
    //Meto los valores del formulario en el objeto data
    var data = {
        titulo: titulo,
        nota: nota
    }

    /*--------------------------------------*/
    //Envío la nota con POST a 'notas'
    const responsePost = await fetch(notas, {
        method:'POST',
        mode:'cors',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
    } );
    return responsePost.json();
}

/*==============================MOSTRAR TODAS LAS NOTAS==============================*/
async function listaNotas(){
        const response = await fetch(notas)
        const data = await response.json();
        pintar(data);
}

/*Recorrer para pintar*/
function pintar(data){
    divNotas.innerHTML="";
    for (i in data){
        let id = data[i].id;
        let titulo = data[i].titulo;
        let nota = data[i].nota;

        let divNotas = document.getElementById("divNotas");
        let newDiv=document.createElement("div");

        newDiv.className="contenedor"
        newDiv.id=id;
        newDiv.innerHTML=
        `
             <h2>${titulo}</h2>
               <p>${nota}</p>
               <span>
                    <button id="d${id}" onclick="delete_id(this.id)" class="delete"">Eliminar</button>
                    <a id="u${id}" href="#popup" onclick="mostrarNota(this.id)" class="update">Editar</a>
               </span>
        `;
        divNotas.appendChild(newDiv)
    }
}

/*==========================DELETE=================================*/
async function delete_id(clicked_id){
    let id= clicked_id;
    id= id.slice(1);

    let options = {
        method: "DELETE",
    }, 

    response = await fetch(notas+'/'+id, options),
    json=await response.json();
    alert("Borrado!")
}


/*=====================POPUP==========================*/
async function mostrarNota(idM){  
    idM= idM.slice(1);
    console.log(idM)

    //-------------------GET ONE -----------------------------------
    const response = await fetch(notas+'/'+idM)
    const obj = await response.json(); 


    console.log(obj);
    console.log(obj.titulo);

    /*-------------*/
    let contenedor = document.getElementById("popup");
    let popup=document.createElement("div");
    popup.className="contenedor";
    contenedor.innerHTML="";
    popup.innerHTML=
    `
    <div>
    <h2>Título</h2>
    <input type="text"   id="nuevoTitulo" value="${obj.titulo}" placeholder="Titulo">
    <h2>Descripción</h2>
    <input type="text"  id="nuevaNota" value="${obj.nota}" placeholder="Nota">
    <a id="cerrar" href="#" onclick="update(${idM})">Aceptar</a>
    </div>  
    `;

    contenedor.appendChild(popup);
}




/*===================MOSTRAR UNA NOTA====================*/
function buscarId(){
    let id = document.getElementById("inputId").value;  
    console.log(id)  
    let idM = `x${id}`
    mostrarNota(idM);
}

/*===================OCULTAR UNA NOTA====================*/

function ocultar(){
    let divNotas = document.getElementById("divNotas");
    divNotas.innerHTML="";
}

/*=====================UPDATE======================*/
async function update(id){
    let tituloN = document.getElementById("nuevoTitulo").value;
    let notaN = document.getElementById("nuevaNota").value;

    let popup = document.getElementById("popup")
    popup.innerHTML="";

    var dataN = {
        titulo: tituloN,
        nota: notaN
    }

    let options = {
        method: "PUT",
        body:JSON.stringify(dataN),
        mode:'cors',
        credentials: 'same-origin',
        headers: {'Content-Type':'application/json'},
    }


    const response = await fetch(notas+'/'+id, options),
    json=await response.json();
    alert("Actualizado!")
   
}





