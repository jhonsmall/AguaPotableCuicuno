/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { EscalasDelMedidorMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix-dialog.component';
import { EscalasDelMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.service';
import { EscalasDelMedidorMySuffix } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.model';
import { ClasificacionMySuffixService } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix';

describe('Component Tests', () => {

    describe('EscalasDelMedidorMySuffix Management Dialog Component', () => {
        let comp: EscalasDelMedidorMySuffixDialogComponent;
        let fixture: ComponentFixture<EscalasDelMedidorMySuffixDialogComponent>;
        let service: EscalasDelMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [EscalasDelMedidorMySuffixDialogComponent],
                providers: [
                    ClasificacionMySuffixService,
                    EscalasDelMedidorMySuffixService
                ]
            })
            .overrideTemplate(EscalasDelMedidorMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscalasDelMedidorMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscalasDelMedidorMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EscalasDelMedidorMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.escalasDelMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'escalasDelMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EscalasDelMedidorMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.escalasDelMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'escalasDelMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
