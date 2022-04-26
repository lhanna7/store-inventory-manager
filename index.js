const input = document.querySelector("input")
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")
const inventory = document.querySelector(".items-in-inventory")

let items = ""
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    let items = {
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
