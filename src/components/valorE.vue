<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">
     TRANSFERENCIAS DE VALOR
    </q-card-title>
    <q-card> 
      <div class="col">
      <q-radio v-model="form.efectivo" val="true" color="green" left-label label="Si" />
      <q-radio v-model="form.efectivo" val="false" color="red" left-label label="No" style="margin-left: 10px" />
        <q-slide-transition>
        <p v-if="form.efectivo === 'true'" style="margin: 0; max-width: 500px">
          <tipodeTransferenciaComponent/>
          <q-input v-model="temp.Inversion" type="number" placeholder="Inversión:"/>
          <br/>
          <q-input v-model="temp.observacion" float-label="Observacion" type="textarea" />
        </p>
      </q-slide-transition>
      </div>
    </q-card> 
  </div>
</template>

<script>
import tipodeTransferenciaComponent from './tipodeTransferencia'
export default {
  name: 'valorEComponent',
  components: {
    tipodeTransferenciaComponent
  },
  data () {
    return {
    form: {
     efectivo: false,
     transValor: [],
    },
    temp: {
     Inversion: "",
     observacion: "",
     captures: [],
     tipoR: ""
    },
    }
  }
}
</script>

<style>
.fondoAzcul {
  background: #058bb2;
  color: white;
  border-radius: 10px;
  font-size: 14px;
  padding: 10px;
}
</style>
