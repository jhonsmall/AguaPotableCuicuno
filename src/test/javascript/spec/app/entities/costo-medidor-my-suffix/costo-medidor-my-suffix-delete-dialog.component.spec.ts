/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMedidorMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix-delete-dialog.component';
import { CostoMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.service';

describe('Component Tests', () => {

    describe('CostoMedidorMySuffix Management Delete Component', () => {
        let comp: CostoMedidorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CostoMedidorMySuffixDeleteDialogComponent>;
        let service: CostoMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMedidorMySuffixDeleteDialogComponent],
                providers: [
                    CostoMedidorMySuffixService
                ]
            })
            .overrideTemplate(CostoMedidorMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMedidorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMedidorMySuffixService);
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
