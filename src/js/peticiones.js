// import {bd} from '@/mixins/bd.js'
// let cargando = false

export const peticiones = {
  data () {
    return {
      query: '',
      bearer: ''
    }
  },
  mounted () {
    let params = {
      imei: sessionStorage.imei,
      idsec_users: sessionStorage.idsec_users,
      origen: 'APP'
    }
    this.query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
    this.bearer = 'Bearer ' + sessionStorage.token
  },
  methods: {
    async axiosModeloGET (url) {
      let info = await this.axios({
        method: "GET",
        url: this.$API_Path + url + '?' + this.query,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.bearer
        },
        validateStatus: (status) => {
          // manejamos todas las respuestas por debajo de 500
          return status < 504
        }
      })
        .catch(err => {
          this.$vs.loading.close();
          console.log('err GET', err)
          this.mensaje_notificacion(
            "warning",
            "Usuario presenta novedad en su inicio de sesión hable con el administrador de su plataforma"
          );
        })
      return info
    },
    async axiosModelo (url, metodo, body) {
      let info = await this.axios({
        method: metodo,
        url: this.$API_Path + url + '?' + this.query,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.bearer
        },
        data: body,
        validateStatus: (status) => {
          // manejamos todas las respuestas por debajo de 500
          return status < 504
        }
      })
        .catch(err => {
          this.$vs.loading.close();
          console.log('err Modelo', err)
          this.mensaje_notificacion(
            "warning",
            "Usuario presenta novedad en su inicio de sesión hable con el administrador de su plataforma"
          );
        })
      return info
    },
    deslogueo () {
      this.$vs.loading();
      let data = {
        imei: this.imei,
        idsec_users: this.idsec_users,
        origen: "APP"
      }
      this.axiosModelo("/logout", 'POST', data)
        .then(Data => {
          if (Data.status === 200) {
            this.mensaje_notificacion("primary", "Usuario deslogueado", false);
          } else {
            this.mensaje_notificacion(
              "danger",
              "No se pudo desloguear al usuario indiquele al administrador",
              false
            );
          }
          sessionStorage.clear();
          this.$vs.loading.close();
          this.$router.push("/");
        }).catch(err => {
          console.log('error', err)
          this.$vs.loading.close();
          this.mensaje_notificacion(
            "danger",
            "Se presento un problema con la conexión al servidor, valide su internet",
            false
          )
        })
    },
    mensaje_notificacion (color, mensaje, accionClick) {
      this.$vs.notify({
        title: "Notificación del Sistema",
        text: mensaje,
        color: color,
        position: "top-center",
        icon: "warning",
        time: 6000,
        click: () => {
          if (accionClick) {
            this.deslogueo_Force()
          }
        }
      })
    },
    deslogueo_Force () {
      this.$vs.loading();
      let data = {
        idsec_users: this.form.user,
        origen: "APP"
      }
      this.axiosModelo("/logoutForce", 'POST', data)
        .then(Data => {
          if (Data.status === 200) {
            this.mensaje_notificacion("primary", "Usuario deslogueado", false)
          }
          // no se puede perden el token Firebase
          let auxTokenFirebase = sessionStorage.firebaseToken
          sessionStorage.clear();
          sessionStorage.firebaseToken = auxTokenFirebase
          this.$vs.loading.close()
        })
        .catch(err => {
          console.log('error', err)
          this.$vs.loading.close();
          this.mensaje_notificacion(
            "warnig",
            "Se presento un problema con la conexión al servidor, valide su internet",
            false
          )
        })
    },
    rspValidacion (status) {
      switch (status) {
        case 401:
          this.mensaje_notificacion("danger", "Ha perdido sesión - Inicie de nuevo por favor", false)
          this.deslogueo()
          break;
      }
    }
  }
}
