<template>
  <div>
    <q-field
      icon="perm_identity"
      helper="Usuario"
    >
      <q-input
        v-model="login.email"
        float-label="Usuario"
        @keyup.enter="submit"
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
        @keyup.enter="submit"
      />
    </q-field>

    <q-btn
      class="q-mt-lg full-width"
      color="green"
      icon-right="send"
      label="Inicia sesión"
      @click.native="submit"
    />

  </div>
</template>

<script>
var md5 = require("md5") 

import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'LoginFormComponent',
  data () {
    return {
      login: {
        email: '',
        password: ''
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
    localStorage.token = ""
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
    submit () {
        this.$emit('onLogin', this.login)
        sessionStorage.user = this.login.email
        sessionStorage.password = md5(this.login.password)
      }
  }
}
</script>
