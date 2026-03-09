const base="https://premium-food-delivery.onrender.com";
let foodsCache=[];
let ordersCache=[];
let fraudCache=[];

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

function logout(){
  localStorage.removeItem("user");
  window.location="login.html";
}

function renderStats(){
  const pending=ordersCache.filter(o=>o.status!=="Delivered").length;
  const flagged=fraudCache.filter(t=>t.status!=="success").length;

  document.getElementById("ownerStats").innerHTML=`
    <div class="card"><p class="small">Menu Items</p><h2>${foodsCache.length}</h2></div>
    <div class="card"><p class="small">Active Orders</p><h2>${pending}</h2></div>
    <div class="card"><p class="small">Flagged Transactions</p><h2>${flagged}</h2></div>
  `;
}

async function addFood(){
  const name=document.getElementById("name").value.trim();
  const price=document.getElementById("price").value.trim();
  const restaurant=document.getElementById("restaurant").value.trim();

  if(!name || !price || !restaurant){
    showToast("Please fill all food details.");
    return;
  }

  await fetch(base+"/food/add",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name,price,restaurant})
  });

  document.getElementById("name").value="";
  document.getElementById("price").value="";
  document.getElementById("restaurant").value="";

  showToast("Food added.");
  loadFoods();
}

async function loadFoods(){
  const res=await fetch(base+"/food");
  foodsCache=await res.json();

  document.getElementById("foodList").innerHTML=foodsCache.map(f=>`
    <div class="card">
      <div class="card-row">
        <h3>${f.name}</h3>
        <span class="badge">₹${f.price}</span>
      </div>
      <p>${f.restaurant}</p>
      <button class="danger" style="margin-top:12px;" onclick="deleteFood('${f._id}')">Delete</button>
    </div>
  `).join("") || '<div class="empty">No food items yet.</div>';

  renderStats();
}

async function deleteFood(id){
  await fetch(base+"/food/"+id,{method:"DELETE"});
  showToast("Food removed.");
  loadFoods();
}

async function loadOrders(){
  const res=await fetch(base+"/order");
  ordersCache=await res.json();

  document.getElementById("orders").innerHTML=ordersCache.map(o=>`
    <div class="card">
      <p class="small">Order ID</p>
      <h3>${o._id}</h3>
      <p>${o.restaurant}</p>
      <span class="badge">${o.status}</span>
    </div>
  `).join("") || '<div class="empty">No orders yet.</div>';

  renderStats();
}

async function loadFraud(){
  const res=await fetch(base+"/payment");
  fraudCache=await res.json();

  document.getElementById("fraud").innerHTML=fraudCache.map(t=>`
    <div class="card">
      <p class="small">Txn</p>
      <h3>${t.transactionId}</h3>
      <span class="badge">${t.status}</span>
    </div>
  `).join("") || '<div class="empty">No transactions yet.</div>';

  renderStats();
}

loadFoods();
loadOrders();
loadFraud();
setInterval(()=>{ loadOrders(); loadFraud(); }, 20000);
