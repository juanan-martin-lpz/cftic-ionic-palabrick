import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FilaComponent } from '../fila/fila.component';
import { CeldaComponent } from '../celda/celda.component';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.css']
})
export class TecladoComponent implements OnInit, AfterViewInit {

  @Output() public letraPulsada: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public filas!: number;

  public styleClasses = ["tecla", "border-blue"];

  @ViewChildren(FilaComponent) public cfilas!: QueryList<FilaComponent>;

  @Input()
  public columnas!: number;
  constructor() {
    this.filas = 4;
    this.columnas = 7;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const aletras: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    let counter = 0;

    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 7; j++) {
        this.setText(i, j, aletras[counter]);
        counter++;
      }
    }
  }

  setText(f: number, c: number, t: string) {

    let cx: CeldaComponent | undefined;

    let fx: FilaComponent | undefined  = this.cfilas.get(f);

    if (fx) {
      cx = fx.cceldas.get(c);

      cx?.setLetra(t);
    }

  }

  public range = (n: number) => Array.from({length: n}, (value, key) => key)

  addStyleClass(style: string) {
    if (!this.styleClasses.includes(style)) {
      this.styleClasses.push(style);
    }
  }

  removeStyleClass(style: string) {
    this.styleClasses = this.styleClasses.filter(c => c != style);

  }

  clearStyleClasses(): void {
    this.styleClasses = [];
  }

  click(tecla: string) {
    this.letraPulsada.emit(tecla);
  }

}
