import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-consultar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './consultar-cliente.html',
  styleUrl: './consultar-cliente.css',
})
export class ConsultarCliente {

  //atributos
  clientes = signal<any[]>([]); //array de objetos (lista)
 
  http = inject(HttpClient);

  //variaveis para exibir mensagens de sucesso ou de erro
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  consultar() {
    
    const nome = this.formulario.value.nome!;

    this.http.get('http://localhost:8081/api/cliente/consultar?nome=' + nome)
    .subscribe((data) => {
      //guardar os adados obtidos da API (listagem d eclientes)
      this.clientes.set(data as any[]);
    });
  }

  excluir(id : number) {

    if(confirm('Excluir o cliente selecionado?')) {

      //limpar as mensagens
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

      this.http.delete('http://localhost:8081/api/cliente/excluir/' + id, { responseType: 'text'})
    .subscribe({
        next: (resposta) => {
          this.mensagemSucesso.set(resposta);
          this.consultar();
        },
        error: (e) => {
          this.mensagemErro.set(e.error);
        }
    });
  }

  }
}
