<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>회원가입</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                v-model="form.id"
                v-validate="'required|min:3|max:20'"
                :counter="20"
                :error-messages="errors.collect('id')"
                label="아이디"
                data-vv-name="id"
                required
              ></v-text-field>
              <v-text-field
                v-model="form.pwd"
                v-validate="'required|min:3|max:40'"
                :counter="40"
                :error-messages="errors.collect('pwd')"
                label="비밀번호"
                data-vv-name="pwd"
                required
                type="password"
              ></v-text-field>
              <v-text-field
                v-model="form.name"
                v-validate="'required|min:1|max:40'"
                :counter="20"
                :error-messages="errors.collect('name')"
                label="이름"
                data-vv-name="name"
                required
              ></v-text-field>
              <v-checkbox
                v-validate="'required'"
                v-model="agree"
                :error-message="errors.collect('checkbox')"
                value="1"
                label="이용약관: 암호는 저장됩니다. 주의하세요."
                data-vv-name="agree"
                type="checkbox"
                required
              ></v-checkbox>

              <v-btn color="primary" @click="submit">가입</v-btn>
              <v-btn color="secondary" @click="clear">취소</v-btn>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        flat
        @click="snackbar = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import ko from 'vee-validate/dist/locale/ko'

export default {
  $_veeValidate: {
    validator: 'new'
  },

  data: () => ({
    form: {
      id: '',
      pwd: '',
      name: ''
    },
    sb: {
      act: false,
      color: 'warning',
      msg: ''
    },
    agree: null,
    dictionary: {
      messages: ko.messages,
      attributes: {
        id: '아이디',
        pwd: '비밀번호',
        name: '이름',
        agree: '이용약관'
        // custom attributes
      },
      custom: {
        // name: {
        //   required: () => 'Name can not be empty',
        //   max: 'The name field may not be greater than 10 characters'
        //   // custom messages
        // },
        // select: {
        //   required: 'Select field is required'
        // }
      }
    }
  }),

  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },

  methods: {
    submit () {
      this.$validator.validateAll()
        .then(r => {
          if (!r) throw new Error('필수항목을 입력해 주세요.')
          return this.$axios.post('register', this.form)
        })
        .then(r => {
          if (!r.data.success) return this.pop('서버 에러', 'warning')
          this.pop('성공', 'success')
          this.$router.push('/sign')
        })
        .catch(e => this.pop(e.message, 'error'))
    },
    clear () {
      this.form.id = ''
      this.form.pwd = ''
      this.form.name = null
      this.agree = null
      this.$validator.reset()
    },
    pop (msg, cl) {
      this.sb.act = true
      this.sb.msg = msg
      this.sb.color = cl
    }
  }
}
</script>
