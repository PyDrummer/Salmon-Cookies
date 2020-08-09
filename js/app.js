'use strict';

var hoursOfOperation = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

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
}

Store.prototype.calcHourlySalesArray = function () {
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var hourlySales = Math.ceil(getRandomIntInclusive(this.minCust, this.maxCust) * this.avCookSale);
    this.hourlySalesArray.push(hourlySales);
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

//Redering the locations with a prototype function
Store.prototype.render = function () {
  this.calcHourlySalesArray(); //this is calling the fuction to create the data for the hourlySalesArray.
  var tableEl = document.getElementById('table-body'); // element ID for the table goes here
  var trEl = document.createElement('tr');
  var locationHeadEl = document.createElement('th');
  locationHeadEl.textContent = this.location;
  trEl.append(locationHeadEl);
  tableEl.append(trEl);
  for (var i = 0; i < hoursOfOperation.length; i++) {
    var salesDataEl = document.createElement('td');
    salesDataEl.textContent = this.hourlySalesArray[i];
    trEl.append(salesDataEl);
  }
  salesDataEl = document.createElement('td'); // total sales data
  //console.log(this.dailySalesTotal);
  salesDataEl.textContent = `Total: ${this.dailySalesTotal} cookies`;
  trEl.append(salesDataEl);
  tableEl.append(trEl);
};

// All locations as new instances
var seattle = new Store('Seattle', 23, 65, 6.3);
var tokyo = new Store('Tokyo', 3, 24, 1.2);
var dubai = new Store('Dubai', 11, 38, 3.7);
var paris = new Store('Paris', 20, 38, 2.3);
var lima = new Store('Lima', 2, 16, 4.6);
// storing all locations in an array
var allLocations = [seattle, tokyo, dubai, paris, lima];

//Rendering
seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();

// we are calculating the total of all sales of each hour with totalOfAllLocationsAllDay.
// we are calculating the total of each hour and each location with hourTotal.
function getTotalHourSales() {
  for(i = 0; i < hoursOfOperation.length; i++) {
    var hourTotal = 0;
    for(var j = 0; j < allLocations.length; j++) {
      hourTotal += allLocations[j].hourlySalesArray[i];
    }
    totalOfAllLocationsAllDay += hourTotal;
    totalsForEachHour[i] = hourTotal;
  }
}
getTotalHourSales();

// table foot
var totalsOfAllEl = document.getElementById('table-foot');
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

// source from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
