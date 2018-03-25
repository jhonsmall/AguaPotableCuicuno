import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AguaPotableCuicunoSharedModule } from '../../shared';
import {
    SectorMySuffixService,
    SectorMySuffixPopupService,
    SectorMySuffixComponent,
    SectorMySuffixDetailComponent,
    SectorMySuffixDialogComponent,
    SectorMySuffixPopupComponent,
    SectorMySuffixDeletePopupComponent,
    SectorMySuffixDeleteDialogComponent,
    sectorRoute,
    sectorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...sectorRoute,
    ...sectorPopupRoute,
];

@NgModule({
    imports: [
        AguaPotableCuicunoSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SectorMySuffixComponent,
        SectorMySuffixDetailComponent,
        SectorMySuffixDialogComponent,
        SectorMySuffixDeleteDialogComponent,
        SectorMySuffixPopupComponent,
        SectorMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SectorMySuffixComponent,
        SectorMySuffixDialogComponent,
        SectorMySuffixPopupComponent,
        SectorMySuffixDeleteDialogComponent,
        SectorMySuffixDeletePopupComponent,
    ],
    providers: [
        SectorMySuffixService,
        SectorMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoSectorMySuffixModule {}
