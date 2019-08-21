<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">
     TRANSFERENCIAS DE VALOR
    </q-card-title>
    <br/>
    <q-card> 
      <div class="col">
      <q-radio v-model="form.efectivo" val="true" color="green" left-label label="Si" />
      <q-radio v-model="form.efectivo" val="false" color="red" left-label label="No" style="margin-left: 10px" />
        <q-slide-transition>
        <p v-if="form.efectivo === 'true'" style="margin: 0; max-width: 500px">
          <tipodeTransferenciaComponent @calor_hijo="temp.tipoR = $event"/>
          
          <q-input type="number" v-model="temp.Inversion" stack-label="Inversión:"/>
          <br/>
          <q-input v-model="temp.observacion" float-label="Observacion" type="textarea" />
          <br/>
          <FotoDinamic v-model="temp.captures"></FotoDinamic>
          <br/>
          <q-btn color="green" class="block centrado" icon="add_circle" size="20px" @click="nuevo()"/>
            <br/>
            
              <q-card :key="index" v-for="(value, index) in form.transValor">
                <div>
                  <q-card-title>
                    Tipo de transferencia: 
                  </q-card-title>
                  <q-card-main> 
                    <p>{{form.transValor[index].tipoR}}</p>
                  </q-card-main>
                  <q-card-title> 
                  Valor de transferencia: 
                  </q-card-title>
                  <q-card-main> 
                    <p>{{form.transValor[index].inversion}}</p>
                  </q-card-main>
                  <q-card-title> 
                    Observacion: 
                  </q-card-title>
                  <q-card-main> 
                    <p>{{form.transValor[index].observacion}}</p>
                  </q-card-main> 
              </div>
            </q-card>
          
        </p>
      </q-slide-transition>
      
      </div>
    </q-card> 
  </div>
</template>

<script>
import tipodeTransferenciaComponent from './tipodeTransferencia'
import FotoDinamic from '../components/FotoDinamic'
export default {
  name: 'valorEComponent',
  components: {
    tipodeTransferenciaComponent,
    FotoDinamic
  },
  data () {
    return {
    agregar: [],
    userName: sessionStorage.idsec_users,
    form: {
     efectivo: false,
     transValor: [],
    },
    transfer: {
      efectivo: ""
    },
    temp: {
     Inversion: "",
     observacion: "",
     captures: [],
     tipoR: ""
    },
    }
  },
  mounted(){
    this.$emit("temp", this.form.transValor);
  },
  methods:{
    nuevo() {
      if (this.temp.Inversion === "" || this.temp.tipoR === "") {
        this.$q.notify({
          color: "red",
          textColor :"black",
          message: "Complete la información",
          icon: "close"
      })
      } else {
        this.form.transValor.push({
          inversion: this.temp.Inversion,
          observacion: this.temp.observacion,
          tipoR: this.temp.tipoR,
          captures: this.temp.captures
        });
        this.temp.Inversion = "";
        this.temp.observacion = "";
        this.temp.tipoR = "";
        this.temp.captures = [];
      }
    }
  },
  watch: {
    valor(temp) {
      this.$emit("temp",  this.form.transValor);
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
.centrado{
  margin-left: 150px;
}
</style>
