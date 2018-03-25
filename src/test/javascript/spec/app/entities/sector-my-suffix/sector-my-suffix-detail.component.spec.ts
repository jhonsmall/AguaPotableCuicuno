/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { SectorMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix-detail.component';
import { SectorMySuffixService } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.service';
import { SectorMySuffix } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.model';

describe('Component Tests', () => {

    describe('SectorMySuffix Management Detail Component', () => {
        let comp: SectorMySuffixDetailComponent;
        let fixture: ComponentFixture<SectorMySuffixDetailComponent>;
        let service: SectorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [SectorMySuffixDetailComponent],
                providers: [
                    SectorMySuffixService
                ]
            })
            .overrideTemplate(SectorMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectorMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SectorMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.sector).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
