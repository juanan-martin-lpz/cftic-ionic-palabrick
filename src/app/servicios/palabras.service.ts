import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_SERVIDOR } from '../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabrasService {

  // Array de palabras del diccionario
  public palabras: Array<string> = [];

  public fileLoaded = false;

  // Palabra objetivo
  private palabraActual: string = "";

  public readyStatus = false;

  constructor(private http: HttpClient) {

    console.log("Constructor")
    //this.obtenerFicheroPalabras(); //.subscribe(json => this.palabras = json);

  }

  // Array con los indices de los semiaciertos cancelados
  private semiaciertosIndice: number[] = [];

  // Interfaz privada

  /**
   * Descarga el fichero de palabras desde la URL especificada en config y carga el array en una variable
   *
   * @todo Gestionar los errores de conexion/varios
   */
  public async obtenerFicheroPalabras(): Promise<void> {

    this.fileLoaded = false;

    //this.http.get<Array<string>>(URL_SERVIDOR).subscribe(json => this.palabras = json);
      await fetch(URL_SERVIDOR)
        .then(response => response.json()
        .then(data => this.palabras = data))
        .then(() => this.readyStatus = true)
        .then(() => console.log("Completado"))
        .catch(err => console.log(err));

  }

  /**
   * Retorna una palabra aleatoria desde el array de palabras
   *
   * @returns string palabra aleatoria obtenida desde el array de palabras
   */
  private obtenerPalabraRandom(): string {

    const numero = Math.floor(Math.random() * (this.palabras.length));

    //console.log(this.palabras)
    let p = this.palabras[numero];
    //console.log(p)

    return p;
  }

  private noEsta(letra: string, aObjetivo: string) {
    return !aObjetivo.includes(letra);
  }


  private estaEnPosicion(letra: string, pos: number, aObjetivo: string) {
    return aObjetivo.split('')[pos] == letra;
  }

  private estaEnOtraPosicion(letra: string, aObjetivo: string) {
    return aObjetivo.includes(letra);
  }

  private cancelarPosicion(pos: number) {
    this.semiaciertosIndice.push(pos);
  }

  private sePuedeCancelar(pos: number) {
    return !this.semiaciertosIndice.includes(pos);
  }

  private posicionesLetra(letra: string, aObjetivo: string): number[] {

    let aPosiciones = [];

    for(let i = 0; i < aObjetivo.length; i++) {

      if (aObjetivo[i] == letra) {
        aPosiciones.push(i);
      }
    }

    return aPosiciones;
  }

  private siguienteSinCancelar(aPosiciones: number[]): number {
    let res = -1;

    for(let n of aPosiciones) {
      if (!this.semiaciertosIndice.includes(n)) {
        res = n;
      }
    }

    return res;
  }

  private comprobar(letra: string, indice: number, a: Array<string>) {

    if (this.noEsta(letra, this.palabraActual)) {
      console.log("No esta la " + letra);
      return 0;
    }

    if(this.estaEnPosicion(letra, indice, this.palabraActual)) {
      console.log("La " + letra + " esta en posicion");
      return 1;
    }

    if (this.estaEnOtraPosicion(letra, this.palabraActual)) {

      console.log("La " + letra + " esta en OTRA posicion");

      const posiciones: number[] = this.posicionesLetra(letra, this.palabraActual);

      console.log("La letra " + letra + " esta en las posiciones " + posiciones);

      let siguiente = this.siguienteSinCancelar(posiciones);

      if (siguiente > -1) {
        if(this.sePuedeCancelar(siguiente))
        {
          console.log("La " + letra + " cancela la repeticion en " + siguiente);
          this.cancelarPosicion(siguiente);
          return -1;
        }
        else {
          console.log("La " + letra + " no cancela repeticion");

          return 0;
        }
      }
      console.log("Sale por el if de estarEnOtraPosicion");
      return 0;
    }
    else {
      console.log("Sale por el else de estarEnOtraPosicion");
      return 0;
    }
  }

  // Interfaz publica.

  storeArray(a: string[]) {
    this.palabras = a;
  }
  /**
   * Obtiene una palabra del diccionario y la pone en juego
   *
   * Almacena la palabra para futuros usos. La palabra cambiara con cada llamada
   *
   * @returns string
   */
  public obtenerPalabra(): string {

    this.palabraActual = this.obtenerPalabraRandom();
    this.semiaciertosIndice = [];

    console.log(this.palabraActual);

    return this.palabraActual;

  }

  /**
   * Fuerza a que se juegue con la palabra pasada como parametro
   *
   * @param palabra palabra a forzar
   */
  public forzarPalabra(palabra: string) {

    this.palabraActual = palabra;
    this.semiaciertosIndice = [];

  }


  /**
   * Comprueba la palabra
   *
   * Comprueba las letras de la palabra pasada contra la palabra almacenada en @palabraActual
   *
   * @param palabra La palabra a validar
   *
   * @returns
   **/
  public validarPalabra(palabra: string): Array<number> {

    const palabras = palabra.toUpperCase().split('');

    this.semiaciertosIndice = [];

    let resultados = <Array<number>>  palabras.map((l,i,a) => this.comprobar(l,i,a));

    return resultados;
  }

  /**
   * Comprueba que la palabra este en el diccionario
   *
   * @param palabra: La palabra a comprobar
   *
   * @returns boolean
   **/
  public comprobarPalabra(pal: string): boolean {

    //console.log(pal)
    const i = this.palabras.includes(pal.toUpperCase());

    //console.log(i);

    return i;

  }
}
