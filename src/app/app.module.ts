import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { FilaComponent } from './componentes/fila/fila.component';
import { CeldaComponent } from './componentes/celda/celda.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    FilaComponent,
    CeldaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
