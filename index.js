const items = {
    dexterity: {
        sellIn: 10,
        quality: 20
    },
    brie: {
        sellIn: 2,
        quality: 0
    },
    elixir: {
        sellIn: 5,
        quality: 7
    },
    sulfuras: {
        sellIn: 0,
        quality: 80
    },
    backstage: {
        sellIn: 15,
        quality: 20
    },
    mana: {
        sellIn: 3,
        quality: 6
    },
}

const dexteritySelect = document.querySelector("#dexterity")
const brieSelect = document.querySelector("#brie")
const elixirSelect = document.querySelector("#elixir")
const sulfurasSelect = document.querySelector("#sulfuras")
const backstageSelect = document.querySelector("#backstage")
const manaSelect = document.querySelector("#mana")
const select = document.querySelector("#item")
const dependent = document.querySelector(".dependent")

select.addEventListener('change', () => {
    dependent.innerHTML = select.options[select.selectedIndex].text;
})

