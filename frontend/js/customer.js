const base = "https://premium-food-delivery.onrender.com";

async function loadFoods(){

const res=await fetch(base+"/food");
const foods=await res.json();

let html="";

foods.forEach(f=>{
html+=`
<div class="card">
<h3>${f.name}</h3>
<p>Restaurant: ${f.restaurant}</p>
<p>₹${f.price}</p>
<button onclick="order('${f._id}','${f.restaurant}',${f.price})">
Order
</button>
</div>
`;
});

document.getElementById("foods").innerHTML=html;
}

loadFoods();

async function order(id,restaurant,price){

const user=JSON.parse(localStorage.getItem("user"));

const res=await fetch(base+"/order/place",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
userId:user._id,
foodId:id,
restaurant,
price,
area:user.area,
groupEnabled:false
})
});

const order=await res.json();

await fetch(base+"/payment/pay",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
userId:user._id,
orderId:order._id,
amount:order.price
})
});

alert("Order placed successfully");
}
