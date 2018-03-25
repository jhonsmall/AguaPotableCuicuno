import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ReciboMySuffix } from './recibo-my-suffix.model';
import { ReciboMySuffixPopupService } from './recibo-my-suffix-popup.service';
import { ReciboMySuffixService } from './recibo-my-suffix.service';
import { UsuarioMySuffix, UsuarioMySuffixService } from '../usuario-my-suffix';
import { LecturaMedidorMySuffix, LecturaMedidorMySuffixService } from '../lectura-medidor-my-suffix';

@Component({
    selector: 'jhi-recibo-my-suffix-dialog',
    templateUrl: './recibo-my-suffix-dialog.component.html'
})
export class ReciboMySuffixDialogComponent implements OnInit {

    recibo: ReciboMySuffix;
    isSaving: boolean;

    usuarios: UsuarioMySuffix[];

    lecturamedidors: LecturaMedidorMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private reciboService: ReciboMySuffixService,
        private usuarioService: UsuarioMySuffixService,
        private lecturaMedidorService: LecturaMedidorMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: HttpResponse<UsuarioMySuffix[]>) => { this.usuarios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.lecturaMedidorService.query()
            .subscribe((res: HttpResponse<LecturaMedidorMySuffix[]>) => { this.lecturamedidors = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recibo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reciboService.update(this.recibo));
        } else {
            this.subscribeToSaveResponse(
                this.reciboService.create(this.recibo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ReciboMySuffix>>) {
        result.subscribe((res: HttpResponse<ReciboMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ReciboMySuffix) {
        this.eventManager.broadcast({ name: 'reciboListModification', content: 'OK'});
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

    trackLecturaMedidorById(index: number, item: LecturaMedidorMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-recibo-my-suffix-popup',
    template: ''
})
export class ReciboMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reciboPopupService: ReciboMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reciboPopupService
                    .open(ReciboMySuffixDialogComponent as Component, params['id']);
            } else {
                this.reciboPopupService
                    .open(ReciboMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
