<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN GENERAL
    </q-card-title>
    <div class="col">
    <span class="letrasazules">Usuario creador:  </span> <samp class="letrasUser"> {{userName}} </samp>
    </div>
    <br>
    <div class="col">
    <span class="letrasazules">Fecha de inicio:</span>
    <q-datetime v-model="today" modal float-label="Fecha" />
    </div>
    <div class="col">
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN DEL RECEPTOR
    </q-card-title>
    <span class="letrasazules">Receptor (médico):  </span>
    <selectComponent/>
       <div class="col-6 mt-2">
      <q-btn align="between" class="btn-fixed-width espacio" color="primary" label="Buscar" icon="search" @click="datosReceptor()"/>
    </div>
    </div>
    <div class="col">
      <span class="letrasazules">Recibe directamente la transferencia de valor:  </span>
      <q-toggle v-model="visible" label="Recibe Directo" />
        <q-slide-transition>
          <p v-show="visible" style="margin: 0; max-width: 500px">
            <img
              class="responsive"
              src="../assets/quasar-logo-full.svg"
            >
            <tipoPersonaComponent/>
          </p>
      </q-slide-transition>
    </div>

    <q-card-title class="bg-primary text-center fondoAzcul">
      TRANSFERENCIA DE VALOR
    </q-card-title>


    <q-input v-model="text" float-label="Float label & placeholder" placeholder="Placeholder"/>

     <br/>
    <FirmaComponent/>


  </div>
</template>

<script>
import tipoPersonaComponent from '../components/tipoPersona'
import selectComponent from '../components/select'
import FirmaComponent from '../components/firma'

const today = new Date()

export default {
 name: 'transValorComponent',
    components: {
    selectComponent,
    FirmaComponent,
    tipoPersonaComponent
  },
  data () {
    return {
      today,
      text: '',
      visible: true,
      mostrar_form: '',
      dataInfo: '',
      campana: '',
      userName: sessionStorage.idsec_users,
      id_periodo: sessionStorage.id_periodo,
      form: {
        id_cliente: '',
        id_periodo: '',
        fecha_inicio: '',
        login:'',
        recibe_directo:1,
        id_tipo_tercero:'',
        campana: [],
        transfer:[],
        firma: [],
      },
      num_identificacion: 0,
      captures: [],
      activarCamara:true,
      SedeOK:true,
      valor:'',
      cantidad_entregada: '',
    }
  }
}
</script>

<style>
.fondoAzcul{
  background:#058BB2;
  color: white;
  border-radius: 10px;
  padding: 10px;
  size: 17px;
}
.letrasazules {
  color: rgb(3, 144, 187);
  left: 85%;
  margin-top: 10px;
  size: 15px;
}
</style>
