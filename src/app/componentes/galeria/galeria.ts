import { Component } from '@angular/core';

@Component({
  selector: 'app-galeria',
  imports: [],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {

  // La lista de fotos con su id, url y descripción
  fotos = [
    { id: 0, url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800', alt: 'Perrito en paseo' },
    { id: 1, url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800', alt: 'Perrito feliz' },
    { id: 2, url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800', alt: 'Perrito jugando' },
    { id: 3, url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800', alt: 'Perrito corriendo' },
    { id: 4, url: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=800', alt: 'Perrito descansando' },
    { id: 5, url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=800', alt: 'Perrito en parque' },
  ];

  // -1 significa que no hay foto seleccionada y el modal está cerrado
  fotoSeleccionada: number = -1;

  // Abre el modal con la foto que se clickeó
  abrirFoto(id: number) {
    this.fotoSeleccionada = id;
  }

  // Cierra el modal
  cerrarFoto() {
    this.fotoSeleccionada = -1;
  }

  // Va a la foto anterior
  fotoAnterior() {
    if (this.fotoSeleccionada > 0) {
      this.fotoSeleccionada--;
    } else {
      this.fotoSeleccionada = this.fotos.length - 1;
    }
  }

  // Va a la foto siguiente
  fotoSiguiente() {
    if (this.fotoSeleccionada < this.fotos.length - 1) {
      this.fotoSeleccionada++;
    } else {
      this.fotoSeleccionada = 0;
    }
  }
}