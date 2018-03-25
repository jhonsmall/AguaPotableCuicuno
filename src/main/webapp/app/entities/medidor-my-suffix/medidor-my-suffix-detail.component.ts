import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MedidorMySuffix } from './medidor-my-suffix.model';
import { MedidorMySuffixService } from './medidor-my-suffix.service';

@Component({
    selector: 'jhi-medidor-my-suffix-detail',
    templateUrl: './medidor-my-suffix-detail.component.html'
})
export class MedidorMySuffixDetailComponent implements OnInit, OnDestroy {

    medidor: MedidorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private medidorService: MedidorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMedidors();
    }

    load(id) {
        this.medidorService.find(id)
            .subscribe((medidorResponse: HttpResponse<MedidorMySuffix>) => {
                this.medidor = medidorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMedidors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'medidorListModification',
            (response) => this.load(this.medidor.id)
        );
    }
}
