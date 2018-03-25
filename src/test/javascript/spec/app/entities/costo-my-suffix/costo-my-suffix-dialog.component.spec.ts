/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix-dialog.component';
import { CostoMySuffixService } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.service';
import { CostoMySuffix } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.model';
import { ServicioMySuffixService } from '../../../../../../main/webapp/app/entities/servicio-my-suffix';
import { ClasificacionMySuffixService } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix';
import { SectorMySuffixService } from '../../../../../../main/webapp/app/entities/sector-my-suffix';

describe('Component Tests', () => {

    describe('CostoMySuffix Management Dialog Component', () => {
        let comp: CostoMySuffixDialogComponent;
        let fixture: ComponentFixture<CostoMySuffixDialogComponent>;
        let service: CostoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMySuffixDialogComponent],
                providers: [
                    ServicioMySuffixService,
                    ClasificacionMySuffixService,
                    SectorMySuffixService,
                    CostoMySuffixService
                ]
            })
            .overrideTemplate(CostoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
