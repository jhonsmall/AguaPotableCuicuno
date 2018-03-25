import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SectorMySuffixComponent } from './sector-my-suffix.component';
import { SectorMySuffixDetailComponent } from './sector-my-suffix-detail.component';
import { SectorMySuffixPopupComponent } from './sector-my-suffix-dialog.component';
import { SectorMySuffixDeletePopupComponent } from './sector-my-suffix-delete-dialog.component';

export const sectorRoute: Routes = [
    {
        path: 'sector-my-suffix',
        component: SectorMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sector-my-suffix/:id',
        component: SectorMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectorPopupRoute: Routes = [
    {
        path: 'sector-my-suffix-new',
        component: SectorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sector-my-suffix/:id/edit',
        component: SectorMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sector-my-suffix/:id/delete',
        component: SectorMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sectors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
