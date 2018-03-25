import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ReciboMySuffix } from './recibo-my-suffix.model';
import { ReciboMySuffixService } from './recibo-my-suffix.service';

@Component({
    selector: 'jhi-recibo-my-suffix-detail',
    templateUrl: './recibo-my-suffix-detail.component.html'
})
export class ReciboMySuffixDetailComponent implements OnInit, OnDestroy {

    recibo: ReciboMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private reciboService: ReciboMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecibos();
    }

    load(id) {
        this.reciboService.find(id)
            .subscribe((reciboResponse: HttpResponse<ReciboMySuffix>) => {
                this.recibo = reciboResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecibos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reciboListModification',
            (response) => this.load(this.recibo.id)
        );
    }
}
