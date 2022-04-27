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
    }

    const subInventory = document.createElement("div")
    inventory.append(subInventory)

    subInventory.innerHTML = `
    <p>${items.itemName}</p>
    <p>${items.itemSell}</p>
    <p>${items.itemQuality}</p>
    `
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
        <img src="images/twodays.jpg" alt="day1">
      `
    } else if (clicks == 3) {
        imageBox.innerHTML = `
        <img src="images/threedays.jpg" alt="day1">
      `
    } else {
        imageBox.innerHTML = `
        <img src="images/somuchlater.jpg" alt="day1">
      `
    }
}

const nextDay = document.querySelector(".next")
nextDay.addEventListener("click", () => {
    nextDay.style.color = "blue";
    onClickPlus()
})

const prevDay = document.querySelector(".prev")
nextDay.addEventListener("click", () => {
    nextDay.style.color = "blue";
    onClickMinus()
})