<template>
  <div>

  <q-card-title class="bg-primary text-center fondoAzcul">
    CREACIÓN DE RECEPTOR
  </q-card-title>
  
  <tipoDocumentoSComponent/>

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
    
    <selectDepartamentoComponent/>
    <selectCiudadComponent/>
    <selectSociedadCComponent/>
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
    
    <FirmaComponent/>

    <q-btn
      class="q-mt-lg full-width"
      color="primary"
      icon-right="send"
      label="Enviar"
      @click.native="submit"
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
    data () {
      return {
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
      },
      }
    },
    validations: {
      register: {
        displayName: { required, minLength: minLength(2) },
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    },
    methods: {
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
