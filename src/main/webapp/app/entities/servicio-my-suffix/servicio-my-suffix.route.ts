import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ServicioMySuffixComponent } from './servicio-my-suffix.component';
import { ServicioMySuffixDetailComponent } from './servicio-my-suffix-detail.component';
import { ServicioMySuffixPopupComponent } from './servicio-my-suffix-dialog.component';
import { ServicioMySuffixDeletePopupComponent } from './servicio-my-suffix-delete-dialog.component';

export const servicioRoute: Routes = [
    {
        path: 'servicio-my-suffix',
        component: ServicioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Servicios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'servicio-my-suffix/:id',
        component: ServicioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Servicios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicioPopupRoute: Routes = [
    {
        path: 'servicio-my-suffix-new',
        component: ServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Servicios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servicio-my-suffix/:id/edit',
        component: ServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Servicios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servicio-my-suffix/:id/delete',
        component: ServicioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Servicios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
