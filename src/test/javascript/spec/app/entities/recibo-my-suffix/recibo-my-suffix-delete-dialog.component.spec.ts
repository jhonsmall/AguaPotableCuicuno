/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ReciboMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix-delete-dialog.component';
import { ReciboMySuffixService } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.service';

describe('Component Tests', () => {

    describe('ReciboMySuffix Management Delete Component', () => {
        let comp: ReciboMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ReciboMySuffixDeleteDialogComponent>;
        let service: ReciboMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ReciboMySuffixDeleteDialogComponent],
                providers: [
                    ReciboMySuffixService
                ]
            })
            .overrideTemplate(ReciboMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReciboMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReciboMySuffixService);
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
