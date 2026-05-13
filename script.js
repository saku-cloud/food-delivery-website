<! - -SCRIPT PAGE (script.js) - ->
// ================= CART SYSTEM =================
// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Save cart
function saveCart() {
localStorage.setItem("cart", JSON.stringify(cart));
}
// Add to Cart
function addToCart(item, price) {
let found = cart.find(p => p.item === item);
if (found) {
found.quantity++;
} else {
cart.push({ item, price, quantity: 1 });
}
saveCart();
alert(item + " added to cart");
}
// Remove Item
function removeItem(index) {
cart.splice(index, 1);
saveCart();
displayCart();
}
// Increase Quantity
function increaseQty(index) {
cart[index].quantity++;
saveCart();
displayCart();
}
// Decrease Quantity
function decreaseQty(index) {
if (cart[index].quantity > 1) {
cart[index].quantity--;
} else {
cart.splice(index, 1);
}
saveCart();
displayCart();
}
// ================= DISPLAY CART =================
function displayCart() {
let cartData = document.getElementById("cartData");
let total = 0;
if (!cartData) return;
if (cart.length === 0) {
cartData.innerHTML = "<h3>Your cart is empty</h3>";
return;
}
cartData.innerHTML = "";
cart.forEach((item, index) => {
let itemTotal = item.price * item.quantity;
total += itemTotal;
cartData.innerHTML += `
<div class="card">
<h3>${item.item}</h3>
<p>Price: ₹${item.price}</p>
<p>
Quantity: 
<button onclick="decreaseQty(${index})">-</button>
${item.quantity}
<button onclick="increaseQty(${index})">+</button>
</p>
<p>Total: ₹${itemTotal}</p>
<button onclick="removeItem(${index})">Remove</button>
</div>
`;
});
cartData.innerHTML += <h2>Total Amount: ₹${total}</h2>;
}
// ================= SEARCH =================
function searchFood() { 
let input = document.getElementById("search").value.toLowerCase();
let items = document.querySelectorAll("#foodList .card");
items.forEach(card => {
let name = card.getAttribute("data-name");
card.style.display = name.includes(input) ? "inline-block" : "none";
});
}
// ================= FILTER =================
function filterCategory(category) {
let items = document.querySelectorAll("#foodList .card");
items.forEach(card => {
let cat = card.getAttribute("data-category");
console.log("Button:", category,"Card:", cat);
if (category === "all" || cat === category) {
card.style.display = "inline-block";
} else {
card.style.display = "none";
}
});
}
// ================= DARK MODE =================
function toggleDarkMode() {
document.body.classList.toggle("dark");
// Save preference
let mode = document.body.classList.contains("dark") ? "dark" : "light";
localStorage.setItem("theme", mode);
}
// Load saved theme
function loadTheme() {
let saved = localStorage.getItem("theme");
if (saved === "dark") {
document.body.classList.add("dark");
}
}
// ================= LOGIN =================
function validateLogin() {
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
if (email === "" || password.length < 6) {
alert("Invalid login details");
return false;
}
alert("Login successful");
window.location.href = "index.html";
return false;
}
// ================= CHECKOUT =================
function loadCheckout() {
let summary = document.getElementById("orderSummary");
let total = 0;
if (!summary) return;
if (cart.length === 0) {
summary.innerHTML = "<p>Your cart is empty</p>";
return;
}
summary.innerHTML = "";
cart.forEach(item => {
let itemTotal = item.price * item.quantity;
total += itemTotal;
summary.innerHTML += `
<p>${item.item} x ${item.quantity} = ₹${itemTotal}</p>
`;
});
summary.innerHTML += <h3>Total: ₹${total}</h3>;
}
// Validate Checkout + Place Order
function validateCheckout() {
let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let address = document.getElementById("address").value;
let payment = document.getElementById("payment").value;
if (name === "" || phone.length < 10 || address === "" || payment === "") {
alert("Please fill all details correctly");
return false;
}
alert("Order placed successfully!");
localStorage.removeItem("cart");
window.location.href = "success.html";
return false;
}
