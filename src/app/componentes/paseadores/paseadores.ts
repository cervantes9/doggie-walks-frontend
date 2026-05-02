import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-paseadores',
  imports: [AsyncPipe],
  templateUrl: './paseadores.html',
  styleUrl: './paseadores.css',
})
export class Paseadores {

  // Como el @Autowired de Spring Boot, inyectamos el HttpClient
  private http = inject(HttpClient);

  // El canal de datos que apunta al endpoint de paseadores
  listaPaseadores$ = this.http.get<any[]>('http://localhost:8080/api/paseadores');

}