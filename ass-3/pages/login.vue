<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';

const email = ref('');
const password = ref('');
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  const success = await login(email.value, password.value);
  if (success) {
    router.push('/');
  } else {
    alert('Invalid credentials.');
  }
};
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" class="login-button">Login</button>
        <p class="register-text">
          Don't have an account? 
          <nuxt-link to="/register">Register here</nuxt-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #e3f2fd;
  padding: 20px;
}

.login-container {
  background: #5bb9cd;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-bottom: 1.5rem;
  color: white;
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background: #e0f7fa;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

input:focus {
  outline: none;
  border: 2px solid #007bff;
}

.login-button {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background: #33cc66;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background: #28a745;
}

.register-text {
  margin-top: 1rem;
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

/* Responsive Design */
@media (max-width: 1200px) {
  .login-container {
    max-width: 90%;
    padding: 25px;
  }

  h2 {
    font-size: 22px;
  }

  input {
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  .login-button {
    padding: 0.7rem;
    font-size: 0.95rem;
  }

  .register-text {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .login-container {
    max-width: 100%;
    padding: 20px;
  }

  h2 {
    font-size: 20px;
  }

  input {
    padding: 0.65rem;
    font-size: 0.9rem;
  }

  .login-button {
    padding: 0.65rem;
    font-size: 0.9rem;
  }

  .register-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .login-container {
    max-width: 100%;
    padding: 15px;
  }

  h2 {
    font-size: 18px;
  }

  input {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .login-button {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .register-text {
    font-size: 11px;
  }
}
</style>