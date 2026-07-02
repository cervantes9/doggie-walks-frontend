import { Component, inject, ChangeDetectorRef   } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css',
})
export class Contacto {

  // Como el @Autowired de Spring Boot
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  // Una variable por cada campo del formulario
  nombre: string = '';
  telefono: string = '';
  email: string = '';
  mensaje: string = '';

  // Mensaje que se muestra después de enviar
  mensajeExito: string = '';
  mensajeError: string = '';

  // Se ejecuta cuando el usuario hace click en Enviar
  enviarMensaje() {

      if (!this.nombre)   { this.mensajeError = 'Por favor ingresa tu nombre completo.'; this.mensajeExito = ''; return; }
      if (!this.telefono) { this.mensajeError = 'Por favor ingresa tu número de teléfono.'; this.mensajeExito = ''; return; }
      if (!this.email)    { this.mensajeError = 'Por favor ingresa tu correo electrónico.'; this.mensajeExito = ''; return; }
      if (!this.mensaje)  { this.mensajeError = 'Por favor escribe tu mensaje.'; this.mensajeExito = ''; return; }

    // Armamos el objeto con los datos, igual que el JSON que espera Spring Boot
    const datos = {
      nombreCliente: this.nombre,
      telefono: this.telefono,
      email: this.email,
      mensaje: this.mensaje
    };

    // POST al backend, igual que @PostMapping en Spring Boot
    this.http.post(`${environment.apiUrl}/api/mensajes_contacto`, datos)
      .subscribe({
        next: () => {
          this.mensajeExito = '¡Mensaje enviado! Te contactaremos pronto.';
          this.mensajeError = '';
          // Limpiamos los campos después de enviar
          this.nombre = '';
          this.telefono = '';
          this.email = '';
          this.mensaje = '';
          this.cdr.detectChanges();
        },
        error: () => {
          this.mensajeError = 'Hubo un error al enviar el mensaje. Intenta de nuevo.';
          this.mensajeExito = '';
          this.cdr.detectChanges();
        }
      });
  }
}
