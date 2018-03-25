import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SectorMySuffix } from './sector-my-suffix.model';
import { SectorMySuffixService } from './sector-my-suffix.service';

@Component({
    selector: 'jhi-sector-my-suffix-detail',
    templateUrl: './sector-my-suffix-detail.component.html'
})
export class SectorMySuffixDetailComponent implements OnInit, OnDestroy {

    sector: SectorMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private sectorService: SectorMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSectors();
    }

    load(id) {
        this.sectorService.find(id)
            .subscribe((sectorResponse: HttpResponse<SectorMySuffix>) => {
                this.sector = sectorResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSectors() {
        this.eventSubscriber = this.eventManager.subscribe(
            'sectorListModification',
            (response) => this.load(this.sector.id)
        );
    }
}
