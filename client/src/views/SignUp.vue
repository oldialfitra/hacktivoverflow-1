<template>
  <div id="registerForm" class="container">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
          <span>Sign Up</span>
        </div>

        <!-- Login Form -->
        <form v-on:submit.prevent="signUpFirst">
          <input
            type="email"
            id="emailRegister"
            class="fadeIn second"
            name="email"
            placeholder="email"
            v-model="email"
            required
          >
          <input
            type="password"
            class="fadeIn third"
            name="password"
            placeholder="password"
            v-model="password"
            required
          >
          <input
            type="password"
            class="fadeIn third"
            name="password"
            placeholder=" re-password"
            v-model="confirm"
            required
          >
          <input type="submit" class="fadeIn fourth" value="Sign Up">
        </form>

        <!-- Remind Passowrd -->
        <div id="formFooter">
          <div>
            <router-link to="/signin">Already have an account?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../assets/FormSign.css";
</style>

<script>
import Toast from "@/api/sweetalert.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirm: "",
    };
  },
  methods: {
    signUpFirst() {
      if (this.password === this.confirm) {
        this.$emit('sign-up', {email: this.email, password: this.password})
        this.email = "";
        this.password = "";
        this.confirm = "";
      } else {
        Toast.fire({
            type: "error",
            title: 'Password and Re-Password must same'
          });
        this.email = "";
        this.password = "";
        this.confirm = "";
      }
    },
    changeToLogin() {
      this.$router.push("/signin");
      this.email = "";
      this.password = "";
      this.confirm = "";
    }
  },
};
</script>

