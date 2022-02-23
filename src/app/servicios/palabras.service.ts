import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVIDOR } from '../config/config';
import { IRespuestaValidacion } from '../modelos/IRespuestaValidacion';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  constructor(private http: HttpClient) {

    this.obtenerFicheroPalabras();

  }

  private palabras: Array<string> = [];
  private palabraActual: string = "";

  // Interfaz privada

  private obtenerFicheroPalabras(): void {
    this.http.get<Array<string>>(URL_SERVIDOR).subscribe(json => {
      this.palabras = json;
    });
  }

  private obtenerPalabraRandom(): string {

    const numero = Math.floor(Math.random() * (this.palabras.length));

    return this.palabras[numero];
  }

  private comprobarLetra(letra: string, indice: number, a: Array<string>) {

    console.log(this.palabraActual);

    const letrasActuales = this.palabraActual.split('');

    if (letra == letrasActuales[indice] ) {
      return -1;
    }
    else {
      if (letrasActuales.includes(letra)) {
        return 1
      }
      else {
        return 0;
      }
    }
  }
  // Interfaz publica.

  public obtenerPalabra(): string {

    this.palabraActual = this.obtenerPalabraRandom();

    return this.palabraActual;

  }

  public validarPalabra(palabra: string): IRespuestaValidacion {

    let resultado = {
      palabraExiste: true,
      resultadoValidacion: [0,0,0,0,0]
    };

    const palabras = palabra.split('');

    resultado.palabraExiste = this.palabras.includes(palabra);

    if (resultado.palabraExiste) {
      resultado.resultadoValidacion = <Array<number>>  palabras.map((l,i,a) => this.comprobarLetra(l,i,a));
    }

    console.log(resultado);

    return resultado;
  }
}
