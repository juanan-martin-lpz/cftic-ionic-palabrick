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
  @Output() public borrarLetra: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public filas!: number;

  public styleClasses = ["tecla", "border-grey"];

  private readonly sletras = "QWERTYUIOPASDFGHJKLÑ0ZXCVBNM0";
  private readonly aletras: string[] = this.sletras.split('');

  @ViewChildren(FilaComponent) public cfilas!: QueryList<FilaComponent>;

  @Input()
  public columnas!: number;
  constructor() {
    this.filas = 3;
    this.columnas = 10;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //const aletras: string[] = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split('');

    let counter = 0;

    for(let i = 0; i < this.filas; i++) {
      for(let j = 0; j < this.columnas; j++) {
        this.setText(i, j, this.aletras[counter]);
        counter++;
      }
    }

    this.hideEmpty();
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

  hideEmpty() {
    this.cfilas.forEach(f => f.hideEmpty());
  }

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

  del() {
    console.log("teclado borrar")
    this.borrarLetra.emit();
  }

  click(tecla: string) {
      this.letraPulsada.emit(tecla);
  }

  setResult(f: number, c: number, l: string) {

    let cx: CeldaComponent | undefined;
    let fx: FilaComponent | undefined  = this.cfilas.get(f);

    if (fx) {
      cx = fx.cceldas.get(c);

      cx?.removeStyleClass("none");
      cx?.addStyleClass(l);
    }
  }

  getKeyCoordinates(l: string): number[] {

    const pos = this.sletras.indexOf(l);
    const x = Math.floor(pos/this.columnas);
    const y = pos % this.columnas;

    return [x, y];
  }

}
