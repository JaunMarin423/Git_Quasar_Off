<template>
  <div>
    <span class="letrasazules">Tipo de transferencia:</span>
    <q-select
      v-model="seleccionado"
      :options="options"
      label="... seleccionar ..."
    />
    <p>{{seleccionado}}</p>
  </div>
</template>

<script>
import { peticiones } from  "../assets/params/params.js"
import { bd } from "../js/bd";

export default {
  name:'tipodeTransferenciaComponent',
  model:{
    prop:'Selecccion',
    event:'update'
  },
  data () {
    return {
      dataInfo:[],
      valor: this.options,
      select: 'fb',
      errorerror: true,
      warning: false,
      options: [],
      seleccionado: ''
    }
  },
  mounted () {
   this.consultar()
   this.$emit('calor_hijo',options)
  },
  methods:{
    consultar(){
      let opciones = []
      return bd.get('transerencia')
      .then(doc => {
        console.log(doc.data)
        
        console.log('hola1')
        this.options = doc.data.map(e => {
          return {
            label: e.text,
            value: e.value
          }
          
        })
        })
    }
  },
  watch: {
    valor (newseleccion){
      this.seleccionado = newseleccion
      console.log('select', this.seleccionado);
       
      this.$emit('calor_hijo',newseleccion)
    },
    warning (val) {
      if (val) {
        this.error = false
      }
    },

  }
}
</script>

<style>
.letrasazules {
  color: rgb(3, 144, 187);
  left: 85%;
  margin-top: 10px;
  size: 15px;
}
</style>
