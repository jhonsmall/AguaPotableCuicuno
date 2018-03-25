/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ServicioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/servicio-my-suffix/servicio-my-suffix-detail.component';
import { ServicioMySuffixService } from '../../../../../../main/webapp/app/entities/servicio-my-suffix/servicio-my-suffix.service';
import { ServicioMySuffix } from '../../../../../../main/webapp/app/entities/servicio-my-suffix/servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('ServicioMySuffix Management Detail Component', () => {
        let comp: ServicioMySuffixDetailComponent;
        let fixture: ComponentFixture<ServicioMySuffixDetailComponent>;
        let service: ServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ServicioMySuffixDetailComponent],
                providers: [
                    ServicioMySuffixService
                ]
            })
            .overrideTemplate(ServicioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ServicioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ServicioMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.servicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
