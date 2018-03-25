/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { LecturaMedidorMySuffixComponent } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.component';
import { LecturaMedidorMySuffixService } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.service';
import { LecturaMedidorMySuffix } from '../../../../../../main/webapp/app/entities/lectura-medidor-my-suffix/lectura-medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('LecturaMedidorMySuffix Management Component', () => {
        let comp: LecturaMedidorMySuffixComponent;
        let fixture: ComponentFixture<LecturaMedidorMySuffixComponent>;
        let service: LecturaMedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [LecturaMedidorMySuffixComponent],
                providers: [
                    LecturaMedidorMySuffixService
                ]
            })
            .overrideTemplate(LecturaMedidorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LecturaMedidorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LecturaMedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new LecturaMedidorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.lecturaMedidors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
