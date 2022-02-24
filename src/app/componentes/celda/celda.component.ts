import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit {

  public letra!: string;

  @Output() public letraPulsada: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.letra = "";
  }

  setLetra(letra: string) {
    this.letra = letra;
  }

  click() {
    this.letraPulsada.emit(this.letra);
  }

}
