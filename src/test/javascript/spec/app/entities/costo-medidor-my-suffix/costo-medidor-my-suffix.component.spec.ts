/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMedidorMySuffixComponent } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.component';
import { CostoMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.service';
import { CostoMedidorMySuffix } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoMedidorMySuffix Management Component', () => {
        let comp: CostoMedidorMySuffixComponent;
        let fixture: ComponentFixture<CostoMedidorMySuffixComponent>;
        let service: CostoMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMedidorMySuffixComponent],
                providers: [
                    CostoMedidorMySuffixService
                ]
            })
            .overrideTemplate(CostoMedidorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMedidorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostoMedidorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costoMedidors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
