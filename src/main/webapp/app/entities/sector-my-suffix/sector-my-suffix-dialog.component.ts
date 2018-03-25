import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SectorMySuffix } from './sector-my-suffix.model';
import { SectorMySuffixPopupService } from './sector-my-suffix-popup.service';
import { SectorMySuffixService } from './sector-my-suffix.service';

@Component({
    selector: 'jhi-sector-my-suffix-dialog',
    templateUrl: './sector-my-suffix-dialog.component.html'
})
export class SectorMySuffixDialogComponent implements OnInit {

    sector: SectorMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private sectorService: SectorMySuffixService,
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
        if (this.sector.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sectorService.update(this.sector));
        } else {
            this.subscribeToSaveResponse(
                this.sectorService.create(this.sector));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SectorMySuffix>>) {
        result.subscribe((res: HttpResponse<SectorMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SectorMySuffix) {
        this.eventManager.broadcast({ name: 'sectorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-sector-my-suffix-popup',
    template: ''
})
export class SectorMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectorPopupService: SectorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sectorPopupService
                    .open(SectorMySuffixDialogComponent as Component, params['id']);
            } else {
                this.sectorPopupService
                    .open(SectorMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
