
import { Routes } from '@angular/router';
import { Inicio } from './componentes/inicio/inicio';
import { Servicios } from './componentes/servicios/servicios';
import { Paseadores } from './componentes/paseadores/paseadores';
import { Galeria } from './componentes/galeria/galeria';
import { Faq } from './componentes/faq/faq';
import { Contacto } from './componentes/contacto/contacto';
import { Reservas } from './componentes/reservas/reservas';
import { ReservaConfirmada } from './componentes/reserva-confirmada/reserva-confirmada';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'servicios', component: Servicios },
  { path: 'paseadores', component: Paseadores },
  { path: 'galeria', component: Galeria },
  { path: 'faq', component: Faq },
  { path: 'contacto', component: Contacto },
  { path: 'reservas', component: Reservas },
  { path: 'reserva-confirmada', component: ReservaConfirmada },
];


