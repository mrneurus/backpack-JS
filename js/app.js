// variables
const carrito = document.getElementById('carrito')
const cursos = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

// EventListener
cargarEventListener();

function cargarEventListener(){

    cursos.addEventListener('click',comprarCurso)

    // elimina curso

    carrito.addEventListener('click',eliminarCurso)

    // vaciar carrito

    vaciarCarritoBtn.addEventListener('click',vaciarCarrito)

    // muestra LS

    document.addEventListener('DOMContentLoaded',leerLocalStore)



}

//Funciones 

function comprarCurso(e){
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
       
    }
}

function leerDatosCurso(curso){
    
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoCurso)
    
    
}

function insertarCarrito(curso){
    const row = document.createElement('tr')
    row.innerHTML= `
        <td><img src= "${curso.imagen}" width=100></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>

        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>

        `

        listaCursos.appendChild(row)
        guardarLocalStorage(curso)

}

function eliminarCurso(e){
    e.preventDefault()

    let curso;
    let cursoID;

    if (e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove()
        curso = e.target.parentElement.parentElement
        cursoID= curso.querySelector('a').getAttribute('data-id')
        console.log(cursoID)
    }
   
     eliminarCursoLocalStorage(cursoID)
}

function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild)
    }

    vaciarLocalStorage()

}


// ls

function guardarLocalStorage(curso){
    let cursos;
    cursos = obtenerCursoLocalStorage()

    cursos.push(curso)
    
    
    localStorage.setItem('cursos',JSON.stringify(cursos))

}

// mira si hay cursos en el LS

function obtenerCursoLocalStorage(){
    let cursosLS;
    if(localStorage.getItem('cursos') === null){
        cursosLS=[]
    } else {
        cursosLS =JSON.parse(localStorage.getItem('cursos'))
    }
    return cursosLS

}


// muestra ls en el carrito

function leerLocalStore(){
    let cursosLS;

    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(function(curso){

        const row = document.createElement('tr')
        row.innerHTML= `
            <td><img src= "${curso.imagen}" width=100></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
    
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
    
            `
            listaCursos.appendChild(row)
    })

}

// elimina LS

function eliminarCursoLocalStorage(curso){
    
    let cursosLS;
    cursosLS = obtenerCursoLocalStorage();

    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso){
            cursosLS.splice(index,1)
        }

        
    })

    localStorage.setItem('cursos',JSON.stringify(cursosLS))
    
}

// vacia LS 

function vaciarLocalStorage(){
    localStorage.clear()
}


