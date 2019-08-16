<template>
  <div>
    <q-select
      v-model="select"
      :options="options"
      label="Medico"
    />
    
  </div>
</template>

<script>
import { peticiones } from  "../assets/params/params.js"
import { bd } from "../js/bd";

export default {
  name:'selectComponent',
  model:{
    prop:'Selecccion',
    event:'update'
  },
  props:{
    tabla:{
      type: String,
      default: ''
      },
    campo:{
      type: String,
      default: ''
    },
    seleccion:{      
      type: Number | String,
      default: 0
    },
    label:{
      type: String,
      default: ''
    },
    disabled:{
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataInfo:[],
      valor: this.seleccion,

      select: 'fb',
      errorerror: true,
      warning: false,
      options: [],
      seleccionado: ''
    }
  },
  mounted () {
   this.consultar()
  },
  methods:{
    consultar(){
      let opciones = []
      return bd.get('receptores')
      .then(doc => {
        this.options = doc.data.map(e => {
          return {
            label: e.valor,
            value: e.valor
          }
        })
        })
        
      console.log('opciones', this.options)
      
    }
  },
  watch: {
    valor (newseleccion){
          this.$emit('update:seleccion',newseleccion)
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
</style>
