<template>
  <div>
    {{$route.params}}
  </div>
</template>

<script>
export default {

  data () {
    return {

    }
  },
  watch: {
    'value' (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
