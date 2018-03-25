import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoMedidorMySuffix } from './costo-medidor-my-suffix.model';
import { CostoMedidorMySuffixPopupService } from './costo-medidor-my-suffix-popup.service';
import { CostoMedidorMySuffixService } from './costo-medidor-my-suffix.service';

@Component({
    selector: 'jhi-costo-medidor-my-suffix-delete-dialog',
    templateUrl: './costo-medidor-my-suffix-delete-dialog.component.html'
})
export class CostoMedidorMySuffixDeleteDialogComponent {

    costoMedidor: CostoMedidorMySuffix;

    constructor(
        private costoMedidorService: CostoMedidorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoMedidorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costoMedidorListModification',
                content: 'Deleted an costoMedidor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-medidor-my-suffix-delete-popup',
    template: ''
})
export class CostoMedidorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoMedidorPopupService: CostoMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoMedidorPopupService
                .open(CostoMedidorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
