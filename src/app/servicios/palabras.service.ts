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


  constructor(private http: HttpClient) {

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
        //.then(() => console.log("completado"))
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
    return this.semiaciertosIndice.includes(pos)
  }

  private posicionesLetra(letra: string, aObjetivo: string) {
    return aObjetivo.split('').map((l,i,a) => l == letra ? i : undefined).filter(i => typeof i != 'undefined');
  }

  private comprobar(letra: string, indice: number, a: Array<string>) {

    if (this.noEsta(letra, this.palabraActual)) {
      return 0;
    }

    if(this.estaEnPosicion(letra, indice, this.palabraActual)) {
      return 1;
    }

    if (this.estaEnOtraPosicion(letra, this.palabraActual)) {
      const posiciones = this.posicionesLetra(letra, this.palabraActual);

      posiciones.forEach(p => {
        if(this.sePuedeCancelar(p))
        {
          this.cancelarPosicion(p);

          return -1;
        }
        else {
          return 0;
        }
      });
    }
  }
  /**
   * Comprueba si una letra coincide o no
   *
   * Si la letra coincide con la misma posicion en el array objetivo retornamos 1, 0 si no lo hace
   * y -1 si la letra esta en el array pero no en esa posicion
   *
   * @param letra letra a verificar
   * @param indice indice a procesar en el array objetivo
   * @param a array con la palabra de jugador. No usado pero necesario para el map
   * @returns number 1, 0 o -1
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

        // Posicion de la letra
        const n = letrasActuales.indexOf(letra);

        // Si no esta en la palabra objetivo
        if (n == -1) {
          return 0;
        } // La letra esta
        else {


          // La posicion de la letra ha sido registrada
          if (this.semiaciertosIndice.includes(n)) {

            const m = letrasActuales.indexOf(letra, n + 1);

            console.log(`${letra} - ${n} - ${m}  - ${this.semiaciertosIndice}`)

            if (m == -1) {
              return 0;
            }
            else {

              this.semiaciertosIndice.push(m);
              console.log(`${letra} - ${n}  - ${this.semiaciertosIndice}`)

              return -1
            }
          }
          else {
            if (letrasActuales[n] == a[n]) {
              return 0;
            }
            else {
              this.semiaciertosIndice.push(n);
              console.log(`${letra} - ${n} - ${this.semiaciertosIndice}`)

              return -1
            }
          }
        }
      }
      else {
        //console.log(`${letra} : 0`);
        return 0;
      }
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

    //this.palabraActual = this.obtenerPalabraRandom();
    this.semiaciertosIndice = [];
    this.palabraActual = "CABAL";

    console.log(this.palabraActual);

    return this.palabraActual;

  }

  /**
   * Comprueba la palabra
   *
   * Comprueba las letras de la palabra pasada contra la palabra almacenada en @palabraActual
   *
   * @param palabra La palabra a validar
   * @param metodoExtendido Usa el metodo extendido
   *
   * @returns
   **/
  public validarPalabra(palabra: string, metodoExtendido: boolean = false): Array<number> {

    const palabras = palabra.toUpperCase().split('');

    this.semiaciertosIndice = [];

    // Comprobamos las letras, nos da un resultado "en bruto"
    let resultados = <Array<number>>  palabras.map((l,i,a) => this.comprobar(l,i,a));

    //console.log(resultados);

    // Refinamos los resultados
    //if (metodoExtendido) {
    //  resultados = this.repeticiones(palabras, resultados);
      //console.log(resultados);
    //}

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
