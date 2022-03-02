import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-celda',
  templateUrl: './celda.component.html',
  styleUrls: ['./celda.component.css']
})
export class CeldaComponent implements OnInit {

  public letra!: string;

  public symbol = false;
  public symbolChar = "";

  @Input()
  public styleClasses!: string[];

  @Output() public letraPulsada: EventEmitter<string> = new EventEmitter<string>();
  @Output() public borrarLetra: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    //this.styleClasses = ["hide"];
  }

  ngOnInit(): void {
    this.letra = "";
  }

  addStyleClass(style: string) {
    if (!this.styleClasses.includes(style)) {
      this.styleClasses.push(style);
    }
  }

  removeStyleClass(style: string) {
    this.styleClasses = this.styleClasses.filter(c => c != style);

  }


  setLetra(letra: string) {

    this.letra = letra;

    if (letra != "0") {
      this.symbol = false;
    }
    else {
      this.symbol = true;
    }

  }

  click() {
    if (this.letra != "0") {
      this.letraPulsada.emit(this.letra);
    }
    else {
      this.borrarLetra.emit();
    }

  }

  clearStyleClass() {
    this.styleClasses = [];
  }
}
