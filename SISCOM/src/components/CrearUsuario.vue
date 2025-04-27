<template>
  <!-- Nueva interfaz para crear usuarios -->
  <div id="paginatotal">
    <div id="contenedorPrincipal">
      <img id="imagen" src="/Img/siscomlogin.png" alt="iconoregistro" title="iconoregistro" />
      <h2>Crear Cuenta</h2>
      <form id="formRegistro" @submit.prevent="handleRegister">
        <div id="registros">
          <label for="nombre">Nombre Completo</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre Completo" required />

          <label for="correo">Correo Electrónico</label>
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" required />

          <label for="pass">Contraseña</label>
          <input type="password" id="pass" name="pass" placeholder="Contraseña" required />

          <label for="confirmarPass">Confirmar Contraseña</label>
          <input type="password" id="confirmarPass" name="confirmarPass" placeholder="Confirmar Contraseña" required />

          <button id="botonent" type="submit" :disabled="isSubmitting" @click="handleRegister">
            {{ isSubmitting ? "Procesando..." : "Crear Cuenta" }}
          </button>
        </div>
      </form>

      <!-- Link a login -->
      <p>¿Ya tienes cuenta? <RouterLink to="/Login">Inicia Sesión</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",

  data() {
    return {
      isSubmitting: false, // Estado para controlar el bloqueo del botón
    };
  },

  methods: {
    async handleRegister() {
      try {
        const email = document.getElementById("correo").value;
        const username = document.getElementById("nombre").value;
        const password = document.getElementById("pass").value;
        const confirmPassword = document.getElementById("confirmarPass").value;

        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden. Por favor, verifica e inténtalo nuevamente.");
          return;
        }

        const campos = { username, email, password };
        campos.username = document.getElementById("nombre").value;
        campos.email = document.getElementById("correo").value;
        campos.password = document.getElementById("confirmarPass").value;


        const checkResponse = await fetch(`http://localhost:8080/auth/user?email=${encodeURIComponent(email)}`, {
          method: "GET",
        });

        if (checkResponse.status === 200) {
          const user = await checkResponse.json();
          if (user.email === email) {
            alert("El correo ya está registrado. Por favor, usa uno diferente.");
            return;
          }
        }

        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campos),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Usuario registrado con éxito. Redirigiendo a verificación...");
          this.$router.push({
            path: "/verificacion",
            query: { email: email } // Pasar el email como parámetro
          });
        } 
      } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Error en la conexión al servidor");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};

</script>

<style scoped>
/* Aquí va el CSS que me proporcionaste */

#paginatotal {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

}

#contenedorPrincipal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 20px 40px;
  width: 400px;
  font-family: 'Poppins', sans-serif;

}

h2 {
  font-size: 24px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: black;
  margin-bottom: 20px;
}

label {
  font-size: 14px;
  color: #525252;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 5px;
  align-self: flex-start;
}

#registros {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #000;
  font-size: 14px;

}

#botonent {
  padding: 10px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: rgb(255, 255, 255);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

#botonent:hover {
  background: #007BFF;

}

#imagen {
  height: 80px;
  width: auto;
  margin-bottom: 20px;
}

p {
  color: #000000;
  font-size: 14px;
  margin-top: 15px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #007BFF;
}

a:hover {
  color: #0056b3;
}
</style>
