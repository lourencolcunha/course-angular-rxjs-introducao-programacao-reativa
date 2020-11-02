import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelos/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes(): Observable<Array<Acao>> {
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes')
      .pipe(
        tap(res => console.log(res)),
        pluck('payload'),
        map((acoes: Array<Acao>) => acoes.sort(this.sortAcoes())));
  }

  private sortAcoes(): any {
    return (a, b) => a.codigo.localeCompare(b.codigo);
  }
}
