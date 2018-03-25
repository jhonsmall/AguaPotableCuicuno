import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServicioMySuffix } from './servicio-my-suffix.model';
import { ServicioMySuffixPopupService } from './servicio-my-suffix-popup.service';
import { ServicioMySuffixService } from './servicio-my-suffix.service';

@Component({
    selector: 'jhi-servicio-my-suffix-delete-dialog',
    templateUrl: './servicio-my-suffix-delete-dialog.component.html'
})
export class ServicioMySuffixDeleteDialogComponent {

    servicio: ServicioMySuffix;

    constructor(
        private servicioService: ServicioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.servicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'servicioListModification',
                content: 'Deleted an servicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-servicio-my-suffix-delete-popup',
    template: ''
})
export class ServicioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicioPopupService: ServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.servicioPopupService
                .open(ServicioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
