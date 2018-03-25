/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AguaPotableCuicunoTestModule } from '../../../test.module';
import { MedidorMySuffixComponent } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.component';
import { MedidorMySuffixService } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.service';
import { MedidorMySuffix } from '../../../../../../main/webapp/app/entities/medidor-my-suffix/medidor-my-suffix.model';

describe('Component Tests', () => {

    describe('MedidorMySuffix Management Component', () => {
        let comp: MedidorMySuffixComponent;
        let fixture: ComponentFixture<MedidorMySuffixComponent>;
        let service: MedidorMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AguaPotableCuicunoTestModule],
                declarations: [MedidorMySuffixComponent],
                providers: [
                    MedidorMySuffixService
                ]
            })
            .overrideTemplate(MedidorMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MedidorMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedidorMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MedidorMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.medidors[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
