/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { LecturaMedidorMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix-delete-dialog.component';
import { LecturaMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.service';

describe('Component Tests', () => {

    describe('LecturaMedidorMySuffix Management Delete Component', () => {
        let comp: LecturaMedidorMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<LecturaMedidorMySuffixDeleteDialogComponent>;
        let service: LecturaMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [LecturaMedidorMySuffixDeleteDialogComponent],
                providers: [
                    LecturaMedidorMySuffixService
                ]
            })
            .overrideTemplate(LecturaMedidorMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LecturaMedidorMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LecturaMedidorMySuffixService);
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
