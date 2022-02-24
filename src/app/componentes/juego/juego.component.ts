import { Component, Input, OnInit } from '@angular/core';

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

  @Input()
  public filas!: number;

  @Input()
  public columnas!: number;

  constructor() {
    // Se puede inicializar via html tag con [filas]="5" [columnas]="5" o por aqui
    this.filas = 5;
    this.columnas = 5;
    //
   }

  ngOnInit(): void {
  }


}
