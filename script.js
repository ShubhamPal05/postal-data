
const ipaddress = document.getElementById("ipHomePage");
const getDataBtn = document.getElementById("getDataBtn");
// export const myIP;

fetch("https://api.ipify.org/?format=json")
.then( (response)=>{
    const data = response.json()
    return data
})
.then( (data) =>{
    ipaddress.innerHTML = data.ip;
    myIP = data.ip;
});

getDataBtn.addEventListener("click", () =>{
    window.location.href = "./details.html";
});