/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ReciboMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix-dialog.component';
import { ReciboMySuffixService } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.service';
import { ReciboMySuffix } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.model';
import { UsuarioMySuffixService } from '../../../../../../main/webapp/app/entities/usuario-my-suffix';
import { LecturaMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix';

describe('Component Tests', () => {

    describe('ReciboMySuffix Management Dialog Component', () => {
        let comp: ReciboMySuffixDialogComponent;
        let fixture: ComponentFixture<ReciboMySuffixDialogComponent>;
        let service: ReciboMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ReciboMySuffixDialogComponent],
                providers: [
                    UsuarioMySuffixService,
                    LecturaMedidorMySuffixService,
                    ReciboMySuffixService
                ]
            })
            .overrideTemplate(ReciboMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReciboMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReciboMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReciboMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.recibo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reciboListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ReciboMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.recibo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'reciboListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
