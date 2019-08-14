<template>
  <div>
    <q-list-header>Sincronización</q-list-header>
    <q-item link tag="label">
          <q-item-main label="Events and reminders" />
          <q-item-side right>
            <q-btn round :loading="loading1" color="black" @click="simulateProgress(1)" icon="camera_rear">
              <q-spinner-gears slot="loading" />
            </q-btn>
          </q-item-side>
    </q-item>
    <q-item link tag="label">
          <q-item-main label="Events and reminders" />
          <q-item-side right>
            <q-btn round :loading="loading2" color="black" @click="simulateProgress(2)" icon="camera_rear">
              <q-spinner-gears slot="loading" />
            </q-btn>
          </q-item-side>
    </q-item>
    <q-item link tag="label">
          <q-item-main label="Events and reminders" />
          <q-item-side right>
            <q-btn round :loading="loading3" color="black" @click="simulateProgress(3)" icon="camera_rear">
              <q-spinner-gears slot="loading" />
            </q-btn>
          </q-item-side>
    </q-item>
    <q-item link tag="label">
          <q-item-main label="Events and reminders" />
          <q-item-side right>
            <q-btn round :loading="loading4" color="black" @click="simulateProgress(4)" icon="camera_rear">
              <q-spinner-gears slot="loading" />
            </q-btn>
          </q-item-side>
    </q-item>
    <q-btn push color="primary" @click="changeMessage">
      Descargar información
    </q-btn>

  </div>
</template>

<script>
import { QSpinnerFacebook, QSpinnerGears } from 'quasar'
export default {
name: 'offAndOnComponen',
  data () {
    return {
    checked_1: true,
    checked_2: true,
    checked_3: true,
    checked_4: true,
    checked_5: true,
    checked_6: true,
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
    loading6: false,
    }
  },
  methods:{
    simulateProgress (number) {
      // we set loading state
      this[`loading${number}`] = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`loading${number}`] = false
      }, 3000)
    },

    changeMessage () {
      this.$q.loading.show({message: 'Por favor espere mientras descarga la información'})
      setTimeout(() => {
        console.log('Entra aquí')
      }, 3000)
       this.$q.loading.hide()
    }
  }
}

</script>

<style>
</style>
