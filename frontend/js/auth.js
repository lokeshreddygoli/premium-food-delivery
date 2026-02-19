const base="http://localhost:5000";

async function register(){

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const role=document.getElementById("role").value;
const area=document.getElementById("area").value;

await fetch(base+"/auth/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password,role,area})
});

alert("Registered Successfully");
window.location="login.html";
}

async function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const res=await fetch(base+"/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
});

const user=await res.json();

if(!user){
alert("Invalid credentials");
return;
}

localStorage.setItem("user",JSON.stringify(user));

if(user.role==="owner")
window.location="owner.html";
else
window.location="customer.html";
}