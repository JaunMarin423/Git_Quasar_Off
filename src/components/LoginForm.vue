<template>
  <div>
    <q-field
      icon="perm_identity"
      helper="Usuario"
    >
      <q-input
        v-model="login.email"
        float-label="Usuario"
        
      />
    </q-field>

    <q-field
      icon="enhanced_encryption"
      helper="Introduce tu contraseña"
    >
      <q-input
        type="password"
        v-model="login.password"
        float-label="Contraseña"
        
      />
    </q-field>

    <q-btn
      class="q-mt-lg full-width"
      color="green"
      icon-right="send"
      label="Configurar"
      @click="autenticarUsuario"
    />

  </div>
</template>

<script>
var md5 = require("md5") 
import {peticiones} from '../js/peticiones'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginFormComponent',
  mixins:[peticiones],
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      form: { 
        user: "", 
        pswd: "" 
      },
      IP: [],
    }
  },
  created () { 
    localStorage.imei = "" 
    localStorage.idsec_users = "" 
    localStorage.email = "" 
    localStorage.nombre = "" 
    localStorage.foto = "" 
    localStorage.idPerfil = "" 
    localStorage.nombrePerfil = "" 
    localStorage.zona_id = ""
    localStorage.id_periodo = ""
  }, 
  validations: {
    login: {
      email: { required, email },
      password: { required, minLength: minLength(5) }
    }
  },
  methods: {
    // submit () {
    //     this.$emit('onLogin', this.login)
    //     sessionStorage.user = this.login.email
    //     sessionStorage.password = md5(this.login.password)
    // },
    
    autenticarUsuario () { 
      
      this.$q.loading.show()
      
      let data = { 
        username: this.login.email, 
        password: md5(this.login.password), 
        lat: "0", 
        lng: "0", 
        bateria: "0", 
        versionapp: "1.0", 
      } 
      this.axiosModelo("/login", 'POST', data) 
        .then(Data => { 
          switch (Data.status) { 
            case 200: // ok 
              sessionStorage.imei = Data.data.data.data.imei 
              sessionStorage.email = Data.data.data.data.email 
              sessionStorage.nombre = Data.data.data.data.nombreusuario 
              sessionStorage.foto = Data.data.data.data.foto 
              sessionStorage.idPerfil = Data.data.data.data.ID_perfil 
              sessionStorage.nombrePerfil = Data.data.data.data.nombreperfil 
              sessionStorage.zona_id= Data.data.data.data.zona_id
              sessionStorage.id_periodo= Data.data.data.data.id_periodo
              sessionStorage.idsec_users = Data.data.data.data.idsec_users 
              
              // this.$router.push("home") 
              // console.log(this.$router); 
              break; 
            case 210: // Ya logueado 
              this.$q.notify({
                color: "warning",
                textColor :"white",
                message: "Usuario ya registrado CLICK para desloguear",
                icon: "warning",
              })
              break; 
            case 403: // Datos errados usuario incorrecto 
              this.$q.notify({
                color: "primary",
                textColor :"white",
                message: "Valide los datos registrados presenta alguna incosistencia",
                icon: "done",
              })
            case 503: // Datos errados usuario incorrecto 
                this.$q.notify({
                  color: "warning",
                  textColor :"white",
                  message: "Valide los datos registrados presenta alguna incosistencia",
                  icon: "warning",
                })
              break 
            default: 
              // error desconocido 
              this.$q.notify({
                color: "primary",
                textColor :"white",
                message: "El servidor genero un error desconocido, comuniquese con el administrador",
                icon: "warning",
              })
          } 
          this.$q.loading.hide()
        }) 
        .catch(err => { 
          this.$q.loading.hide()
            this.$q.notify({
              color: "red",
              textColor :"white",
              message: "Se presento un problema con la conexión al servidor, valide su internet",
              icon: "power_settings_new",
            })
        }) 
         
    },
  }
}
</script>
