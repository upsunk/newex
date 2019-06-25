<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn color="primary" @click="pop('click test')">sss</v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
        <user :user="user" @sbOpen="pop"></user>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
    </v-snackbar>
  </v-container>
</template>

<script>
import user from '@/components/user'
export default {
  components: { user },
  data () {
    return {
      users: [],
      sb: {
        act: false,
        msg: 'nananana'
      }
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    pop (msg) {
      this.sb.msg = msg
      this.sb.act = true
    },
    getUsers () {
      this.$axios.get('manage/user')
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    }
  }
}
</script>
