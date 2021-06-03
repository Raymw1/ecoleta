// let ufField = document.querySelector("select#uf");
// -------------------------  STATES ---------------------------
const ufField = document.querySelector("select[name=uf]");
const stateInput = document.querySelector("input[name=state]");
const citiesField = document.querySelector("select[name=cities]");
function populateUFs() {
    const ufURL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
    getAPI(ufURL, ufField);
}

function getCities(event) {
    const indexSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexSelectedState].text;
    const ufValue = event.target.value;
    const cityURL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    citiesField.innerHTML = `<option value="" disabled selected>Selecione a cidade</option>`;
    citiesField.disabled = true;
    getAPI(cityURL, citiesField);
    citiesField.disabled = false;
}

function getAPI(url, field) {
    fetch(url).then( res => res.json() ).then( values => {
        for (value of values) {
            if (field == citiesField) {
                field.innerHTML += `<option value="${value.nome}">${value.nome}</option>`;
            }   else {
                field.innerHTML += `<option value="${value.id}">${value.nome}</option>`;
            }
        }
    })
}

ufField.addEventListener("change", getCities);

populateUFs();

// -------------------------  GRID ITEMS ---------------------------
const collectedItems = document.querySelector("input[name=items]")
const itemsToCollect = document.querySelectorAll(".items-grid li");
let selectedItems = []
for (const item of itemsToCollect) {
    item.addEventListener("click", () => {
        item.classList.toggle("selected");
        const itemId = item.dataset.id;
        const alreadySelected = selectedItems.findIndex( item => {
            return item == itemId;  // Se encontrou ou não
        })
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter( item => {
                const itemIsDifferent = item != itemId;
                return itemIsDifferent;
            })
            selectedItems = filteredItems;
        }   else {
            selectedItems.push(itemId)
        }
        collectedItems.value = selectedItems
    })
}
