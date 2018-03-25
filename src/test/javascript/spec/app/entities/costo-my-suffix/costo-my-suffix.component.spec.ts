/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMySuffixComponent } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.component';
import { CostoMySuffixService } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.service';
import { CostoMySuffix } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoMySuffix Management Component', () => {
        let comp: CostoMySuffixComponent;
        let fixture: ComponentFixture<CostoMySuffixComponent>;
        let service: CostoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMySuffixComponent],
                providers: [
                    CostoMySuffixService
                ]
            })
            .overrideTemplate(CostoMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostoMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
