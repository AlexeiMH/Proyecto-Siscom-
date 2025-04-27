<template>
  <div class="form-container">
    <h1>Foto de Perfil</h1>
    <div class="image-container">
      <!-- Actualizamos la fuente de la imagen dinámicamente -->
      <img :src="form.imagePreview || '/Img/fotoperfil.png'" alt="Producto" class="product-image" />
      <div class="upload-container">
        <label for="image-upload" class="add-image-btn">+</label>
        <input type="file" id="image-upload" style="display: none;" accept="image/*" @change="handleImageUpload">
        <div class="buttons-container">
          <RouterLink to="/CatalogoClientes" class="home-button">
            <img src="/Img/flecha.png" alt="Home" />
          </RouterLink>
        </div>
      </div>
    </div>
    <form @submit.prevent="agregarUsuario">
      <!-- Información Personal -->
      <div class="section">
        <h3>Información Personal</h3>
        <div class="grid-container">
          <input v-model="form.nombre" type="text" placeholder="Nombre" />
          <input v-model="form.apellidoPaterno" type="text" placeholder="Apellido Paterno" />
          <input v-model="form.apellidoMaterno" type="text" placeholder="Apellido Materno" />

        </div>
      </div>

      <div class="section">
        <div class="grid-containerR full-width">
          <input v-model="form.rfc" type="text" placeholder="RFC" />
          
        </div>
      </div>

      <!-- Contacto -->
      <div class="section">
        <h3>Contacto</h3>
        <div class="grid-container">
          <input v-model="form.email" type="email" placeholder="E-Mail" />
          <input v-model="form.telefono" type="text" placeholder="Teléfono" />
          <input v-model="form.razonSocial" type="text" placeholder="Razón Social" />
        </div>
      </div>

      <!-- Dirección -->
      <div class="section">
        <h3>Dirección</h3>
        <div class="grid-container">
          <input v-model="form.direccion" type="text" placeholder="Dirección" />
          <input v-model="form.codigoPostal" type="text" placeholder="Código Postal" />
          <input v-model="form.colonia" type="text" placeholder="Colonia" />
        </div>
      </div>

      <div class="section">

        <div class="grid-container full-width">
          <input v-model="form.estado" type="text" placeholder="Estado" />
          <input v-model="form.ciudad" type="text" placeholder="Ciudad" />
        </div>
      </div>

      <!-- Botón Agregar -->
      <button type="submit" class="submit-btn">Agregar </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrarUsuario",  // Cambia el nombre según tu contexto

  data() {
    return {
      form: {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        rfc: '',
        razonSocial: '',
        email: '',
        telefono: '',
        empresa: '',
        direccion: '',
        codigoPostal: '',
        colonia: '',
        estado: '',
        ciudad: '',
        imagePreview: '',  // Para la vista previa de la imagen
        imagen: null,      // Para almacenar la imagen seleccionada
      },
    };
  },

  methods: {
    async agregarUsuario() {
      try {
        // Obtener los datos del formulario
        const {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          rfc,
          razonSocial,
          email,
          telefono,
          empresa,
          direccion,
          codigoPostal,
          colonia,
          estado,
          ciudad,
          imagen,
        } = this.form;

        // Validar los campos requeridos
        if (!nombre || !apellidoPaterno || !apellidoMaterno || !rfc || !razonSocial || !email || !telefono || !empresa || !direccion || !codigoPostal || !colonia || !estado || !ciudad) {
          alert("Por favor, llena todos los campos.");
          return;
        }

        // Crear objeto con los datos del formulario
        const campos = {
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          rfc,
          razonSocial,
          email,
          telefono,
          empresa,
          direccion,
          codigoPostal,
          colonia,
          estado,
          ciudad,
        };

        // Verificar si el correo ya está registrado
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

        // Si la imagen fue seleccionada, agregarla al formulario (puedes hacer una subida de imagen aquí)
        if (imagen) {
          const formData = new FormData();
          formData.append('image', imagen);
          const imageResponse = await fetch('http://localhost:8080/upload-image', {
            method: 'POST',
            body: formData,
          });

          if (!imageResponse.ok) {
            alert("Error al subir la imagen.");
            return;
          }

          const imageData = await imageResponse.json();
          campos.imagenUrl = imageData.url;  // Suponiendo que el servidor retorna la URL de la imagen
        }

        // Enviar los datos al servidor
        const response = await fetch("http://localhost:8080/registrar-usuario", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campos),
        });

        if (response.ok) {
          const data = await response.json();
          alert("Usuario registrado con éxito.");
          this.$router.push("/usuarios");  // Redirigir a la lista de usuarios
        } else {
          const errorMessage = await response.text();
          alert("Error al registrar el usuario: " + errorMessage);
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Error en la conexión al servidor.");
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.imagen = file;
        this.form.imagePreview = URL.createObjectURL(file);  // Previsualización de la imagen
      }
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
  border-radius: 50px;
  margin-right: 30px;
  border-radius: 50%;
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
  /* Espacio explícito entre las columnas */
  row-gap: 20px;
  margin-bottom: 25px;
}

.grid-containerR {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;

  
}

.full-width {
  grid-column: span 2;
  margin-left: 230px;
}

/* Estilo de los campos de texto */
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

textarea {
  resize: none;
  height: 200px;
}

/* Botón */
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.buttons-container {
  position: absolute;
  top: 20px;
  /* Ajusta la distancia desde la parte superior */
  right: 50px;
  /* Ajusta la distancia desde la parte derecha */
  display: flex;
  /* Usamos flexbox para alinear los botones */
  gap: 10px;
  /* Espacio entre los botones */
}

.home-button {
  width: 40px;
  /* Ajusta el tamaño del botón Home */
  height: 40px;
  /* Ajusta el tamaño del botón Home */
}


.home-button img {
  width: 100%;
  /* Hace que la imagen ocupe todo el tamaño del contenedor */
  height: 100%;
  /* Hace que la imagen ocupe todo el tamaño del contenedor */
}
</style>