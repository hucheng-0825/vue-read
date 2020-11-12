<template>
  <div class="list-container">
    <van-image
      class="img"
      fit="cover"
      :src="list.images"
      @click="bookRead(list)"
    />
    <span class="name">{{ list.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    list: {
      type: Object,
      require: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    bookRead (list) {
      this.$router.push('/bookread')
      this.$store.commit('setList', list)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  text-align: center;
  width: 27%;
  height: 360px;
  .img {
    height: 258px;
    width: 100%;
  }
  .name {
    font-size: 28px;
  }
}
</style>
