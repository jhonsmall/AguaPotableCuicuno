import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ReciboMySuffixComponent } from './recibo-my-suffix.component';
import { ReciboMySuffixDetailComponent } from './recibo-my-suffix-detail.component';
import { ReciboMySuffixPopupComponent } from './recibo-my-suffix-dialog.component';
import { ReciboMySuffixDeletePopupComponent } from './recibo-my-suffix-delete-dialog.component';

export const reciboRoute: Routes = [
    {
        path: 'recibo-my-suffix',
        component: ReciboMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recibos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recibo-my-suffix/:id',
        component: ReciboMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recibos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reciboPopupRoute: Routes = [
    {
        path: 'recibo-my-suffix-new',
        component: ReciboMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recibos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recibo-my-suffix/:id/edit',
        component: ReciboMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recibos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recibo-my-suffix/:id/delete',
        component: ReciboMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recibos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
