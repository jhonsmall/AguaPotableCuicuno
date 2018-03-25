import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    ServicioMySuffixService,
    ServicioMySuffixPopupService,
    ServicioMySuffixComponent,
    ServicioMySuffixDetailComponent,
    ServicioMySuffixDialogComponent,
    ServicioMySuffixPopupComponent,
    ServicioMySuffixDeletePopupComponent,
    ServicioMySuffixDeleteDialogComponent,
    servicioRoute,
    servicioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...servicioRoute,
    ...servicioPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ServicioMySuffixComponent,
        ServicioMySuffixDetailComponent,
        ServicioMySuffixDialogComponent,
        ServicioMySuffixDeleteDialogComponent,
        ServicioMySuffixPopupComponent,
        ServicioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ServicioMySuffixComponent,
        ServicioMySuffixDialogComponent,
        ServicioMySuffixPopupComponent,
        ServicioMySuffixDeleteDialogComponent,
        ServicioMySuffixDeletePopupComponent,
    ],
    providers: [
        ServicioMySuffixService,
        ServicioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoServicioMySuffixModule {}
