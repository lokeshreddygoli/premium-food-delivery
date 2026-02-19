const base="https://premium-food-delivery.onrender.com/";

async function addFood(){

const name=document.getElementById("name").value;
const price=document.getElementById("price").value;
const restaurant=document.getElementById("restaurant").value;

await fetch(base+"/food/add",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,price,restaurant})
});

loadFoods();
}

async function loadFoods(){

const res=await fetch(base+"/food");
const foods=await res.json();

let html="";

foods.forEach(f=>{
html+=`
<div class="card">
<h3>${f.name}</h3>
<p>₹${f.price}</p>
<button onclick="deleteFood('${f._id}')">Delete</button>
</div>
`;
});

document.getElementById("foodList").innerHTML=html;
}

async function deleteFood(id){
await fetch(base+"/food/"+id,{method:"DELETE"});
loadFoods();
}

async function loadOrders(){

const res=await fetch(base+"/order");
const orders=await res.json();

let html="";

orders.forEach(o=>{
html+=`
<div class="card">
<p>Order: ${o._id}</p>
<p>Restaurant: ${o.restaurant}</p>
<p>Status: ${o.status}</p>
<p>Delivery: ₹${o.deliveryCharge}</p>
<p>Discount: ₹${o.discount}</p>
</div>
`;
});

document.getElementById("orders").innerHTML=html;
}

async function loadFraud(){

const res=await fetch(base+"/payment");
const data=await res.json();

let html="";

data.forEach(t=>{
html+=`
<div class="card">
<p>Txn: ${t.transactionId}</p>
<p>Fraud Score: ${t.fraudScore.toFixed(2)}</p>
<p>Status: ${t.status}</p>
</div>
`;
});

document.getElementById("fraud").innerHTML=html;
}

loadFoods();
loadOrders();
loadFraud();