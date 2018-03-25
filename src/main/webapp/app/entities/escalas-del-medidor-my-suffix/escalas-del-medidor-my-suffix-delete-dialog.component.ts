import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EscalasDelMedidorMySuffix } from './escalas-del-medidor-my-suffix.model';
import { EscalasDelMedidorMySuffixPopupService } from './escalas-del-medidor-my-suffix-popup.service';
import { EscalasDelMedidorMySuffixService } from './escalas-del-medidor-my-suffix.service';

@Component({
    selector: 'jhi-escalas-del-medidor-my-suffix-delete-dialog',
    templateUrl: './escalas-del-medidor-my-suffix-delete-dialog.component.html'
})
export class EscalasDelMedidorMySuffixDeleteDialogComponent {

    escalasDelMedidor: EscalasDelMedidorMySuffix;

    constructor(
        private escalasDelMedidorService: EscalasDelMedidorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.escalasDelMedidorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'escalasDelMedidorListModification',
                content: 'Deleted an escalasDelMedidor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-escalas-del-medidor-my-suffix-delete-popup',
    template: ''
})
export class EscalasDelMedidorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private escalasDelMedidorPopupService: EscalasDelMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.escalasDelMedidorPopupService
                .open(EscalasDelMedidorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
