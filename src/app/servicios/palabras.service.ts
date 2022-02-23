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

    const letrasActuales = this.palabraActual.split('');

    if (letra == letrasActuales[indice] ) {
      //console.log(`${letra} : 1`);
      return 1;
    }
    else {
      if (letrasActuales.includes(letra)) {
        //console.log(`${letra} : -1`);
        return -1
      }
      else {
        //console.log(`${letra} : 0`);
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

    this.palabraActual = this.obtenerPalabraRandom();
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

    // Comprobamos las letras, nos da un resultado "en bruto"
    const a = <Array<number>>  palabras.map((l,i,a) => this.comprobarLetra(l,i,a));


    // Creamos un array con las repeticiones de cada letra. Si no estuviera repetida -1, caso contrario el indice de la siguiente repeticion
    // La ultima de las repeticiones tendra -1
    const b = palabras.map((item,
                                      index,
                                      array) => {
                                                                  //console.log(item);
                                                                  return array.includes(item, index + 1) ? array.indexOf(item, index+1): -1 })

    //console.log("Repeticiones");
    console.log(b);


    // Recalculamos el resultado e otra repeticion, miramos la repeticion
    // Dada una letra en la palabra objetivo, si en la palabra de usuario hay dos ocurrencias, apareceran ambas como semiacierto si una de ellas no es acierto
    // El control no es exhaustivo. Los casos de tres letras repetidas en el diccionario son infimos y son casos extremos
    const c = b.map((item, index, array): number => this.scan(item, index, array, a));


    console.log(a);
    console.log(c);

    return c;

  }

  private scan = (item: number, index: number, array: number[], a: number[]): number => {

    // si resultado es -1 y la repeticion es -1, entonces -1.
    // si resultado es -1 y la repeticion es 1, entonces 0
    // si no resultado
    let r2 = (m: number) => (m == -1 && a[item] == -1) ? m : (m == -1 && a[item] == 1) ? 0 : m;

    // Si el resultado es cero o uno, resultado, si no entonces es menos uno (ver caso arriba)
    let r1 = (a[index] == 1 || a[index] == 0) ? a[index] : r2(a[index]);

    return r1;

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
