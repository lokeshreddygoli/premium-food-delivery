const base = "https://premium-food-delivery.onrender.com";

function showToast(message){
  const toast=document.createElement("div");
  toast.className="toast";
  toast.textContent=message;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>toast.classList.add("show"));
  setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=>toast.remove(),250);
  },2200);
}

async function register(){
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value;
  const role=document.getElementById("role").value;
  const area=document.getElementById("area").value.trim();

  if(!name || !email || !password || !area){
    showToast("Please fill all fields.");
    return;
  }

  const res = await fetch(base+"/auth/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,email,password,role,area})
  });

  if(!res.ok){
    showToast("Registration failed. Try again.");
    return;
  }

  showToast("Registered successfully.");
  setTimeout(()=> window.location="login.html",500);
}

async function login(){
  const email=document.getElementById("email").value.trim();
  const password=document.getElementById("password").value;

  if(!email || !password){
    showToast("Enter email and password.");
    return;
  }

  const res=await fetch(base+"/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,password})
  });

  const user=await res.json();

  if(!user || !user._id){
    showToast("Invalid credentials");
    return;
  }

  localStorage.setItem("user",JSON.stringify(user));
  showToast("Welcome back, "+user.name);

  if(user.role==="owner") window.location="owner.html";
  else window.location="customer.html";
}
