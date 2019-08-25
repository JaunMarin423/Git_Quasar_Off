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
