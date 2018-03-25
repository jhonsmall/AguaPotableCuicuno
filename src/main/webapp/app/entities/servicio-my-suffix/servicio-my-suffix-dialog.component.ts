import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServicioMySuffix } from './servicio-my-suffix.model';
import { ServicioMySuffixPopupService } from './servicio-my-suffix-popup.service';
import { ServicioMySuffixService } from './servicio-my-suffix.service';

@Component({
    selector: 'jhi-servicio-my-suffix-dialog',
    templateUrl: './servicio-my-suffix-dialog.component.html'
})
export class ServicioMySuffixDialogComponent implements OnInit {

    servicio: ServicioMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private servicioService: ServicioMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.servicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servicioService.update(this.servicio));
        } else {
            this.subscribeToSaveResponse(
                this.servicioService.create(this.servicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServicioMySuffix>>) {
        result.subscribe((res: HttpResponse<ServicioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServicioMySuffix) {
        this.eventManager.broadcast({ name: 'servicioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-servicio-my-suffix-popup',
    template: ''
})
export class ServicioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicioPopupService: ServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicioPopupService
                    .open(ServicioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.servicioPopupService
                    .open(ServicioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
