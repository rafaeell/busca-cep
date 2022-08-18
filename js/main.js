const form = document.querySelector('#form-cep');
const cep = document.querySelector('#cep')
const table = document.querySelector('#enderecos-tbody');
const clear = document.querySelector('#btn-clean');
const message = document.querySelector('#start-wrapper');

let cepList = JSON.parse(localStorage.getItem('ceps'));

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const cepInfo = await getCepInfo(cep.value.replace(/[^0-9]/g, ''));
    cep.value = '';
    message.classList.add('hidde');
    createHtmlElement(cepInfo);
    let ceps = JSON.parse(localStorage.getItem('ceps'));
    let cepStorage = ceps ? [ ...ceps, cepInfo ] : [ cepInfo ]
    localStorage.setItem('ceps',JSON.stringify(cepStorage))
});

clear.addEventListener('click',function(){
    table.innerHTML = '';
    localStorage.clear();
    message.classList.remove('hidde');
});

const getCepInfo = async (cep) => {

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const info = await response.json();
    return info;
}

const createHtmlElement = (data) => {

    const tr = document.createElement('tr');
    const tdCep = document.createElement('td');
    const tdEnd = document.createElement('td');
    const tdBairro = document.createElement('td');
    const tdCid = document.createElement('td');

    tdCep.textContent = data.cep;
    tdEnd.textContent = data.logradouro;
    tdBairro.textContent = data.bairro;
    tdCid.textContent = `${data.localidade}/${data.uf}`;

    tr.append(tdCep);
    tr.append(tdEnd);
    tr.append(tdBairro);
    tr.append(tdCid);

    table.append(tr);

}

if(cepList) cepList.map(cep => createHtmlElement(cep));