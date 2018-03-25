/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { SectorMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix-delete-dialog.component';
import { SectorMySuffixService } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.service';

describe('Component Tests', () => {

    describe('SectorMySuffix Management Delete Component', () => {
        let comp: SectorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SectorMySuffixDeleteDialogComponent>;
        let service: SectorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [SectorMySuffixDeleteDialogComponent],
                providers: [
                    SectorMySuffixService
                ]
            })
            .overrideTemplate(SectorMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectorMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
