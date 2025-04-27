<template>
  <div class="verification-container">
    <div class="verification-box">
      <h2 class="verification-title">Ingresa el código enviado a tu</h2>
      <p class="email-text">{{ email }}</p>

      <!-- Campos de entrada separados para el código -->
      <div class="verification-input-group">
        <input v-for="(digit, index) in code" :key="index" type="text" maxlength="1" class="input-box"
          v-model="code[index]" @input="handleInput(index)" @keydown.backspace="handleBackspace(index, $event)"
          @paste="handlePaste($event)" ref="inputs" />
      </div>

      <button class="verify-button" @click="verifyCode">Verificar Código</button>

      <footer class="footer">
        <div class="footer-icons">
          <div class="soporte-icons">
            <!-- Enlace a Gmail -->
            <a href="https://gmail.com" target="_blank" aria-label="Ir a Gmail">
              <i class="fab fa-google"></i>
            </a>
            <!-- Enlace a Outlook -->
            <a href="https://outlook.live.com" target="_blank" aria-label="Ir a Outlook">
              <i class="fas fa-envelope"></i>
            </a>
            <div class="buttons-container">
              <RouterLink to="/CrearUsuario" class="home-button">
                <img src="/Img/flecha.png" alt="Home" />
              </RouterLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeVerification',
  data() {
    return {
      email: this.$route.query.email || "", // Obtener el email desde la URL o usar un valor por defecto
      code: ["", "", "", ""], // Espacios para 4 dígitos
    };
  },
  methods: {
    handleInput(index) {
      if (this.code[index].length === 1 && index < this.code.length - 1) {
        this.$refs.inputs[index + 1].focus();
      }
    },
    handleBackspace(index, event) {
      if (this.code[index] === "" && index > 0) {
        this.$refs.inputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedData = clipboardData.getData("Text").slice(0, this.code.length);
      if (/^\d+$/.test(pastedData)) {
        this.code = pastedData.split("").concat(Array(this.code.length).fill("")).slice(0, this.code.length);
        this.$nextTick(() => {
          const firstEmptyIndex = this.code.findIndex((val) => val === "");
          if (firstEmptyIndex > -1) {
            this.$refs.inputs[firstEmptyIndex].focus();
          }
        });
      }
      event.preventDefault();
    },
    async verifyCode() {
      const codeString = this.code.join(""); // Unir el código en una sola cadena
      if (!codeString) {
        alert("Por favor introduce un código.");
        return;
      }

      try {
        const verifyResponse = await fetch(
          `http://localhost:8080/auth/code?regcode=${encodeURIComponent(codeString)}`,
          {
            method: "GET",
          }
        );

        if (verifyResponse.ok) {
          const data = await verifyResponse.json();
          console.log("Código válido, respuesta del servidor:", data);

          // Realizar la solicitud para actualizar el estado de "registrado" a true
          const activateResponse = await fetch("http://localhost:8080/auth/activate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ regcode: codeString }),
          });

          if (activateResponse.ok) {
            alert("¡Código verificado y cuenta activada!");
            // Redirigir a la página de inicio de sesión
            this.$router.push("/Login");
          } else {
            const errorMessage = await activateResponse.text();
            alert(`Error al activar la cuenta: ${errorMessage}`);
          }
        } else if (verifyResponse.status === 204) {
          alert("El código no existe o es inválido.");
        } else {
          const errorMessage = await verifyResponse.text();
          alert(`Error al verificar el código: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente.");
      }
    },
  },
};
</script>



<style scoped>
.verification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Poppins', sans-serif;
}

.verification-box {
  background-color: #ffffff;
  padding: 50px;
  border-radius: 8px;
  box-shadow: 0 4px 10px #0b5bd3;
  width: 100%;
  max-width: 400px;
  position: relative;
  /* Necesario para que los elementos absolutos se posicionen dentro de esta caja */
}

.verification-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.email-text {
  font-size: 18px;
  color: #007bff;
  text-align: center;
  margin-bottom: 20px;
}

.verification-input-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input-box {
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.verify-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.verify-button:hover {
  background-color: #0056b3;
}

/* Footer Section */
.footer {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.soporte-icons {
  display: flex;
  gap: 15px;
}

.soporte-icons a {
  color: #007bff;
  font-size: 20px;
  text-decoration: none;
  transition: transform 0.3s, color 0.3s;
}

.soporte-icons a:hover {
  color: #0056b3;
  transform: scale(1.2);
}

.buttons-container {
  position: absolute;
  top: 10px;
  /* Ajusta según la separación que necesites */
  left: 450px;
  /* Ajusta según la separación que necesites */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  /* Tamaño del contenedor */
  height: 40px;
  /* Tamaño del contenedor */
}

.buttons-container img {
  width: 30px;
  /* Tamaño del ícono */
  height: 30px;
  object-fit: contain;
}
</style>
