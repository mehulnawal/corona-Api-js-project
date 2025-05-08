/*
correct chart js data ✔
sorting
correct cards background color on theme change
toggle view correctly ✔
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

let countryID = 0;
let countryDataArray = [];

let tbody = document.getElementById("tbody");
let row = "";


// toggle view data and table
let tableIcon = document.getElementById("tableIcon")
let tableContent = document.getElementById("tableContent")
let tableViewHtml = document.getElementById("tableView")

let cardIcon = document.getElementById("cardIcon")
let cardContent = document.getElementById("cardContent")
let cardView = document.getElementById("cardView");

const tableView = async () => {
    countryDataArray = [];
    tbody.innerHTML = "";
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

        let countryData = {
            "id": countryID,
            "flag": value.countryInfo["flag"],
            "country name": value.country,
            "Total cases": value.cases,
            "Today cases": value.todayCases,
            "Total Deaths": value.deaths,
            "Today Deaths": value.todayDeaths,
            "Recovered": value.recovered,
            "Active": value.active,
            "Critical": value.critical,
        };

        countryDataArray.push(countryData);

        countryID++;
    });
    localStorage.setItem("CountryData", JSON.stringify(countryDataArray));
};
// tableView();

const cardData = async () => {
    cardView.innerHTML = "";
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
                        <div id="cardActiveCases">${value.active}</div>
                    </div>
                </div>

            </div>`;

        cardView.append(cardBox);
    });
};

// localStorage.setItem("CurrentView", "table");

cardContent.addEventListener("click", function () {

    cardIcon.style.display = "none";
    cardView.style.display = "none";
    cardContent.style.display = "none";

    tableViewHtml.style.display = "block";
    tableIcon.style.display = "block";
    tableContent.style.display = "block";

    searchInput.value = "";
    sortCountry.value = "selectOption";

    localStorage.setItem("CurrentView", "table");
    tableView();

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

    searchInput.value = "";
    sortCountry.value = "selectOption";

    localStorage.setItem("CurrentView", "card");
    cardData();

});


// searching by country name
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
    let searchName = searchInput.value.toLowerCase();

    let get = JSON.parse(localStorage.getItem("CountryData"))

    if (cardContent.style.display == "block") {

        cardView.innerHTML = "";

        get.filter((value, index, array) => {
            if (value["country name"].toLowerCase().includes(searchName)) {
                let cardBox = document.createElement("div");

                cardBox.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12");

                cardBox.innerHTML = `
            <div class="card">
                <div id="title" class="d-flex align-items-center gap-2">
                    <img src="${value.flag}" id="logo"></img>
                    <div id="countryName">${value["country name"]}</div>
                </div>

                <div class="row" id="data">
                    <div class="col-6 cardCasesBox">
                        <h6>Total Cases</h6>
                        <div id="cardTotalCases">${value["Total cases"]}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Deaths</h6>
                        <div id="cardDeathCases">${value["Total Deaths"]}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Total Recovered</h6>
                        <div id="cardRecovered">${value["Recovered"]}</div>
                    </div>

                    <div class="col-6 cardCasesBox">
                        <h6>Active Cases</h6>
                        <div id="cardActiveCases">${value["Active"]}</div>
                    </div>
                </div>

            </div>`;

                cardView.append(cardBox);
            }
        });
    }
    else if (tableContent.style.display == "block") {

        tbody.innerHTML = "";

        get.filter((value, index, array) => {
            if (value["country name"].toLowerCase().includes(searchName)) {

                row = document.createElement("tr");
                row.innerHTML = `
                        <td class="d-flex align-items-center gap-2">
                        <img src="${value.flag}" alt="" id="countryFlag">    
                        <div>${value["country name"]}</div>
                        </td>
                        <td>${value["Total cases"]}</td>
                        <td>${value["Today cases"]}</td>
                        <td>${value["Total Deaths"]}</td>
                        <td>${value["Today Deaths"]}</td>
                        <td>${value["Recovered"]}</td>
                        <td>${value["Active"]}</td>
                        <td>${value["Critical"]}</td>`;
                tbody.appendChild(row);

            }
        });
    }
});

// On load - set default view
function getCurrentView() {
    let view = localStorage.getItem("CurrentView");

    if (view === "card") {

        cardData();

        cardIcon.style.display = "block";
        cardContent.style.display = "block";
        cardView.style.display = "flex";

        tableViewHtml.style.display = "none";
        tableIcon.style.display = "none";
        tableContent.style.display = "none";
    }
    else if (view === "table") {
        cardIcon.style.display = "none";
        cardView.style.display = "none";
        cardContent.style.display = "none";

        tableViewHtml.style.display = "block";
        tableIcon.style.display = "block";
        tableContent.style.display = "block";

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

    searchInput.style.color = "#fff";

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

    searchInput.style.color = "#000";

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

        searchInput.style.color = "#fff";

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

        searchInput.style.color = "#000";

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


// sorting
let sortCountry = document.getElementById("sortCountry");

sortCountry.addEventListener("change", function () {
    let sortValue = sortCountry.value;
    let get = JSON.parse(localStorage.getItem("CountryData"));

    let currentView = tableContent.style.display === "block" ? "table" : "card";

    if (sortValue === "sortByCases") {
        get.sort((a, b) => b["Total cases"] - a["Total cases"]);
    } else if (sortValue === "sortByDeaths") {
        get.sort((a, b) => b["Total Deaths"] - a["Total Deaths"]);
    } else if (sortValue === "sortByRecovered") {
        get.sort((a, b) => b["Recovered"] - a["Recovered"]);
    } else if (sortValue === "sortByActive") {
        get.sort((a, b) => b["Active"] - a["Active"]);
    }

    if (currentView === "table") {
        tbody.innerHTML = "";
        get.forEach((value) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td class="d-flex align-items-center gap-2">
                    <img src="${value.flag}" alt="" id="countryFlag">
                    <div>${value["country name"]}</div>
                </td>
                <td>${value["Total cases"]}</td>
                <td>${value["Today cases"]}</td>
                <td>${value["Total Deaths"]}</td>
                <td>${value["Today Deaths"]}</td>
                <td>${value["Recovered"]}</td>
                <td>${value["Active"]}</td>
                <td>${value["Critical"]}</td>`;
            tbody.appendChild(row);
        });
    } else {
        cardView.innerHTML = "";
        get.forEach((value) => {
            let cardBox = document.createElement("div");
            cardBox.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12");
            cardBox.innerHTML = `
                <div class="card">
                    <div id="title" class="d-flex align-items-center gap-2">
                        <img src="${value.flag}" id="logo"></img>
                        <div id="countryName">${value["country name"]}</div>
                    </div>
                    <div class="row" id="data">
                        <div class="col-6 cardCasesBox"><h6>Total Cases</h6><div>${value["Total cases"]}</div></div>
                        <div class="col-6 cardCasesBox"><h6>Deaths</h6><div>${value["Total Deaths"]}</div></div>
                        <div class="col-6 cardCasesBox"><h6>Total Recovered</h6><div>${value["Recovered"]}</div></div>
                        <div class="col-6 cardCasesBox"><h6>Active Cases</h6><div>${value["Active"]}</div></div>
                    </div>
                </div>`;
            cardView.appendChild(cardBox);
        });
    }
});