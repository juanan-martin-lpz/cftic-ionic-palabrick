import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVIDOR } from '../config/config';

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

  /**
   *
   * @param letra
   * @param indice
   * @param a
   * @returns
   */
  private comprobarLetra(letra: string, indice: number, a: Array<string>) {

    console.log(letra);

    const letrasActuales = this.palabraActual.split('');

    if (letra == letrasActuales[indice] ) {
      return 1;
    }
    else {
      if (letrasActuales.includes(letra)) {
        return -1
      }
      else {
        return 0;
      }
    }
  }
  // Interfaz publica.

  /**
   * Obtiene una palabra del dicciionario y la pone en juego
   *
   * Almacena la palabra para futuros usos. La palabra cambiara con cada llamada
   *
   * @returns string
   */
  public obtenerPalabra(): string {

    //this.palabraActual = this.obtenerPalabraRandom();
    this.palabraActual = "PLATA";
    return this.palabraActual;

  }

  /**
   * Comprueba la palabra
   *
   * Comprueba las letras de la palabra pasada contra la palabra almacenada en @palabraActual
   *
   * @param palabra La palabra a validar
   * @returns
   **/
  public validarPalabra(palabra: string): Array<number> {

    const palabras = palabra.toUpperCase().split('');

    const a = <Array<number>>  palabras.map((l,i,a) => this.comprobarLetra(l,i,a));

    console.log(a);

    console.log(palabras.map((item, index, array) => {
                    console.log(item);
                    return array.includes(item, index + 1) ? array.indexOf(item, index+1): -1 }));

    return a; //<Array<number>>  palabras.map((l,i,a) => this.comprobarLetra(l,i,a));

  }

  /**
   * Comprueba que la palabra este en el diccionario
   *
   * @param palabra: La palabra a comprobar
   *
   * @returns boolean
   **/
  public comprobarPalabra(palabra: string): boolean {

    return this.palabras.includes(palabra.toUpperCase()) || false;

  }
}
