import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CostoMySuffixComponent } from './costo-my-suffix.component';
import { CostoMySuffixDetailComponent } from './costo-my-suffix-detail.component';
import { CostoMySuffixPopupComponent } from './costo-my-suffix-dialog.component';
import { CostoMySuffixDeletePopupComponent } from './costo-my-suffix-delete-dialog.component';

export const costoRoute: Routes = [
    {
        path: 'costo-my-suffix',
        component: CostoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Costos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-my-suffix/:id',
        component: CostoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Costos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoPopupRoute: Routes = [
    {
        path: 'costo-my-suffix-new',
        component: CostoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Costos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-my-suffix/:id/edit',
        component: CostoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Costos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-my-suffix/:id/delete',
        component: CostoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Costos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
