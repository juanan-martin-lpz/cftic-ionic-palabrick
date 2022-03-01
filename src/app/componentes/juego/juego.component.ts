import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { PalabrasService } from 'src/app/servicios/palabras.service';
import { TableroComponent } from '../tablero/tablero.component';
import { TecladoComponent } from '../teclado/teclado.component';

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

  public ready = false;

  @Input()
  public columnas!: number;

  @ViewChild(TableroComponent) tablero!: TableroComponent;
  @ViewChild(TecladoComponent) teclado!: TecladoComponent;

  constructor(private palabrasService: PalabrasService) {
    // Se puede inicializar via html tag con [filas]="5" [columnas]="5" o por aqui
    this.filas = this.max_intentos;
    this.columnas = this.longitud;
    //

   }

  ngOnInit(): void {

    this.palabrasService.obtenerFicheroPalabras().then(() => this.palabrasService.obtenerPalabra());
    //this.palabrasService.obtenerPalabra();

  }

  empezar(){

    this.palabrasService.obtenerPalabra();

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
        for (let i=0; i < this.columnas; i++) {
          switch (resultado[i]) {
            case -1: {
              this.tablero.setResult(this.intento, i, "semiacierto");
              const k = this.teclado.getKeyCoordinates(this.palabra[i]);
              this.teclado.setResult(k[0], k[1], "semiacierto");

              break;
            }
            case 0: {
              this.tablero.setResult(this.intento, i, "fallo");
              const k = this.teclado.getKeyCoordinates(this.palabra[i]);
              this.teclado.setResult(k[0], k[1], "fallo");
              break;
            }
            case 1: {
              this.tablero.setResult(this.intento, i, "acierto");
              const k = this.teclado.getKeyCoordinates(this.palabra[i]);
              this.teclado.setResult(k[0], k[1], "acierto");

              break;
            }
            default: {
              break;
            }
          }
        }

        this.intento++;
        this.letra = 0;
        this.palabra = "";

      }
      else {

        this.error = true;
        this.letra = 0;
        // Pausa para error

        setTimeout(() => {
          let fx = this.tablero.cfilas.get(this.intento);
          fx?.limpiarCeldas();
          this.error = false;
        }, 2000);


        // Limpiar la fila



        //
      }
    }


  }
}
