<template>
  <v-card class="elevation-0" style="margin-top: 15%; margin-left: 25%">
    <v-row>
      <v-col cols="1  2" md="8">
        <v-card-text class="mt-12">
          <h1
              class="text-center display-2"
              style="color: black; font-weight: bold; margin-bottom: 40px"
          >Создайте аккаунт</h1>

          <v-form
              style="margin-bottom: 20px"
              ref="form"
              lazy-validation>

            <div class="font-center" style="font-size: 14pt; margin-bottom: 10px; text-align: left">
              Имя пользователя
            </div>

            <v-textarea
                @input="$v.login.$touch()"
                @blur="$v.login.$touch()"
                :error-messages="loginErrors"
                label="Введите имя пользователя"
                name="Login"
                type="text"
                color="black"
                v-model="login"
                auto-grow
                outlined
                rows="1"
                row-height="15"
                style="border-radius: 10px"
            />

            <div class="font-center" style="font-size: 14pt; margin-bottom: 10px; text-align: left">
              Пароль
            </div>

            <v-text-field
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :append-icon="eyeFlag ? 'mdi-eye' : 'mdi-eye-off'"
                :type="eyeFlag ? 'text' : 'password'"
                hint="Минимум 8 символов"
                :error-messages="passwordErrors"
                @click:append="eyeFlag = !eyeFlag"
                id="password"
                label="Введите пароль"
                color="black"
                v-model="password"
                auto-grow
                outlined
                rows="1"
                style="border-radius: 10px"
            />
          </v-form>

          <v-row style="margin: auto">
            <v-btn x-large style="box-shadow: none !important; border-radius: 10px" color=#F58E43 width="100%" dark
                   @click="submit()">
              Зарегистрироваться и вернуться ко входу
            </v-btn>
          </v-row>
          <v-row>
            <v-alert v-if="errorFlag" type="error">
              {{ errorText }}
            </v-alert>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";
import router from "../router";
import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
  name: "RegisterForm",

  mixins: [validationMixin],
  validations: {
    password: {required},
    login: {required},
  },
  data: () => ({
    eyeFlag: false,
    password: '',
    login: '',
    valid: false,
    errorFlag: false,
    errorText: ''
  }),
  computed: {
    loginErrors() {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.required && errors.push('Поле не может быть пустым')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Поле не может быть пустым')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (this.valid) {
        let data = {
          username: this.login,
          password: this.password
        }
        axios.create({
          baseURL: this.hostname
        }).post('/api/auth/signup', data)
            .then(resp => {
              console.log(resp.data.token)
              this.errorFlag = false;
              router.push({path: '/'})
            }).catch(err => {
          this.errorFlag = true;
          this.errorText = err.response.data.message
        })
      }
    },
  }
}
</script>

<style scoped>

</style>