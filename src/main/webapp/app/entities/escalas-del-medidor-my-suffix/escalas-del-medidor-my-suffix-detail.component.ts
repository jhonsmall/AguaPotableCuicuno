import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EscalasDelMedidorMySuffix } from './escalas-del-medidor-my-suffix.model';
import { EscalasDelMedidorMySuffixService } from './escalas-del-medidor-my-suffix.service';

@Component({
    selector: 'jhi-escalas-del-medidor-my-suffix-detail',
    templateUrl: './escalas-del-medidor-my-suffix-detail.component.html'
})
export class EscalasDelMedidorMySuffixDetailComponent implements OnInit, OnDestroy {

    escalasDelMedidor: EscalasDelMedidorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private escalasDelMedidorService: EscalasDelMedidorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEscalasDelMedidors();
    }

    load(id) {
        this.escalasDelMedidorService.find(id)
            .subscribe((escalasDelMedidorResponse: HttpResponse<EscalasDelMedidorMySuffix>) => {
                this.escalasDelMedidor = escalasDelMedidorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEscalasDelMedidors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'escalasDelMedidorListModification',
            (response) => this.load(this.escalasDelMedidor.id)
        );
    }
}
