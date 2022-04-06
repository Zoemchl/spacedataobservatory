// ...............ISS Selection

function issCurrent(){
    fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(data => data.json())
    .then(data => {
        var iss = document.querySelector('.iss_style')
        var latitude = data.latitude
        var longitude = data.longitude
        var longitude_extend = 50 / 180
        var latitude_extend = 50 / 90
        var longitude_pos = longitude * longitude_extend
        var latitude_pos = latitude * latitude_extend
        
        iss.style.left = `calc(${longitude_pos}% + 50%)`
        iss.style.bottom = `calc(${latitude_pos}% + 50%)`
    })   
}
issCurrent()

function getCor(){
    setTimeout(issCurrent())
}


// ...............Solar System

function solarSystem(){
    fetch("https://api.le-systeme-solaire.net/rest/bodies")
    .then(data => data.json())
    .then(data => {
        data.bodies.forEach(item => {
            if (item.isPlanet === true){
                console.log(item.name)
                const planets = document.querySelector('#planets')
                planets.innerHTML +=`
                <p class="planet_style"><a data-name="${item.id}" class="btn_planet">${item.name}</a></p>
                `
            }
        })
        document.querySelectorAll('.btn_planet').forEach(el => {
            el.addEventListener('click', function(){
                getPlanets(el.dataset.name)
            })
        })
    })
};



function getPlanets(test){
        // var name_planet = this.dataset.name
        var name_planet = test
        console.log(name_planet)
        fetch("https://api.le-systeme-solaire.net/rest/bodies/" + name_planet)
        .then(data => data.json())
        .then(data => { 
                document.querySelector('#result_infos').innerHTML =`
                <div class="little_div">
                <p class="infos_planet">'Density : '${data.density}</p>
                <p class="infos_planet">'Gravity : '${data.gravity}</p>
                <p class="infos_planet">'Inclination : '${data.inclination}</p>
                </div>
                `
        }
    )
};

solarSystem()

// ...............NASA pic of the day

function getPic(){
    
    var getdate = document.querySelector("#date_input").value;

    fetch("https://api.nasa.gov/planetary/apod?api_key=xMIJF743wNGdQ3QZKZ9n1Cv2JmH1DXBG9ua4W8lx&date=" + getdate)
    .then(response => response.json())
    .then(data => {
        const img_container = document.querySelector('#img_container')
            img_container.innerHTML = `
                <div class="card">
                <img src="${data.url}" alt="" class="img_style">
                <p class="title_img_style">${data.title}</p>
                <p class="explanation_style">${data.explanation}</p>
                </div>
            `
    });
}


