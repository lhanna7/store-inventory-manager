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

nameInput.addEventListener("input", () => {
  if (nameInput.value.toLowerCase().includes("sulfuras")) {
    qualityInput.min = 80
    qualityInput.max = 80
    qualityInput.value = 80
  } else {
    qualityInput.value = 0
    sellInput.value = 0
  }
})

let item = {}
let itemToArray = []
form.addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)

  item = {
    itemName: formData.get(`item-name`),
    itemSell: +formData.get(`sell-in`),
    itemQuality: +formData.get(`quality`),
    itemCategory: getCategory(formData.get("item-name"))
  }

  itemToArray.push(item)
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
  qualityChangeNextDay();
  subtractValues();
  onNextChangeImage();
  qualityLimit(item);
})

const imageBox = document.createElement("div")
let clicks = 0

function onNextChangeImage() {
  clicks += 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function subtractValues() {
  itemToArray.forEach(object => {
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
  itemToArray.forEach(object => {
    if (object.itemCategory === "aged") {
      object.itemQuality = object.itemQuality + 1
    }
    else if (object.itemCategory === "backstage") {
      if (object.itemSell <= 10 && object.itemSell > 5) {
        object.itemQuality = object.itemQuality + 2
      } else if (object.itemSell <= 5 && object.itemSell > 1) {
        object.itemQuality = object.itemQuality + 3
      } else if (object.itemSell <= 1) {
        return object.itemQuality = 0
      } else {
        object.itemQuality = object.itemQuality + 1
      }
    }
    else if (object.itemCategory === "sulfuras") {
      return object.itemQuality = 80
    }
    else if (object.itemCategory === "conjured") {
      if (object.itemSell >= 1) {
        object.itemQuality = object.itemQuality - 2
      } else if (object.itemSell <= 0) {
        object.itemQuality = object.itemQuality - 4
      }
    }
    else {
      if (object.itemSell >= 1) {
        object.itemQuality = object.itemQuality - 1
      } else if (object.itemSell <= 0) {
        object.itemQuality = object.itemQuality - 2
      }
    }
  })
}

prevDay.addEventListener("click", () => {
  prevDay.style.color = "red";
  qualityChangePrevDay();
  addValues();
  onPrevChangeImage();
  qualityLimit(item);
})

function onPrevChangeImage() {
  clicks -= 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function addValues() {
  itemToArray.forEach(object => {
    const newInventoryItem = document.querySelector(".custom-item")
    newInventoryItem.innerHTML = `
    <p class="item-name">${object.itemName}</p>
    <p class="item-sell">${object.itemSell + 1}</p>
    <p class="item-quality">${object.itemQuality}</p>
    `
    object.itemSell++
    inventory.append(newInventoryItem)
  })
}

function qualityChangePrevDay() {
  itemToArray.forEach(object => {
    if (object.itemCategory === "aged") {
      object.itemQuality = object.itemQuality - 1
    } else if (object.itemCategory === "backstage") {
      if (object.itemSell <= 10 && object.itemSell >= 6) {
        object.itemQuality = object.itemQuality - 2
      } else if (object.itemSell <= 5 && object.itemSell >= 1) {
        object.itemQuality = object.itemQuality - 3
      } else {
        object.itemQuality = object.itemQuality - 1
      }
    }
    else if (object.itemCategory === "sulfuras") {
      return object.itemQuality = 80
    }
    else if (object.itemCategory === "conjured") {
      object.itemQuality = object.itemQuality + 2
    }
    else {
      object.itemQuality = object.itemQuality + 1
    }
  })
}

function qualityLimit(item) {
  if (item.itemQuality >= 49) {
    return item.itemQuality = 49
  } else if (item.itemQuality <= 1) {
    return item.itemQuality = 1
  }
}

function zeroDoubleDecay(item) {
  if (item.itemSell = 0) {
    return item.itemQuality * 2
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