import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paseadores',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './paseadores.html',
  styleUrl: './paseadores.css',
})
export class Paseadores {

  private http = inject(HttpClient);

  listaPaseadores$ = this.http.get<any[]>('http://localhost:8080/api/paseadores');
}