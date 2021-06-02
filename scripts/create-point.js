// let ufField = document.querySelector("select#uf");
// -------------------------  STATES ---------------------------
let ufField = document.querySelector("select[name=uf]");
let stateInput = document.querySelector("input[name=state]");
let citiesField = document.querySelector("select[name=cities]");
function populateUFs() {
    let ufURL = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
    getAPI(ufURL, ufField);
}

function getCities(event) {
    let indexSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexSelectedState].text;
    let ufValue = event.target.value;
    let cityURL = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
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

