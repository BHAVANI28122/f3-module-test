

//  async function getIp(){
 

//  try {
//   const response = await fetch(
//     "https://api.ipify.org?format=json"
//   );
//  let IP_address = await response.json();
//   localStorage.setItem("IP",IP_address.ip);

//   }

//  catch (e) {
//   console.log("Error--", e);
//  }

//  }

let ip;
let IpData;
let postalInfo;

 function getIp(){

  return new Promise((resolve,reject)=>{
    fetch("https://api.ipify.org?format=json").
    then((res)=>(res.json())).
    then((data)=>resolve(data)).catch((err)=>console.log(err))
  })
}

function getIpData(){

  return new Promise((resolve,reject)=>{
   let IP = sessionStorage.getItem("IP");
   console.log(IP);
    fetch(`https://ipinfo.io/${IP}/geo`).
    then((res)=>(res.json())).
    then((data)=>resolve(data)).catch((err)=>console.log(err))
  })
}

function fetchPostal(){

  return new Promise((resolve,reject)=>{
    let details = JSON.parse(sessionStorage.getItem("IpInfo"));
    fetch(`https://api.postalpincode.in/pincode/${details.postal}`).
    then((res)=>(res.json())).
    then((data)=>resolve(data)).catch((err)=>console.log(err))
  })
}





getIp().then((data)=>{
  let ip = data.ip;
  sessionStorage.setItem("IP",ip);
}).catch((e)=>{
  console.log(e);
})

getIpData().then((data)=>{
 let  IpData = JSON.stringify(data);
  sessionStorage.setItem("IpInfo",IpData);
}).catch((e)=>{
  console.log(e);
})

fetchPostal().then((data)=>{
  let postalInfo = JSON.stringify(data) ;
  sessionStorage.setItem("postalInfo",JSON.stringify(postalInfo));

     
  showData();
}).catch((e)=>{
  console.log(e);
})







    
//  async function getIpData(IP){
  
//     try {
//       const response = await fetch(
//         `https://ipinfo.io/${IP}/geo`
//       );
//     let  data = await response.json();
//       localStorage.setItem("IPinfo",JSON.stringify(data));
    
//     } catch (e) {
//       console.log("Error--", e);
//     }
//  }

//   getIpData();   
//   console.log(JSON.parse(localStorage.getItem("IPinfo")));

  // let details = JSON.parse(localStorage.getItem("IpInfo"));
  // console.log(details);
     
//  async function fetchpostal(){

//   try{
//  const response = await fetch(`https://api.postalpincode.in/pincode/${details.postal}`);
//   let data = await response.json();
//     localStorage.setItem("postal",JSON.stringify(data));
//   }
//   catch (e) {
//     console.log("Error--", e);
//   }

// }
// fetchpostal();


// let postal = JSON.parse(localStorage.getItem("postalInfo"));
// console.log(postal);
// let arr = postal[0].PostOffice;

function showData(){


  let details = JSON.parse(sessionStorage.getItem("IpInfo"));
  console.log(details);
  
let postal = JSON.parse(sessionStorage.getItem("postalInfo"));
console.log(postal);
let arr = postal[0].PostOffice;

let longitude_latitude =details.loc.split(",");
let latitude = longitude_latitude[0];
let longitude = longitude_latitude[1];
let timeZone  = new Date().toLocaleString("en-US", { timeZone: `${details.timezone}` });

  let text = document.querySelector(".latitue-info");
  text.innerHTML =` <div>
  <p>Lat: ${latitude}</p>
</div>
<div>
  <p>City: ${details.city}</p>
</div>
<div>
  <p>Organisation: ${details.org}</p>
</div>
<div>
  <p>Long: ${longitude}</p>
</div>
<div>
  <p>Region: ${details.region}</p>
</div>
<div>
  <p>Hostname: ${details.hostname}</p>
</div>`

let location = document.querySelector(".map");
location.innerHTML =`<iframe src="https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed" width="100%" height="600px" frameborder="0" style="border:0"></iframe>
`
 
let time_date = document.querySelector(".time-info");
time_date.innerHTML =` <p>Time Zone: ${details.timezone}</p>
<p>Date And Time: ${timeZone}</p>
<p>Pincode: ${details.postal}</p>
<p>Message: ${postal[0].Message}</p>
`

console.log(arr);

postalData(arr);

}





function postalData(arr){


let postalbox = document.querySelector(".post-office-info");

let box = "";
arr.forEach((item)=>{
  
  box +=`<div class="item">
  <p>Name : ${item.Name}</p>
  <p>Branch Type : ${item.BranchType}</p>
  <p>Delivery Status : ${item.DeliveryStatus}</p>
  <p>District : ${item.District}</p>
  <p>Division : ${item.Division}</p>
</div>`

})
postalbox.innerHTML= box;
}

document.getElementById("search").addEventListener("input", () => {
 
  if(document.getElementById("search").value == ""){

    document.querySelector(".post-office").style.display="block";
    document.querySelector(".post").style.display="none";
    postalData(arr);
       
  }
  else{
    document.querySelector(".post-office").style.display="none";
    document.querySelector(".post").style.display="block";
    var newArr = arr.filter((item) =>
    item.BranchType
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  
  filterData(newArr);


  }

});

function filterData(arr){
  
  let postalbox = document.querySelector(".postdetails");

let box = "";
arr.forEach((item)=>{
  
  box +=`<div class="item">
  <p>Name : ${item.Name}</p>
  <p>Branch Type : ${item.BranchType}</p>
  <p>Delivery Status : ${item.DeliveryStatus}</p>
  <p>District : ${item.District}</p>
  <p>Division : ${item.Division}</p>
</div>`

})
postalbox.innerHTML= box;
}





