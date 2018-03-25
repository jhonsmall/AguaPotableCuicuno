import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EscalasDelMedidorMySuffix } from './escalas-del-medidor-my-suffix.model';
import { EscalasDelMedidorMySuffixPopupService } from './escalas-del-medidor-my-suffix-popup.service';
import { EscalasDelMedidorMySuffixService } from './escalas-del-medidor-my-suffix.service';
import { ClasificacionMySuffix, ClasificacionMySuffixService } from '../clasificacion-my-suffix';

@Component({
    selector: 'jhi-escalas-del-medidor-my-suffix-dialog',
    templateUrl: './escalas-del-medidor-my-suffix-dialog.component.html'
})
export class EscalasDelMedidorMySuffixDialogComponent implements OnInit {

    escalasDelMedidor: EscalasDelMedidorMySuffix;
    isSaving: boolean;

    clasificacions: ClasificacionMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private escalasDelMedidorService: EscalasDelMedidorMySuffixService,
        private clasificacionService: ClasificacionMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clasificacionService.query()
            .subscribe((res: HttpResponse<ClasificacionMySuffix[]>) => { this.clasificacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.escalasDelMedidor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.escalasDelMedidorService.update(this.escalasDelMedidor));
        } else {
            this.subscribeToSaveResponse(
                this.escalasDelMedidorService.create(this.escalasDelMedidor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EscalasDelMedidorMySuffix>>) {
        result.subscribe((res: HttpResponse<EscalasDelMedidorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EscalasDelMedidorMySuffix) {
        this.eventManager.broadcast({ name: 'escalasDelMedidorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClasificacionById(index: number, item: ClasificacionMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-escalas-del-medidor-my-suffix-popup',
    template: ''
})
export class EscalasDelMedidorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escalasDelMedidorPopupService: EscalasDelMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.escalasDelMedidorPopupService
                    .open(EscalasDelMedidorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.escalasDelMedidorPopupService
                    .open(EscalasDelMedidorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
