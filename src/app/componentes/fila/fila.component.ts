import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CeldaComponent } from '../celda/celda.component';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {

  @Input()
  public columnas!: number;

  @ViewChildren(CeldaComponent) public cceldas!: QueryList<CeldaComponent>;

  constructor() { }


  ngOnInit(): void {
  }

  public range = (n: number) => Array.from({length: n}, (value, key) => key)

}
