import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AguaPotableCuicunoUsuarioMySuffixModule } from './usuario-my-suffix/usuario-my-suffix.module';
import { AguaPotableCuicunoServicioMySuffixModule } from './servicio-my-suffix/servicio-my-suffix.module';
import { AguaPotableCuicunoClasificacionMySuffixModule } from './clasificacion-my-suffix/clasificacion-my-suffix.module';
import { AguaPotableCuicunoEscalasDelMedidorMySuffixModule } from './escalas-del-medidor-my-suffix/escalas-del-medidor-my-suffix.module';
import { AguaPotableCuicunoCostoMySuffixModule } from './costo-my-suffix/costo-my-suffix.module';
import { AguaPotableCuicunoSectorMySuffixModule } from './sector-my-suffix/sector-my-suffix.module';
import { AguaPotableCuicunoCostoMedidorMySuffixModule } from './costo-medidor-my-suffix/costo-medidor-my-suffix.module';
import { AguaPotableCuicunoMedidorMySuffixModule } from './medidor-my-suffix/medidor-my-suffix.module';
import { AguaPotableCuicunoLecturaMedidorMySuffixModule } from './lectura-medidor-my-suffix/lectura-medidor-my-suffix.module';
import { AguaPotableCuicunoReciboMySuffixModule } from './recibo-my-suffix/recibo-my-suffix.module';
import { AguaPotableCuicunoUsuarioModule } from './usuario/usuario.module';
import { AguaPotableCuicunoServicioModule } from './servicio/servicio.module';
import { AguaPotableCuicunoClasificacionModule } from './clasificacion/clasificacion.module';
import { AguaPotableCuicunoEscalasDelMedidorModule } from './escalas-del-medidor/escalas-del-medidor.module';
import { AguaPotableCuicunoCostoModule } from './costo/costo.module';
import { AguaPotableCuicunoSectorModule } from './sector/sector.module';
import { AguaPotableCuicunoCostoMedidorModule } from './costo-medidor/costo-medidor.module';
import { AguaPotableCuicunoMedidorModule } from './medidor/medidor.module';
import { AguaPotableCuicunoLecturaMedidorModule } from './lectura-medidor/lectura-medidor.module';
import { AguaPotableCuicunoReciboModule } from './recibo/recibo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AguaPotableCuicunoUsuarioMySuffixModule,
        AguaPotableCuicunoServicioMySuffixModule,
        AguaPotableCuicunoClasificacionMySuffixModule,
        AguaPotableCuicunoEscalasDelMedidorMySuffixModule,
        AguaPotableCuicunoCostoMySuffixModule,
        AguaPotableCuicunoSectorMySuffixModule,
        AguaPotableCuicunoCostoMedidorMySuffixModule,
        AguaPotableCuicunoMedidorMySuffixModule,
        AguaPotableCuicunoLecturaMedidorMySuffixModule,
        AguaPotableCuicunoReciboMySuffixModule,
        AguaPotableCuicunoUsuarioModule,
        AguaPotableCuicunoServicioModule,
        AguaPotableCuicunoClasificacionModule,
        AguaPotableCuicunoEscalasDelMedidorModule,
        AguaPotableCuicunoCostoModule,
        AguaPotableCuicunoSectorModule,
        AguaPotableCuicunoCostoMedidorModule,
        AguaPotableCuicunoMedidorModule,
        AguaPotableCuicunoLecturaMedidorModule,
        AguaPotableCuicunoReciboModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AguaPotableCuicunoEntityModule {}
