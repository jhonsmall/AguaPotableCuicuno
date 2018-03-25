/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { LecturaMedidorMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix-dialog.component';
import { LecturaMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.service';
import { LecturaMedidorMySuffix } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.model';
import { MedidorMySuffixService } from '../../../../../../main/webapp/app/entities/medidor-my-suffix';

describe('Component Tests', () => {

    describe('LecturaMedidorMySuffix Management Dialog Component', () => {
        let comp: LecturaMedidorMySuffixDialogComponent;
        let fixture: ComponentFixture<LecturaMedidorMySuffixDialogComponent>;
        let service: LecturaMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [LecturaMedidorMySuffixDialogComponent],
                providers: [
                    MedidorMySuffixService,
                    LecturaMedidorMySuffixService
                ]
            })
            .overrideTemplate(LecturaMedidorMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LecturaMedidorMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LecturaMedidorMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LecturaMedidorMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lecturaMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lecturaMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new LecturaMedidorMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.lecturaMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'lecturaMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
