/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { EscalasDelMedidorMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix-delete-dialog.component';
import { EscalasDelMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.service';

describe('Component Tests', () => {

    describe('EscalasDelMedidorMySuffix Management Delete Component', () => {
        let comp: EscalasDelMedidorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EscalasDelMedidorMySuffixDeleteDialogComponent>;
        let service: EscalasDelMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [EscalasDelMedidorMySuffixDeleteDialogComponent],
                providers: [
                    EscalasDelMedidorMySuffixService
                ]
            })
            .overrideTemplate(EscalasDelMedidorMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscalasDelMedidorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscalasDelMedidorMySuffixService);
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
