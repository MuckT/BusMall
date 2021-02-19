'use strict';

// Globals
var totalClicks = 0;
const totalImagesToDisplay = 3;
const requestedNumberOfClicks = 25;
var productsOnPage = [];
const allProducts = [];
let individualProductNodes = [];

// Constructor
var Product = function (name, altText, fileExtension = '.jpg') {
  this.name = name;
  this.clicks = 0;
  this.displayed = 0;
  this.fileExtension = fileExtension;
  this.src = `img/${this.name + this.fileExtension}`;
  this.altText = altText;
  allProducts.push(this);
};

// Create Desired n desired Images
function createImgElements(numberOfImages = totalImagesToDisplay) {
  let productDisplay = document.querySelector('#product-display ul');
  for (let i = 0; i < numberOfImages; i++) {
    let listItem = document.createElement('li');
    let img = document.createElement('img');
    listItem.appendChild(img);
    productDisplay.appendChild(listItem);
  }
}

function adjustCSS(numberOfImages = totalImagesToDisplay) {
  let numberOfColumns;
  if (numberOfImages % 5 === 0) {
    numberOfColumns = 5;
  } else if (numberOfImages % 4 === 0 ) {
    numberOfColumns = 4;
  } else if (numberOfImages % 3 === 0) {
    numberOfColumns = 3;
  }
  if (window.innerWidth > 520 && window.innerWidth < 1020) {
    document.querySelector('main ul').style['grid-template-columns'] = `${'1fr '.repeat(numberOfColumns - 1)}`;
  } else if (window.innerWidth > 1020) {
    document.querySelector('main ul').style['grid-template-columns'] = `${'1fr '.repeat(numberOfColumns)}`;
  }
}

// Render New Products
function renderNewProducts(indexArray = allProducts.slice(0, totalImagesToDisplay)) {
  individualProductNodes = document.querySelectorAll('#product-display img');
  indexArray.forEach((item, index) => {
    individualProductNodes[index].name = item.name;
    individualProductNodes[index].alt = item.altText;
    individualProductNodes[index].src = item.src;
    individualProductNodes[index].fileExtension = item.fileExtension;
    individualProductNodes[index].clicks = item.clicks;
  });
}

// Generate random Product
function generateRandomProduct() {
  return allProducts[Math.floor(Math.random() * allProducts.length)];
}

// Pick New Products TODO avoid while loops
function pickNewProducts() {
  let pickedProducts = [];
  while (pickedProducts.length < totalImagesToDisplay) {
    let tempProduct = generateRandomProduct();
    if(!productsOnPage.includes(tempProduct) && !pickedProducts.includes(tempProduct)) {
      pickedProducts.push(tempProduct);
    }
  }
  productsOnPage = pickedProducts;
  renderNewProducts(pickedProducts);
}

// Render Vote Results
function renderVoteResults() {
  let clickResults = document.querySelector('#view-results> ul');
  allProducts.forEach(element => {
    let result = document.createElement('li');
    result.textContent = `${element.name} had ${element.clicks} clicks, \n and was seen ${element.displayed}`;
    clickResults.append(result);
  });
}

// Click Event Handler
function clickHandler(e) {
  individualProductNodes.forEach(element => {
    if(element === e.target) {
      allProducts.forEach(product => {
        if(product.name === element.name) {
          product.clicks++;
        }
      });
      allProducts.forEach(product => {
        if(productsOnPage.includes(product)){
          product.displayed++;
        }
      });
      pickNewProducts();
      totalClicks++;
    }
  });
  if (totalClicks === requestedNumberOfClicks) {
    document.body.removeEventListener('click', clickHandler);
    let resultsContainer = document.querySelector('#view-results ul');
    let button = document.createElement('button');
    button.textContent = 'View Results';
    button.addEventListener('click', buttonHandler);
    resultsContainer.append(button);
  }
}

// Button Event Handler
function buttonHandler() {
  let resultsContainer = document.querySelector('#view-results ul');
  let button = document.querySelector('#view-results button');
  resultsContainer.removeChild(button);
  button.removeEventListener('click', buttonHandler);
  renderVoteResults();
}

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

// Create Image Elements to Fill
createImgElements();
adjustCSS();
pickNewProducts();

// Attach Click Img Click Event Listener
document.body.addEventListener('click', clickHandler);
