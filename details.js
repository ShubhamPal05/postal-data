const ipaddress = document.getElementById("ipHomePage");
var geoDetails;
fetch("https://api.ipify.org/?format=json")
.then( (response)=>{
    const data = response.json()
    return data
})
.then( (data) =>{
    ipaddress.innerHTML = data.ip;
    geoDetails = fetch(`https://ipinfo.io/${data.ip}/geo`).then( (data) => data.json());
    return geoDetails;
})
.then( (data) =>{
    console.log(data);
    renderGeoDetails(data);
});

function renderGeoDetails(geoDetails) {
    const firstContainer = document.getElementsByClassName("firstContainerDetails");
    var lat ="";
    var long ="";
    const coord = geoDetails.loc;
    for(let i=0; i<coord.length; i++){
        if(coord.charAt(i) === ','){
            long = coord.substring(i+1);
            break;
        }
        lat += coord.charAt(i);
    }

    firstContainer[0].innerHTML = lat;
    firstContainer[1].innerHTML = geoDetails.city;
    firstContainer[2].innerHTML = geoDetails.org;
    firstContainer[3].innerHTML = long;
    firstContainer[4].innerHTML = geoDetails.region;
    firstContainer[5].innerHTML = geoDetails.hostname;

    const iframe = document.querySelector("#mapDisplay iframe");
    iframe.setAttribute("src", `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`);

    const secondContainer = document.getElementsByClassName("secondContainer");

    secondContainer[0].innerHTML = geoDetails.timezone;
    secondContainer[1].innerHTML = new Date;
    secondContainer[2].innerHTML = geoDetails.postal;


    renderPostOffices(geoDetails);
    
}

async function renderPostOffices(geoDetails){
    var posalData = await fetch(`https://api.postalpincode.in/pincode/${geoDetails.postal}`).then(data => data.json());
    //var posalData = await fetch(`https://api.postalpincode.in/pincode/226004`).then(data => data.json());
    console.log(posalData);
    posalData = posalData[0].PostOffice;
    console.log(posalData);
    const postalTable = document.getElementById("postalTable");
    var row = document.createElement("tr");
    var col = document.createElement("td");
    var div = document.createElement("div");

    for(let i = 0; i<posalData.length; i++){
        let newRow = row.cloneNode(true);
        let newCol = col.cloneNode(true);
        let newDiv = div.cloneNode(true);
        
        newDiv.innerHTML = `<h2>Name: ${posalData[i].Name}</h2> <h2>Branch Type: ${posalData[i].BranchType}</h2> <h2>Delivery Status: ${posalData[i].DeliveryStatus}</h2> <h2>district: ${posalData[i].District}</h2> <h2>Division: ${posalData[i].Division} `;
        newCol.appendChild(newDiv);
        newRow.appendChild(newCol);

        i++;
        if(i == posalData.length){
            break;
        }

        newCol = col.cloneNode(true);
        newDiv = div.cloneNode(true);
        newDiv.innerHTML = `<h2>Name: ${posalData[i].Name}</h2> <h2>Branch Type: ${posalData[i].BranchType}</h2> <h2>Delivery Status: ${posalData[i].DeliveryStatus}</h2> <h2>district: ${posalData[i].District}</h2> <h2>Division: ${posalData[i].Division} `;
        newCol.appendChild(newDiv);
        newRow.appendChild(newCol);


        postalTable.appendChild(newRow);
        console.log(i);
    }
}