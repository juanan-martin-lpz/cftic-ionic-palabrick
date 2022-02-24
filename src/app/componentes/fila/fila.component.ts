import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.css']
})
export class FilaComponent implements OnInit {

  @Input()
  public columnas!: number;

  constructor() { }


  ngOnInit(): void {
  }

  public range = (n: number) => Array.from({length: n}, (value, key) => key)

}
