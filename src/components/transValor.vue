<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN GENERAL
    </q-card-title>
    <q-datetime v-model="today" modal float-label="Fecha" />
    
    <span class="letrasazules">Usuario creador:  </span> <samp class="letrasUser"> {{userName}} </samp>

    <q-input v-model="text" float-label="Float label & placeholder" placeholder="Placeholder"/>

    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN DEL RECEPTOR
    </q-card-title>
    <span class="letrasazules">Receptor (médico):  </span>
    <selectComponent/>
    <FirmaComponent/>


  </div>
</template>

<script>
import selectComponent from '../components/select'
import FirmaComponent from '../components/firma'

export default {
 name: 'transValorComponent',
    components: {
    selectComponent,
    FirmaComponent
  },
  data () {
    return {
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
</style>
