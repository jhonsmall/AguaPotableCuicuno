import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    MedidorMySuffixService,
    MedidorMySuffixPopupService,
    MedidorMySuffixComponent,
    MedidorMySuffixDetailComponent,
    MedidorMySuffixDialogComponent,
    MedidorMySuffixPopupComponent,
    MedidorMySuffixDeletePopupComponent,
    MedidorMySuffixDeleteDialogComponent,
    medidorRoute,
    medidorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...medidorRoute,
    ...medidorPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MedidorMySuffixComponent,
        MedidorMySuffixDetailComponent,
        MedidorMySuffixDialogComponent,
        MedidorMySuffixDeleteDialogComponent,
        MedidorMySuffixPopupComponent,
        MedidorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        MedidorMySuffixComponent,
        MedidorMySuffixDialogComponent,
        MedidorMySuffixPopupComponent,
        MedidorMySuffixDeleteDialogComponent,
        MedidorMySuffixDeletePopupComponent,
    ],
    providers: [
        MedidorMySuffixService,
        MedidorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoMedidorMySuffixModule {}
