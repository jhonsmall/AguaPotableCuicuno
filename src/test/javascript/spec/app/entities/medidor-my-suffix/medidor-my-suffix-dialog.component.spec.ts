/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { MedidorMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix-dialog.component';
import { MedidorMySuffixService } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.service';
import { MedidorMySuffix } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.model';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix';
import { ClasificacionMySuffixService } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix';
import { SectorMySuffixService } from '../../../../../../main/webapp/app/entities/sector-my-suffix';

describe('Component Tests', () => {

    describe('MedidorMySuffix Management Dialog Component', () => {
        let comp: MedidorMySuffixDialogComponent;
        let fixture: ComponentFixture<MedidorMySuffixDialogComponent>;
        let service: MedidorMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [MedidorMySuffixDialogComponent],
                providers: [
                    UsuarioMySuffixService,
                    ClasificacionMySuffixService,
                    SectorMySuffixService,
                    MedidorMySuffixService
                ]
            })
            .overrideTemplate(MedidorMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedidorMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidorMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MedidorMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MedidorMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.medidor = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'medidorListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
