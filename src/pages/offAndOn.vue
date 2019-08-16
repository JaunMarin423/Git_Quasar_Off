<template>
  <q-page padding>
    <offAndOnComponen/>
    <selectComponent/>
    <FirmaComponent/>
  </q-page>
</template>

<script>
import offAndOnComponen from '../components/offAndOn'
import selectComponent from '../components/select'
import FirmaComponent from '../components/firma'
export default {
  name: 'offAndOnPage',
  components: {
    offAndOnComponen,
    selectComponent,
    FirmaComponent
  }
}
</script>

<style>
</style>
