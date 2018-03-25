/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ReciboMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix-detail.component';
import { ReciboMySuffixService } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.service';
import { ReciboMySuffix } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.model';

describe('Component Tests', () => {

    describe('ReciboMySuffix Management Detail Component', () => {
        let comp: ReciboMySuffixDetailComponent;
        let fixture: ComponentFixture<ReciboMySuffixDetailComponent>;
        let service: ReciboMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ReciboMySuffixDetailComponent],
                providers: [
                    ReciboMySuffixService
                ]
            })
            .overrideTemplate(ReciboMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReciboMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReciboMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ReciboMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.recibo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
