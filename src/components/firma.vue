<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-12 mt-2">
          <VueSignaturePad
            id="signature"
            width="100%"
            height="100%"
            ref="signaturePad"
          />
        </div>
        <div class="col-6 mt-2">
         <q-btn align="between" class="btn-fixed-width espacio" color="primary" label="Limpiar" icon="remove_circle_outline" @click="reset" type="relief"/>
        </div>
        <div>
         <q-btn align="between" class="btn-fixed-width espacio" color="primary" label="Guardar Firma" icon="flight_takeoff" @click="save"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import VueSignaturePad from 'vue-signature-pad';
 
Vue.use(VueSignaturePad);

export default {
  name: 'FirmaComponent',
  mounted() {
    
  },
  methods: {
    reset() {
      this.$refs.signaturePad.undoSignature();
      this.$refs.width = this.$refs.width;
      this.$refs.length = 0; 
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      this.$emit('firma', data)
      this.$q.notify({
        color: "green",
        textColor :"black",
        message: "Firma guardada",
        icon: "done",
      })
      // console.log(isEmpty);
      // console.log('prueba de firma', data);
      // console.log(isEmpty);
      
      
    }
  }
};
</script>

<style>
.espacio{
  margin-top: 10px;
}
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
