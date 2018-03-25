import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostoMedidorMySuffix } from './costo-medidor-my-suffix.model';
import { CostoMedidorMySuffixService } from './costo-medidor-my-suffix.service';

@Component({
    selector: 'jhi-costo-medidor-my-suffix-detail',
    templateUrl: './costo-medidor-my-suffix-detail.component.html'
})
export class CostoMedidorMySuffixDetailComponent implements OnInit, OnDestroy {

    costoMedidor: CostoMedidorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoMedidorService: CostoMedidorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostoMedidors();
    }

    load(id) {
        this.costoMedidorService.find(id)
            .subscribe((costoMedidorResponse: HttpResponse<CostoMedidorMySuffix>) => {
                this.costoMedidor = costoMedidorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostoMedidors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costoMedidorListModification',
            (response) => this.load(this.costoMedidor.id)
        );
    }
}
