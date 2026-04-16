import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-cliente',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './cadastrar-cliente.html',
  styleUrl: './cadastrar-cliente.css',
})
export class CadastrarCliente {

  //atributos
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //instanciando a bilbioteca HttpClient
  http = inject(HttpClient);

  //criando um formulário para capturar os campos
  formulario = new FormGroup({
      nome : new FormControl('', [Validators.required]),
      cpf : new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      logradouro : new FormControl('', [Validators.required]),
      numero : new FormControl('', [Validators.required]),
      complemento : new FormControl('', [Validators.required]),
      bairro : new FormControl('', [Validators.required]),
      cidade : new FormControl('', [Validators.required]),
      uf : new FormControl('', [Validators.required]),
      cep : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  });

  buscarCep() {

    const cep = this.formulario.get('cep')?.value;

    if(cep?.length != 8) return;

    this.http.get('https://viacep.com.br/ws/' + cep + '/json')
    .subscribe((data: any) => {

      if(data.erro) return;

      this.formulario.patchValue({
        logradouro: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      });
    });
  }

  //função chamada quando o formulário for submetido
  cadastrar() {

    //limpar as mensagens
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');
    
    //capturando os dados do formulário
    const request = { //JSON
      nome:  this.formulario.value.nome!,
      cpf: this.formulario.value.cpf!,
      enderecos: [
        {
          logradouro: this.formulario.value.logradouro!,
          numero: this.formulario.value.numero!,
          complemento: this.formulario.value.complemento!,
          bairro: this.formulario.value.bairro!,
          cidade: this.formulario.value.cidade!,
          uf: this.formulario.value.uf!,
          cep: this.formulario.value.cep!
        }
      ]
    }

    //enviando os dados para o backend
    this.http.post('http://localhost:8081/api/cliente/criar', request, { responseType: 'text' })
      .subscribe({
        next : (resposta) => { //capurando a resposta de sucesso do backend
          this.mensagemSucesso.set(resposta);
          this.formulario.reset(); //limpando o formulário após o cadastro
        },
        error: (e) => { //capturando a resposta de erro do backend
          this.mensagemErro.set(e.error);
        }
      });

  
  }
}
