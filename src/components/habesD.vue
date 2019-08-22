<template>
    <div>
      <p class="caption">
        <span>Tap</span>
        on each type to see it in action.
      </p>

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
      </q-list>
    </div>
</template>

<script>
import { bd } from "../js/bd"

export default {
   name: 'habesD',
  props: {
    d: String,
    c: String,
    t: String,
  },
  data () {
    return {
      checkBox1:true,
      dataInfo: '', 
      popupActivo:false,
      customDialogModel: false,
      name: '',
      nameError: false,
      positionalIcon: {
        top: 'arrow_upward',
        right: 'arrow_forward',
        bottom: 'arrow_downward',
        left: 'arrow_back'
      },
      types: [
        {
          label: 'Habeas Data',
          icon: 'border_color',
          handler: () => {
            this.$q.dialog({
              message: this.dataInfo,
              ok: 'Aceptar',
              cancel: 'Cancelar',
              html: true,
            }).then(() => {
              this.$q.notify({
              message: 'Acepto!',
              color: 'green'})
            }).catch(() => {
              this.$q.notify({message: 'Cancelo',
              closeBtn: location.reload()})
            })
          }
        },
      ],
    }
  }, 
  mounted () {
    this.consultar()
  },
  methods:{
  consultar(){
  
    // this.$q.loading.show()
    // this.axiosModeloGET('/habeasDatas')
    return bd.get('habeasDatas')
    .then(doc => {
      this.dataInfo = doc.data.observacion
      this.dataInfo = this.dataInfo.replace("$DIRECCION$",this.d)
      this.dataInfo = this.dataInfo.replace("$CORREO$",this.c)
      this.dataInfo = this.dataInfo.replace("$TEL$",this.t)
      //  document.write(this.dataInfo)
      })
  },
}
}
</script>