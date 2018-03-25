import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { LecturaMedidorMySuffix } from './lectura-medidor-my-suffix.model';
import { LecturaMedidorMySuffixService } from './lectura-medidor-my-suffix.service';

@Component({
    selector: 'jhi-lectura-medidor-my-suffix-detail',
    templateUrl: './lectura-medidor-my-suffix-detail.component.html'
})
export class LecturaMedidorMySuffixDetailComponent implements OnInit, OnDestroy {

    lecturaMedidor: LecturaMedidorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private lecturaMedidorService: LecturaMedidorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLecturaMedidors();
    }

    load(id) {
        this.lecturaMedidorService.find(id)
            .subscribe((lecturaMedidorResponse: HttpResponse<LecturaMedidorMySuffix>) => {
                this.lecturaMedidor = lecturaMedidorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLecturaMedidors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lecturaMedidorListModification',
            (response) => this.load(this.lecturaMedidor.id)
        );
    }
}
