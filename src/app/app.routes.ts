import { Routes } from '@angular/router';
import { CadastrarCliente } from './components/cadastrar-cliente/cadastrar-cliente';
import { ConsultarCliente } from './components/consultar-cliente/consultar-cliente';

export const routes: Routes = [
    {
        path: 'pages/cadastrar-cliente',
        component: CadastrarCliente
    },
    {
        path: 'pages/consultar-cliente',
        component: ConsultarCliente
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/pages/consultar-cliente'

    }
];
