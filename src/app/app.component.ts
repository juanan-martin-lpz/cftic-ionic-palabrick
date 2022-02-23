import { Component } from '@angular/core';
import { PalabrasService } from './servicios/palabras.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'palabrick';

  public palabraE = "";
  public error = false;

  public palabra: String = "";

  constructor(private palabrasService: PalabrasService) {

    this.palabra = this.palabrasService.obtenerPalabra();
  }

  otra(): void {
    this.palabra = this.palabrasService.obtenerPalabra();
  }

  comprobar() {
    if (this.palabrasService.comprobarPalabra(this.palabraE)) {
      this.error = false;
      this.palabrasService.validarPalabra(this.palabraE);
    }
    else {
      this.error = true;
    }
  }
}
