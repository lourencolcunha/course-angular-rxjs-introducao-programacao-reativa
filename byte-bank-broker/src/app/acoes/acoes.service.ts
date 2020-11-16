import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelos/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes(input?: string): Observable<Array<Acao>> {
    return this.httpClient.get<AcoesAPI>(
      'http://localhost:3000/acoes',
      {params: input ? new HttpParams().append('valor', input) : undefined})
      .pipe(
        tap(res => console.log(res)),
        pluck('payload'),
        map((acoes: Array<Acao>) => acoes.sort(this.sortAcoes())));
  }

  private sortAcoes(): any {
    return (a, b) => a.codigo.localeCompare(b.codigo);
  }
}
