import { Component, inject, ChangeDetectorRef, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reservas',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
})
export class Reservas implements OnInit {

  private http = inject(HttpClient);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

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
  mensajeErrorBackend: string = '';
  mostrarModal: boolean = false;

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['tipoPaseo']) {
      this.tipoPaseo = params['tipoPaseo'];
    }
  });
}


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
  // Primero cerramos el modal
    const modal = document.getElementById('modalConfirmacion');
    if (modal) {
    const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) bootstrapModal.hide();
    }
    // Luego eliminamos el backdrop que Bootstrap deja en el fondo
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();

  // Y navegamos a la confirmación
  setTimeout(() => {
    this.router.navigate(['/reserva-confirmada']);
  }, 300);
  },
      error: (err) => {
  this.mensajeError = '';
this.mensajeErrorBackend = '';
this.enviando = false; // Resetear siempre antes de abrir el modal

  // Mensaje específico según el error del backend
  if (err.status === 409) {
    this.mensajeErrorBackend = 'Ya tienes una reserva registrada con ese email para esa fecha. Por favor elige otra fecha o usa otro email.';
  } else if (err.status === 423) {
    this.mensajeErrorBackend = 'El paseador seleccionado no está disponible a esa hora. Por favor elige otro horario o paseador.';
  } else {
    this.mensajeErrorBackend = 'Hubo un error al enviar la reserva. Intenta de nuevo.';
  }

  this.cdr.detectChanges();
}
    });
}

  validarYMostrarModal() {
  if (!this.nombreCliente) { this.mensajeError = 'Por favor ingresa tu nombre completo.'; return; }
  if (!this.email) { this.mensajeError = 'Por favor ingresa tu correo electrónico.'; return; }
  if (!this.telefono) { this.mensajeError = 'Por favor ingresa tu número de teléfono.'; return; }
  if (!this.tipoPaseo) { this.mensajeError = 'Por favor selecciona el tipo de paseo.'; return; }
  if (!this.fecha) { this.mensajeError = 'Por favor selecciona una fecha para el paseo.'; return; }
  if (!this.hora) { this.mensajeError = 'Por favor selecciona una hora para el paseo.'; return; }
  this.mensajeError = '';
  this.mensajeErrorBackend = '';
  this.enviando = false;
  this.mostrarModal = true; // 👈 esta línea abre el modal
}

cerrarModal() {
  this.mostrarModal = false;
  this.enviando = false;
  this.mensajeErrorBackend = '';
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