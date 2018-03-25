import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    ReciboMySuffixService,
    ReciboMySuffixPopupService,
    ReciboMySuffixComponent,
    ReciboMySuffixDetailComponent,
    ReciboMySuffixDialogComponent,
    ReciboMySuffixPopupComponent,
    ReciboMySuffixDeletePopupComponent,
    ReciboMySuffixDeleteDialogComponent,
    reciboRoute,
    reciboPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reciboRoute,
    ...reciboPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReciboMySuffixComponent,
        ReciboMySuffixDetailComponent,
        ReciboMySuffixDialogComponent,
        ReciboMySuffixDeleteDialogComponent,
        ReciboMySuffixPopupComponent,
        ReciboMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ReciboMySuffixComponent,
        ReciboMySuffixDialogComponent,
        ReciboMySuffixPopupComponent,
        ReciboMySuffixDeleteDialogComponent,
        ReciboMySuffixDeletePopupComponent,
    ],
    providers: [
        ReciboMySuffixService,
        ReciboMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoReciboMySuffixModule {}
