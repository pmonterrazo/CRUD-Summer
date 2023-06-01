const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sQuarto = document.querySelector('#m-quarto')
const sAndar = document.querySelector('#m-andar')
const sTorre = document.querySelector('#m-torre')
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
    sQuarto.value = itens[index].quarto
    sAndar.value = itens[index].andar
    sTorre.value = itens[index].torre
    id = index
  } else {
    sQuarto.value = ''
    sAndar.value = ''
    sTorre.value = ''
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
    <td>${item.quarto}</td>
    <td>${item.andar}</td>
    <td>${item.torre}</td>
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
  
  if (sQuarto.value == '' || sAndar.value == '' || sTorre.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].quarto = sQuarto.value
    itens[id].andar = sAndar.value
    itens[id].torre = sTorre.value
  } else {
    itens.push({'quarto': sQuarto.value, 'andar': sAndar.value, 'torre': sTorre.value})
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

const getItensBD = () => JSON.parse(localStorage.getItem('dbcadquarto')) ?? []
const setItensBD = () => localStorage.setItem('dbcadquarto', JSON.stringify(itens))

loadItens()