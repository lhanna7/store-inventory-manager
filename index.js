const input = document.querySelector("input")
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")
const inventory = document.querySelector(".items-in-inventory")
const imageContainer = document.querySelector(".img-container")
const prevDay = document.querySelector(".prev")
const nextDay = document.querySelector(".next")
const nameInput = document.querySelector("#item-name")
const qualityInput = document.querySelector("#quality")
const sellInput = document.querySelector("#sell-in")
const sellLabel = document.querySelector(".sell-label")

nameInput.addEventListener("input", () => {
  if (nameInput.value.toLowerCase().includes("sulfuras")) {
    qualityInput.min = 80
    qualityInput.max = 80
    qualityInput.value = 80
    sellInput.classList.add("hidden")
    sellLabel.classList.add("hidden")
  } else {
    qualityInput.value = 0
    sellInput.value = 0
  }
})

let item = {}
let inventoryArray = []
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  item = {
    itemName: formData.get(`item-name`),
    itemSell: +formData.get(`sell-in`),
    itemQuality: +formData.get(`quality`),
    itemCategory: getCategory(formData.get("item-name"))
  }

  inventoryArray.push(item)
  const subInventory = document.createElement("div")
  subInventory.innerHTML = `
    <p class="item-name">${item.itemName}</p>
    <p class="item-sell">${item.itemSell}</p>
    <p class="item-quality">${item.itemQuality}</p>
    `
  subInventory.classList.add("custom-item")
  inventory.append(subInventory)
})

nextDay.addEventListener("click", () => {
  nextDay.style.color = "cyan";
  qualityLimit(item);
  qualityChangeNextDay();
  subtractValues();
  onNextChangeImage();
})

const imageBox = document.createElement("div")
let clicks = 0
function onNextChangeImage() {
  clicks += 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function subtractValues() {
  inventoryArray.forEach(object => {
    object.itemSell--
    const newInventoryItem = document.querySelector(".custom-item")
    newInventoryItem.innerHTML = `
    <p class="item-name">${object.itemName}</p>
    <p class="item-sell">${object.itemSell}</p>
    <p class="item-quality">${object.itemQuality}</p>
    `
    inventory.append(newInventoryItem)
  })
}

function qualityChangeNextDay() {
  inventoryArray.forEach(object => {
    if (object.itemCategory === "aged" || object.itemCategory === "backstage" && object.itemSell > 10) {
      object.itemQuality = qualityLimit(object.itemQuality + 1)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 10 && object.itemSell > 5) {
      object.itemQuality = qualityLimit(object.itemQuality + 2)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 5 && object.itemSell > 1) {
      object.itemQuality = qualityLimit(object.itemQuality + 3)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 0) {
      return object.itemQuality = 0
    } else if (object.itemCategory === "sulfuras") {
      return object.itemQuality = 80
    } else if (object.itemCategory === "conjured" && object.itemSell >= 1) {
      object.itemQuality = qualityLimit(object.itemQuality - 2)
    } else if (object.itemCategory === "conjured" && object.itemSell <= 0) {
      object.itemQuality = qualityLimit(object.itemQuality - 4)
    } else if (object.itemCategory === "none" && object.itemSell > 0) {
      object.itemQuality = qualityLimit(object.itemQuality - 1)
    } else {
      object.itemQuality = qualityLimit(object.itemQuality - 2)
    }
  })
}

prevDay.addEventListener("click", () => {
  prevDay.style.color = "red";
  qualityLimit(item);
  qualityChangePrevDay();
  addValues();
  onPrevChangeImage();
})

function onPrevChangeImage() {
  clicks -= 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function addValues() {
  inventoryArray.forEach(object => {
    const newInventoryItem = document.querySelector(".custom-item")
    newInventoryItem.innerHTML = `
    <p class="item-name">${object.itemName}</p>
    <p class="item-sell">${object.itemSell}</p>
    <p class="item-quality">${object.itemQuality}</p>
    `
    object.itemSell++
    inventory.append(newInventoryItem)
  })
}

function qualityChangePrevDay() {
  inventoryArray.forEach(object => {
    if (object.itemCategory === "aged" || object.itemCategory === "backstage" && object.itemSell > 10) {
      object.itemQuality = qualityLimit(object.itemQuality - 1)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 10 && object.itemSell > 5) {
      object.itemQuality = qualityLimit(object.itemQuality - 2)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 5 && object.itemSell > 1) {
      object.itemQuality = qualityLimit(object.itemQuality - 3)
    } else if (object.itemCategory === "backstage" && object.itemSell <= 0) {
      return object.itemQuality = 0
    } else if (object.itemCategory === "sulfuras") {
      return object.itemQuality = 80
    } else if (object.itemCategory === "conjured" && object.itemSell >= 1) {
      object.itemQuality = qualityLimit(object.itemQuality + 2)
    } else if (object.itemCategory === "conjured" && object.itemSell <= 0) {
      object.itemQuality = qualityLimit(object.itemQuality + 4)
    } else if (object.itemCategory === "none" && object.itemSell > 0) {
      object.itemQuality = qualityLimit(object.itemQuality + 1)
    } else {
      object.itemQuality = qualityLimit(object.itemQuality + 2)
    }
  })
}

function qualityLimit(itemQuality) {
  if (itemQuality >= 49) {
    return 50
  } else if (itemQuality <= 1) {
    return 0
  } else {
    return itemQuality
  }
}

function getCategory(itemName) {
  if (itemName.includes("Aged Brie") || itemName.includes("aged brie")) {
    return "aged"
  } else if (itemName.includes("Sulfuras") || itemName.includes("sulfuras")) {
    return "sulfuras"
  } else if (itemName.includes("Conjured") || itemName.includes("conjured")) {
    return "conjured"
  } else if (itemName.includes("Backstage Pass") || itemName.includes("backstage pass")) {
    return "backstage"
  } else
    return "none"
}

function getImage(clickCount) {
  switch (clickCount) {
    case 0:
      return `<img src="images/dayone2.jpg" alt="day0" style="width: 70%;">`
      break
    case 1:
      return `<img src="images/nextday.jpg" alt="day1">`
      break
    case 2:
      return `<img src="images/twodays.jpg" alt="day2">`
      break
    case 3:
      return `<img src="images/threedays.jpg" alt="day3">`
      break
    default:
      return `<img src="images/somuchlater.jpg" alt="day4">`
  }
}


