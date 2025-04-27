<template>
  <div id="paginatotal">
    <div id="contenedorPrincipal">
      <img id="imagen" src="/Img/siscomlogin.png" alt="iconologin" title="iconologin" />
      <h2>Inicio de Sesión</h2>
      <form id="formLogin" @submit.prevent="handleLogin">
        <div id="registros">
          <h3>Correo</h3>
          <input type="text" id="email" name="email" placeholder="Ejemplo@email.com" required />
          <h3>Contraseña</h3>
          <!--Espacio para contraseña y usuario que se consultarán-->
          <input type="password" id="password" name="password" placeholder="Contraseña" required />
          <button id="botonent" type="submit">Iniciar Sesión</button>
          <p>¿No tienes cuenta? <RouterLink to="/CrearUsuario">Cree Una</RouterLink>
          </p>
        </div>
      </form>
      <!-- Botón "Inicio" en la esquina inferior izquierda -->
      <!-- Botón "Inicio" como una imagen -->
      <RouterLink id="inicioBoton" to="/">
        <img src="/Img/home.png" alt="Inicio" title="Regresar al inicio" />
      </RouterLink>
    </div>

  </div>
</template>

<script>
export default {
  name: "Login",

  methods: {
    // Método para verificar si el usuario está registrado
    async verificarRegistro(email) {
      try {
        const response = await fetch(`http://localhost:8080/auth/registrado?email=${encodeURIComponent(email)}`, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          return data.registrado; // Retorna el estado de registro
        } else {
          console.error("Error al verificar el estado de registro.");
          return false;
        }
      } catch (error) {
        console.error("Error en la conexión al verificar el estado de registro:", error);
        return false;
      }
    },

    // Método principal de inicio de sesión
    async handleLogin() {
      try {
        // Capturar valores de correo y contraseña
        let campos = {};
        campos.email = document.getElementById("email").value;
        campos.password = document.getElementById("password").value;

        // Verificar si el usuario está registrado antes de intentar el login
        const registrado = await this.verificarRegistro(campos.email);

        if (!registrado) {
          // Usuario no registrado, redirigir a pantalla de verificación
          alert("Tu cuenta está pendiente de verificación. Por favor, ingresa tu código de verificación.");
          this.$router.push("/verificacion");
          return;
        }

        // Realizar la solicitud de inicio de sesión al servidor
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campos),
        });

        if (response.ok) {
          const data = await response.json();

          // Guardar el token en localStorage para uso posterior
          localStorage.setItem("authToken", data.token);

          // Redirigir al usuario a la página de inicio
          this.$router.push("/Inicio");
        } else {
          const errorMessage = await response.text();
          console.error("Error en el inicio de sesión:", errorMessage);
          alert("Usuario o contraseña incorrectos");
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Error en la conexión al servidor");

      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
}

/* Estilo para toda la página */
#paginatotal {
  background-color: rgb(255, 255, 255);
  height: 100vh;
  /* Ocupa toda la pantalla */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}

/* Contenedor principal */
#contenedorPrincipal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 90%;
  width: 90%;
}

/* Título */
h2 {
  font-size: 25px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  color: black;
}

/* Subtítulos (h3) */
h3 {
  font-size: 15px;
  margin-bottom: 5px;
  /* Espaciado inferior */
  color: #525252;
  font-family: 'Poppins', sans-serif;
  text-align: left;
  /* Alineado a la izquierda */
  width: 350px;
  /* Igual al ancho de los inputs */
}

p {
  color: #000000;
}

/* Formulario */
#registros {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}

input {
  margin-top: 1px;
  margin-bottom: 20px;
  width: 350px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgb(0, 0, 0);
}

/* Botón principal */
#botonent {
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  width: 350px;
  /* Igual al ancho de los inputs */
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: rgb(255, 255, 255);
  cursor: pointer;
}

#botonent:hover {
  background: #007BFF;
  transition-duration: 1s;
  width: 400px;
}

/* Imagen */
#imagen {
  height: 90px;
  width: 320px;
  margin-bottom: 20px;
}


a {
  text-decoration: none;
  color: #000000;
}

a:hover {
  color: #777777;
}

/* Botón de inicio como imagen */
#inicioBoton {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#inicioBoton img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

#inicioBoton:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.8);
}

#inicioBoton img:hover {
  opacity: 0.8;
}

/* Imagen */
#imagen {
  height: 90px;
  width: 320px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #007BFF;
}

a:hover {
  color: #0056b3;
}
</style>