import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LecturaMedidorMySuffix } from './lectura-medidor-my-suffix.model';
import { LecturaMedidorMySuffixPopupService } from './lectura-medidor-my-suffix-popup.service';
import { LecturaMedidorMySuffixService } from './lectura-medidor-my-suffix.service';

@Component({
    selector: 'jhi-lectura-medidor-my-suffix-delete-dialog',
    templateUrl: './lectura-medidor-my-suffix-delete-dialog.component.html'
})
export class LecturaMedidorMySuffixDeleteDialogComponent {

    lecturaMedidor: LecturaMedidorMySuffix;

    constructor(
        private lecturaMedidorService: LecturaMedidorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lecturaMedidorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lecturaMedidorListModification',
                content: 'Deleted an lecturaMedidor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lectura-medidor-my-suffix-delete-popup',
    template: ''
})
export class LecturaMedidorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lecturaMedidorPopupService: LecturaMedidorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lecturaMedidorPopupService
                .open(LecturaMedidorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
