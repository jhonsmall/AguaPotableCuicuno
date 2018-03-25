import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MedidorMySuffixComponent } from './medidor-my-suffix.component';
import { MedidorMySuffixDetailComponent } from './medidor-my-suffix-detail.component';
import { MedidorMySuffixPopupComponent } from './medidor-my-suffix-dialog.component';
import { MedidorMySuffixDeletePopupComponent } from './medidor-my-suffix-delete-dialog.component';

export const medidorRoute: Routes = [
    {
        path: 'medidor-my-suffix',
        component: MedidorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medidors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medidor-my-suffix/:id',
        component: MedidorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medidors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const medidorPopupRoute: Routes = [
    {
        path: 'medidor-my-suffix-new',
        component: MedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medidor-my-suffix/:id/edit',
        component: MedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medidor-my-suffix/:id/delete',
        component: MedidorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Medidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
