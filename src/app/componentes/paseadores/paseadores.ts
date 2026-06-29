import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-paseadores',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './paseadores.html',
  styleUrl: './paseadores.css',
})
export class Paseadores {

  private http = inject(HttpClient);

  listaPaseadores$ = this.http.get<any[]>(`${environment.apiUrl}/api/paseadores`);
}