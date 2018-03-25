/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMedidorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix-detail.component';
import { CostoMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.service';
import { CostoMedidorMySuffix } from '../../../../../../main/webapp/app/entities/costo-medidor-my-suffix/costo-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoMedidorMySuffix Management Detail Component', () => {
        let comp: CostoMedidorMySuffixDetailComponent;
        let fixture: ComponentFixture<CostoMedidorMySuffixDetailComponent>;
        let service: CostoMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMedidorMySuffixDetailComponent],
                providers: [
                    CostoMedidorMySuffixService
                ]
            })
            .overrideTemplate(CostoMedidorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMedidorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostoMedidorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.costoMedidor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
