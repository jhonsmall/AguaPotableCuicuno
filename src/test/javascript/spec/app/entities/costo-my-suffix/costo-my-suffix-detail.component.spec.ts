/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { CostoMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix-detail.component';
import { CostoMySuffixService } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.service';
import { CostoMySuffix } from '../../../../../../main/webapp/app/entities/costo-my-suffix/costo-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoMySuffix Management Detail Component', () => {
        let comp: CostoMySuffixDetailComponent;
        let fixture: ComponentFixture<CostoMySuffixDetailComponent>;
        let service: CostoMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [CostoMySuffixDetailComponent],
                providers: [
                    CostoMySuffixService
                ]
            })
            .overrideTemplate(CostoMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostoMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.costo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
