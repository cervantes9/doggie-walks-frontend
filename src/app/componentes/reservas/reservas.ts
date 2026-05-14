import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas {

  private http = inject(HttpClient);
  private router = inject(Router);

  listaPaseadores$ = this.http.get<any[]>('http://localhost:8080/api/paseadores');

  nombreCliente: string = '';
  email: string = '';
  telefono: string = '';
  tipoPaseo: string = '';
  fecha: string = '';
  hora: string = '';
  mensaje: string = '';
  idPaseador: number = 0;
  fechaMinima: string = new Date().toISOString().split('T')[0];
  enviando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  hacerReserva() {

  if (this.enviando) return;

  this.enviando = true;

  const datos = {
    nombreCliente: this.nombreCliente,
    email: this.email,
    telefono: this.telefono,
    tipoPaseo: this.tipoPaseo,
    fecha: this.fecha,
    hora: this.hora,
    mensaje: this.mensaje,
    idPaseador: this.idPaseador
  };

  this.http.post('http://localhost:8080/api/reservas', datos)
    .subscribe({
      next: () => {
        this.router.navigate(['/reserva-confirmada']);
      },
      error: (err) => {
        this.mensajeExito = '';
        // Si el backend responde con 409 es email duplicado
        if (err.status === 409) {
          this.mensajeError = 'Ya tienes una reserva registrada con ese email para esa fecha. Por favor elige otra fecha o usa otro email.';
        } else {
          this.mensajeError = 'Hubo un error al enviar la reserva. Intenta de nuevo.';
        }
        this.enviando = false;
      }
    });
}

  validarYMostrarModal() {

  // Validamos campo por campo y mostramos mensaje específico
  if (!this.nombreCliente) {
    this.mensajeError = 'Por favor ingresa tu nombre completo.';
    return;
  }
  if (!this.email) {
    this.mensajeError = 'Por favor ingresa tu correo electrónico.';
    return;
  }
  if (!this.telefono) {
    this.mensajeError = 'Por favor ingresa tu número de teléfono.';
    return;
  }
  if (!this.tipoPaseo) {
    this.mensajeError = 'Por favor selecciona el tipo de paseo.';
    return;
  }
  if (!this.fecha) {
    this.mensajeError = 'Por favor selecciona una fecha para el paseo.';
    return;
  }
  if (!this.hora) {
    this.mensajeError = 'Por favor selecciona una hora para el paseo.';
    return;
  }

  this.mensajeError = '';

  const modal = document.getElementById('modalConfirmacion');
  if (modal) {
    const bootstrapModal = (window as any).bootstrap.Modal.getOrCreateInstance(modal);
    bootstrapModal.show();
  }
}

  limpiarFormulario() {
    this.nombreCliente = '';
    this.email = '';
    this.telefono = '';
    this.tipoPaseo = '';
    this.fecha = '';
    this.hora = '';
    this.mensaje = '';
    this.idPaseador = 0;
  }
}