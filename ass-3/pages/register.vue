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

/* Responsive Design */
@media (max-width: 1200px) {
  .register-form {
    max-width: 90%;
    padding: 25px;
  }

  h2 {
    font-size: 22px;
  }

  input {
    padding: 10px;
    font-size: 14px;
  }

  .btn-primary {
    padding: 10px;
    font-size: 14px;
  }

  .login-prompt {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .register-form {
    max-width: 100%;
    padding: 20px;
  }

  h2 {
    font-size: 20px;
  }

  input {
    padding: 8px;
    font-size: 12px;
  }

  .btn-primary {
    padding: 8px;
    font-size: 12px;
  }

  .login-prompt {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .register-form {
    max-width: 100%;
    padding: 15px;
  }

  h2 {
    font-size: 18px;
  }

  input {
    padding: 6px;
    font-size: 10px;
  }

  .btn-primary {
    padding: 6px;
    font-size: 10px;
  }

  .login-prompt {
    font-size: 11px;
  }
}
</style>