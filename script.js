/////////forEach/map/filter/reduce/sort/////////////
q = console.log;
////////////////////////////////////////////////////
const apiUrl = "https://randomuser.me/api";

const names = document.getElementsByClassName("names")[0];
const wealthes = document.getElementsByClassName("wealthes")[0];

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let users = [
  {
    firstName: "payam",
    lastName: "mohajerat",
    wealth: "0",
  },
];

const show = (users) => {
  document.getElementsByClassName("thirdRow1")[0].style = "display: none;";

  names.innerHTML = "";
  wealthes.innerHTML = "";
  users.forEach((element) => {
    names.innerHTML += `<p>${element.firstName} ${element.lastName}</p>`;
    wealthes.innerHTML += `<p>${dollarUS.format(element.wealth)}</p>`;
  });
};

async function getData() {
  const newUser = {
    firstName: "",
    lastName: "",
    wealth: "",
  };
  const response = await fetch(apiUrl);
  const data = await response.json();
  const newUserName = data.results[0].name;
  newUser.firstName = newUserName.first;
  newUser.lastName = newUserName.last;
  newUser.wealth = (Math.random() * 1000000).toFixed(2);
  users.push(newUser);
  show(users);
}

const doubleMoney = () => {
  users = users.map(doubleWealth);
  show(users);
};

const doubleWealth = (object) => {
  return {
    firstName: `${object.firstName}`,
    lastName: `${object.lastName}`,
    wealth: `${object.wealth * 2}`,
  };
};

const sortByRichest = () => {
  users = users.sort(function (obj1, obj2) {
    return obj2.wealth - obj1.wealth;
  });
  show(users);
};

function checkMillionair(obj) {
  return obj.wealth >= 1000000;
}

function showOnlyMillionaires() {
  users = users.filter(checkMillionair);
  show(users);
}

function totalWealth(total, obj) {
  return total + parseFloat(obj.wealth);
}

function calculateEntireWealth() {
  document.getElementsByClassName("thirdRow1")[0].style = "display: block;";
  document.getElementsByClassName("total")[0].innerHTML = dollarUS.format(
    users.reduce(totalWealth, 0)
  );
}

show(users);
