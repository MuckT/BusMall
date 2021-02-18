'use strict';

// Product Display Div
var allProductsDisplay = document.querySelector('#product-display');

// Return Node List of Products Displayed
var individualProductsNodes = document.querySelectorAll('#product-display img');

// Store Total Clicks
var totalClicks = 0;

// Store Images That Are Currently Displayed
const productsOnPage = [];

// Store All Products
const allProducts = [];

// Constructor
var Product = function (name, altText, fileExtension = '.jpg') {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name + this.fileExtension}`;
  this.altText = altText;
  allProducts.push(this);
};

// Render New Products
function renderNewProducts(indexArray = allProducts.slice(0, 3)) {
  console.log(indexArray);
  indexArray.forEach((element, index) => {
    individualProductsNodes[index].fileExtension = element.fileExtension;
    individualProductsNodes[index].alt = element.alt;
    individualProductsNodes[index].src = element.src;
  });
}

// Pick New Products TODO


// Render Vote Results
function renderVoteResults() {
  let clickResults = document.querySelector('#results-pane > ul');
  allProducts.forEach(element => {
    let result = document.createElement('li');
    result.textContent = `${element.name} received ${element.clicks}`;
    clickResults.append(result);
  });
}

// Event Handler TODO
// function clickHandler(e) {
//   e.preventDefault();
//   totalClicks ++;
//   if (e.target === Image) {
//     alert('please click an image');
//     totalClicks --;
//   }
// }

// allProductsDisplay.addEventListener('click', clickHandler);

// Create Products
new Product('bag', 'R2D2 Rolling Bag');
new Product('banana', 'The Banana Slicer');
new Product('bathroom', 'iPad Toilet Paper Holder');
new Product('boots', 'Toe-less Rain Boots');
new Product('breakfast', 'Toaster Coffee Pot Combo');
new Product('bubblegum', 'Meatball Bubble Gum');
new Product('chair', 'Convex chair');
new Product('cthulhu', 'Cthulhu Action Figure');
new Product('dog-duck', 'Duck Mask For Dogs');
new Product('dragon', 'Canned Dragon Meat');
new Product('pen', 'Pen Cutlery Set');
new Product('pet-sweep', 'Pet Booties That Clean');
new Product('scissors', 'Pizza Cutting Sheers');
new Product('shark', 'Shark Sleeping Bag');
new Product('sweep', 'Child Onesie That Cleans Floors', '.png');
new Product('tauntaun', 'Star Wars Sliced Tauntaun Sleeping Bag');
new Product('unicorn', 'Canned Unicorn Meat');
new Product('usb', 'Tentical USB', '.gif');
new Product('water-can', 'Perpetual Water Can');
new Product('wine-glass', 'A Useless Glass');

renderNewProducts();
renderVoteResults();
