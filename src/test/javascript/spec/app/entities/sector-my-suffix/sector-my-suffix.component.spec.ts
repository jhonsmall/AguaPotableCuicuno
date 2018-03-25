/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { SectorMySuffixComponent } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.component';
import { SectorMySuffixService } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.service';
import { SectorMySuffix } from '../../../../../../main/webapp/app/entities/sector-my-suffix/sector-my-suffix.model';

describe('Component Tests', () => {

    describe('SectorMySuffix Management Component', () => {
        let comp: SectorMySuffixComponent;
        let fixture: ComponentFixture<SectorMySuffixComponent>;
        let service: SectorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [SectorMySuffixComponent],
                providers: [
                    SectorMySuffixService
                ]
            })
            .overrideTemplate(SectorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SectorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sectors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
