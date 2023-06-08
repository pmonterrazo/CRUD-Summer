const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sMatricula = document.querySelector('#m-matricula')
const sNome = document.querySelector('#m-nome')
const sCargo = document.querySelector('#m-cargo')
const sSetor = document.querySelector('#m-setor')
const sSalario = document.querySelector('#m-salario')
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
    sMatricula.value = itens[index].matricula
    sNome.value = itens[index].nome
    sCargo.value = itens[index].cargo
    sSetor.value = itens[index].setor
    sSalario.value = itens[index].salario
    id = index
  } else {
    sMatricula.value = ''
    sNome.value = ''
    sCargo.value = ''
    sSetor.value = ''
    sSalario.value = ''
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
    <td>${item.matricula}</td>
    <td>${item.nome}</td>
    <td>${item.cargo}</td>
    <td>${item.setor}</td>
    <td>R$ ${item.salario}</td>
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
  
  if (sMatricula.value == '' || sNome.value == '' || sCargo.value == '' || sSetor.value == ''|| sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].matricula = sMatricula.value
    itens[id].nome = sNome.value
    itens[id].cargo = sCargo.value
    itens[id].setor = sSetor.value
    itens[id].salario = sSalario.value
  } else {
    itens.push({'matricula': sMatricula.value,'nome': sNome.value, 'cargo': sCargo.value, 'setor': sSetor.value, 'salario': sSalario.value})
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

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()