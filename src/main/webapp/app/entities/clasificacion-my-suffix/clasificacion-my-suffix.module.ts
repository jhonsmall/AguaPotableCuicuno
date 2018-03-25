import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    ClasificacionMySuffixService,
    ClasificacionMySuffixPopupService,
    ClasificacionMySuffixComponent,
    ClasificacionMySuffixDetailComponent,
    ClasificacionMySuffixDialogComponent,
    ClasificacionMySuffixPopupComponent,
    ClasificacionMySuffixDeletePopupComponent,
    ClasificacionMySuffixDeleteDialogComponent,
    clasificacionRoute,
    clasificacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clasificacionRoute,
    ...clasificacionPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClasificacionMySuffixComponent,
        ClasificacionMySuffixDetailComponent,
        ClasificacionMySuffixDialogComponent,
        ClasificacionMySuffixDeleteDialogComponent,
        ClasificacionMySuffixPopupComponent,
        ClasificacionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ClasificacionMySuffixComponent,
        ClasificacionMySuffixDialogComponent,
        ClasificacionMySuffixPopupComponent,
        ClasificacionMySuffixDeleteDialogComponent,
        ClasificacionMySuffixDeletePopupComponent,
    ],
    providers: [
        ClasificacionMySuffixService,
        ClasificacionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoClasificacionMySuffixModule {}
