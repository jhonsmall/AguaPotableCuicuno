/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMedidorMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix-dialog.component';
import { CostoMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.service';
import { CostoMedidorMySuffix } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.model';
import { CostoMySuffixService } from '../../../../../../main/webapp/app/entities/costo-my-suffix';
import { MedidorMySuffixService } from '../../../../../../main/webapp/app/entities/medidor-my-suffix';

describe('Component Tests', () => {

    describe('CostoMedidorMySuffix Management Dialog Component', () => {
        let comp: CostoMedidorMySuffixDialogComponent;
        let fixture: ComponentFixture<CostoMedidorMySuffixDialogComponent>;
        let service: CostoMedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMedidorMySuffixDialogComponent],
                providers: [
                    CostoMySuffixService,
                    MedidorMySuffixService,
                    CostoMedidorMySuffixService
                ]
            })
            .overrideTemplate(CostoMedidorMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMedidorMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMedidorMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoMedidorMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costoMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoMedidorMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costoMedidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoMedidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
