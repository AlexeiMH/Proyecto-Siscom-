<template>
  <div class="form-container">
    <h1>Registrar Producto</h1>
    <div class="image-container">
      <!-- Imagen de vista previa -->
      <img :src="form.imagePreview || '/Img/camara.jpg'" alt="Producto" class="product-image" />

      <!-- Botón para seleccionar imagen -->
      <label for="image-upload" class="add-image-btn">+</label>
      <input type="file" id="image-upload" style="display: none;" accept="image/*" @change="handleImageUpload" />
    </div>

    <form @submit.prevent="agregarProducto">
      <!-- Información del Producto -->
      <div class="section">
        <h3>Información del Producto</h3>
        <div class="grid-container">
          <input id="nombre" v-model="form.nombre" type="text" placeholder="Nombre del Producto" required />
          <input id="marca" v-model="form.marca" type="text" placeholder="Marca" required />
          <input id="modelo" v-model="form.modelo" type="text" placeholder="Modelo" required />
          <textarea id="descripcion" v-model="form.descripcion" placeholder="Descripción" class="full-width" required></textarea>
          <input id="cantidad" v-model="form.cantidad" type="number" placeholder="Cantidad" required />
          <input id="precio" v-model="form.precio" type="number" placeholder="Precio" required />
        </div>
      </div>

      <!-- Botones -->
      <button type="submit" class="submit-btn">Agregar Producto</button>
      <button type="button" class="cancel-btn" @click="cerrarModal">Cerrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegistrarProducto",
  data() {
    return {
      form: {
        nombre: "",
        marca: "",
        modelo: "",
        descripcion: "",
        cantidad: "",
        precio: "",
        imagePreview: "", // Vista previa de la imagen
        foto: null, // Imagen seleccionada
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Asignar la imagen a la propiedad imagePreview para la vista previa
        this.form.imagePreview = URL.createObjectURL(file);
      }
    },

    async agregarProducto() {
      try {
        const campos = {
          nombre: this.form.nombre,
          marca: this.form.marca,
          modelo: this.form.modelo,
          descripcion: this.form.descripcion,
          cantidad: this.form.cantidad,
          precio: this.form.precio,
          // Enviar la URL de la imagen (solo la vista previa)
          img_url: this.form.imagePreview || "",
        };

        // Validación simple
        if (Object.values(campos).some((val) => !val)) {
          alert("Por favor, completa todos los campos.");
          return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No se encontró un token de autenticación.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/v1/producto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(campos),
        });

        if (response.ok) {
          alert("Producto registrado con éxito.");
          this.$emit("producto-registrado");
          this.cerrarModal();
        } else {
          const error = await response.text();
          alert(`Error: ${error}`);
        }
      } catch (error) {
        console.error(error);
        alert("Error al registrar el producto.");
      }
    },

    cerrarModal() {
      this.$emit("cerrar-modal");
    },
  },
};
</script>
<style scoped>
/* Reutilizando estilos existentes */
* {
  font-family: 'Poppins', sans-serif;
}

.form-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 50px;
  background: linear-gradient(to bottom, white, rgb(196, 194, 194), #3479e1);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.full-width {
  grid-column: span 3;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.submit-btn, .cancel-btn {
  display: block;
  width: 30%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  margin: 15px auto;
}

.submit-btn:hover, .cancel-btn:hover {
  background-color: #0056b3;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.product-image {
  width: 80px;
  height: 80px;
  border: 2px solid #ccc;
  border-radius: 50%;
  object-fit: cover;
}

.add-image-btn {
  width: 50px;
  height: 50px;
  font-size: 32px;
  background-color: #f5f5f5;
  border: 2px solid #ccc;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.add-image-btn:hover {
  background-color: #e0e0e0;
}
</style>
