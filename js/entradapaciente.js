const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sPaciente = document.querySelector('#nome-paciente')
const sMedico = document.querySelector('#nome-medico')
const sQuarto = document.querySelector('#quarto-paciente')
const sMedicamento = document.querySelector('#medicamento')
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
    sPaciente.value = itens[index].paciente
    sMedico.value = itens[index].medico
    sQuarto.value = itens[index].quarto
    sMedicamento.value = itens[index].medicamento
    id = index
    
  } else {
    sPaciente.value = ''
    sMedico.value = ''
    sQuarto.value = ''
    sMedicamento.value = ''
    console.log(sMedicamento.value)
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
    <td>${item.paciente}</td>
    <td>${item.medico}</td>
    <td>${item.quarto}</td>
    <td>${item.medicamento}</td>
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
  
  if (sPaciente.value == '' || sMedico.value == '' || sQuarto.value == '' || sMedicamento.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].paciente = sPaciente.value
    itens[id].medico = sMedico.value
    itens[id].quarto = sQuarto.value
    itens[id].medicamento = sMedicamento.value
    console.log(sMedicamento.value)
  } else {
    itens.push({'paciente': sPaciente.value, 'medico': sMedico.value, 'quarto': sQuarto.value, 'medicamento': sMedicamento.value})
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

const getItensBD = () => JSON.parse(localStorage.getItem('dbentradapaciente')) ?? []
const setItensBD = () => localStorage.setItem('dbentradapaciente', JSON.stringify(itens))

loadItens()

    
    
    // Popula os selects com os dados do Local Storage
    function populateSelects() {
        const pacientes = JSON.parse(localStorage.getItem('dbpaciente')) || [];
        const medicos = JSON.parse(localStorage.getItem('dbfunc')) || [];
        const quartos = JSON.parse(localStorage.getItem('dbcadquarto')) || [];
        const medicamentos = JSON.parse(localStorage.getItem('dbcadmed')) || [];
  
        const nomePacienteSelect = document.getElementById('nome-paciente');
        const nomeMedicoSelect = document.getElementById('nome-medico');
        const quartoPacienteSelect = document.getElementById('quarto-paciente');
        const medicamentoSelect = document.getElementById('medicamento');
  
        // Limpa os selects antes de adicionar as opções
        nomePacienteSelect.innerHTML = '';
        nomeMedicoSelect.innerHTML = '';
        quartoPacienteSelect.innerHTML = '';
        medicamentoSelect.innerHTML = '';
  
        pacientes.forEach(paciente => {
          const option = document.createElement('option');
          option.value = paciente.id;
          option.text = paciente.nome;
          nomePacienteSelect.appendChild(option);
        });
  
        medicos.forEach(medico => {
          const option = document.createElement('option');
          option.value = medico.id;
          option.text = medico.nome;
          nomeMedicoSelect.appendChild(option);
        });
  
        quartos.forEach(quarto => {
          const option = document.createElement('option');
          option.value = quarto.id;
          option.text = quarto.quarto;
          quartoPacienteSelect.appendChild(option);
        });
  
        medicamentos.forEach(medicamento => {
          const option = document.createElement('option');
          option.value = medicamento.id;
          option.text = medicamento.desccom;
          medicamentoSelect.appendChild(option);
        });
      }
  
      // Manipula o envio do formulário
      function handleFormSubmit(event) {
        event.preventDefault();
  
        // Obtenha os valores selecionados
        const pacienteId = document.getElementById('nome-paciente').value;
        const medicoId = document.getElementById('nome-medico').value;
        const quartoId = document.getElementById('quarto-paciente').value;
        const medicamentoId = document.getElementById('medicamento').value;
  
        // Faça algo com os valores selecionados (por exemplo, salvar no Local Storage)
  
        // Exemplo de impressão dos valores selecionados no console
        console.log('Paciente ID:', pacienteId);
        console.log('Médico ID:', medicoId);
        console.log('Quarto ID:', quartoId);
        console.log('Medicamento ID:', medicamentoId);
      }
  
      // Associa a função de manipulação do envio do formulário ao evento 'submit'
      const crudForm = document.getElementById('crudForm');
      crudForm.addEventListener('submit', handleFormSubmit);
  
      // Popula os selects quando a página carrega
      populateSelects();