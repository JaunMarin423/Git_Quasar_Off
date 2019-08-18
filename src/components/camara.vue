<template>
  <div>
    <div id="camera">
      <video ref="video" id="video" @click="capture" playsinline autoplay></video>
    </div>

    <!-- en este canvas se desliegan la imagen de vide -->
    <canvas ref="canvas" id="canvas" width="680" height="480"></canvas>
    
    <!-- En este boton se muestran las fotos para poderlas borrar -->
    <q-row vs-w="12">
      <q-col
          vs-type="flex"
          vs-justify="center"
          vs-lg="3"
          vs-xs="6"
          :key="index" 
          v-for="(capture,index) in captures"  
      >
          <q-btn
                @click="imagenClick(index)" 
                color="primary" 
                type="line"
          >
          <img :src="capture"  height="90" />
        </q-btn>
      </q-col>  
    </q-row>
    <q-row vs-w="12">
      <q-col vs-w="12">
        <q-divider>
          Fin
        </q-divider>

      </q-col>
    </q-row>

  </div>
</template>

<script>
  export default {
    name:"camara",
    props:{
      NoFotos :{
        type:[String, Number],
        default: 1
      }
    },
    data() {
        return {
            videoElement: '',
            canvas: {},
            captures: [],
        }
    },
    mounted() {
        this.videoElement = this.$refs.video  // se referencia el elemento <Video>
        this.start()
    },
    methods: {
        cerrarVentana () {
            console.log ('Cerrando ventana fotos')
        },
        errorHandler(error) {
            console.log('navigator.getUserMedia error: ', error)
        },
        visualizar(stream) {
            // en esta rutina se carga el video en el compoenete
            window.stream = stream;
            this.videoElement.srcObject = stream;
        },
        start() {
            // el modelo facingMode "environment" hace referencia a la camara de atras del cel y "user" a la del frente
            navigator.mediaDevices.getUserMedia({
                video:{facingMode:"environment"},
                width: {exact: 320},
                height: {exact: 240}
            }).then(this.visualizar).catch(this.errorHandler)
        },
        capture() {
            if(this.captures.length<this.NoFotos){
              this.canvas = this.$refs.canvas; // referencio el area de video para guardar
              var context = this.canvas.getContext("2d").drawImage(this.videoElement, 0, 0, 680, 480)
              this.captures.push(this.canvas.toDataURL("image/png"))
            }
            else{
              this.$vs.notify({title:'Notificación',text:'Se llego al numero maximo de fotos'})
            }
             this.$emit('fotos',this.captures)

        },
        imagenClick (index) {
          this.captures.splice(index,1)  // elimino el elemento seleccionado
        }
    }
  }
</script>

<style scoped>
  #video {
    width: 100%;
  }
  #canvas {
      display: none;
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
</style>
