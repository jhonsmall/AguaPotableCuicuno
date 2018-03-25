import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoMedidorMySuffix } from './costo-medidor-my-suffix.model';
import { CostoMedidorMySuffixPopupService } from './costo-medidor-my-suffix-popup.service';
import { CostoMedidorMySuffixService } from './costo-medidor-my-suffix.service';
import { CostoMySuffix, CostoMySuffixService } from '../costo-my-suffix';
import { MedidorMySuffix, MedidorMySuffixService } from '../medidor-my-suffix';

@Component({
    selector: 'jhi-costo-medidor-my-suffix-dialog',
    templateUrl: './costo-medidor-my-suffix-dialog.component.html'
})
export class CostoMedidorMySuffixDialogComponent implements OnInit {

    costoMedidor: CostoMedidorMySuffix;
    isSaving: boolean;

    costos: CostoMySuffix[];

    medidors: MedidorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoMedidorService: CostoMedidorMySuffixService,
        private costoService: CostoMySuffixService,
        private medidorService: MedidorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.costoService.query()
            .subscribe((res: HttpResponse<CostoMySuffix[]>) => { this.costos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.medidorService.query()
            .subscribe((res: HttpResponse<MedidorMySuffix[]>) => { this.medidors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costoMedidor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costoMedidorService.update(this.costoMedidor));
        } else {
            this.subscribeToSaveResponse(
                this.costoMedidorService.create(this.costoMedidor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostoMedidorMySuffix>>) {
        result.subscribe((res: HttpResponse<CostoMedidorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoMedidorMySuffix) {
        this.eventManager.broadcast({ name: 'costoMedidorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCostoById(index: number, item: CostoMySuffix) {
        return item.id;
    }

    trackMedidorById(index: number, item: MedidorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-costo-medidor-my-suffix-popup',
    template: ''
})
export class CostoMedidorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoMedidorPopupService: CostoMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoMedidorPopupService
                    .open(CostoMedidorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.costoMedidorPopupService
                    .open(CostoMedidorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
