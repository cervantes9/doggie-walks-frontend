import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-servicios',
  imports: [AsyncPipe],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {

  // inject() es como @Autowired en Spring Boot
  private http = inject(HttpClient);

  // Ahora sí podemos usar this.http aquí directamente
  listaServicios$ = this.http.get<any[]>('http://localhost:8080/api/servicios');

}
