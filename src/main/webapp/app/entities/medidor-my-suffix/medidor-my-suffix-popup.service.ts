import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MedidorMySuffix } from './medidor-my-suffix.model';
import { MedidorMySuffixService } from './medidor-my-suffix.service';

@Injectable()
export class MedidorMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private medidorService: MedidorMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.medidorService.find(id)
                    .subscribe((medidorResponse: HttpResponse<MedidorMySuffix>) => {
                        const medidor: MedidorMySuffix = medidorResponse.body;
                        medidor.fechaobtuvo = this.datePipe
                            .transform(medidor.fechaobtuvo, 'yyyy-MM-ddTHH:mm:ss');
                        medidor.fecha = this.datePipe
                            .transform(medidor.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.medidorModalRef(component, medidor);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.medidorModalRef(component, new MedidorMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    medidorModalRef(component: Component, medidor: MedidorMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.medidor = medidor;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
