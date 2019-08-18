<template>
  <div>
    <div id="camera">
      <video ref="video" id="video" @click="capture" playsinline autoplay></video>
    </div>

    <!-- en este canvas se desliegan la imagen de vide -->
    <canvas ref="canvas" id="canvas" width="680" height="480"></canvas>
    
    <!-- En este boton se muestran las fotos para poderlas borrar -->
    <vs-row vs-w="12">
      <vs-col 
          vs-type="flex"
          vs-justify="center"
          vs-lg="3"
          vs-xs="6"
          :key="index" 
          v-for="(capture,index) in captures"  
      >
          <vs-button  
                @click="imagenClick(index)" 
                color="primary" 
                type="line"
          >
          <img :src="capture"  height="90" />
        </vs-button>
      </vs-col>  
    </vs-row>
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <vs-divider>
          Fin
        </vs-divider>

      </vs-col>
    </vs-row>

  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
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
