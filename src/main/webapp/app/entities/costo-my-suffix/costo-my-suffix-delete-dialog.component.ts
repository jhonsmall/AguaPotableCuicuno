import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoMySuffix } from './costo-my-suffix.model';
import { CostoMySuffixPopupService } from './costo-my-suffix-popup.service';
import { CostoMySuffixService } from './costo-my-suffix.service';

@Component({
    selector: 'jhi-costo-my-suffix-delete-dialog',
    templateUrl: './costo-my-suffix-delete-dialog.component.html'
})
export class CostoMySuffixDeleteDialogComponent {

    costo: CostoMySuffix;

    constructor(
        private costoService: CostoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costoListModification',
                content: 'Deleted an costo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-my-suffix-delete-popup',
    template: ''
})
export class CostoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoPopupService: CostoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoPopupService
                .open(CostoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
