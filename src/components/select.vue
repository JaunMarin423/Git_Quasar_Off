<template>
  <div>
    <q-select
      stack-label="Seleccione"
      inverted-light
      color="blue-5"
      separator
      class="class_select"
      :options="options"
      v-model="options"
      :disabled="disabled"
    >
    <q-select-item 
    :key="index"
    :value="item.value"
    :text="item.text"
    v-for="(item,index) in this.options"
    />
    
    </q-select>
    
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
      options: []
    }
  },
  mounted () {
   this.consultar()
  },
  methods:{
    consultar(){
      bd.get('receptores')
        .then(function (doc) {
          console.log(doc._id)
          this.options = doc.data
        }).catch(function (err) {
          console.log(err);
        });
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
