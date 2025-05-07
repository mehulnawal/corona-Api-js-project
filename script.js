/*
section 1 ✔
https://disease.sh/v3/covid-19/all
Total cases - 
todayCases - 

Total Deaths - 
todayDeaths - 

Total recovered - 
Recovery rate - 

Total active cases - 
Active rate- 

section 2 ✔
https://disease.sh/v3/covid-19/countries

section 3
table view and card view toggle
*/

// current date
let date = document.getElementById("date");

setInterval(() => {
    const d = new Date();
    date.innerHTML = d;
}, 1000);


let totalCasesData = document.getElementById("totalCasesData");
let todayCasesData = document.getElementById("todayCasesData");

let totalDeathData = document.getElementById("totalDeathData");
let todayDeathData = document.getElementById("todayDeathData");

let totalRecoveredData = document.getElementById("totalRecoveredData");
let todayRecoveredData = document.getElementById("todayRecoveredData");

let totalActiveData = document.getElementById("totalActiveData");
let todayActiveData = document.getElementById("todayActiveData");

let globalData = async () => {
    let response = await fetch("https://disease.sh/v3/covid-19/all");

    let data = await response.json();

    totalCasesData.innerText = data.cases;
    todayCasesData.innerText = data.todayCases;

    totalDeathData.innerText = data.deaths;
    todayDeathData.innerText = data.todayDeaths;

    totalRecoveredData.innerText = data.recovered;
    todayRecoveredData.innerText = ((data.recovered / data.cases) * 100).toFixed(2);

    totalActiveData.innerText = data.active;
    todayActiveData.innerText = ((data.active / data.cases) * 100).toFixed(2);

};
globalData();


let tbody = document.getElementById("tbody");
let row = "";
const tableView = async () => {
    let response = await fetch("https://disease.sh/v3/covid-19/countries");
    let data = await response.json();

    data.forEach((value) => {
        row = document.createElement("tr");
        row.innerHTML = `
                    <td class="d-flex align-items-center gap-2">
                        <img src="${value.countryInfo.flag}" alt="" id="countryFlag">
                        <div>${value.country}</div>
                    </td>
                    <td>${value.cases}</td>
                    <td>${value.todayCases}</td>
                    <td>${value.deaths}</td>
                    <td>${value.todayDeaths}</td>
                    <td>${value.recovered}</td>
                    <td>${value.active}</td>
                    <td>${value.critical}</td>`;
        tbody.appendChild(row);
    });
};
// tableView();

const cardData = async () => {
    let response = await fetch("https://disease.sh/v3/covid-19/countries");
    let data = await response.json();

    data.forEach((value) => {
        let cardBox = document.createElement("div");

        cardBox.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12");

        cardBox.innerHTML = `
            <div class="card">
                <div id="title" class="d-flex align-items-center gap-2">
                    <img src="${value.countryInfo.flag}" id="logo"></img>
                    <div id="countryName">${value.country}</div>
                </div>

                <div class="row" id="data">
                    <div class="col-6 cardCasesBox">
                        <h6>Total Cases</h6>
                        <div id="cardTotalCases">${value.cases}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Deaths</h6>
                        <div id="cardDeathCases">${value.deaths}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Total Recovered</h6>
                        <div id="cardRecovered">${value.recovered}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Active Cases</h6>
                        <div id="cardActiveCases">22123398</div>
                    </div>
                </div>

            </div>`;

        cardView.append(cardBox);
    });
};


// toggle view data and table
let tableIcon = document.getElementById("tableIcon")
let tableContent = document.getElementById("tableContent")
let tableViewHtml = document.getElementById("tableView")

let cardIcon = document.getElementById("cardIcon")
let cardContent = document.getElementById("cardContent")
let cardView = document.getElementById("cardView");
// let count = 0;

localStorage.setItem("CurrentView", "table");

cardContent.addEventListener("click", function () {

    cardIcon.style.display = "none";
    cardView.style.display = "none";
    cardContent.style.display = "none";
    // cardView.innerHTML = "";

    tableViewHtml.style.display = "block";
    tableIcon.style.display = "block";
    tableContent.style.display = "block";

    localStorage.setItem("CurrentView", "card");
    cardData();

});

tableContent.addEventListener("click", function () {
    // count++;
    // tbody.innerHTML = "";
    cardIcon.style.display = "block";
    cardContent.style.display = "block";
    cardView.style.display = "flex";

    tableViewHtml.style.display = "none";
    tableIcon.style.display = "none";
    tableContent.style.display = "none";

    localStorage.setItem("CurrentView", "table");
    tableView();

});

// saving country names in an array 
let countryNameArray = [];
let savingCountryNames = async () => {
    let response = await fetch("https://disease.sh/v3/covid-19/countries");
    let data = await response.json();

    data.forEach((value) => {
        countryNameArray.push(value.country);
    });
};
savingCountryNames();
// console.log(countryNameArray);

// searching by country name
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    let searchName = searchInput.value.toLowerCase();
    let a = countryNameArray.indexOf(searchName);

    if (a > -1) {
        console.log(true);
    }
    else {
        console.log(false);
    }
});

// On load - set default view
function getCurrentView() {
    let view = localStorage.getItem("CurrentView");

    if (view === "card") {
        cardData();
    } else {
        tableView();
    }
}
getCurrentView();


// theme toggle
let lightThemeIcon = document.getElementById("lightThemeIcon");
let darkThemeIcon = document.getElementById("darkThemeIcon");

let body = document.querySelector("body");
let navbar = document.getElementById("navbar");
let globalBox = document.querySelectorAll(".globalBox");
let globalTitle = document.querySelector("#global #title")
let searchBox = document.getElementById("searchBox");
let table = document.querySelector("table");

let card = document.querySelectorAll(".card");
let dataVisualization = document.querySelector("#data-visualization h6");

darkThemeIcon.addEventListener("click", function () {

    this.style.display = "none";
    lightThemeIcon.style.display = "block";

    body.style.backgroundColor = "#121417";
    dataVisualization.style.color = "#fff";
    navbar.style.backgroundColor = "#0d1117";

    searchBox.style.border = "2px solid #fff";
    document.querySelector("#searchBox i").style.color = "#fff";
    document.getElementById("titleMain").style.color = "#fff";

    table.style.backgroundColor = "#000";
    table.style.color = "#fff";

    cardView.style.backgroundColor = "#000";
    cardView.style.color = "#fff";

    card.forEach((value) => {
        value.style.backgroundColor = "#000";
        value.style.color = "#fff";
    });

    globalBox.forEach((value) => {
        value.style.backgroundColor = "#1a1f25";
        value.style.color = "#fff";
    });

    card.forEach((value) => {
        value.style.backgroundColor = "#fff";
        value.style.color = "#000";
    });
    globalTitle.style.color = "#fff";

    sessionStorage.setItem("Theme", "dark");
});

lightThemeIcon.addEventListener("click", function () {

    this.style.display = "none";
    darkThemeIcon.style.display = "block";

    tableViewHtml.style.color = "#000";
    body.style.backgroundColor = "#F3F4F6";

    table.style.backgroundColor = "#fff";
    table.style.color = "#000";

    cardView.style.backgroundColor = "#fff";
    cardView.style.color = "#000";

    dataVisualization.style.color = "#000";

    searchBox.style.border = "2px solid #fff";
    document.querySelector("#searchBox i").style.color = "#000";
    document.getElementById("titleMain").style.color = "#000";

    navbar.style.backgroundColor = "#2563EB";

    card.forEach((value) => {
        value.style.backgroundColor = "#fff";
        value.style.color = "#000";
    });

    globalBox.forEach((value) => {
        value.style.backgroundColor = "white";
        value.style.color = "black";
    });
    globalTitle.style.color = "#000";

    sessionStorage.setItem("Theme", "light");
});

function loadThemeOnReload() {
    const get = sessionStorage.getItem("Theme");

    if (get === "dark") {
        darkThemeIcon.style.display = "none";
        lightThemeIcon.style.display = "block";

        body.style.backgroundColor = "#121417";
        dataVisualization.style.color = "#fff";

        navbar.style.backgroundColor = "#0d1117";

        searchBox.style.border = "2px solid #fff";
        document.querySelector("#searchBox i").style.color = "#fff";
        document.getElementById("titleMain").style.color = "#fff";

        table.style.backgroundColor = "#000";
        table.style.color = "#fff";

        cardView.style.backgroundColor = "#000";
        cardView.style.color = "#fff";

        card.forEach((value) => {
            value.style.backgroundColor = "#000";
            value.style.color = "#fff";
        });

        globalBox.forEach((value) => {
            value.style.backgroundColor = "#1a1f25";
            value.style.color = "#fff";
        });

        card.forEach((value) => {
            value.style.backgroundColor = "#fff";
            value.style.color = "#000";
        });
        globalTitle.style.color = "#fff";

    }
    else {
        lightThemeIcon.style.display = "none";
        darkThemeIcon.style.display = "block";

        tableViewHtml.style.color = "#000";
        body.style.backgroundColor = "#F3F4F6";

        dataVisualization.style.color = "#000";

        table.style.backgroundColor = "#fff";
        table.style.color = "#000";

        cardView.style.backgroundColor = "#fff";
        cardView.style.color = "#000";

        searchBox.style.border = "2px solid #fff";
        document.querySelector("#searchBox i").style.color = "#000";
        document.getElementById("titleMain").style.color = "#000";

        navbar.style.backgroundColor = "#2563EB";

        card.forEach((value) => {
            value.style.backgroundColor = "#fff";
            value.style.color = "#000";
        });

        globalBox.forEach((value) => {
            value.style.backgroundColor = "white";
            value.style.color = "black";
        });
        globalTitle.style.color = "#000";
    }
};

loadThemeOnReload();