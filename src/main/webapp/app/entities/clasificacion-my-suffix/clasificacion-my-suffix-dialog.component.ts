import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClasificacionMySuffix } from './clasificacion-my-suffix.model';
import { ClasificacionMySuffixPopupService } from './clasificacion-my-suffix-popup.service';
import { ClasificacionMySuffixService } from './clasificacion-my-suffix.service';

@Component({
    selector: 'jhi-clasificacion-my-suffix-dialog',
    templateUrl: './clasificacion-my-suffix-dialog.component.html'
})
export class ClasificacionMySuffixDialogComponent implements OnInit {

    clasificacion: ClasificacionMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private clasificacionService: ClasificacionMySuffixService,
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
        if (this.clasificacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clasificacionService.update(this.clasificacion));
        } else {
            this.subscribeToSaveResponse(
                this.clasificacionService.create(this.clasificacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClasificacionMySuffix>>) {
        result.subscribe((res: HttpResponse<ClasificacionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClasificacionMySuffix) {
        this.eventManager.broadcast({ name: 'clasificacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-clasificacion-my-suffix-popup',
    template: ''
})
export class ClasificacionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clasificacionPopupService: ClasificacionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clasificacionPopupService
                    .open(ClasificacionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.clasificacionPopupService
                    .open(ClasificacionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
