import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CostoMedidorMySuffixComponent } from './costo-medidor-my-suffix.component';
import { CostoMedidorMySuffixDetailComponent } from './costo-medidor-my-suffix-detail.component';
import { CostoMedidorMySuffixPopupComponent } from './costo-medidor-my-suffix-dialog.component';
import { CostoMedidorMySuffixDeletePopupComponent } from './costo-medidor-my-suffix-delete-dialog.component';

export const costoMedidorRoute: Routes = [
    {
        path: 'costo-medidor-my-suffix',
        component: CostoMedidorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoMedidors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-medidor-my-suffix/:id',
        component: CostoMedidorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoMedidors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoMedidorPopupRoute: Routes = [
    {
        path: 'costo-medidor-my-suffix-new',
        component: CostoMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-medidor-my-suffix/:id/edit',
        component: CostoMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-medidor-my-suffix/:id/delete',
        component: CostoMedidorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
