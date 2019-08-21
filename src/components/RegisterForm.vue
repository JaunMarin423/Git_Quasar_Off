<template>
  <div>

  <q-card-title class="bg-primary text-center fondoAzcul">
    CREACIÓN DE RECEPTOR
  </q-card-title>
  
  <tipoDocumentoSComponent @tDS="form.tipo_identificacion = $event"/>

    <q-field
      icon="pcredit_card"
      helper="Número de documento"
    >
      <q-input
        type="number"
        v-model="form.num_identificacion"
        float-label="Número de documento"
        @blur="$v.register.displayName.$touch"
        @keyup.enter="submit"
      />
    </q-field>
    <br/>
     <q-btn color="primary" text-color="white" icon="youtube_searched_for" label="Validar documento" @click="buscarCc ()"/>

    <q-field
      icon="perm_identity"
      helper="Nombre"
    >
      <q-input
        v-model="form.nombre"
        :float-label="$t('display_name')"
        @blur="$v.register.displayName.$touch"  
        @keyup.enter="submit"
      />
    </q-field>
    <q-field
      icon="date_range"
      helper="Fecha de nacimiento"
    >
    <q-datetime v-model="form.fecha_nacimiento" type="date" />
    </q-field>
    <q-field
      icon="contact_phone"
      helper="Telefono"
    >
    <q-input 
    v-model="form.telefono" 
    type="number" 
    float-label="Ingrese el número telefonico"
    />
    </q-field>
    <q-field
      icon="directions"
      helper="Dirección"
    >
    <q-input 
    v-model="form.direccion" 
    type="text" 
    float-label="Ingrese su dirección"
    />
    </q-field>
    <q-field
      icon="details"
      helper="Dirección detalle"
    >
    <q-input 
    v-model="form.direccion_detalle" 
    type="text" 
    float-label="Ingrese su dirección detalle"
    />
    </q-field>
    
    <selectDepartamentoComponent @sD="form.id_div_dpto = $event"/>
    <selectCiudadComponent @sC="form.id_centros_poblados = $event"/>
    <selectSociedadCComponent @sSC="form.id_sociedad_cientifica = $event"/>
    <q-field
      icon="email"
      helper="Correo "
    >
    <q-input 
    v-model="form.correo_principal" 
    type="text" 
    float-label="Ingrese su correo"
    />
    </q-field>

    <habesD/>
    
    <FirmaComponent @firma="form.firma = $event"/>

    <q-btn
      class="q-mt-lg full-width"
      color="primary"
      icon-right="send"
      label="Enviar"
      @click.native="creacionReceptorOFF()"
    />

  </div>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import tipoDocumentoSComponent from './tipoDocumentoS'
  import FirmaComponent from './firma'
  import selectCiudadComponent from './selectCiudad'
  import selectDepartamentoComponent from './selectDepartamento'
  import selectSociedadCComponent from './selectSociedadC'
  import { peticiones } from "../js/peticiones.js"
  import { Loading } from 'quasar'
  import { bd } from "../js/bd"
  import { dbr } from "../js/BDReceptor"
  import { mapState } from 'vuex'

  import habesD from './habesD'
  export default {
    name: 'RegisterFormComponent',
    mixins:[peticiones],
    components: {
      tipoDocumentoSComponent,
      FirmaComponent,
      habesD,
      selectCiudadComponent,
      selectDepartamentoComponent,
      selectSociedadCComponent
  },
  computed: {
  ...mapState('app', ['isOnline'])
  },
    data () {
      return {
        userName: sessionStorage.idsec_users,
        register: {
          displayName: '',
          email: '',
          password: ''
        },
        form:{
          tipo_identificacion:'',
          num_identificacion:'',
          nombre:'',
          direccion:'',
          direccion_detalle:'',
          telefono:'',
          estado:'1',
          usuario_creador: sessionStorage.idsec_users,
          id_centros_poblados:'',
          id_div_dpto:'',
          id_tipo_cliente:'',
          id_tipo_receptor:'',
          id_sociedad_cientifica:'',
          fecha_nacimiento:'',
          isHabeas: false,
          firma: [],
          _id: 'receptor_'+Date.now(),
      },
      }
    },
    computed:{
    filterCiudad () {
      return this.dataSelCity.filter(filtro => {
        return filtro.COD_DPTO === this.form.id_div_dpto
      })
    },
    ubicar(){
      this.dataEdit = Object.assign( this.dataEdit,this.punto) 
      this.$emit('update:dataEdit', this.dataEdit)
    }
  },
  mounted () {
    this.configuracion()
    this.consultSelDepartamento()
    this.consultSelCity ()
    
  },
    validations: {
      register: {
        displayName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    methods: {
    onoff(){
      if(this.isOnline == true){
        this.creacionReceptor ()
        console.log('ONLINE');
        
      }else{
        this.creacionReceptorOFF ()
        console.log('OFF_ONLINE');
      }
    },
    configuracion(){
      if (this.userName === undefined) {
          this.$q.notify({
          color: "warning",
          textColor :"black",
          message: "Por favor ir a configuración",
          icon: "warning",
          timeout: 10000,
          position: 'center',
        })
      }
    },
      submit () {
        this.$v.register.$touch()
        if (this.$v.register.$error) {
          this.$q.notify({
            message: 'Error validando el formulario',
            position: 'top',
            type: 'negative'
          })
        } else {
          this.$emit('onRegister', this.register)
        }
      },
      buscarCc () {
      this.$q.loading.show
      this.axiosModeloGET('/solicitud/' + this.form.num_identificacion)
        .then(Data =>{ 
          this.$q.loading.hide() 
          if(Array.isArray(Data.data.data.data)){
            this.dataInfo =  Data.data.data.data
            this.$q.notify({
            message: 'El número de documento sé encuentra registrado',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
          }else{
            this.dataInfo = []
            this.$q.notify({
            message: 'El número de documento no se encuentra registrado',
            position: 'top',
            type: 'green',
            icon: 'done'
            })
          }
        })
        this.ActivoBoton = true
        this.Activoform = false
    },
    creacionReceptor () {
      if (this.form.tipo_identificacion == '')
       {
            this.$q.notify({
            message: 'Probablemente falte asignar tipo de documento',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
      }else{ 
        if(this.form.num_identificacion == ''){
            this.$q.notify({
            message: 'Probablemente falte asignar numero de identificación',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
        }else{
          if( this.form.nombre == ''){
            this.$q.notify({
            message: 'Complete el nombre',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
          }else{
            if (this.form.id_centros_poblados == '') {
              this.$q.notify({
              message: 'Seleccione ciudad',
              position: 'top',
              type: 'red',
              icon: 'warning'
              })
            }else{
              if(this.form.fecha_nacimiento == ''){
            this.$q.notify({
            message: 'Seleccione su fecha de nacimiento',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
              }else{
                if(this. form.id_sociedad_cientifica == ''){
                  this.$q.notify({
                  message: 'Seleccione sociedad cientifica',
                  position: 'top',
                  type: 'red',
                  icon: 'warning'
                  })
                }else{
                  if(this.form.telefono == ''){
                    this.$q.notify({
                    message: 'Complete el campo telefono',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.direccion == ''){
                    this.$q.notify({
                    message: 'Complete el campo dirección',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.correo_principal == ''){
                    this.$q.notify({
                    message: 'Complete el campo correo',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.firma == ''){
                    this.$q.notify({
                    message: 'Valide si guardo la firma',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
          this.$q.loading.show()
            this.form.estado='1',
            this.form.id_tipo_cliente=19,
            this.form.usuario_creador= sessionStorage.idsec_users,
            this.form.id_tipo_receptor=1,
            this.form.isHabeas=true,
            delete this.from._id
          this.axiosModelo('/receptorDetail','POST',this.form)
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
                    closeBtn: location.reload()
                  })
                  break;
                  case 401: // Error Autenticación error token
                    this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
                  break;
                }
                // this.rspValidacion(Data.status)
          })
        }
        }
        } 
        }
        }
        }
        }
        }
        }
      }  
    },
    creacionReceptorOFF () {
      if (this.form.tipo_identificacion == '')
       {
            this.$q.notify({
            message: 'Probablemente falte asignar tipo de documento',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
      }else{ 
        if(this.form.num_identificacion == ''){
            this.$q.notify({
            message: 'Probablemente falte asignar numero de identificación',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
        }else{
          if( this.form.nombre == ''){
            this.$q.notify({
            message: 'Complete el nombre',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
          }else{
            if (this.form.id_centros_poblados == '') {
              this.$q.notify({
              message: 'Seleccione ciudad',
              position: 'top',
              type: 'red',
              icon: 'warning'
              })
            }else{
              if(this.form.fecha_nacimiento == ''){
            this.$q.notify({
            message: 'Seleccione su fecha de nacimiento',
            position: 'top',
            type: 'red',
            icon: 'warning'
            })
              }else{
                if(this. form.id_sociedad_cientifica == ''){
                  this.$q.notify({
                  message: 'Seleccione sociedad cientifica',
                  position: 'top',
                  type: 'red',
                  icon: 'warning'
                  })
                }else{
                  if(this.form.telefono == ''){
                    this.$q.notify({
                    message: 'Complete el campo telefono',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.direccion == ''){
                    this.$q.notify({
                    message: 'Complete el campo dirección',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.correo_principal == ''){
                    this.$q.notify({
                    message: 'Complete el campo correo',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
                  if(this.form.firma == ''){
                    this.$q.notify({
                    message: 'Valide si guardo la firma',
                    position: 'top',
                    type: 'red',
                    icon: 'warning'
                    })
                  }else{
          this.$q.loading.show()
            this.form.estado='1',
            this.form.id_tipo_cliente=19,
            this.form.usuario_creador= sessionStorage.idsec_users,
            this.form.id_tipo_receptor=1,
            this.form.isHabeas=true,
            dbr.put(this.form)
            console.log('aqui');
            this.$q.notify({
              color: "green",
              textColor :"black",
              message: "Envíos exitosos.",
              icon: "done",
              timeout: 3000,
              closeBtn: location.reload()
            })
            this.$q.loading.hide()
          // this.axiosModelo('/receptorDetail','POST',this.form)
          // .then((Data) => {
          //       this.$q.loading.hide()
          //       switch (Data.status){
          //         case 201: //OK
          //         this.$q.notify({
          //           color: "green",
          //           textColor :"black",
          //           message: "Envíos exitosos.",
          //           icon: "done",
          //           timeout: 3000,
          //           closeBtn: location.reload()
          //         })
          //         break;
          //         case 401: // Error Autenticación error token
          //           this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
          //         break;
          //       }
          //       // this.rspValidacion(Data.status)
          // })
        }
        }
        } 
        }
        }
        }
        }
        }
        }
      }  
    },
    }
  }
</script>
<style>
.fondoAzcul{
  background:#058BB2;
  color: white;
  border-radius: 10px;
  padding: 10px;
  size: 17px;
}
</style>
