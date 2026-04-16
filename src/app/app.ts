import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    RouterOutlet //permitir fazer o efeito SPA - Single Page
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
