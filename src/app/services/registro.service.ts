import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  url='https://librosdetexto.sep.gob.mx/consulta/php/registro.php';
  constructor(private http: HttpClient) {}

  public dat(id_contenido, tipo){
    const authData = {
      "id_contenido": id_contenido ,
      "tipo": tipo  
    };
    return this.http.post(this.url, authData);
  }
}
