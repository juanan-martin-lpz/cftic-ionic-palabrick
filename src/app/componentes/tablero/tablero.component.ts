import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FilaComponent } from '../fila/fila.component';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  //private filas!: Array<FilaComponent>;

  @ViewChildren(FilaComponent) cfilas!: QueryList<FilaComponent>;

  @Input()
  public filas!: number;

  @Input()
  public columnas!: number;

  constructor() { }

  public range = (n: number) => Array.from({length: n}, (value, key) => key)

  ngOnInit(): void {
  }

  printFilas() {
    console.log(this.cfilas);
  }
  /*
  inicializarTablero(filas: number, columnas: number) {

    for(let i:number = 0; i < filas; i++) {
      let fila = new FilaComponent();

      for (let j: number = 0; j < columnas; j++) {
        let celda = new CeldaComponent();

      }
    }
  }
  */

}
