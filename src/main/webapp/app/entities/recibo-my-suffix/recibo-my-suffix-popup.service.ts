import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ReciboMySuffix } from './recibo-my-suffix.model';
import { ReciboMySuffixService } from './recibo-my-suffix.service';

@Injectable()
export class ReciboMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reciboService: ReciboMySuffixService

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
                this.reciboService.find(id)
                    .subscribe((reciboResponse: HttpResponse<ReciboMySuffix>) => {
                        const recibo: ReciboMySuffix = reciboResponse.body;
                        recibo.fecha = this.datePipe
                            .transform(recibo.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.reciboModalRef(component, recibo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reciboModalRef(component, new ReciboMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reciboModalRef(component: Component, recibo: ReciboMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.recibo = recibo;
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
