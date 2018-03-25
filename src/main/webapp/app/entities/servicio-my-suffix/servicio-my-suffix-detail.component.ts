import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ServicioMySuffix } from './servicio-my-suffix.model';
import { ServicioMySuffixService } from './servicio-my-suffix.service';

@Component({
    selector: 'jhi-servicio-my-suffix-detail',
    templateUrl: './servicio-my-suffix-detail.component.html'
})
export class ServicioMySuffixDetailComponent implements OnInit, OnDestroy {

    servicio: ServicioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private servicioService: ServicioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInServicios();
    }

    load(id) {
        this.servicioService.find(id)
            .subscribe((servicioResponse: HttpResponse<ServicioMySuffix>) => {
                this.servicio = servicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'servicioListModification',
            (response) => this.load(this.servicio.id)
        );
    }
}
