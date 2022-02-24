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

  // Palabra objetivo
  private palabraActual: string = "";


  constructor(private http: HttpClient) {

    //this.obtenerFicheroPalabras().subscribe(json => this.palabras = json);

  }

  // Array con los indices de los semiaciertos cancelados
  private semiaciertosIndice: number[] = [];

  // Interfaz privada

  /**
   * Descarga el fichero de palabras desde la URL especificada en config y carga el array en una variable
   *
   * @todo Gestionar los errores de conexion/varios
   */
  public obtenerFicheroPalabras(): void {

    this.http.get<Array<string>>(URL_SERVIDOR).subscribe(json => this.palabras = json);

  }

  /**
   * Retorna una palabra aleatoria desde el array de palabras
   *
   * @returns string palabra aleatoria obtenida desde el array de palabras
   */
  private obtenerPalabraRandom(): string {

    const numero = Math.floor(Math.random() * (this.palabras.length));

    return this.palabras[numero];
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
        return -1
      }
      else {
        //console.log(`${letra} : 0`);
        return 0;
      }
    }
  }

  /**
   * Busca una letra en el array objetivo para cancelar
   *
   * Se cancela insertando el indice cancelado en el array de semiaciertosIndices
   * Si ya existe un semiacierto cancelado, subsecuentes busquedas retornaran 0
   *
   * @param letra letra a buscar
   * @param pos posicion desde la que buscar
   * @returns number 0 o -1
   */
  private buscarValido(letra: string,  pos: number): any {

    // Arry de letras objetivo
    const letras = this.palabraActual.toUpperCase().split('');

    // Obtenemos el indice de la siguiente letra
    let n = letras.indexOf(letra, pos + 1);

    // Si no hay mas ocurrencias desde la posicion indicada retornamos con 0
    if (n == -1) {
      return 0;
    }

    // Si el indice ya esta insertado, buscamos la siguiente
    if (this.semiaciertosIndice.includes(n)) {

      return this.buscarValido(letra, n + 1);

    }
    else {  // Si no, la insertamos y retornamos -1
      this.semiaciertosIndice.push(n);
      return -1;
    }
  }

  /**
   * Corrige los semiaciertos
   *
   * Si una posiciion determinada es un semiacierto realiza una busqueda para obtener el resultado corregido
   * En caso contrario, retorna el resultado que hubiere
   *
   * @param pjugador array con la palabra del jugador
   * @param presultado array con el resultado Wordle
   * @returns number[] array con el resultado extendido
   */
  private repeticiones(pjugador: string[], presultado: number[]): number[] {

    // Si es un semiacierto buscamos a quien cancela. Retorna -1 si cancela a una letra o 0 si no lo hace
    const res = presultado.map((item, index, array) => item == -1 ? this.buscarValido(pjugador[index], index) : item);

    return res;
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

    // Comprobamos las letras, nos da un resultado "en bruto"
    let resultados = <Array<number>>  palabras.map((l,i,a) => this.comprobarLetra(l,i,a));

    //console.log(resultados);

    // Refinamos los resultados
    if (metodoExtendido) {
      resultados = this.repeticiones(palabras, resultados);
      //console.log(resultados);
    }

    return resultados;
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
