/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { EscalasDelMedidorMySuffixComponent } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.component';
import { EscalasDelMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.service';
import { EscalasDelMedidorMySuffix } from '../../../../../../main/webapp/app/entities/escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('EscalasDelMedidorMySuffix Management Component', () => {
        let comp: EscalasDelMedidorMySuffixComponent;
        let fixture: ComponentFixture<EscalasDelMedidorMySuffixComponent>;
        let service: EscalasDelMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [EscalasDelMedidorMySuffixComponent],
                providers: [
                    EscalasDelMedidorMySuffixService
                ]
            })
            .overrideTemplate(EscalasDelMedidorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EscalasDelMedidorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EscalasDelMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EscalasDelMedidorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.escalasDelMedidors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
