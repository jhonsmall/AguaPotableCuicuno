import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReciboMySuffix } from './recibo-my-suffix.model';
import { ReciboMySuffixPopupService } from './recibo-my-suffix-popup.service';
import { ReciboMySuffixService } from './recibo-my-suffix.service';

@Component({
    selector: 'jhi-recibo-my-suffix-delete-dialog',
    templateUrl: './recibo-my-suffix-delete-dialog.component.html'
})
export class ReciboMySuffixDeleteDialogComponent {

    recibo: ReciboMySuffix;

    constructor(
        private reciboService: ReciboMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reciboService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reciboListModification',
                content: 'Deleted an recibo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recibo-my-suffix-delete-popup',
    template: ''
})
export class ReciboMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reciboPopupService: ReciboMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reciboPopupService
                .open(ReciboMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
