/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { MedidorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix-detail.component';
import { MedidorMySuffixService } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.service';
import { MedidorMySuffix } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('MedidorMySuffix Management Detail Component', () => {
        let comp: MedidorMySuffixDetailComponent;
        let fixture: ComponentFixture<MedidorMySuffixDetailComponent>;
        let service: MedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [MedidorMySuffixDetailComponent],
                providers: [
                    MedidorMySuffixService
                ]
            })
            .overrideTemplate(MedidorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedidorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MedidorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.medidor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
