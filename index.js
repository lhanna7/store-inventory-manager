
const form = document.querySelector(".form")
const submit = document.querySelector("#submit")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const itemName = formData.get(`item-name`)
    const itemSell = formData.get(`sell-in`)
    const itemQuality = formData.get(`quality`)
    const itemInventory = document.querySelector("items-in-inventory")



})
