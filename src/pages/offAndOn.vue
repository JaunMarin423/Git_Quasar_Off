<template>
  <q-page padding>
    <offAndOnComponen/>
    <selectComponent

    />
  </q-page>
</template>

<script>
import offAndOnComponen from '../components/offAndOn'
import selectComponent from '../components/select'
export default {
  name: 'offAndOnPage',
  components: {
    offAndOnComponen,
    selectComponent
  }
}
</script>

<style>
</style>
