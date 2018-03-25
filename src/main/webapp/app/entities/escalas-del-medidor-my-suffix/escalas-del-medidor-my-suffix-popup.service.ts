import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EscalasDelMedidorMySuffix } from './escalas-del-medidor-my-suffix.model';
import { EscalasDelMedidorMySuffixService } from './escalas-del-medidor-my-suffix.service';

@Injectable()
export class EscalasDelMedidorMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private escalasDelMedidorService: EscalasDelMedidorMySuffixService

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
                this.escalasDelMedidorService.find(id)
                    .subscribe((escalasDelMedidorResponse: HttpResponse<EscalasDelMedidorMySuffix>) => {
                        const escalasDelMedidor: EscalasDelMedidorMySuffix = escalasDelMedidorResponse.body;
                        this.ngbModalRef = this.escalasDelMedidorModalRef(component, escalasDelMedidor);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.escalasDelMedidorModalRef(component, new EscalasDelMedidorMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    escalasDelMedidorModalRef(component: Component, escalasDelMedidor: EscalasDelMedidorMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.escalasDelMedidor = escalasDelMedidor;
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
