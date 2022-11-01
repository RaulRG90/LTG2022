import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ContenidoService {
  //url = 'http://localhost/piloto/php/contenido.php';
  url='https://librosdetexto.sep.gob.mx/consulta/php/contenido.php';

  constructor(private http: HttpClient) { }

  public infocontenido(escenario:string, grado: string){
    const authData = {
      "grado": grado,
      "escenario": escenario
    };
    return this.http.post(this.url, authData);

    
  }
  
}