const input = document.querySelector("input")
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")
const inventory = document.querySelector(".items-in-inventory")
const imageContainer = document.querySelector(".img-container")
const prevDay = document.querySelector(".prev")
const nextDay = document.querySelector(".next")
const nameInput = document.querySelector("#item-name")
const qualityInput = document.querySelector("#quality")

nameInput.addEventListener("input", event => {
  if (nameInput.value.toLowerCase().includes("sulfuras")) {
    qualityInput.min = 80
    qualityInput.max = 80
    qualityInput.value = 80
  } else {
    itemQuality.max = 50
    itemQuality.min = 0
  }
})

let item = {}
let itemBeAnArray = []
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  item = {
    itemName: formData.get(`item-name`),
    itemSell: +formData.get(`sell-in`),
    itemQuality: +formData.get(`quality`),
    itemCategory: getCategory(formData.get("item-name"))
  }

  itemBeAnArray.push(item)
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
  subtractValues()
  onNextChangeImage();
  qualityChangeNextDay()
})

const imageBox = document.createElement("div")
let clicks = 0

function onNextChangeImage() {
  clicks += 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function subtractValues() {
  itemBeAnArray.forEach(object => {
    const newInventoryItem = document.querySelector(".custom-item")
    newInventoryItem.innerHTML = `
    <p class="item-name">${object.itemName}</p>
    <p class="item-sell">${object.itemSell - 1}</p>
    <p class="item-quality">${object.itemQuality}</p>
    `
    object.itemSell--
    inventory.append(newInventoryItem)
  })
}

function qualityChangeNextDay() {
  itemBeAnArray.forEach(object => {
    if (object.itemCategory === "none") {
      let qualityDecrement = object.itemQuality - 1
      object.itemQuality--
      return qualityDecrement
    }
    if (object.itemCategory === "aged") {
      let qualityIncrement = object.itemQuality + 1
      object.itemQuality++
      return qualityIncrement
    }
    if (object.itemCategory === "backstage") {
      let qualityIncrement = object.itemQuality + 1
      object.itemQuality++
      return qualityIncrement
    }
    if (object.itemCategory === "sulfuras") {
      return object.itemQuality = 80
    }
    if (object.itemCategory === "conjured") {
      let qualityDecrement = object.itemQuality - 2
      object.itemQuality--
      object.itemQuality--
      return qualityDecrement
    }
  })
}

prevDay.addEventListener("click", () => {
  prevDay.style.color = "red";
  onPrevChangeImage()
  addValues()
})

function onPrevChangeImage() {
  clicks -= 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function addValues() {
  itemBeAnArray.forEach(object => {
    const newInventoryItem = document.querySelector(".custom-item")
    newInventoryItem.innerHTML = `
    <p class="item-name">${object.itemName}</p>
    <p class="item-sell">${object.itemSell + 1}</p>
    <p class="item-quality">${object.itemQuality + 1}</p>
    `
    object.itemSell++
    object.itemQuality++
    inventory.append(newInventoryItem)
  })
}

function getCategory(itemName) {
  if (itemName.includes("Aged Brie") || itemName.includes("aged brie")) {
    return "aged"
  } else if (itemName.includes("Sulfuras") || itemName.includes("sulfuras")) {
    return "sulfuras"
  } else if (itemName.includes("Conjured") || itemName.includes("conjured")) {
    return "conjured"
  } else if (itemName.includes("Backstage Passes") || itemName.includes("backstage passes")) {
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