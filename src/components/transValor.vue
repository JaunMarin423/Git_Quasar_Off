<template>
  <div>
    
  </div>
</template>

<script>
export default {
 name: 'transValor',
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
</style>
