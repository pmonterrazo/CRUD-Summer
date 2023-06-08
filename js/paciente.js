const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sEndereco = document.querySelector('#m-endereco')
const sCpf = document.querySelector('#m-cpf')
const sRg = document.querySelector('#m-rg')
const sTelefone = document.querySelector('#m-telefone')
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
    sNome.value = itens[index].nome
    sEndereco.value = itens[index].endereco
    sCpf.value = itens[index].cpf
    sRg.value = itens[index].rg
    sTelefone.value = itens[index].telefone
    id = index
  } else {
    sNome.value = ''
    sEndereco.value = ''
    sCpf.value = ''
    sRg.value = ''
    sTelefone.value = ''
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
    <td>${item.nome}</td>
    <td>${item.endereco}</td>
    <td>${item.cpf}</td>
    <td>${item.rg}</td>
    <td>${item.telefone}</td>
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
  
  if (sNome.value == '' || sEndereco.value == '' || sCpf.value == '' || sRg.value == ''|| sTelefone.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].endereco = sEndereco.value
    itens[id].cpf = sCpf.value
    itens[id].rg = sRg.value
    itens[id].telefone = sTelefone.value
  } else {
    itens.push({'nome': sNome.value, 'endereco': sEndereco.value, 'cpf': sCpf.value, 'rg': sRg.value, 'telefone': sTelefone.value})
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

const getItensBD = () => JSON.parse(localStorage.getItem('dbpaciente')) ?? []
const setItensBD = () => localStorage.setItem('dbpaciente', JSON.stringify(itens))

loadItens()