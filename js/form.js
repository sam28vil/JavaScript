var botaoAdicionar=document.querySelector("#adicionar-paciente")
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault();

    var form=document.querySelector("#form-adiciona");


    var paciente=obtemPacienteDoFormulario(form);

    var pacienteTr=montaTr(paciente);

    //adiçao aqui
   var erros = validaPaciente(paciente);

    if (erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }

//adiciona na tabela
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

    adicionaPacienteNaTabela(paciente);

    form.reset();

// limpa o form e as mensagens da tela]

    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";

});

    
   function exibeMensagensDeErro(erros)  { //erros representa o array de erros
    var ul = document.querySelector("#mensagens-erro"); //local aonde vai exibir a mensagem
    ul.innerHTML = "";

    erros.forEach(function(erro) { // para cada item do meu array vc executa essa função 
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}


function adicionaPacienteNaTabela(paciente){
     var pacienteTr=montaTr(paciente);
     var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);

}


function obtemPacienteDoFormulario(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura:form.altura.value,
        gordura:form.gordura.value,
        imc:calculaImc(form.peso.value,form.altura.value)
    }
    return paciente;
}

function montaTr(paciente){
    var pacienteTr=document.createElement("tr");
    pacienteTr.classList.add("paciente"); // p add nova classe no novo paciente adcionado na tabela

    pacienteTr.appendChild(montaTd(paciente.nome,"info-nome")); //paciente.nome por causa da nova classe criada e da propriedade (paciente) atribuida
    pacienteTr.appendChild(montaTd(paciente.peso,"info-peso"));
    pacienteTr.appendChild(montaTd(paciente.altura,"info-altura"));;
    pacienteTr.appendChild(montaTd(paciente.gordura,"info-gordura"));
    pacienteTr.appendChild(montaTd(paciente.imc,"info-imc"));
    return pacienteTr;
}

function montaTd(dado,classe){
    var td=document.createElement("td");
    td.textContent=dado; // o dado que a pessoa passar 
    td.classList.add(classe);
    return td;
}

function validaPaciente(paciente){

    var erros = []; // porque uma função nao retorna 2 parametros.

    if (paciente.nome.length == 0) {
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.gordura.length == 0) {
        erros.push("A gordura não pode ser em branco");
    }

    if (paciente.peso.length == 0) {
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0) {
        erros.push("A altura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

    return erros;
}