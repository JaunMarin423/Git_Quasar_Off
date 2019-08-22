<template>
<div>
  <div  v-if="popupActivo" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        

        <div v-scroll="scrolled" class="modal-body">
          <p v-html="dataInfo"/>
        </div>
        

        <div class="modal-footer">
          <slot name="footer">
            <q-btn color="primary" type="filled" @click="cerrar_dialog">Cerrar</q-btn>
          </slot>
        </div>
      </div>
    </div>
  </div>

    <q-btn label="Habeas Data" icon="border_color" color="primary" @click="popupActivo = true" />

</div>
  <!-- <div>
    <modal v-if="popupActivo" :titulo="title" @close="cerrar_dialog">
      <template v-slot:body>
        <section class="sec-container">
        </section>
      </template>
    </modal>

    <q-btn label="Habeas Data" icon="border_color" color="primary" @click="popupActivo = true" />
     <q-list>

        <q-item
          link
          v-for="dialog in types"
          :key="dialog.label"
          @click.native="dialog.handler()"
          v-ripple.mat
        >
          <q-item-side :icon="dialog.icon" />
          <q-item-main :label="dialog.label" />
          <q-item-side right icon="keyboard_arrow_right" />
        </q-item>
        <q-item-separator />
    </q-list>-->
 <!-- </div> -->
</template>

<script>
import { bd } from "../js/bd";
import modal from "./modal";

export default {
  name: "habesD",
  props: {
    titulo: { type: String, default: "" },
    d: String,
    c: String,
    t: String
  },
  components: {
    modal
  },
  data() {
    return {
      checkBox1: true,
      dataInfo: "",
      popupActivo: false,
      title: "Habeas Data",
      customDialogModel: false,
      name: "",
      nameError: false,
      positionalIcon: {
        top: "arrow_upward",
        right: "arrow_forward",
        bottom: "arrow_downward",
        left: "arrow_back"
      },
      types: [
        {
          label: "Habeas Data",
          icon: "border_color",
          handler: () => {
            this.$q
              .dialog({
                message: this.dataInfo,
                ok: "Aceptar",
                cancel: "Cancelar"
              })
              .then(() => {
                this.$q.notify({
                  message: "Acepto!",
                  color: "green"
                });
              })
              .catch(() => {
                this.$q.notify({
                  message: "Cancelo",
                  closeBtn: location.reload()
                });
              });
          }
        }
      ]
    };
  },
  mounted() {
    console.log(this.popupActivo);
    this.consultar();
  },
  methods: {
    show() {
      this.$modal.show("hello-world");
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    consultar() {
      // this.$q.loading.show()
      // this.axiosModeloGET('/habeasDatas')
      return bd.get("habeasDatas").then(doc => {
        this.dataInfo = doc.data.observacion;
        this.dataInfo = this.dataInfo.replace("$DIRECCION$", this.d);
        this.dataInfo = this.dataInfo.replace("$CORREO$", this.c);
        this.dataInfo = this.dataInfo.replace("$TEL$", this.t);
        // document.write(this.dataInfo)
      });
    },
    cerrar_dialog() {
      this.popupActivo = false;
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>