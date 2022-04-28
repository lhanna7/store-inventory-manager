const input = document.querySelector("input")
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")
const inventory = document.querySelector(".items-in-inventory")
const imageContainer = document.querySelector(".img-container")
const prevDay = document.querySelector(".prev")
const nextDay = document.querySelector(".next")


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
})

const imageBox = document.createElement("div")
let clicks = 0

function onNextChangeImage() {
  clicks += 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

//this function subs to the same value as the last div
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

prevDay.addEventListener("click", () => {
  prevDay.style.color = "red";
  onPrevChangeImage()
})

function onPrevChangeImage() {
  clicks -= 1;
  imageBox.innerHTML = getImage(clicks)
  imageContainer.append(imageBox)
}

function getCategory(itemName) {
  if (itemName.includes("Aged Brie") || itemName.includes("aged brie")) {
    return "aged"
  } else if (itemName.includes("Sulfuras") || itemName.includes("sulfuras")) {
    return "sulfuras"
  } else if (itemName.includes("Conjured") || itemName.includes("conjured")) {
    return "conjured"
  } else if (itemName.includes("Backstage") || itemName.includes("backstage")) {
    return "backstage"
  }
}
