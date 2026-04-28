import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({ //@Controller o @RestController
  selector: 'app-root', // El nombre con que se usa en HTML, punto de entrada en index.html
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html', // La vista en MVC
  styleUrl: './app.css' // El CSS de ese componente
})
export class App {
}