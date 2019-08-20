<template>
  <div>
    <div v-show="showModal" id="modal-template">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <q-btn
                  icon="close"
                  class="vs-popup--close vs-popup--close--icon modal-default-button"
                  @click="cerrar"
                  color="red"
                  style="{background: _color.getColor(this.backgroundColorPopup,1)}"
                  type="filled"
                ></q-btn>
                <slot name="header"></slot>
              </div>

              <div class="modal-body">
                <div name="body">
                  <!-- ---  -->
                  <div id="camera">
                    <video ref="video" id="video" @click="capture" playsinline autoplay></video>
                    <canvas ref="canvas" id="canvas" width="680" height="480"></canvas>
                  </div>
                  <div vs-w="12">
                    <div
                      vs-type="flex"
                      vs-justify="center"
                      vs-lg="3"
                      vs-xs="6"
                      :key="index"
                      v-for="(capture,index) in cmpCaptures"
                    >
                      <q-btn @click="imagenClick(index)" color="primary" type="line">
                        <img :src="capture" height="90" />
                      </q-btn>
                    </div>
                  </div>
                  <!-- ---  -->
                </div>
              </div>

              <div class="modal-footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <br/>
    <q-btn @click="mostrar" type="line" size="large">
      <q-icon class="centrado" name="photo_camera" color="primary" size="50px"/>
    </q-btn>

    <div vs-w="12">
      <div
        vs-type="flex"
        vs-justify="center"
        vs-lg="3"
        vs-xs="6"
        :key="index"
        v-for="(capture,index) in cmpCaptures"
        style="padding: 10px;"
      >
        <img :src="capture" height="90" />
      </div>
    </div>
  </div>
</template>

<script>
import camara from "./camara"
import { Notify } from 'quasar'

export default {
  name: "FotoDinamic",
  components: { camara },
  props: ["name", " value", "NoFotos"],
  data() {
    return {
      videoElement: "",
      canvas: {},
      cmpCaptures: [],
      showModal: false,
      auxNoFotos: 1
    };
  },
  mounted() {
    if (this.NoFotos !== undefined) this.auxNoFotos = this.NoFotos;
  },
  methods: {
    errorHandler(error) {
      console.log("navigator.getUserMedia error: ", error);
    },
    visualizar(stream) {
      // en esta rutina se carga el video en el compoenete
      window.stream = stream;
      this.videoElement.srcObject = stream;
      // return navigator.mediaDevices.enumerateDevices()
    },
    start() {
      this.videoElement = this.$refs.video; // se referencia el elemento <Video>
      // el modelo facingMode "environment" hace referencia a la camara de atras del cel y "user" a la del frente
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: "environment" },
            width: { exact: 320 },
            height: { exact: 240 }
          })
          .then(this.visualizar)
          .catch(this.errorHandler);
      }
    },
    capture() {
      // if(this.cmpCaptures.length<this.auxNoFotos){
      this.canvas = this.$refs.canvas; // referencio el area de video para guardar
      var context = this.canvas
        .getContext("2d")
        .drawImage(this.videoElement, 0, 0, 680, 480);
      this.cmpCaptures.push(this.canvas.toDataURL("image/png"));
      console.log('capture', this.cmpCaptures, 'canvas', this.canvas)
      this.$q.notify({
        color: "positive",
        textColor :"black",
        message: "Foto registrada correctamente",
        icon: "check"
      })
      // }else{
      //   this.$q.notify({title:'Notificación',text:'Se llego al numero maximo de fotos'})
      // }
      this.$emit("input", this.cmpCaptures);
      this.cmpCaptures = []
    },
    imagenClick(index) {
      this.cmpCaptures.splice(index, 1); // elimino el elemento seleccionado
    },
    cerrar() {
      this.showModal = false;
      const tracks = window.stream.getTracks();
      tracks.map(track => track.stop());
      this.$emit("close");
      // this.cmpCaptures.splice(index, 1); // elimino el elemento seleccionado *** se comentarea por error generado
    },
    mostrar() {
      this.showModal = true;
      this.start();
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
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
  width: 300px;
  margin: 0px auto;
  padding: 20px 10px;
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
  top: -25px;
  right: -10px;
}

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

#video {
  width: 100%;
}
#video:focus {
  animation: flash 0.1s linear;
}
@keyframes flash {
  form {
    width: 100%;
  }
  to {
    width: 90%;
  }
}
#canvas {
  display: none;
  border: 1px solid red;
}
li {
  display: inline;
  padding: 5px;
}
.camera-modal-container {
  position: absolute;
  bottom: 15px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-flow: column;
}
.centrado{
  margin-left: 150px;
}
</style>


