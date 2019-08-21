<template>
  <div>
    <q-list-header>Sincronización</q-list-header>
    <div :key="index" v-for="(value, index) in arrayTablas ">
      <q-item link tag="label">
        <q-item-main :label="value.nombreTabla" />
        <q-item-side right>
          <q-btn
            round
            :loading="value.loading"
            color="black"
            @click="getData(value)"
            icon="camera_rear"
          >
            <q-spinner-gears slot="loading" />
          </q-btn>
        </q-item-side>
      </q-item>

      <!-- <q-btn
        round
        color="black"
        @click="botonDescargaTodo()"
        icon="cloud_download"
      > -->
    </div>
    <!-- <q-btn push color="primary" icon="cloud_download" label="Descargar información" @click="changeMessage"/> -->
  </div>
</template>

<script>
import { peticiones } from "../js/peticiones.js";
import { bd } from "../js/bd";
import { QSpinnerFacebook, QSpinnerGears } from "quasar";
export default {
  name: "offAndOnComponen",
  mixins:[peticiones],
  data() {
    return {
     
      // Arrays quemados OJO!
      arrayTablas: [
        {
          nombreTabla: "Receptores",
          url:
            "/selectMedico/"+ sessionStorage.idsec_users +"/num_identificacion",
          checked: true,
          loading: false,
          id: "receptores"
        },
        // {
        //   nombreTabla: "Detalle del medico",
        //   url:
        //     "/receptorDetail/100790",
        //   checked: true,
        //   loading: false,
        //   id: "receptorD"
        // },
        {
          nombreTabla: "Promoción",
          url:
            "/promocion/"+ sessionStorage.idsec_users+"/3",
          checked: true,
          loading: false,
          id: "promocion"
        },
        {
          nombreTabla: "Tipo de transferencia",
          url:
            "/selecte/visitador_tipo_transferencias/nombre/id_tipo_transferencia",
          checked: true,
          loading: false,
          id: "transerencia"
        },
        {
          nombreTabla: "Tipo de datos",
          url:
            "/selecte/visitador_tipos_tercero/nombre/id_tipo_tercero",
          checked: true,
          loading: false,
          id: "terceros"
        },
        
        {
          nombreTabla: "Permisos",
          url:
            "/permisos",
          checked: true,
          loading: false,
          id: "permisos"
        },
        {
          nombreTabla: "Ciudades",
          url:
            "/api/citys/slcity",
          checked: true,
          loading: false,
          id: "ciudades"
        },
        {
          nombreTabla: "Departamentos",
          url:
            "/api/citys/Departamento",
          checked: true,
          loading: false,
          id: "departamentos"
        },
        {
          nombreTabla: "Centros poblados",
          url:
            "/tablas_datos",
          checked: true,
          loading: false,
          id: "centrosp"
        },
        {
          nombreTabla: "Tipo de identificacion",
          url:
            "/selecte/tipo_identificacion/identificacion/cod_ident",
          checked: true,
          loading: false,
          id: "identificacion"
        },
        {
          nombreTabla: "Sociedad cientifica",
          url:
            "/selecte/visitador_sociedades_cientificas/nombre/id_sociedad_cientifica",
          checked: true,
          loading: false,
          id: "v.sociedadcientifica"
        },
        {
          nombreTabla: "Habeas Datas",
          url:
            "/habeasDatas",
          checked: true,
          loading: false,
          id: "habeasDatas"
        }
      ]
    };
  },
  mounted() {
    console.log(this.$API_Path);
  },
  methods: {

    botonDescargaTodo () {
      console.log('pruebas');
      
    },
    
    getData(value) {
      //     console.log(doc);
      // if(value.id == doc._id){
      //   db.remove(doc._id)

      // if(value.loading==false){
      // // we set loading state
      // value.loading = true;
      // console.log(value.url);

      // this.axiosModeloGET(value.url)
      // .then((Data) => {
      //   this.rspValidacion(Data.status)
      //   this.dataInfo = Array.isArray(Data.data.data.data) ? Data.data.data.data: []
      //   this.dataInfo._id = value.id
      //   let res = {
      //     _id: value.id,
      //     data: this.dataInfo
      //   }
      //   bd.put(res)
      //   this.dataInfo.forEach(element => {
      //     this.$q.notify({
      //     message: 'Data guardada correctamente',
      //     position: 'top',
      //     type: 'positive'
      //     })
      //   })          
      // })
      // setTimeout(() => {
      // value.loading = false;
      // }, 3000)
      // }

      // }else{
         if(value.loading==false){
      // we set loading state
      value.loading = true;
      console.log(value.url);

      this.axiosModeloGET(value.url)
      .then((Data) => {
        this.rspValidacion(Data.status)
        this.dataInfo = Array.isArray(Data.data.data.data) ? Data.data.data.data: []
        this.dataInfo._id = value.id
        let res = {
          _id: value.id,
          data: this.dataInfo
        }
        bd.put(res)
        this.dataInfo.forEach(element => {

        })          
      })
      setTimeout(() => {
      value.loading = false;
      }, 3000)
      }
      this.$q.notify({
        message: 'Data guardada correctamente',
        position: 'top',
        type: 'positive'
        })
      }
    },

    // changeMessage() {
    //   this.$q.loading.show({
    //     message: "Por favor espere mientras descarga la información"
    //   });
    //   setTimeout(() => {
    //   }, 3000);
    //   this.$q.loading.hide();
    // }
  // }
};
</script>

<style>
</style>
