import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LecturaMedidorMySuffix } from './lectura-medidor-my-suffix.model';
import { LecturaMedidorMySuffixService } from './lectura-medidor-my-suffix.service';

@Injectable()
export class LecturaMedidorMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private lecturaMedidorService: LecturaMedidorMySuffixService

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
                this.lecturaMedidorService.find(id)
                    .subscribe((lecturaMedidorResponse: HttpResponse<LecturaMedidorMySuffix>) => {
                        const lecturaMedidor: LecturaMedidorMySuffix = lecturaMedidorResponse.body;
                        lecturaMedidor.lecturafinal = this.datePipe
                            .transform(lecturaMedidor.lecturafinal, 'yyyy-MM-ddTHH:mm:ss');
                        lecturaMedidor.fecha = this.datePipe
                            .transform(lecturaMedidor.fecha, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.lecturaMedidorModalRef(component, lecturaMedidor);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.lecturaMedidorModalRef(component, new LecturaMedidorMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    lecturaMedidorModalRef(component: Component, lecturaMedidor: LecturaMedidorMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.lecturaMedidor = lecturaMedidor;
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
