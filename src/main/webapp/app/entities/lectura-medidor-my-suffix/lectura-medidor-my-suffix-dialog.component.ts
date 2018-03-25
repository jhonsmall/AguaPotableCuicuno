import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { LecturaMedidorMySuffix } from './lectura-medidor-my-suffix.model';
import { LecturaMedidorMySuffixPopupService } from './lectura-medidor-my-suffix-popup.service';
import { LecturaMedidorMySuffixService } from './lectura-medidor-my-suffix.service';
import { MedidorMySuffix, MedidorMySuffixService } from '../medidor-my-suffix';

@Component({
    selector: 'jhi-lectura-medidor-my-suffix-dialog',
    templateUrl: './lectura-medidor-my-suffix-dialog.component.html'
})
export class LecturaMedidorMySuffixDialogComponent implements OnInit {

    lecturaMedidor: LecturaMedidorMySuffix;
    isSaving: boolean;

    medidors: MedidorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private lecturaMedidorService: LecturaMedidorMySuffixService,
        private medidorService: MedidorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.medidorService.query()
            .subscribe((res: HttpResponse<MedidorMySuffix[]>) => { this.medidors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lecturaMedidor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lecturaMedidorService.update(this.lecturaMedidor));
        } else {
            this.subscribeToSaveResponse(
                this.lecturaMedidorService.create(this.lecturaMedidor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<LecturaMedidorMySuffix>>) {
        result.subscribe((res: HttpResponse<LecturaMedidorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: LecturaMedidorMySuffix) {
        this.eventManager.broadcast({ name: 'lecturaMedidorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMedidorById(index: number, item: MedidorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lectura-medidor-my-suffix-popup',
    template: ''
})
export class LecturaMedidorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lecturaMedidorPopupService: LecturaMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lecturaMedidorPopupService
                    .open(LecturaMedidorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.lecturaMedidorPopupService
                    .open(LecturaMedidorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
