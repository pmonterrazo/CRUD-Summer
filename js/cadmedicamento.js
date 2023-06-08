const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sDesccom = document.querySelector('#m-desccom')
const sDescien = document.querySelector('#m-descien')
const sDesquim = document.querySelector('#m-desquim')
const sUnidade = document.querySelector('#m-unidade')
const sQuantid = document.querySelector('#m-quantid')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sDesccom.value = itens[index].desccom
    sDescien.value = itens[index].descien
    sDesquim.value = itens[index].desquim
    sUnidade.value = itens[index].unidade
    sQuantid.value = itens[index].quantid
    id = index
  } else {
    sDesccom.value = ''
    sDescien.value = ''
    sDesquim.value = ''
    sUnidade.value = ''
    sQuantid.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.desccom}</td>
    <td>${item.descien}</td>
    <td>${item.desquim}</td>
    <td>${item.unidade}</td>
    <td>${item.quantid}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sDesccom.value == '' || sDescien.value == '' ||  sDesquim.value == '' || sUnidade.value == '' ||sQuantid.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].desccom = sDesccom.value
    itens[id].descien = sDescien.value
    itens[id].desquim = sDesquim.value
    itens[id].unidade = sUnidade.value
    itens[id].quantid = sQuantid.value
  } else {
    itens.push({'desccom': sDesccom.value, 'descien': sDescien.value, 'desquim': sDesquim.value, 'unidade': sUnidade.value, 'quantid': sQuantid.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbcadmed')) ?? []
const setItensBD = () => localStorage.setItem('dbcadmed', JSON.stringify(itens))

loadItens()