import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClasificacionMySuffix } from './clasificacion-my-suffix.model';
import { ClasificacionMySuffixPopupService } from './clasificacion-my-suffix-popup.service';
import { ClasificacionMySuffixService } from './clasificacion-my-suffix.service';

@Component({
    selector: 'jhi-clasificacion-my-suffix-delete-dialog',
    templateUrl: './clasificacion-my-suffix-delete-dialog.component.html'
})
export class ClasificacionMySuffixDeleteDialogComponent {

    clasificacion: ClasificacionMySuffix;

    constructor(
        private clasificacionService: ClasificacionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clasificacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clasificacionListModification',
                content: 'Deleted an clasificacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clasificacion-my-suffix-delete-popup',
    template: ''
})
export class ClasificacionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clasificacionPopupService: ClasificacionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clasificacionPopupService
                .open(ClasificacionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
