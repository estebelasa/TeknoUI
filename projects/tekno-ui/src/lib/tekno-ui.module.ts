import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importa los componentes que quieras exportar desde la librería

@NgModule({
  declarations: [
     // Aquí declaras tus componentes
  ],
  imports: [
    CommonModule, // Cualquier módulo común que necesites, como CommonModule
  ],
  exports: [
     // Aquí exportas los componentes que quieras que estén disponibles públicamente
  ]
})
export class TeknoUiModule { }
