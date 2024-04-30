
function cadastrarRegistro(nome,fone,marca,modelo,cor,servico,valor) {
    
    // Captura os valores do formulário
    var  nome = document.getElementById("nome").value;
    var  fone = document.getElementById("fone").value;
    var  marca = document.getElementById("marca").value;
    var  modelo = document.getElementById("modelo").value;
    var  cor = document.getElementById("cor").value;
    var  servico = document.getElementById("servico").value;
    var valor= document.getElementById("valor").value;
   // validarFormulario();
   
    // Cria um objeto com os dados a serem enviados
    var data = {
        nome: nome,
        fone: fone,
        marca: marca,
        modelo: modelo,
        cor: cor,
        servico: servico,
        valor: valor
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/celular', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     
     document.getElementById("nome").value ="";
     document.getElementById("fone").value ="";
     document.getElementById("marca").value ="";
     document.getElementById("modelo").value ="";
     document.getElementById("cor").value ="";
     document.getElementById("servico").value ="";
     document.getElementById("valor").value ="";
    // window.location.href = "";
   
}


    function validarFormulario() { 
    
    var nome = document.getElementById('nome').value;
    var fone = document.getElementById('fone').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var cor = document.getElementById('cor').value;
    var servico =  document.getElementById("servico").value;
    var valor = document.getElementById('valor').value;
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (fone === '') {
        alert('Por favor, preencha o campo Telefone.');
        return false;
    }
    if (marca === '') {
        alert('Por favor, preencha o campo Marca.');
        return false;
    }
    if (modelo === '') {
        alert('Por favor, preencha o campo Modelo.');
        return false;
    }

    if (cor === '') {
        alert('Por favor, preencha o campo Cor.');        
        return false;
    }
    if (servico === '') {
        alert('Por favor, preencha o campo Serviço.');
        return false;
    }

    if (valor === '') {
        alert('Por favor, preencha o campo Valor.');
        return false;
    }
   
    
     cadastrarRegistro(nome,fone,marca,modelo,cor,servico,valor);

    
    return true;
}

     // Função para buscar dados da API e preencher a tabela
     async function fetchDataAndPopulateTable() {
        try {
          // Substitua 'URL_DA_SUA_API' pela URL real da sua API
          const response = await fetch( 'http://localhost:8080/celular');
          const data = await response.json();
  
          // Limpa a tabela antes de inserir novos dados
          const tbody = document.querySelector('#tabela tbody');
          tbody.innerHTML = '';
  
          // Preenche a tabela com os dados recebidos da API
          data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${item.id}</td>
              <td>${item.nome}</td>
              <td>${item.fone}</td>
              <td>${item.marca}</td>
              <td>${item.modelo}</td>
              <td>${item.cor}</td>
              <td>${item.servico}</td>
              <td>${item.valor}</td> 
              <td><button  class="btn btn-warning"  onclick="buscarPorId(${item.id})">Detalhes</button></td>
              <td><button  class="btn btn-success"  onclick=" updateUserData()">Editar</button></td>
              <td><button  class="btn btn-danger" onclick="deletarRegistro(${item.id})">Excluir</button></td>`;
                           
            tbody.appendChild(row);
          });
        } catch (error) {
          console.error('Erro ao buscar e preencher dados:', error);
        }
      }
      document.addEventListener('DOMContentLoaded', () => {
      // Chama a função para buscar e preencher os dados quando a página carrega
       fetchDataAndPopulateTable();
    });
     
    function preencherFormulario(user) {
        document.getElementById('id').value = user.id;
        document.getElementById('nome').value = user.nome;
        document.getElementById('fone').value = user.fone;
        document.getElementById('marca').value = user.marca;
        document.getElementById('modelo').value = user.modelo;
        document.getElementById('cor').value = user.cor;
        document.getElementById('servico').value = user.servico;
        document.getElementById('valor').value = user.valor;     
  
    }

    function buscarPorId(id) {
        fetch('http://localhost:8080/celular/' + id)
          .then(response => response.json())
          .then(user => {
            preencherFormulario(user) ;
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
        async function updateUserData() {    
        const idInput = document.getElementById('id');
        const nomeInput = document.getElementById('nome');
        const foneInput = document.getElementById('fone');
        const marcaInput = document.getElementById('marca');
        const modeloInput = document.getElementById('modelo');
        const corInput = document.getElementById('cor');
        const servicoInput = document.getElementById('servico');
        const valorInput = document.getElementById('valor');
        
          
        const updateId =  idInput.value
        const updateNome = nomeInput.value 
        const updateFone = foneInput.value
        const updateMarca = marcaInput.value 
        const updateModelo = modeloInput.value 
        const updateCor = corInput.value 
        const updateServico = servicoInput.value
        const updateValor = valorInput.value 
        
      
        try {
          const response = await fetch(`http://localhost:8080/celular`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateId,
              nome: updateNome,
              fone: updateFone,
              marca: updateMarca,
              modelo: updateModelo,
              cor: updateCor,
              servico: updateServico,
              valor: updateValor,
              
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
          }
      
          alert('Dados do usuário atualizados com sucesso!');
          fetchDataAndPopulateTable();          
        } catch (error) {
          console.error(`Erro durante a atualização dos dados: ${error.message}`);
        }
        document.getElementById("nome").value = "";
        document.getElementById("fone").value ="";
        document.getElementById("marca").value ="";
        document.getElementById("modelo").value ="";
        document.getElementById("cor").value ="";
        document.getElementById("servico").value ="";
        document.getElementById("valor").value ="";
      }

      async function deletarRegistro(id) {
        try {
          // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
          const response = await fetch(`http://localhost:8080/celular/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // Adicione cabeçalhos adicionais, se necessário
            },
          });
  
          if (response.ok) {
            console.log(`Registro com ID ${id} deletado com sucesso.`);
            // Atualiza a tabela após a exclusão
            fetchDataAndPopulateTable();
          } else {
            console.error('Erro ao deletar registro:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao deletar registro:', error);
        }
      }
