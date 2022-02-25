import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit {

  public letra!: string;

  @Input()
  public styleClasses!: string[];

  @Output() public letraPulsada: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    //this.styleClasses = "";
  }

  ngOnInit(): void {
    this.letra = "";
  }

  /*
  addStyleClass(style: string) {
    if (!this.styleClasses.includes(style)) {
      this.styleClasses.push(style);
    }
  }

  removeStyleClass(style: string) {
    this.styleClasses = this.styleClasses.filter(c => c != style);

  }
  */

  setLetra(letra: string) {
    this.letra = letra;
  }

  click() {
    this.letraPulsada.emit(this.letra);
  }

}
