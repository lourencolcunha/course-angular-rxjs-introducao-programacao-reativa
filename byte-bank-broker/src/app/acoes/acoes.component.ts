import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Acao, Acoes} from './modelos/acoes';
import {AcoesService} from './acoes.service';
import { merge, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();

  filtroAcoes$ = this.acoesInput.valueChanges.pipe(
    switchMap((input) => this.acoesService.getAcoes(input))
  );
  todasAcoes$ = this.acoesService.getAcoes();

  acoes$ = merge(this.filtroAcoes$, this.todasAcoes$);

  constructor(private acoesService: AcoesService) {}

}
// export class AcoesComponent implements OnInit, OnDestroy {
//   acoesInput = new FormControl();
//   acoes: Acoes;
//   private subscription: Subscription;

//   constructor(private acoesService: AcoesService) {}

//   ngOnInit() {
//     this.subscription = this.acoesService.getAcoes().subscribe((res: Array<Acao>) => {
//       this.acoes = res;
//     });
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
