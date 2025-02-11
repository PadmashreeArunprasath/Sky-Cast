const cityInput = document.querySelector(".city-input")
const searchBtn = document.querySelector(".serach-btn")

const weatherInfoSection = document.querySelector(".weather-info")
const notFountSection = document.querySelector(".not-found")
const searchCitySection = document.querySelector(".search-city")

const apiKey = 'aa9ca204edd50bf0458d349281f0a0dc'

searchBtn.addEventListener("click",()=>{
    if(cityInput.value.trim()!=''){
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur()
    }  
})

cityInput.addEventListener('keydown',(event) =>{
    if(event.key == 'Enter' &&
        cityInput.value.trim()!=''
     ){
        updateWeatherInfo(cityInput.value)
        cityInput.value = '';
        cityInput.blur()
     }
})

async function getFetchData(endPoint , city){
    const apiUrl= `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`
    
    const response = await fetch(apiUrl)

    return response.json()
}


async function updateWeatherInfo(city){
    const weatherData= await  getFetchData('weather',city)

    if(weatherData.cod!=200){
        showDisplaySection(notFountSection)
        return
    }
    console.log(weatherData)
    
    const{
        name: country,
        main: { temp, humidity },
        wind: { speed },
    } = weatherData

    showDisplaySection(weatherInfoSection)
}

function showDisplaySection(section){
    [weatherInfoSection,searchCitySection ,notFountSection]
    .forEach(section=>section.style.display='none')

    section.style.display='flex'
}