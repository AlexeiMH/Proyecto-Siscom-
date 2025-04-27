<template>
  <div class="form-container">
    <h1>Registrar Cliente</h1>
    

    <form @submit.prevent="agregarCliente">
      <!-- Información Personal -->
      <div class="section">
        <h3>Información Personal</h3>
        <div class="grid-container">
          <input id="rfc" v-model="form.rfc" type="text" placeholder="RFC" />
          <input id="razonSocial" v-model="form.razonSocial" type="text" placeholder="Razón Social" />
          <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre Completo" />
        </div>
      </div>

      <!-- Contacto -->
      <div class="section">
        <h3>Contacto</h3>
        <div class="grid-container">
          <input id="correo" v-model="form.correo" type="email" placeholder="Correo Electrónico" />
          <input id="telefono" v-model="form.telefono" type="text" placeholder="Teléfono" />
        </div>
      </div>

      <!-- Dirección -->
      <div class="section">
        <h3>Dirección</h3>
        <div class="grid-container">
          <input id="domicilio" v-model="form.domicilio" type="text" placeholder="Domicilio" />
          <input id="codigoPostal" v-model="form.codigoPostal" type="text" placeholder="Código Postal" />
          <input id="colonia" v-model="form.colonia" type="text" placeholder="Colonia" />
          <input id="ciudad" v-model="form.ciudad" type="text" placeholder="Ciudad" />
          <input id="municipio" v-model="form.municipio" type="text" placeholder="Municipio (Opcional)" />
          <input id="estado" v-model="form.estado" type="text" placeholder="Estado" />
          <input id="pais" v-model="form.pais" type="text" placeholder="País (Opcional)" />
        </div>
      </div>

      <!-- Botones -->
      <button type="submit" class="submit-btn">Agregar Cliente</button>
      <button type="button" class="cancel-btn" @click="cerrarModal">Cerrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrarCliente",
  data() {
    return {
      form: {
        rfc: "",
        razonSocial: "",
        nombre: "",
        correo: "",
        telefono: "",
        domicilio: "",
        codigoPostal: "",
        colonia: "",
        ciudad: "",
        municipio: "",
        estado: "",
        pais: "",
        imagePreview: "", // Vista previa de la imagen
        foto: null, // Imagen seleccionada
      },
    };
  },
  methods: {
    async agregarCliente() {
      try {
        // Capturar los valores directamente desde los campos del DOM
        let campos = {};
        campos.id = "";
        campos.rfc = document.getElementById("rfc").value;
        campos.razonSocial = document.getElementById("razonSocial").value;
        campos.nombre = document.getElementById("nombre").value;
        campos.correo = document.getElementById("correo").value;
        campos.telefono = document.getElementById("telefono").value;
        campos.domicilio = document.getElementById("domicilio").value;
        campos.codigoPostal = document.getElementById("codigoPostal").value;
        campos.colonia = document.getElementById("colonia").value;
        campos.ciudad = document.getElementById("ciudad").value;
        campos.municipio = document.getElementById("municipio").value || "";
        campos.estado = document.getElementById("estado").value;
        campos.pais = document.getElementById("pais").value || "";
        campos.fechaRegistro = new Date().toISOString().split("T")[0];

        // Capturar el archivo de imagen y generar la vista previa
        const fileInputElement = document.getElementById("image-upload");

        if (fileInputElement) {
          const fileInput = fileInputElement.files[0]; // Obtener el archivo seleccionado

          if (fileInput) {
            //campos.foto = fileInput; // Archivo de la imagen
            campos.img_url = URL.createObjectURL(fileInput); // Generar URL para la vista previa
          } else {
            //campos.foto = null; // No hay archivo seleccionado
            campos.img_url = ""; // Imagen predeterminada
          }

          // **MOSTRAR DATOS CAPTURADOS EN UN ALERT**
          console.log("Datos capturados:\n" + JSON.stringify(campos, null, 2));

          // Actualizar la vista previa manualmente
          const imageElement = document.querySelector(".product-image");
          if (imageElement) {
            imageElement.src = campos.imagePreview;
          }
        } else {
          console.error("No se encontró el elemento con ID 'image-upload'.");
        }

        // Validar los campos requeridos
        if (
            !campos.rfc ||
            !campos.razonSocial ||
            !campos.nombre ||
            !campos.correo ||
            !campos.telefono ||
            !campos.domicilio ||
            !campos.codigoPostal ||
            !campos.colonia ||
            !campos.ciudad ||
            !campos.estado
        ) {
          alert("Por favor, llena todos los campos obligatorios.");
          return;
        }

        /*
        // Crear FormData para enviar los datos y la imagen
        const formData = new FormData();
        Object.keys(campos).forEach((key) => formData.append(key, campos[key]));

        // Capturar la imagen si existe
        const fileInput = document.getElementById("image-upload");
        if (fileInput && fileInput.files[0]) {
          formData.append("img_url", fileInput.files[0]);
        }
         */

        // Verificar si el token de autenticación existe
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No se encontró un token de autenticación.");
          return;
        }
        console.log(token)
        // Realizar la solicitud POST al backend
        const response = await fetch("http://localhost:8080/api/v1/cliente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Formato JSON
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(campos), // Convertir campos a JSON
          credentials: "include",
        });

        if (response.ok) {
          alert("Cliente registrado con éxito.");
          this.$emit("cliente-registrado"); // Notifica al componente padre
          this.cerrarModal(); // Cierra el modal
        } else {
          const errorMessage = await response.text();
          alert("Error al registrar el cliente: " + errorMessage);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor.");
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.foto = file; // Almacenar el archivo de la imagen
        this.form.imagePreview = URL.createObjectURL(file); // Mostrar la imagen seleccionada
      }
    },

    cerrarModal() {
      this.$emit("cerrar-modal"); // Notifica al componente padre que cierre el modal
    },
  },
};
</script>

<style scoped>
/* Fuente global */
* {
  font-family: 'Poppins', sans-serif;
}

/* Contenedor principal */
.form-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 50px;
  background: linear-gradient(to bottom, white, white, rgb(196, 194, 194), #3479e1);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Título */
h1 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

/* Contenedor para imagen */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
}

.product-image {
  width: 80px;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 30px;
  object-fit: cover;
}

.add-image-btn {
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
}

/* Contenedor para los campos del formulario */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  row-gap: 20px;
  margin-bottom: 25px;
}

.full-width {
  grid-column: span 2;
  margin-left: 230px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.submit-btn {
  display: block;
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  margin: 15px auto;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.buttons-container {
  position: absolute;
  top: 20px;
  right: 50px;
  display: flex;
  gap: 10px;
}

.home-button {
  width: 40px;
  height: 40px;
}

.home-button img {
  width: 100%;
  height: 100%;
}

/* Contenedor para imagen y botón */
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px; /* Espacio entre la imagen y el botón */
  margin-bottom: 30px;
}

/* Imagen del producto */
.product-image {
  width: 80px;
  height: 80px;
  border: 2px solid #ccc;
  border-radius: 50%;
  object-fit: cover; /* Mantiene la proporción de la imagen */
}

/* Botón para agregar imagen */
.add-image-btn {
  width: 50px; /* Aumentamos el tamaño del botón */
  height: 50px; /* Aumentamos el tamaño del botón */
  font-size: 32px; /* Ajustamos el tamaño del icono */
  text-align: center;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 50%; /* Hace el botón completamente redondo */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-image-btn:hover {
  background-color: #e0e0e0; /* Cambio de color al pasar el mouse */
}


.cancel-btn {
  display: block;
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  margin: 15px auto;
}

.cancel-btn:hover {
  background-color: #0056b3;
}

</style>
