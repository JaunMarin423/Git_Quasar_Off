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
    </div>
    <q-btn push color="primary" @click="changeMessage">Descargar información</q-btn>
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
          nombreTabla: "selectMedico",
          url:
            "/selectMedico/admin/num_identificacion",
          checked: true,
          loading: false,
          id: "receptores"
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
          nombreTabla: "DetalleReceptor",
          url:
            "/receptorDetail/100790",
          checked: true,
          loading: false,
          id: "receptorD"
        },
        {
          nombreTabla: "CentrosP",
          url:
            "/tablas_datos",
          checked: true,
          loading: false,
          id: "centrosp"
        },
        {
          nombreTabla: "Promocion",
          url:
            "/promocion/admin/3",
          checked: true,
          loading: false,
          id: "promocion"
        },
        {
          nombreTabla: "Departamentos",
          url:
            "/citys/Departamento",
          checked: true,
          loading: false,
          id: "departamentos"
        },
        {
          nombreTabla: "T.transerencia",
          url:
            "/selecte/visitador_tipo_transferencias/nombre/id_tipo_transferencia",
          checked: true,
          loading: false,
          id: "transerencia"
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
          nombreTabla: "T.Terceros",
          url:
            "/selecte/visitador_tipos_tercero/nombre/id_tipo_tercero",
          checked: true,
          loading: false,
          id: "terceros"
        },
        {
          nombreTabla: "T.identificacion",
          url:
            "/selecte/tipo_identificacion/identificacion/cod_ident",
          checked: true,
          loading: false,
          id: "identificacion"
        },
        {
          nombreTabla: "V.SociedadC",
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
    getData(value) {
      console.log('hola');
      console.log(doc);
      
      if(value.id == doc._id){
        db.remove(doc._id)

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
          this.$q.notify({
          message: 'Data guardada correctamente',
          position: 'top',
          type: 'positive'
          })
        })          
      })
      setTimeout(() => {
      value.loading = false;
      }, 3000)
      }

      }else{
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
          this.$q.notify({
          message: 'Data guardada correctamente',
          position: 'top',
          type: 'positive'
          })
        })          
      })
      setTimeout(() => {
      value.loading = false;
      }, 3000)
      }
      }
    },

    changeMessage() {
      this.$q.loading.show({
        message: "Por favor espere mientras descarga la información"
      });
      setTimeout(() => {
        console.log("Entra aquí");
      }, 3000);
      this.$q.loading.hide();
    }
  }
};
</script>

<style>
</style>
