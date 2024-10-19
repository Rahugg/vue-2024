<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const { register } = useAuth();

const handleRegister = async () => {
  const success = await register(name.value, email.value, password.value);
  if (success) {
    router.push('/login');
  } else {
    alert('Registration failed.');
  }
};
</script>

<template>
  <div class="register-page">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="btn-primary">Register</button>
      <p class="login-prompt">
        Already have an account? 
        <nuxt-link to="/login">Login here</nuxt-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #e3f2fd;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.register-form {
  width: 100%;
  max-width: 400px;
  background: #5bb9cd;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #e0f7fa;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

input:focus {
  outline: none;
  border: 2px solid #007bff;
}

.btn-primary {
  padding: 12px;
  background-color: #33cc66;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #28a745;
}

.login-prompt {
  text-align: center;
  margin-top: 10px;
  color: white;
  font-size: 14px;
}

nuxt-link {
  color: #ffeb3b;
  text-decoration: none;
}

nuxt-link:hover {
  text-decoration: underline;
}
</style>
