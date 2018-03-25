import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClasificacionMySuffixComponent } from './clasificacion-my-suffix.component';
import { ClasificacionMySuffixDetailComponent } from './clasificacion-my-suffix-detail.component';
import { ClasificacionMySuffixPopupComponent } from './clasificacion-my-suffix-dialog.component';
import { ClasificacionMySuffixDeletePopupComponent } from './clasificacion-my-suffix-delete-dialog.component';

export const clasificacionRoute: Routes = [
    {
        path: 'clasificacion-my-suffix',
        component: ClasificacionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clasificacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'clasificacion-my-suffix/:id',
        component: ClasificacionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clasificacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clasificacionPopupRoute: Routes = [
    {
        path: 'clasificacion-my-suffix-new',
        component: ClasificacionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clasificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clasificacion-my-suffix/:id/edit',
        component: ClasificacionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clasificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clasificacion-my-suffix/:id/delete',
        component: ClasificacionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clasificacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
