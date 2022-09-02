const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const money_minus = document.getElementById("money-minus");

const localStorageTransations = JSON.parse(localStorage.getItem("transations"));

let transations =
  localStorage.getItem("transations") !== null ? localStorageTransations : [];

function addTransation(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    text.placeholder = "please enter the name";
    text.style.backgroundColor = "#ccc";
    amount.placeholder = "please ennter the amount";
    amount.style.backgroundColor = "#ccc";
  } else {
    const transation = {
      id: genenrateID(),
      text: text.value,
      amount: +amount.value,
    };
    transations.push(transation);
    addTransationDOM(transation);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}
function genenrateID() {
  return Math.floor(Math.random() * 100000000);
}

//add transations to dom list
function addTransationDOM(transation) {
  //get sign
  const sign = transation.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //add class based on value
  item.classList.add(transation.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transation.text} <span>${sign}${Math.abs(
    transation.amount
  )}</span> <button class="delete-btn" onclick="removeTransation(${
    transation.id
  })">x</button>`;
  list.appendChild(item);
}
function updateValues() {
  const amounts = transations.map((transation) => transation.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerText = `₹${income}`;
  money_minus.innerText = `₹${expense}`;
}
function removeTransation(id) {
  transations = transations.filter((transation) => transation.id !== id);
  updateLocalStorage();
  init();
}
function updateLocalStorage() {
  localStorage.setItem("transations", JSON.stringify(transations));
}
function init() {
  list.innerHTML = "";
  transations.forEach(addTransationDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransation);

document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}