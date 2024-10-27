function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }
var map = L.map('map').setView([38,-97], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getLocality(latitude, longitude, markerNumber){
    try{
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        const data = await response.json();
        const locality = data.locality || "Unkown Locality";

        document.getElementById(`marker${markerNumber}`).innerText = `(${latitude},${longitude})`;
        document.getElementById(`locality${markerNumber}`).innerText = `Locality: ${locality}`;
    } catch(error) {
    console.error("Error fetching locality:", error);
    document.getElementById(`locality${markerNumber}`).innerText = "Locality: Not Found";

}
}

function randomCor(){

    for(let i = 1; i<= 3; i++) {
        const latitude = getRandomInRange(30, 35, 3);
        const longitude = getRandomInRange(-90, -100, 3);
        L.marker([latitude, longitude]).addTo(map);
        getLocality(latitude, longitude, i);
    }
    
}


window.onload = randomCor;
