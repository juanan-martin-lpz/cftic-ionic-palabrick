import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PalabrasService } from 'src/app/servicios/palabras.service';
import { TableroComponent } from '../tablero/tablero.component';

/**
 * La clase Juego integra todos los mecanismos del juego como son el Teclado, el Tablero, Servicio de Palabras, etc..
 * Tiene dos inputs para poder ser configurado desde la vista si fuera preciso.
 *
 */
@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  private readonly max_intentos = 5;
  private readonly longitud = 5;

  private intento = 0;
  private letra = 0;
  private palabra: string = "";
  @Output() public letraPulsada: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public filas!: number;

  public error: boolean = false;

  @Input()
  public columnas!: number;

  @ViewChild(TableroComponent) tablero!: TableroComponent;

  constructor(private palabrasService: PalabrasService) {
    // Se puede inicializar via html tag con [filas]="5" [columnas]="5" o por aqui
    this.filas = this.max_intentos;
    this.columnas = this.longitud;
    //

    let p = this.palabrasService.obtenerPalabra();
   }

  ngOnInit(): void {

  }


  click(tecla: string) {

    this.error = false;

    this.tablero.setLetra(this.intento, this.letra, tecla);

    this.palabra += tecla;

    this.letra++;

    if (this.letra == 5) {

      if (this.palabrasService.comprobarPalabra(this.palabra)) {


        let resultado: number[] = this.palabrasService.validarPalabra(this.palabra, true);
        console.log(resultado);
        // Chequear si todos son unos

        // si no..
        // decorar letras

        this.intento++;

      }
      else {
        this.error = true;
        this.letra = 0;
        // Limpiar la fila

        //
      }
    }

  }
}
