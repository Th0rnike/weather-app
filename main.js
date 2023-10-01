// Define a function to apply styles for the dark theme
function applyDarkThemeStyles() {
    weatherDiv.style.backgroundColor = "#0d0c22";
    for (const li of dataList.childNodes) {
        li.style.color = "#fff";
    }
    for (const label of labels) {
        label.style.color = "#fff";
    }
    info.style.color = "#fff";
}

// Define a function to apply styles for the light theme
function applyLightThemeStyles() {
    weatherDiv.style.backgroundColor = "#ea4335";
    for (const li of dataList.childNodes) {
        li.style.color = "#0d0c22";
    }
    for (const label of labels) {
        label.style.color = "#0d0c22";
    }
    info.style.color = "#0d0c22";
}



const API = "026288e9b73e8747a756f697d52ab8dd"

const weatherDiv = document.getElementById("weather")
const form = document.querySelector('form')
const latInput = document.getElementById("latitude")
const logInput = document.getElementById("longitude")
const labels = document.getElementsByClassName('forInputs')
const button = document.getElementById("button")
const info = document.querySelector("#info")
const dataList = document.getElementById("dataList")
const switchDiv = document.getElementById("switchDiv")

const backgroundChange = document.getElementById("flexSwitchCheckDefault")

backgroundChange.addEventListener("change", () => {
    if (backgroundChange.checked) {
        applyDarkThemeStyles();
    } else {
        applyLightThemeStyles();
    }
});


button.addEventListener('click', (e) => {
    e.preventDefault()

    const lat = latInput.value;
    const lon = logInput.value;

    let latCheck = form.dataset.lat
    let lonCheck = form.dataset.lon

    form.dataset.lat = lat;
    form.dataset.lon = lon;

    if(!(lat === latCheck && lon === lonCheck)){
        dataList.childNodes.textContent = "";
        if(lat === '' || lon === ''){
            info.innerHTML = "Please insert coordinates"
        }else if(lat > 90 || lat < -90 || lon > 180 || lon < -180){
            info.innerHTML = "Please insert correct coordinates"
        }
        else{
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}&units=${"metric"}`

            let place, country, feelsLike, tempMax, tempMin, weather, description, humidity, clouds;

            fetch(url)
                .then((response) => {
                    if(!response.ok){
                        throw new Error("Network response was not ok")
                    }
                    return response.json()
                })
                .then((data) => {
                    place = data.name
                    feelsLike = data.main.feels_like
                    tempMax = data.main.temp_max
                    tempMin = data.main.temp_min
                    weather = data.weather[0].main
                    description = data.weather[0].description
                    country = data.sys.country
                    humidity = data.main.humidity
                    clouds = data.clouds.all

                    // clears li previous elements
                    while (dataList.firstChild) {
                        dataList.removeChild(dataList.firstChild);
                    }
                    // console.log(data)


                    info.innerHTML = ''
    
                    const datasetItems = [
                        {label: "Place", value: place},
                        {label: "Feels Like", value: feelsLike},
                        {label: "Min Temperature", value: tempMin},
                        {label: "Max Temperature", value: tempMax},
                        {label: "Weather", value: weather},
                        {label: "Description", value: description},
                        {label: "Humidity", value: humidity},
                        {label: "Country", value: country},
                        {label: "Clouds", value: clouds}
                    ]

                    datasetItems.forEach((items, index) => {
                        const li = document.createElement("li")
                        li.textContent = `${items.value}`
                        if(li.textContent !== 'undefined'){
                            dataList.appendChild(li)
                        }
                        

                        switchDiv.style.setProperty("visibility", "visible", "important");
                        // backgroundChange.addEventListener("change", () => {
                        //     if(backgroundChange.checked){
                        //         {
                        //             weatherDiv.style.backgroundColor = "#0d0c22";
                        //             dataList.childNodes[index].style.color = "#fff";
                        //             labels[0].style.color = "#fff";
                        //             labels[1].style.color = "#fff";
                        //             info.style.color = "#fff";
                        //         }
                        //     }else{
                        //         weatherDiv.style.backgroundColor = "#ea4335"
                        //         dataList.childNodes[index].style.color = "#0d0c22"
                        //         labels[0].style.color = "#0d0c22"
                        //         labels[1].style.color = "#0d0c22"
                        //         info.style.color = "#0d0c22"
                        //     }
                        // })
                        
                        if (backgroundChange.checked) {
                            applyDarkThemeStyles();
                        } else {
                            applyLightThemeStyles();
                        }
                    

                        switch (index) {
                            case 0:
                                li.dataset.placename = "placename"
                                break;
                            case 1:
                                li.dataset.feelsLike = "feelslike";
                                break;
                            case 2:
                                li.dataset.min = "min";
                                break;
                            case 3:
                                li.dataset.max = "max"
                                break;
                            case 4:
                                li.dataset.weather = "weather"
                                li.classList.add("right-part")
                                break;  
                            case 5:
                                li.dataset.description = "description"
                                li.classList.add("right-part")
                                break;  
                            case 6:
                                li.dataset.humidity = "humidity"
                                li.classList.add("right-part")
                                break;
                            case 7:
                                li.dataset.country = "country"
                                li.classList.add("right-part")
                                break;
                            case 8:
                                li.dataset.clouds = "clouds"
                                li.classList.add("right-part")
                                break;
                            default:
                                break;
                        }           
                    })


                    // window.location.href = "detailed.html"
                })   
                .catch((error) => {
                    console.log(error)
                })
        }
    }
        
})


