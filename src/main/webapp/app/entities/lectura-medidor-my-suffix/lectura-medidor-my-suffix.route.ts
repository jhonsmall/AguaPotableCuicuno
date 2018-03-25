import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { LecturaMedidorMySuffixComponent } from './lectura-medidor-my-suffix.component';
import { LecturaMedidorMySuffixDetailComponent } from './lectura-medidor-my-suffix-detail.component';
import { LecturaMedidorMySuffixPopupComponent } from './lectura-medidor-my-suffix-dialog.component';
import { LecturaMedidorMySuffixDeletePopupComponent } from './lectura-medidor-my-suffix-delete-dialog.component';

export const lecturaMedidorRoute: Routes = [
    {
        path: 'lectura-medidor-my-suffix',
        component: LecturaMedidorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LecturaMedidors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lectura-medidor-my-suffix/:id',
        component: LecturaMedidorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LecturaMedidors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lecturaMedidorPopupRoute: Routes = [
    {
        path: 'lectura-medidor-my-suffix-new',
        component: LecturaMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LecturaMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lectura-medidor-my-suffix/:id/edit',
        component: LecturaMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LecturaMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lectura-medidor-my-suffix/:id/delete',
        component: LecturaMedidorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'LecturaMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
