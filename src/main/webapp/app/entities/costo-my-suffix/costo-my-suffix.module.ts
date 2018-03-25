import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    CostoMySuffixService,
    CostoMySuffixPopupService,
    CostoMySuffixComponent,
    CostoMySuffixDetailComponent,
    CostoMySuffixDialogComponent,
    CostoMySuffixPopupComponent,
    CostoMySuffixDeletePopupComponent,
    CostoMySuffixDeleteDialogComponent,
    costoRoute,
    costoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...costoRoute,
    ...costoPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostoMySuffixComponent,
        CostoMySuffixDetailComponent,
        CostoMySuffixDialogComponent,
        CostoMySuffixDeleteDialogComponent,
        CostoMySuffixPopupComponent,
        CostoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CostoMySuffixComponent,
        CostoMySuffixDialogComponent,
        CostoMySuffixPopupComponent,
        CostoMySuffixDeleteDialogComponent,
        CostoMySuffixDeletePopupComponent,
    ],
    providers: [
        CostoMySuffixService,
        CostoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoCostoMySuffixModule {}
