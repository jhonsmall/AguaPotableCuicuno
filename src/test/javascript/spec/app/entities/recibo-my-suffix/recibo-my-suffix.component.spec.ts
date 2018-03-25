/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { ReciboMySuffixComponent } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.component';
import { ReciboMySuffixService } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.service';
import { ReciboMySuffix } from '../../../../../../main/webapp/app/entities/recibo-my-suffix/recibo-my-suffix.model';

describe('Component Tests', () => {

    describe('ReciboMySuffix Management Component', () => {
        let comp: ReciboMySuffixComponent;
        let fixture: ComponentFixture<ReciboMySuffixComponent>;
        let service: ReciboMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [ReciboMySuffixComponent],
                providers: [
                    ReciboMySuffixService
                ]
            })
            .overrideTemplate(ReciboMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReciboMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReciboMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ReciboMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.recibos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
