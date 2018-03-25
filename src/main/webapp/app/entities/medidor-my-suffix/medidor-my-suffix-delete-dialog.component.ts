import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MedidorMySuffix } from './medidor-my-suffix.model';
import { MedidorMySuffixPopupService } from './medidor-my-suffix-popup.service';
import { MedidorMySuffixService } from './medidor-my-suffix.service';

@Component({
    selector: 'jhi-medidor-my-suffix-delete-dialog',
    templateUrl: './medidor-my-suffix-delete-dialog.component.html'
})
export class MedidorMySuffixDeleteDialogComponent {

    medidor: MedidorMySuffix;

    constructor(
        private medidorService: MedidorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medidorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'medidorListModification',
                content: 'Deleted an medidor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medidor-my-suffix-delete-popup',
    template: ''
})
export class MedidorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private medidorPopupService: MedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.medidorPopupService
                .open(MedidorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
