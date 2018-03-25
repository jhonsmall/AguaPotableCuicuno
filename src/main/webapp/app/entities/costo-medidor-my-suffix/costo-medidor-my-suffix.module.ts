import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    CostoMedidorMySuffixService,
    CostoMedidorMySuffixPopupService,
    CostoMedidorMySuffixComponent,
    CostoMedidorMySuffixDetailComponent,
    CostoMedidorMySuffixDialogComponent,
    CostoMedidorMySuffixPopupComponent,
    CostoMedidorMySuffixDeletePopupComponent,
    CostoMedidorMySuffixDeleteDialogComponent,
    costoMedidorRoute,
    costoMedidorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...costoMedidorRoute,
    ...costoMedidorPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostoMedidorMySuffixComponent,
        CostoMedidorMySuffixDetailComponent,
        CostoMedidorMySuffixDialogComponent,
        CostoMedidorMySuffixDeleteDialogComponent,
        CostoMedidorMySuffixPopupComponent,
        CostoMedidorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CostoMedidorMySuffixComponent,
        CostoMedidorMySuffixDialogComponent,
        CostoMedidorMySuffixPopupComponent,
        CostoMedidorMySuffixDeleteDialogComponent,
        CostoMedidorMySuffixDeletePopupComponent,
    ],
    providers: [
        CostoMedidorMySuffixService,
        CostoMedidorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoCostoMedidorMySuffixModule {}
