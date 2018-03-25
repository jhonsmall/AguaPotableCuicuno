/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ClasificacionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix-detail.component';
import { ClasificacionMySuffixService } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix.service';
import { ClasificacionMySuffix } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix.model';

describe('Component Tests', () => {

    describe('ClasificacionMySuffix Management Detail Component', () => {
        let comp: ClasificacionMySuffixDetailComponent;
        let fixture: ComponentFixture<ClasificacionMySuffixDetailComponent>;
        let service: ClasificacionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ClasificacionMySuffixDetailComponent],
                providers: [
                    ClasificacionMySuffixService
                ]
            })
            .overrideTemplate(ClasificacionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClasificacionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClasificacionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClasificacionMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clasificacion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
