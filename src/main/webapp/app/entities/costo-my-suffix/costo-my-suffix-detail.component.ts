import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostoMySuffix } from './costo-my-suffix.model';
import { CostoMySuffixService } from './costo-my-suffix.service';

@Component({
    selector: 'jhi-costo-my-suffix-detail',
    templateUrl: './costo-my-suffix-detail.component.html'
})
export class CostoMySuffixDetailComponent implements OnInit, OnDestroy {

    costo: CostoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costoService: CostoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostos();
    }

    load(id) {
        this.costoService.find(id)
            .subscribe((costoResponse: HttpResponse<CostoMySuffix>) => {
                this.costo = costoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costoListModification',
            (response) => this.load(this.costo.id)
        );
    }
}
