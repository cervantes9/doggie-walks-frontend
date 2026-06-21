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
  { id: 0, url: 'https://images.pexels.com/photos/7210271/pexels-photo-7210271.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Paseador con perros en el parque' },
  { id: 1, url: 'https://images.pexels.com/photos/16565503/pexels-photo-16565503.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Perro siendo entrenado' },
  { id: 2, url: 'https://images.pexels.com/photos/33710378/pexels-photo-33710378.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Paseadora jugando con perro' },
  { id: 3, url: 'https://images.pexels.com/photos/14116508/pexels-photo-14116508.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Perro feliz en paseo' },
  { id: 4, url: 'https://images.pexels.com/photos/22236325/pexels-photo-22236325.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Entrenamiento canino' },
  { id: 5, url: 'https://images.pexels.com/photos/7210693/pexels-photo-7210693.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Paseo en el parque' },
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