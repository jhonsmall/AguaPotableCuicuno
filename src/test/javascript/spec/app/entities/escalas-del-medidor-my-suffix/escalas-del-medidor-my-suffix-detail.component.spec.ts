/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { EscalasDelMedidorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix-detail.component';
import { EscalasDelMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.service';
import { EscalasDelMedidorMySuffix } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('EscalasDelMedidorMySuffix Management Detail Component', () => {
        let comp: EscalasDelMedidorMySuffixDetailComponent;
        let fixture: ComponentFixture<EscalasDelMedidorMySuffixDetailComponent>;
        let service: EscalasDelMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [EscalasDelMedidorMySuffixDetailComponent],
                providers: [
                    EscalasDelMedidorMySuffixService
                ]
            })
            .overrideTemplate(EscalasDelMedidorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscalasDelMedidorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscalasDelMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EscalasDelMedidorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.escalasDelMedidor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
