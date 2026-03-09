const base = "https://premium-food-delivery.onrender.com";
let allFoods=[];

function showToast(message){
  const toast=document.createElement("div");
  toast.className="toast";
  toast.textContent=message;
  document.body.appendChild(toast);
  requestAnimationFrame(()=>toast.classList.add("show"));
  setTimeout(()=>{
    toast.classList.remove("show");
    setTimeout(()=>toast.remove(),250);
  },2000);
}

function logout(){
  localStorage.removeItem("user");
  window.location="login.html";
}

function renderStats(){
  const restaurants=new Set(allFoods.map(f=>f.restaurant)).size;
  const avg=allFoods.length ? Math.round(allFoods.reduce((a,f)=>a+Number(f.price),0)/allFoods.length) : 0;
  document.getElementById("stats").innerHTML=`
    <div class="card"><p class="small">Available Dishes</p><h2>${allFoods.length}</h2></div>
    <div class="card"><p class="small">Partner Restaurants</p><h2>${restaurants}</h2></div>
    <div class="card"><p class="small">Average Price</p><h2>₹${avg}</h2></div>
  `;
}

function renderFoods(){
  const q=document.getElementById("search").value.toLowerCase().trim();
  const sort=document.getElementById("sort").value;

  let foods=[...allFoods].filter(f=>
    f.name.toLowerCase().includes(q) || f.restaurant.toLowerCase().includes(q)
  );

  if(sort==="low") foods.sort((a,b)=>Number(a.price)-Number(b.price));
  if(sort==="high") foods.sort((a,b)=>Number(b.price)-Number(a.price));

  if(!foods.length){
    document.getElementById("foods").innerHTML='<div class="glass empty">No food matches your search.</div>';
    return;
  }

  document.getElementById("foods").innerHTML=foods.map(f=>`
    <div class="card">
      <div class="card-row">
        <h3>${f.name}</h3>
        <span class="badge">₹${f.price}</span>
      </div>
      <p>${f.restaurant}</p>
      <button style="margin-top:12px;" onclick="order('${f._id}','${f.restaurant}',${f.price})">Order Now</button>
    </div>
  `).join("");
}

async function loadFoods(){
  const res=await fetch(base+"/food");
  allFoods=await res.json();
  renderStats();
  renderFoods();
}

async function order(id,restaurant,price){
  const user=JSON.parse(localStorage.getItem("user"));
  if(!user){
    showToast("Please login again.");
    logout();
    return;
  }

  const groupEnabled=document.getElementById("groupToggle").checked;

  const res=await fetch(base+"/order/place",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      userId:user._id,
      foodId:id,
      restaurant,
      price,
      area:user.area,
      groupEnabled
    })
  });

  const order=await res.json();

  await fetch(base+"/payment/pay",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ userId:user._id, orderId:order._id, amount:order.price })
  });

  showToast("Order placed successfully! 🎉");
}

loadFoods();
