import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MedidorMySuffix } from './medidor-my-suffix.model';
import { MedidorMySuffixPopupService } from './medidor-my-suffix-popup.service';
import { MedidorMySuffixService } from './medidor-my-suffix.service';
import { UsuarioMySuffix, UsuarioMySuffixService } from '../usuario-my-suffix';
import { ClasificacionMySuffix, ClasificacionMySuffixService } from '../clasificacion-my-suffix';
import { SectorMySuffix, SectorMySuffixService } from '../sector-my-suffix';

@Component({
    selector: 'jhi-medidor-my-suffix-dialog',
    templateUrl: './medidor-my-suffix-dialog.component.html'
})
export class MedidorMySuffixDialogComponent implements OnInit {

    medidor: MedidorMySuffix;
    isSaving: boolean;

    usuarios: UsuarioMySuffix[];

    clasificacions: ClasificacionMySuffix[];

    sectors: SectorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private medidorService: MedidorMySuffixService,
        private usuarioService: UsuarioMySuffixService,
        private clasificacionService: ClasificacionMySuffixService,
        private sectorService: SectorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<UsuarioMySuffix[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clasificacionService.query()
            .subscribe((res: HttpResponse<ClasificacionMySuffix[]>) => { this.clasificacions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.sectorService.query()
            .subscribe((res: HttpResponse<SectorMySuffix[]>) => { this.sectors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.medidor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.medidorService.update(this.medidor));
        } else {
            this.subscribeToSaveResponse(
                this.medidorService.create(this.medidor));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MedidorMySuffix>>) {
        result.subscribe((res: HttpResponse<MedidorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MedidorMySuffix) {
        this.eventManager.broadcast({ name: 'medidorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: UsuarioMySuffix) {
        return item.id;
    }

    trackClasificacionById(index: number, item: ClasificacionMySuffix) {
        return item.id;
    }

    trackSectorById(index: number, item: SectorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-medidor-my-suffix-popup',
    template: ''
})
export class MedidorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medidorPopupService: MedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.medidorPopupService
                    .open(MedidorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.medidorPopupService
                    .open(MedidorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
