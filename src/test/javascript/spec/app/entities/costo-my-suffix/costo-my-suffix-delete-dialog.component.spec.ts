/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix-delete-dialog.component';
import { CostoMySuffixService } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.service';

describe('Component Tests', () => {

    describe('CostoMySuffix Management Delete Component', () => {
        let comp: CostoMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CostoMySuffixDeleteDialogComponent>;
        let service: CostoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMySuffixDeleteDialogComponent],
                providers: [
                    CostoMySuffixService
                ]
            })
            .overrideTemplate(CostoMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMySuffixService);
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
