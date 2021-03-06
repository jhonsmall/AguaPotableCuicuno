import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ClasificacionMySuffix } from './clasificacion-my-suffix.model';
import { ClasificacionMySuffixService } from './clasificacion-my-suffix.service';

@Injectable()
export class ClasificacionMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clasificacionService: ClasificacionMySuffixService

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
                this.clasificacionService.find(id)
                    .subscribe((clasificacionResponse: HttpResponse<ClasificacionMySuffix>) => {
                        const clasificacion: ClasificacionMySuffix = clasificacionResponse.body;
                        this.ngbModalRef = this.clasificacionModalRef(component, clasificacion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clasificacionModalRef(component, new ClasificacionMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clasificacionModalRef(component: Component, clasificacion: ClasificacionMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clasificacion = clasificacion;
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
