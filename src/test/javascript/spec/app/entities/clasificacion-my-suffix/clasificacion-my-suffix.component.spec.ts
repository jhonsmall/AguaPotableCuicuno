/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ClasificacionMySuffixComponent } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix.component';
import { ClasificacionMySuffixService } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix.service';
import { ClasificacionMySuffix } from '../../../../../../main/webapp/app/entities/clasificacion-my-suffix/clasificacion-my-suffix.model';

describe('Component Tests', () => {

    describe('ClasificacionMySuffix Management Component', () => {
        let comp: ClasificacionMySuffixComponent;
        let fixture: ComponentFixture<ClasificacionMySuffixComponent>;
        let service: ClasificacionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ClasificacionMySuffixComponent],
                providers: [
                    ClasificacionMySuffixService
                ]
            })
            .overrideTemplate(ClasificacionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClasificacionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClasificacionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClasificacionMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clasificacions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
