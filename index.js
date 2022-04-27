const input = document.querySelector("input")
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")
const inventory = document.querySelector(".items-in-inventory")

let items = {}
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    items = {
        itemName: formData.get(`item-name`),
        itemSell: formData.get(`sell-in`),
        itemQuality: formData.get(`quality`),
        itemCategory: "none"
    }

    const subInventory = document.createElement("div")
    inventory.append(subInventory)

    subInventory.innerHTML = `
    <p class="item-name">${items.itemName}</p>
    <p class="item-sell">${items.itemSell--}</p>
    <p class="item-quality">${items.itemQuality--}</p>
    `

    setCategory(items)
})

const imageContainer = document.querySelector(".img-container")
const imageBox = document.createElement("div")
let clicks = 0

function onClickPlus() {
    clicks += 1;
    if (clicks == 1) {
        imageContainer.append(imageBox)
        imageBox.innerHTML = `
        <img src="images/nextday.jpg" alt="day1">
      `
    } else if (clicks == 2) {
        imageBox.innerHTML = `
        <img src="images/twodays.jpg" alt="day2">
      `
    } else if (clicks == 3) {
        imageBox.innerHTML = `
        <img src="images/threedays.jpg" alt="day3">
      `
    } else if (clicks >= 4) {
        imageBox.innerHTML = `
        <img src="images/somuchlater.jpg" alt="day4">
      `
    } else {
        imageBox.innerHTML = `
       <img src="images/dayone2.jpg" alt="day0" style="width: 70%;">
      `
    }
}


const nextDay = document.querySelector(".next")
nextDay.addEventListener("click", () => {
    nextDay.style.color = "cyan";

    const sellDiv = document.querySelector(".item-sell")
    let sellNumber = items.itemSell--
    sellDiv.textContent = sellNumber

    const qualityDiv = document.querySelector(".item-quality")
    let qualityNumber = items.itemQuality--
    qualityDiv.textContent = qualityNumber

    onClickPlus();
})

function onClickMinus() {
    clicks -= 1;
    if (clicks == 1) {
        imageContainer.append(imageBox)
        imageBox.innerHTML = `
        <img src="images/nextday.jpg" alt="day1">
      `
    } else if (clicks == 2) {
        imageBox.innerHTML = `
        <img src="images/twodays.jpg" alt="day2">
      `
    } else if (clicks == 3) {
        imageBox.innerHTML = `
        <img src="images/threedays.jpg" alt="day3">
      `
    } else if (clicks >= 4) {
        imageBox.innerHTML = `
        <img src="images/somuchlater.jpg" alt="day4">
      `
    } else {
        imageBox.innerHTML = `
        <img src="images/dayone2.jpg" alt="day0" style="width: 30%;">
      `
    }
}

const prevDay = document.querySelector(".prev")
prevDay.addEventListener("click", () => {
    prevDay.style.color = "red";
    onClickMinus()
})

function setCategory(items) {
    if (items.itemName.includes("Aged Brie") || items.itemName.includes("Backstage")) {
        items.itemCategory = "aged-backstage"
    } else if (items.itemName.includes("Sulfuras")) {
        items.itemCategory = "sufluras"
    } else if (items.itemName.includes("Conjured")) {
        items.itemCategory = "conjured"
    }
}
