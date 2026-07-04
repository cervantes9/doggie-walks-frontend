
// Este el panel de control o configuración global osea app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
//importa de angular  tipos de datos y captura de errores
import { provideRouter } from '@angular/router'; // navegar entre paginas  Por ejemplo, ir de /inicio a /login.
import { routes } from './app.routes';
//es la lista de rutas que tu defines en el archivo app.routes.ts

// NUEVO 1: esta herramienta nos sirve para llamar  al backend con  GET, POST ETC
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = { //esto es javascript lo que esta haciendo
  //llamando a las propiedades de ApplicationConfig el nombre de la variable es appConfig
  // es constante y publica con export.
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient() // NUEVO 2: Encendemos la herramienta (¡Ojo con poner la coma en la línea de arriba!)
  ]
};