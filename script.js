/* ================= EXERCISE 1 - ADD TO CART ================= */
const products = [
  { name: "Laptop", price: 900, img: "https://wajiz.pk/wp-content/uploads/2024/12/apple-macbook-air-2020.3.jpg" },
  { name: "Watch", price: 150, img: "https://qmart.pk/wp-content/uploads/2024/12/Apple-Watch-Series-10-46mm-Rose-Gold-Aluminium-Case-Starlight-Sport-Band-Qmart-7.png" },
  { name: "Smartphone", price: 700, img: "https://applepremiumstore.com.ng/wp-content/uploads/2025/07/G0bLx54WEAA6dVj.jpg-large.jpeg" },
  { name: "Airpods", price: 120, img: "https://www.buykarlo.pk/wp-content/uploads/2022/12/apple_airpods_pro_2_anc_hengxuan_wireless_bluetooth_earphone_active_noise_cancellation-scaled.jpeg" }
];

let cart = [];

const productList = document.getElementById("product-list");
products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h4>${p.name}</h4>
    <p>$${p.price}</p>
    <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
  `;
  productList.appendChild(div);
});

function addToCart(name, price) {
  try {
    if (!name || price <= 0) throw "Invalid product data";
    const item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    displayCart();
  } catch (e) {
    alert("Error: " + e);
  }
}

function displayCart() {
  const body = document.getElementById("cart-body");
  body.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>${item.qty}</td>
        <td>$${item.price * item.qty}</td>
        <td><button onclick="removeItem(${i})">X</button></td>
      </tr>`;
  });
  document.getElementById("cart-total").innerText = "Total: $" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  displayCart();
}

/* ================= EXERCISE 2 - CHAT APP ================= */
function Message(text, sender) {
  this.text = text;
  this.sender = sender;
}

let messages = [];
function sendMessage() {
  const input = document.getElementById("chat-input");
  try {
    if (input.value.trim() === "") throw "Message cannot be empty";
    const msg = new Message(input.value, "User");
    messages.push(msg);
    appendMessage(msg);
    input.value = "";
    setTimeout(() => {
      const reply = new Message("Got it!", "Bot");
      messages.push(reply);
      appendMessage(reply);
    }, 1000);
  } catch (err) {
    alert(err);
  }
}

function appendMessage(msg) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = "message " + (msg.sender === "User" ? "user" : "bot");
  div.textContent = msg.text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

/* ================= EXERCISE 3 - FORM BUILDER ================= */
function addField(type) {
  const form = document.getElementById("dynamic-form");
  const div = document.createElement("div");
  switch (type) {
    case "text":
      div.innerHTML = `<input type='text' placeholder='Enter Text'>`;
      break;
    case "email":
      div.innerHTML = `<input type='email' placeholder='Enter Email'>`;
      break;
    case "dropdown":
      div.innerHTML = `
        <select>
          <option value="">Select Option</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>`;
      break;
  }
  form.appendChild(div);
}

function validateForm() {
  const inputs = document.querySelectorAll("#dynamic-form input, #dynamic-form select");
  try {
    inputs.forEach(el => {
      el.style.border = "1px solid #ccc";
      if (el.type === "text" && el.value.trim() === "") throw "Text field empty";
      if (el.type === "email" && !/\S+@\S+\.\S+/.test(el.value)) throw "Invalid email";
      if (el.tagName === "SELECT" && el.value === "") throw "Select a dropdown value";
    });
    alert("Form validated successfully!");
  } catch (err) {
    alert(err);
  }
}

/* ================= EXERCISE 4 - EXPENSE TRACKER ================= */
function Expense(desc, amount, category) {
  this.desc = desc;
  this.amount = amount;
  this.category = category;
}
let expenses = [];

function addExpense() {
  try {
    const desc = document.getElementById("desc").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    if (!desc || isNaN(amount) || !category) throw "Invalid input";
    const exp = new Expense(desc, amount, category);
    expenses.push(exp);
    displayExpenses();
  } catch (err) {
    alert(err);
  }
}

function displayExpenses() {
  const body = document.getElementById("expense-body");
  body.innerHTML = "";
  let total = 0;
  expenses.forEach((e, i) => {
    total += e.amount;
    body.innerHTML += `<tr>
      <td>${e.desc}</td>
      <td>$${e.amount}</td>
      <td>${e.category}</td>
      <td><button onclick="deleteExpense(${i})">X</button></td>
    </tr>`;
  });
  document.getElementById("total-expense").innerText = "Total: $" + total;
}

function deleteExpense(i) {
  expenses.splice(i, 1);
  displayExpenses();
}

/* ================= MENU CONTROL ================= */
function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
}

/* Default section */
showSection('cart');
