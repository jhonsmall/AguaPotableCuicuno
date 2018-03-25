import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    EscalasDelMedidorMySuffixService,
    EscalasDelMedidorMySuffixPopupService,
    EscalasDelMedidorMySuffixComponent,
    EscalasDelMedidorMySuffixDetailComponent,
    EscalasDelMedidorMySuffixDialogComponent,
    EscalasDelMedidorMySuffixPopupComponent,
    EscalasDelMedidorMySuffixDeletePopupComponent,
    EscalasDelMedidorMySuffixDeleteDialogComponent,
    escalasDelMedidorRoute,
    escalasDelMedidorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...escalasDelMedidorRoute,
    ...escalasDelMedidorPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EscalasDelMedidorMySuffixComponent,
        EscalasDelMedidorMySuffixDetailComponent,
        EscalasDelMedidorMySuffixDialogComponent,
        EscalasDelMedidorMySuffixDeleteDialogComponent,
        EscalasDelMedidorMySuffixPopupComponent,
        EscalasDelMedidorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EscalasDelMedidorMySuffixComponent,
        EscalasDelMedidorMySuffixDialogComponent,
        EscalasDelMedidorMySuffixPopupComponent,
        EscalasDelMedidorMySuffixDeleteDialogComponent,
        EscalasDelMedidorMySuffixDeletePopupComponent,
    ],
    providers: [
        EscalasDelMedidorMySuffixService,
        EscalasDelMedidorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoEscalasDelMedidorMySuffixModule {}
