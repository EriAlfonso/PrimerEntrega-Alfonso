// capturas de DOM
let mostrarPersonajes = document.getElementById("verPersonajes");
let personajesCreados = document.getElementById("personajesCreados");
let search = document.getElementById("search");
let ordenar = document.getElementById("orden");


// function para ver los personajes creados
function verPersonajes(grupoPersonajes) {
personajesCreados.innerHTML = "";
for (let personaje of grupoPersonajes) {
    let verCards = document.createElement("div");
    verCards.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");
    verCards.innerHTML = `
    <div id="${personaje.id}" class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="height: 275px;"src="assets/${personaje.imagen}" alt="${personaje.nombre} el ${personaje.clase}">
            <div class="card-body">
                <h4 class="card-title">${personaje.nombre}</h4>
                <p>Nivel: ${personaje.level}</p>
                <p>Raza: ${personaje.raza}</p>
                <p>Clase: ${personaje.clase}</p>
                <div class="cardHidden" style="display: none;">
                    <p>Hitpoints:  ${personaje.hp} </p>
                    <p>Fuerza:  ${personaje.fuerza} </p>
                    <p>Carisma:  ${personaje.carisma} </p>
                    <p>Constitucion:  ${personaje.constitucion} </p>
                    <p>Destreza:  ${personaje.destreza} </p>
                    <p>Inteligencia:  ${personaje.inteligencia} </p>
                    <p>Sabiduria:  ${personaje.sabiduria} </p>
                </div>
            <button id="nivelBtn${personaje.id}" class="btn btn-outline-success">↑nivel</button>
            <button id="expandirBtn${personaje.id}" class="btn btn-outline-warning">Expandir</button>
            <button id="borrarBtn${personaje.id}" class="btn btn-outline-danger">Borrar</button>
            </div>
    </div>
    `;
    personajesCreados.appendChild(verCards);

    //captura de dom de los botones
    let borrarBtn = document.getElementById(`borrarBtn${personaje.id}`);
    let expandirBtn = document.getElementById(`expandirBtn${personaje.id}`);
    let levelBtn = document.getElementById(`nivelBtn${personaje.id}`);
    let constitucionPlus = (personaje.constitucion > 13 ? 2 : personaje.constitucion > 11 ? 1 : 0)
    expandirBtn.addEventListener("click", function() {
        toggleContent(this)});
    // function para subir de nivel
    levelBtn.addEventListener("click", function() {
        personaje.level++;
        verCards.querySelector("p:nth-of-type(1)").textContent = `Nivel: ${personaje.level}`;
        personaje.clase== "mago"?
            personaje.hp += Math.floor(Math.random() * 6) + 1 + constitucionPlus
        :personaje.clase== "brujo"?
            personaje.hp += Math.floor(Math.random() * 6) + 1 + constitucionPlus
        :personaje.clase== "paladin"?
            personaje.hp += Math.floor(Math.random() * 10) + 1 + constitucionPlus
        :personaje.clase== "guerrero"?
            personaje.hp += Math.floor(Math.random() * 10) + 1 + constitucionPlus
        :personaje.clase== "arquero"?
            personaje.hp += Math.floor(Math.random() * 10) + 1 + constitucionPlus
        :personaje.clase== "barbaro"?
            personaje.hp += Math.floor(Math.random() * 12) + 1 + constitucionPlus
        :personaje.hp += Math.floor(Math.random() * 8) + 1 + constitucionPlus
        verCards.querySelector(".cardHidden p:nth-of-type(1)").textContent = `Hitpoints: ${personaje.hp}`
        localStorage.setItem("grupoPersonaje", JSON.stringify(grupoPersonajes))
        });
    // function para borrar
    borrarBtn.addEventListener("click", function(){
        verCards.remove();
        let id = personaje.id;
        let personajeEliminar = grupoPersonajes.find((personaje)=> personaje.id === id)
        //buscar el indice
        let posicion = grupoPersonajes.indexOf(personajeEliminar)
        grupoPersonajes.splice(posicion,1)
        // Borrar del storage
        localStorage.setItem("grupoPersonaje", JSON.stringify(grupoPersonajes))
});
}
}


// expandir cards
function toggleContent(element) {
    let cardBody = element.closest(".card").querySelector(".cardHidden");
    if (cardBody.style.display === "none") {
    cardBody.style.display = "block";
    } else {
    cardBody.style.display = "none";
    }
};

// busqueda por nombre y clase
function buscarPersonaje(find, array){
    let buscarPersonaje = array.filter(
        (personaje) => personaje.nombre.toLowerCase().includes(find) || personaje.clase.toLowerCase().includes(find) || personaje.raza.toLowerCase().includes(find)
    )
    if(buscarPersonaje.length == 0){
        personajeReturn.innerHTML = `<h3>El personaje, raza o clase no existe</h3>`
        verPersonajes(buscarPersonaje)
    }else{
        personajeReturn.innerHTML = ""
        verPersonajes(buscarPersonaje)
    }
}

// filtro por nombre
function ordenarPorNombre(array) {
    const nombresAlfabeticamente = [].concat(array);
    nombresAlfabeticamente.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        return 0;
    });
    verPersonajes(nombresAlfabeticamente);
}

// filtro de clase
function ordenarPorClase(array) {
    const claseAlfabeticamente = [].concat(array);
    claseAlfabeticamente.sort((a, b) => {
        if (a.clase > b.clase) {
            return 1;
        }
        if (a.clase < b.clase) {
            return -1;
        }
        return 0;
    });
    verPersonajes(claseAlfabeticamente);
}

// filtro de raza
function ordenarPorRaza(array) {
    const razaAlfabeticamente = [].concat(array);
    razaAlfabeticamente.sort((a, b) => {
        if (a.raza > b.raza) {
            return 1;
        }
        if (a.raza < b.raza) {
            return -1;
        }
        return 0;
    });
    verPersonajes(razaAlfabeticamente);
}

// eventos
// buscador
search.addEventListener("input", ()=>{
    buscarPersonaje(search.value, grupoPersonajes)
})

// ordenador
ordenar.addEventListener("change", () => {
    if (ordenar.value == 1) {
        ordenarPorNombre(grupoPersonajes);
    } else if (ordenar.value == 2) {
        ordenarPorClase(grupoPersonajes);
    } else if (ordenar.value == 3) {
        ordenarPorRaza(grupoPersonajes);
    } else {
        verPersonajes(grupoPersonajes);
    }
});

// mostrar personajes array
mostrarPersonajes.onclick = () => {
    verPersonajes(grupoPersonajes);
    personajesCreados.style.display = personajesCreados.style.display === "block" ? "none" : "block";
};