import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';
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

  setLetra(f: number, c: number, l: string) {

    let cx: CeldaComponent | undefined;
    let fx: FilaComponent | undefined  = this.cfilas.get(f);

    if (fx) {
      cx = fx.cceldas.get(c);

      cx?.setLetra(l);
    }
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
