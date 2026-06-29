import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-servicios',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css',
})
export class Servicios {

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  listaServicios$ = this.http.get<any[]>(`${environment.apiUrl}/api/servicios`);

  videoSeleccionado: SafeResourceUrl | null = null;

  abrirVideo(url: string) {
    this.videoSeleccionado = this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=1');
  }

  cerrarVideo() {
    this.videoSeleccionado = null;
  }
}