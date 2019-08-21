<template>
  <div>
    <span class="letrasazules">Sociedad Cientifica</span>
    <q-select
      v-model="valor"
      :options="options"
      label="Tipo Documento"
    />
    
  </div>
</template>

<script>
import { peticiones } from  "../assets/params/params.js"
import { bd } from "../js/bd";

export default {
  name:'selectSociedadCComponent',
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
      return bd.get('v.sociedadcientifica')
      .then(doc => {
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
          this.$emit('sSC',newseleccion)
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
