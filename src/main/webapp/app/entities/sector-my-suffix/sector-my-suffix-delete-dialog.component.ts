import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SectorMySuffix } from './sector-my-suffix.model';
import { SectorMySuffixPopupService } from './sector-my-suffix-popup.service';
import { SectorMySuffixService } from './sector-my-suffix.service';

@Component({
    selector: 'jhi-sector-my-suffix-delete-dialog',
    templateUrl: './sector-my-suffix-delete-dialog.component.html'
})
export class SectorMySuffixDeleteDialogComponent {

    sector: SectorMySuffix;

    constructor(
        private sectorService: SectorMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sectorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sectorListModification',
                content: 'Deleted an sector'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sector-my-suffix-delete-popup',
    template: ''
})
export class SectorMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectorPopupService: SectorMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sectorPopupService
                .open(SectorMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
