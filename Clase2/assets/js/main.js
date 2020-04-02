const alumnos = [
{ nombre: 'Rodrigo Andrade', edad: 23 },
{ nombre: 'Nayla Arroyo Lizzio', edad: 32 },
{ nombre: 'Marianela De Martino', edad: 20 },
{ nombre: 'Axel Julian Dumas Cutuli', edad: 19 },
{ nombre: 'Martina Franco', edad: 22 },
{ nombre: 'Agustina Garcia Vega', edad: 24 },
{ nombre: 'María Agustina Mattioli Pacheco', edad: 19 },
{ nombre: 'Franco Picco', edad: 33 },
{ nombre: 'Alva Ramírez', edad: 27 },
{ nombre: 'Diego Salischiker', edad: 29 },
];

// 1. Obtener un array de strings con solo nombres de cada alumno usando .map()

const names = alumnos.map( ({nombre})=> nombre);
console.log("1. Los nombres de los alumnos son: ", names);


// 2. Obtener un array con aquellos alumnos mayores a 25 años usando .filter()

const older_students = alumnos.filter(({edad})=> edad > 25);
console.log("2. Los alumnos mayores a 25 son: ", older_students);


// 3. Obtener un entero con la edad total de todos los alumnos usando .reduce() (Investigar: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce)

const students_ages = alumnos.map(({edad})=> edad);
const total_ages = students_ages.reduce((a, b) => a+b );
console.log("3. Suma de todas las edades: ", total_ages);


// 4. Obtener en una constante la edad de "Franco Picco" usando .find() ( Investigar: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/find ) y destructuring del resultado. Investigar método includes

const the_student = alumnos.find(student => student.nombre == 'Franco Picco');
const { nombre, edad: the_students_age} = the_student;
console.log("4. La edad de Franco Picco es: ", the_students_age);


// 5. Obtener en una constante primer alumno del array de alumnos usando destructuring y posteriormente en otra constante su nombre también

const [first_student,...rest_of_students] = alumnos;
const { nombre : first_students_name } = first_student;
console.log("5. Nombre primer alumno:", first_students_name);


// 6. Obtener un array con aquellos alumnos que empiezan con la letra "M", usando .filter()

const m_students = alumnos.filter(({nombre}) => nombre[0]=="M");
console.log("6. Estudiantes que empiezan con letra M: ", m_students);


// 7. Obtener un array agregando una propiedad/key/atributo más a cada elemento usando .map()

const fav_band = ['Coldplay', 'Above & Beyond', 'Daft Punk', 'Red Hot Chili Peppers', 'Jamiroquai', 'ABBA', 'Metallica', 'My Chemical Brothers', 'Paramore', 'Keane'];
const new_key = alumnos.map((student, index) => {
    student.bandaFavorita = fav_band[index];
    return student;
});

console.log("6. Nueva clave agregada (Banda favorita): ", new_key);


// 8. Obtener a partir de la constante en 3, el promedio de edad del curso dividiendo la misma por el total de alumnos

const average_age = Math.round(total_ages/alumnos.length);
console.log("8. El promedio de edad de los estudiantes es: ", average_age);


//Async/Await
// 9. Buscar una API que más te guste en https://github.com/toddmotto/public-apis pero que debajo de la columna Auth especifique "No"

console.log('9. API elegida: https://apodapi.herokuapp.com/');


// 10. Implementar una función getDataWithPromises que utilice la API de Promises usando .then() (investigar)

function getDataWithPromises(){
    fetch('https://apodapi.herokuapp.com/search/?search_query=planetary%20nebula&number=9')
    .then(response => response.json()) //primero
    .then(data => { 
        console.log("10. esta es la data que me trajo la NASA: ", data)
        })
}

getDataWithPromises();


// 11. Implementar una función getDataWithAsync que utilice async / await junto con la API fetch para buscar los datos de la API elegida

async function requestData(){
    const nasa_response = await fetch('https://apodapi.herokuapp.com/search/?search_query=planetary%20nebula&number=9');
    const photo_data = await nasa_response.json();
    return photo_data;
}

const mainLogic = async () => {
    const photo_data = await requestData(); 
    console.log("la data traída: ", photo_data);
}

mainLogic();


// 12. Hiciste manejo de errores? En caso que no lo hayas hecho utiliza .catch() en la función getDataWithPromises o try / catch en la función getDataWithAsync

const getDataWithAsync = async () => {
    try{
        const photo_data = await requestData();
        const printData = photo_data.map( ({url,title,description})=>{

            const divContent = document.querySelector('#content');
            const html = '<article><div class="articlePic"><img src='+url+'></img></div><h2>'+title+'</h2><p class="descriptionDiv">'+description+'</p></article>'
            divContent.insertAdjacentHTML('beforeend', html);
        })

        const picturesOf = document.querySelector('#picturesOf');
        picturesOf.innerHTML = "Nebulas pictures of the day";

        const loading = document.querySelector('#loading');
        loading.classList.add('disappear');
    }
    catch(error){
        console.error(error);
        const divContent = document.querySelector('#content');
        divContent.innerHTML('El error es: '+error);
    }
}

getDataWithAsync();


// 13. Si te animás un poco más mostra los datos que trajiste en el elemento div con id "content". En caso que sea un array podés iterar usando .forEach() o .map(). Para ello debes investigar y usar alguna de las siguientes APIs del DOM: querySelector(), innerHTML, textContent

//Hecho en el punto 12!