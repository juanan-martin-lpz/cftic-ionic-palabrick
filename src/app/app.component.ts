import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PalabrasService } from './servicios/palabras.service';
import { FilaComponent } from './componentes/fila/fila.component';
import { TableroComponent } from './componentes/tablero/tablero.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'palabrick';

  public palabraE = "";
  public error = false;

  private intentos = 0;

  public palabra: String = "";

  @ViewChild(TableroComponent) tablero!: TableroComponent;


  constructor(private palabrasService: PalabrasService) {

    this.palabra = this.palabrasService.obtenerPalabra();
  }

  otra(): void {
    this.palabra = this.palabrasService.obtenerPalabra();
  }

  comprobar() {
    if (this.palabrasService.comprobarPalabra(this.palabraE)) {
      this.error = false;
      // Metodo Wordle
      //console.log("Metodo Wordle");
      //console.log(this.palabrasService.validarPalabra(this.palabraE));
      //console.log("Metodo Extendido")
      //console.log(this.palabrasService.validarPalabra(this.palabraE, true));
    }
    else {
      this.error = true;
    }

    //console.log(this.filas);

    this.intentos++;
  }
}
