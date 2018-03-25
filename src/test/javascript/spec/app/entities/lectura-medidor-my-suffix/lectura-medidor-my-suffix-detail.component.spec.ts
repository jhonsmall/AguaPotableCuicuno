/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { LecturaMedidorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix-detail.component';
import { LecturaMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.service';
import { LecturaMedidorMySuffix } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('LecturaMedidorMySuffix Management Detail Component', () => {
        let comp: LecturaMedidorMySuffixDetailComponent;
        let fixture: ComponentFixture<LecturaMedidorMySuffixDetailComponent>;
        let service: LecturaMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [LecturaMedidorMySuffixDetailComponent],
                providers: [
                    LecturaMedidorMySuffixService
                ]
            })
            .overrideTemplate(LecturaMedidorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LecturaMedidorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LecturaMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new LecturaMedidorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.lecturaMedidor).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
