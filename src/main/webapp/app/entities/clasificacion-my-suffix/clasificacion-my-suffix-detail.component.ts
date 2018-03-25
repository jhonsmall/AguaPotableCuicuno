import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClasificacionMySuffix } from './clasificacion-my-suffix.model';
import { ClasificacionMySuffixService } from './clasificacion-my-suffix.service';

@Component({
    selector: 'jhi-clasificacion-my-suffix-detail',
    templateUrl: './clasificacion-my-suffix-detail.component.html'
})
export class ClasificacionMySuffixDetailComponent implements OnInit, OnDestroy {

    clasificacion: ClasificacionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clasificacionService: ClasificacionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClasificacions();
    }

    load(id) {
        this.clasificacionService.find(id)
            .subscribe((clasificacionResponse: HttpResponse<ClasificacionMySuffix>) => {
                this.clasificacion = clasificacionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClasificacions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clasificacionListModification',
            (response) => this.load(this.clasificacion.id)
        );
    }
}
