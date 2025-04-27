<template>
  <div class="container">
    <!-- Barra Lateral -->
    <aside class="sidebar">

      <ul class="menu">
        <RouterLink to="/CatalogoClientes" class="menu-item active">
          <img src="/Img/Clientes.png" alt="icoCliente" class="menu-icon" />
          Clientes
        </RouterLink>
        <RouterLink to="/CatalogoProductos" class="menu-item">
          <img src="/Img/Productos.png" alt="icoProductos" class="menu-icon" />
          Productos
        </RouterLink>
        <RouterLink to="/CatalogoServicios" class="menu-item">
          <img src="/Img/Servicios.png" alt="icoServicios" class="menu-icon" />
          Servicios
        </RouterLink>
      </ul>
    </aside>

    <!-- Contenido Principal -->
    <main class="content">
      <header class="header">
        <img src="/Img/sispng.png" alt="Logo Siscom" class="nav-brands" />
        <h1>Clientes</h1>

        <div class="buttons-container">
          <RouterLink to="/Inicio" class="home-button">
            <img src="/Img/home.png" alt="Home" />
          </RouterLink>

          <!-- Botón para abrir el modal -->
          <button type="button" class="add-product-button" @click="mostrarModal">
            <span>Agregar Cliente</span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/697dc3c0c8744d943a782ba94f0b244fa86f6a2d6f911dacd7bd1989e48c7486?placeholderIfAbsent=true&apiKey=1f87a0a071d64092ac793b0969808bca"
              alt="Icono Agregar Cliente"
              class="button-icon"
            />
          </button>
        </div>
      </header>

      <!-- Tabla de clientes -->
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Email</th>
            <th>RFC</th>
            <th>Razón Social</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td><input type="checkbox" v-model="cliente.selected" /></td>
            <td>{{ cliente.nombre }} {{ cliente.apellidoPaterno }}</td>
            <td>{{ cliente.correo }}</td>
            <td>{{ cliente.rfc }}</td>
            <td>{{ cliente.razonSocial }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="modalVisible" class="modal-overlay">
        <div class="modal-content">
          <CrearCliente @cerrar-modal="cerrarModal" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import CrearCliente from './CrearCliente.vue';
import ModificarCliente from './ModificarCliente.vue';

export default {
  components: {
    CrearCliente,
    ModificarCliente,
  },
  data() {
    return {
      modalVisible: false,
      clientes: [], // Lista para almacenar los clientes obtenidos
    };
  },
  mounted() {
    this.obtenerClientes(); // Llamada al método para obtener los clientes al montar el componente
  },
  methods: {
    // Método para obtener los clientes desde la base de datos
    async obtenerClientes() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No se encontró un token de autenticación.");
          return;
        }

        // Realizamos la solicitud GET al backend para obtener los clientes
        const response = await fetch("http://localhost:8080/api/v1/cliente", {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Clientes obtenidos:', data); // Para verificar los datos recibidos

          // Mapear los datos para incluir la URL de la imagen
          this.clientes = data.map((cliente) => ({
            ...cliente,
            selected: false, // Checkbox desmarcado por defecto
            imagenUrl: cliente.img_url || `/Img/${cliente.nombre
              .toLowerCase()
              .replace(/ /g, "")}.png`, // Generar la URL de la imagen si no se proporciona
          }));
        } else {
          console.error("Error al obtener los clientes", response.status);
          alert("No se pudieron obtener los clientes.");
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
        alert("Hubo un error al conectar con el servidor.");
      }
    },

    mostrarModal() {
      this.modalVisible = true;
    },

    cerrarModal() {
      this.modalVisible = false;
    },
  },
};
</script>


<style scoped>
/* Estilos del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 1000px;
  max-width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Otros estilos */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

body {
  font-family: 'Poppins', sans-serif;
}

/* Estilos de la barra lateral */
.sidebar {
  background: linear-gradient(180deg, #f7f7f7, #eaeaea);
  width: 250px;
  /* Reducir el ancho de la barra lateral */
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 10px gray;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  /* Fijar la barra lateral */
}

.profile-section {
  text-align: center;
  margin-bottom: 10px;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.profile-info h3 {
  font-size: 15px;
  margin: 0;
}

.profile-info p {
  font-size: 14px;
  color: gray;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  width: 100%;
}

.menu-item {
  display: flex;
  align-items: center;
  background: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 85%;
}

.menu-item.active {
  background: linear-gradient(90deg, #007bff, #003d99);
  color: white;
  font-weight: bold;
}

.menu-item:hover {
  background: #0056b3;
  color: white;
  transform: scale(1.05);
}

.menu-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.modal>div {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

/* Boton de agregar producto */
.add-product-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  /* Agrega un margen superior si deseas espacio adicional */
}

.button-icon {
  width: 16px;
  height: 16px;
}

/* Modo nocturno */
.dark-mode-toggle {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 20px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.slider {
  background: #007bff;
}

input:checked+.slider:before {
  transform: translateX(14px);
}

/* Contenedor */
.container {
  display: flex;
  margin-left: 0;
  /* Eliminar el margen para mover hacia la izquierda */
}

.content {
  margin-left: 300px;
  /* Ajuste para que el contenido se muestre correctamente */
  padding: 20px;
  width: 100%;
}

.header h1 {
  text-align: center;
  font-size: 24px;
  font-family: 'Poppins', sans-serif;
  color: black;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border: 2px solid #ddd;
}


.table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.table th {
  text-align: center;
  background: none;
  color: black;
  font-family: 'Poppins', sans-serif;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #e6f7ff;
}

.table td {
  text-align: center;
  font-family: 'Poppins', sans-serif;
}

.nav-brands {
  width: 500px;
  display: block;
  margin: auto;
  text-align: center;
}

/* Estilo del botón */
.buttons-container {
  position: absolute;
  top: 10px;
  /* Ajusta la distancia desde la parte superior */
  right: 10px;
  /* Ajusta la distancia desde la parte derecha */
  display: flex;
  /* Usamos flexbox para alinear los botones */
  gap: 10px;
  /* Espacio entre los botones */
}

/* Estilo del botón */
.btn {
  background-color: #b8b8b8;
  /* Color de fondo del botón */
  color: white;
  /* Color del texto */
  font-size: 2rem;
  /* Tamaño del texto */
  padding: 15px 25px;
  /* Espaciado interno para hacerlo más grande */
  border-radius: 50%;
  /* Hacerlo redondo */
  text-align: center;
  /* Centrar el texto dentro del botón */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  /* Ancho del botón */
  height: 50px;
  /* Alto del botón */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Sombra para darle un efecto flotante */
  transition: transform 0.3s ease, background-color 0.3s ease;
  /* Animación suave */
  text-decoration: none;
  /* Quitar subrayado del enlace */
}

/* Efecto al pasar el cursor */
.btn:hover {
  transform: scale(1.1);
  /* Aumentar tamaño al pasar el mouse */
  background-color: #0056b3;
  /* Cambiar el color de fondo */
}

/* Opcional: Efecto al hacer clic */
.btn:active {
  transform: scale(1);
  /* Vuelve al tamaño original al hacer clic */
}

/* Estilo del botón Home */
.home-button {
  position: fixed; /* Hace que el botón sea fijo en la ventana */
  top: 20px; /* Ajusta la distancia desde la parte superior */
  left: 350px; /* Ajusta la distancia desde la izquierda */
  z-index: 1001; /* Asegura que esté encima del resto del contenido */
  width: 40px; /* Ajusta el tamaño del botón */
  height: 40px; /* Ajusta el tamaño del botón */
  display: flex; /* Centrar la imagen */
  justify-content: center;
  align-items: center;
  background-color: #007bff; /* Color de fondo */
  border-radius: 50%; /* Hace que el botón sea redondo */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra para efecto flotante */
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.home-button img {
  width: 20px; /* Ajusta el tamaño de la imagen */
  height: 20px;
}

.home-button:hover {
  transform: scale(1.1); /* Efecto de escala al pasar el mouse */
  background-color: #0056b3; /* Cambio de color al pasar el mouse */
}
a {
  text-decoration: none;
  color: #333;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .content {
    margin-left: 0;
  }
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>