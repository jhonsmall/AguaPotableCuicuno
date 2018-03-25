import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EscalasDelMedidorMySuffixComponent } from './escalas-del-medidor-my-suffix.component';
import { EscalasDelMedidorMySuffixDetailComponent } from './escalas-del-medidor-my-suffix-detail.component';
import { EscalasDelMedidorMySuffixPopupComponent } from './escalas-del-medidor-my-suffix-dialog.component';
import { EscalasDelMedidorMySuffixDeletePopupComponent } from './escalas-del-medidor-my-suffix-delete-dialog.component';

export const escalasDelMedidorRoute: Routes = [
    {
        path: 'escalas-del-medidor-my-suffix',
        component: EscalasDelMedidorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EscalasDelMedidors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'escalas-del-medidor-my-suffix/:id',
        component: EscalasDelMedidorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EscalasDelMedidors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const escalasDelMedidorPopupRoute: Routes = [
    {
        path: 'escalas-del-medidor-my-suffix-new',
        component: EscalasDelMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EscalasDelMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escalas-del-medidor-my-suffix/:id/edit',
        component: EscalasDelMedidorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EscalasDelMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'escalas-del-medidor-my-suffix/:id/delete',
        component: EscalasDelMedidorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EscalasDelMedidors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
