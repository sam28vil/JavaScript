//requisição AJAX
var botaoAdicionar= document.querySelector("#buscar-paciente");

botaoAdicionar.addEventListener("click", function(){

	console.log("buscando pacinetes...");

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes"); //abrir a requisição

	xhr.addEventListener("load",function(){ //pegar a resosta e imprimir na tela

		
		var erroAjax=document.querySelector("#erro-ajax");
		if(xhr.status ==200){

			erroAjax.classList.add("invisivel");
			var resposta = xhr.responseText; //acesso aos dados da resposta que é o conteudo
		    var pacientes = JSON.parse(resposta); //parciar a resposta em json
         
            pacientes.forEach(function(paciente){
         	adicionaPacienteNaTabela(paciente);

         });
        } else{
        	console.log(xhr.status);
        	console.log(xhr.responseText);
        	
        	erroAjax.classList.remove("invisivel");

        }
		 
	}); 

	xhr.send(); //enviar requisição
        
        
}); 

