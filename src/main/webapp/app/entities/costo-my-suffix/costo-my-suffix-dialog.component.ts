import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoMySuffix } from './costo-my-suffix.model';
import { CostoMySuffixPopupService } from './costo-my-suffix-popup.service';
import { CostoMySuffixService } from './costo-my-suffix.service';
import { ServicioMySuffix, ServicioMySuffixService } from '../servicio-my-suffix';
import { SectorMySuffix, SectorMySuffixService } from '../sector-my-suffix';
import { ClasificacionMySuffix, ClasificacionMySuffixService } from '../clasificacion-my-suffix';

@Component({
    selector: 'jhi-costo-my-suffix-dialog',
    templateUrl: './costo-my-suffix-dialog.component.html'
})
export class CostoMySuffixDialogComponent implements OnInit {

    costo: CostoMySuffix;
    isSaving: boolean;

    servicios: ServicioMySuffix[];

    sectors: SectorMySuffix[];

    clasificacions: ClasificacionMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoService: CostoMySuffixService,
        private servicioService: ServicioMySuffixService,
        private sectorService: SectorMySuffixService,
        private clasificacionService: ClasificacionMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.servicioService.query()
            .subscribe((res: HttpResponse<ServicioMySuffix[]>) => { this.servicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.sectorService.query()
            .subscribe((res: HttpResponse<SectorMySuffix[]>) => { this.sectors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clasificacionService.query()
            .subscribe((res: HttpResponse<ClasificacionMySuffix[]>) => { this.clasificacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costoService.update(this.costo));
        } else {
            this.subscribeToSaveResponse(
                this.costoService.create(this.costo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostoMySuffix>>) {
        result.subscribe((res: HttpResponse<CostoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoMySuffix) {
        this.eventManager.broadcast({ name: 'costoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackServicioById(index: number, item: ServicioMySuffix) {
        return item.id;
    }

    trackSectorById(index: number, item: SectorMySuffix) {
        return item.id;
    }

    trackClasificacionById(index: number, item: ClasificacionMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-costo-my-suffix-popup',
    template: ''
})
export class CostoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoPopupService: CostoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoPopupService
                    .open(CostoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.costoPopupService
                    .open(CostoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
