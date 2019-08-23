<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">Sincronización</q-card-title>
    <br />
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
    <!-- <q-btn push color="primary" icon="cloud_download" label="Descargar información" @click="changeMessage"/> -->

    <q-card-title class="bg-primary text-center fondoAzcul">Pendientes</q-card-title>
    <br />

    <div :key="index" v-for="(value, index) in receptor ">
      <q-item link tag="label">
        <q-item-main :label="cargarlabel(value.id)" />
        <q-item-side right>
          <span>{{value.doc.fecha_registro}}</span>
        </q-item-side>
      </q-item>
    </div>

    <br />
    <q-btn push color="primary" @click="subirDatos()" icon="backup" label="Subir información" />

  </div>
</template>

<script>
import { peticiones } from "../js/peticiones";
import { bd } from "../js/bd";
import { bdt } from "../js/BDTransValor";
import { QSpinnerFacebook, QSpinnerGears } from "quasar";
export default {
  name: "offAndOnComponen",
  mixins: [peticiones],
  data() {
    return {
      hola: {
        tipo_identificacion: "CC",
        num_identificacion: "887755220011",
        nombre: "juan perez",
        direccion: "asdasdasd",
        direccion_detalle: "asdwwwqwe",
        telefono: "785555",
        estado: "1",
        usuario_creador: "admin",
        id_centros_poblados: "17001005",
        id_div_dpto: "17",
        id_tipo_cliente: 19,
        id_tipo_receptor: 1,
        id_sociedad_cientifica: "SC04",
        fecha_nacimiento: "2019-07-26",
        isHabeas: true,
        firma:
          "data:image/png;base64,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",
        correo_principal: "juan.lo@gmail.com"
      },

      // Arrays quemados OJO!
      arrayTablas: [
        {
          nombreTabla: "Receptores",
          url:
            "/selectMedico/" +
            sessionStorage.idsec_users +
            "/num_identificacion",
          checked: true,
          loading: false,
          id: "receptores"
        },
        {
          nombreTabla: "Promoción",
          url:
            "/promocion/" +
            sessionStorage.idsec_users +
            "/" +
            sessionStorage.id_periodo +
            "",
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
          url: "/selecte/visitador_tipos_tercero/nombre/id_tipo_tercero",
          checked: true,
          loading: false,
          id: "terceros"
        },

        {
          nombreTabla: "Permisos",
          url: "/permisos",
          checked: true,
          loading: false,
          id: "permisos"
        },
        {
          nombreTabla: "Ciudades",
          url: "/api/citys/slcity",
          checked: true,
          loading: false,
          id: "ciudades"
        },
        {
          nombreTabla: "Departamentos",
          url: "/api/citys/Departamento",
          checked: true,
          loading: false,
          id: "departamentos"
        },
        {
          nombreTabla: "Centros poblados",
          url: "/tablas_datos",
          checked: true,
          loading: false,
          id: "centrosp"
        },
        {
          nombreTabla: "Tipo de identificacion",
          url: "/selecte/tipo_identificacion/identificacion/cod_ident",
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
          url: "/habeasDatas",
          checked: true,
          loading: false,
          id: "habeasDatas"
        }
      ],
      receptor: []
    };
  },
  mounted() {
    this.cargarPendientes();
  },
  methods: {
    cargarlabel(label) {
      switch (label.split("_")[0]) {
        case "receptor":
          return "Receptor";
        case "transfer":
          return "Tranferencia";
      }
    },

    cargarPendientes() {
      return bdt.allDocs({ include_docs: true }).then(doc => {
        this.receptor = doc.rows;
        console.log(doc.rows);
      });
    },


    subirDatos() {
 
      console.log(this.receptor);

      for ( let row of this.receptor) {
        
        let url = "";
        let nombre = row.id.split("_")[0]

        switch (nombre) {
          case "receptor":
            url = "/receptorDetail";
            break;
          case "transfer":
            url = "/transferenciaValor";
            break;
        }
        let id = row['id']
        // console.log(id);
        // console.log(this.receptor);
        
        
        delete row['doc']['_id'];
        delete row['doc']['_rev'];
        
        this.axiosModelo(url,'POST', row['doc'])
          .then((Data) => {
            this.$q.loading.hide()
            switch (Data.status){
              case 201: //OK
              this.$q.notify({
                color: "green",
                textColor :"black",
                message: "Envíos exitosos.",
                icon: "done",
                timeout: 3000,
              })
              console.log('holas', row['id']);
              bdt.remove(row['id'])
              break;
              case 401: // Error Autenticación error token
                this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
              break;
            }
            // this.rspValidacion(Data.status)
          })
      }

    },

    botonDescargaTodo() {
      console.log("pruebas");
    },

    getData(value) {
      //     console.log(doc);
      // if(value.id == doc._id){
      //   bd.remove(doc._id)

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
      if (value.loading == false) {
        // we set loading state
        value.loading = true;
        if (value.url === "/habeasDatas") {
          this.axiosModeloGET(value.url).then(Data => {
            this.rspValidacion(Data.status);
            this.dataInfo = Data.data.data.data.observacion;
            let res = {
              _id: "habeasDatas",
              data: { observacion: this.dataInfo }
            };
            bd.put(res);
          });
        } else {
          this.axiosModeloGET(value.url).then(Data => {
            this.rspValidacion(Data.status);
            this.dataInfo = Array.isArray(Data.data.data.data)
              ? Data.data.data.data
              : [];

            this.dataInfo._id = value.id;
            let res = {
              _id: value.id,
              data: this.dataInfo
            };
            bd.put(res);

            this.dataInfo.forEach(element => {});
          });
        }

        setTimeout(() => {
          value.loading = false;
        }, 3000);
      }
      this.$q.notify({
        message: "Data guardada correctamente",
        position: "top",
        type: "positive"
      });
    }
  }

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
.fondoAzcul {
  background: #058bb2;
  color: white;
  border-radius: 10px;
  padding: 10px;
  size: 17px;
  margin-top: 15px;
}
</style>
