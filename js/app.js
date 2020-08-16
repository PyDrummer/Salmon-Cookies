'use strict';

var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
// storing all locations in an array
var allLocations = [];

var totalsForEachHour = [];
var totalOfAllLocationsAllDay = 0;

// Creating the constructor for all objects.
function Store(location, minCust, maxCust, avCookieSale) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avCookSale = avCookieSale;
  this.hourlySalesArray = [];
  this.dailySalesTotal = 0;
  allLocations.push(this);
}

Store.prototype.calcHourlySalesArray = function () {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this.maxCust) * this.avCookSale);
    this.hourlySalesArray.push(hourlySales);
    console.log(this.hourlySalesArray);
    this.dailySalesTotal += hourlySales;
  }
};

// Creating hours of operation table elements
var hoursTableEl = document.getElementById('table-head');
var hoursRowsEl = document.createElement('tr');
var hoursTitleDataEl = document.createElement('th');
hoursTitleDataEl.textContent = 'Hours';
hoursRowsEl.append(hoursTitleDataEl);
hoursTableEl.append(hoursRowsEl);
for (var i = 0; i < hoursOfOperation.length; i++) {
  var hoursDataEl = document.createElement('th');
  hoursDataEl.textContent = hoursOfOperation[i];
  hoursRowsEl.append(hoursDataEl);
  hoursTableEl.append(hoursRowsEl);
}
var hoursLastEl = document.createElement('th');
hoursLastEl.textContent = 'Cookies sold';
hoursRowsEl.append(hoursLastEl);

// global accessable table body id element
var tableBodyEl = document.getElementById('table-body'); // element ID for the table goes here

//Redering the locations with a prototype function
Store.prototype.render = function () {
  this.dailySalesTotal = 0;
  this.hourlySalesArray = [];
  this.calcHourlySalesArray(); //this is calling the fuction to create the data for the hourlySalesArray.
  var trEl = document.createElement('tr');
  var locationHeadEl = document.createElement('th');
  locationHeadEl.textContent = this.location;
  trEl.append(locationHeadEl);
  tableBodyEl.append(trEl);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var salesDataEl = document.createElement('td');
    salesDataEl.textContent = this.hourlySalesArray[i];
    trEl.append(salesDataEl);
  }
  salesDataEl = document.createElement('td'); // total sales data
  //console.log(this.dailySalesTotal);
  salesDataEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
  trEl.append(salesDataEl);
  tableBodyEl.append(trEl);
};

// All locations as new instances
new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);
renderAllStores();

// we are calculating the total of all sales of each hour with totalOfAllLocationsAllDay.
// we are calculating the total of each hour and each location with hourTotal.
function getTotalHourSales() {
  for (i = 0; i < hoursOfOperation.length; i++) {
    var hourTotal = 0;
    for (var j = 0; j < allLocations.length; j++) {
      hourTotal += allLocations[j].hourlySalesArray[i];
    }
    totalOfAllLocationsAllDay += hourTotal;
    totalsForEachHour[i] = hourTotal;
  }
}

// table foot
var totalsOfAllEl = document.getElementById('table-foot');
function footerTable() {
  getTotalHourSales();
  var totalsRowsEl = document.createElement('tr');
  var totalsDataEl = document.createElement('th');
  totalsDataEl.textContent = 'Totals';
  totalsRowsEl.append(totalsDataEl);
  totalsOfAllEl.append(totalsRowsEl);
  for (i = 0; i < hoursOfOperation.length; i++) {
    var totalHourlyData = document.createElement('td');
    totalHourlyData.textContent = totalsForEachHour[i];
    totalsRowsEl.append(totalHourlyData);
  }
  var grandTotalEl = document.createElement('th');
  grandTotalEl.textContent = `Grand total: ${totalOfAllLocationsAllDay} cookies.`;
  totalsRowsEl.append(grandTotalEl);
}
footerTable();

// source from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//----------------------------------------------------------------------------------------------------------
// Create the event listener, functions and DOM manipulation for the sales.html form to add a new location

// getting the element by id so i know where the code comes from
var myNewLocationContainer = document.getElementById('sales-form');

//building the function first. this is my event handler
function handleSubmit(event) {
  event.preventDefault();

  var newLocation = event.target.new_location.value; // grabbing the sales form location input
  var upperNewLocation = newLocation.charAt(0).toUpperCase() + newLocation.slice(1); // making the first letter of the location value capital source https://dzone.com/articles/capitalize-first-letter-string-javascript
  var newMinCust = event.target.new_min_cust.value;
  var newMaxCust = event.target.new_max_cust.value;
  var newAvCookSale = event.target.new_average_cookies.value;
  if (newMaxCust < newMinCust) {
    document.getElementById('sales-form').reset();
    alert('Max customers must be more than min customers. Try entering the data again.');
  } else {
    new Store(upperNewLocation, newMinCust, newMaxCust, newAvCookSale);
    //console.log(allLocations);
    tableBodyEl.innerHTML = ''; // again we are now rendering all the data here so we clear the table out for the new data
    totalsOfAllEl.innerHTML = '';// again we are now rendering all the data here so we clear the table out for the new data
    totalOfAllLocationsAllDay = 0; // because we are now rendering all the locations in this function we want to reset totalOfAllLocationsAllDay variable.
    renderAllStores(); // tells the code to add the new line
    footerTable(); // now we render the footerTable function
  }
}

function renderAllStores() {
  for (var i = 0; i < allLocations.length; i++) {
    allLocations[i].render();
  }
}

//event listener for the submit button on the sales form
myNewLocationContainer.addEventListener('submit', handleSubmit);
