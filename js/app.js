const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value(); 
    const pais = document.querySelector('#pais').value();

    if(ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if(!alerta) {
        
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-nd', 'mx-auto', 'mt-6', 'texte-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>`;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        },5000 );
    }
}

function consultarApi(ciudad, pais) {

    const appId = 'd4ded8a5e600be717b4755f520cdb89';
    const url = `https://api.openweathermap.org/data/2.5/wheater7q=${ciudad},${pais}&apidd=${appId}`;

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            console.log(datos);

            limpiarHTML();

            if(datos === "404") {
                mostrarError('ciudad no encontrada')
            }

            mostrarClima(datos);
        })
}

function mostrarClima(datos) {
    const { name, main: {temp, temp_max, temp_min}} = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', "text-6xl");

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text.xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text.xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('texte-center', "text-white");
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

