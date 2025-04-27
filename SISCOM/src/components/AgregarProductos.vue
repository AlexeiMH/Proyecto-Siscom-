<template>
  <div class="contenedorP">
    <div class="products-table1">
      <table>
        <thead>
          <tr>
            <th>Inventario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>
              <input
                class="checkbox"
                type="checkbox"
                v-model="producto.seleccionado"
              />
              {{ producto.nombre }}
              <img
                class="imgproductos"
                :src="producto.imagenUrl"
                alt="Imagen del producto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="botond" @click="agregarProductos">Agregar</button>
    <button class="botond" @click="cerrarModal">Cerrar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [], // Almacena los productos obtenidos del backend
    };
  },

  mounted() {
    this.getProductos();
  },

  methods: {
    async getProductos() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("No se encontró un token de autenticación.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/v1/producto", {
          method: "GET",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const productosData = await response.json();
          if (Array.isArray(productosData)) {
            this.productos = productosData.map((producto) => ({
              ...producto,
              seleccionado: false, // Checkbox desmarcado por defecto
              imagenUrl: producto.img_url || `/Img/${producto.nombre
                .toLowerCase()
                .replace(/ /g, "")}.png`, // Generar la URL de la imagen si no se proporciona
            }));
          } else {
            console.error("La API no devolvió una lista válida de productos.");
            alert("Error en el formato de los datos del servidor.");
          }
        } else {
          console.error("Error al obtener los productos:", response.statusText);
          alert("Error al obtener los productos desde el servidor.");
        }
      } catch (error) {
        console.error("Error de conexión al obtener los productos:", error);
        alert("Error al conectar con el servidor.");
      }
    },

    agregarProductos() {
      const productosSeleccionados = this.productos.filter(
        (producto) => producto.seleccionado
      );

      if (productosSeleccionados.length === 0) {
        alert("No se han seleccionado productos.");
        return;
      }

      // Emitir los productos seleccionados al componente principal
      this.$emit(
        "productos-agregados",
        productosSeleccionados.map((producto) => ({
          id: producto.id,
          nombre: producto.nombre,
          precioUnitario: producto.precio, // Corregir propiedad para precio
          imagenUrl: producto.imagenUrl, // Imagen procesada correctamente
          cantidad: 1, // Establecer una cantidad inicial
          subtotal: producto.precio, // Establecer el subtotal inicial
        }))
      );
    },

    cerrarModal() {
      this.$emit("cerrar-modal"); // Emitir evento para cerrar el modal
    },
  },
};
</script>
<style>

.products-table1 td{

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding: 10px;
    border-radius: 20px;
    font-size: 18px;
    height: 100px;
    width: 500px;
}
.products-table1 { 
    overflow-y: auto;
    padding: 10px 5px;
    margin-bottom: 25px;
    /* Asegurar que ocupe el ancho máximo del contenedor */
    max-height: 500px;
    /* Ajustar la altura automáticamente */
    max-width: 600px;
    /* Aumentar el tamaño máximo de la tabla */
    font-size: 28px;
    text-transform: uppercase;

}

.products-table1 {
    padding: 20px;
    width: 600px;
    border-collapse: collapse;
background-color: rgb(255, 255, 255);
}


.products-table1 td {
    padding: 10px;
    background-color: #dddddd;
    align-items: center;
    justify-content: space-between;
    border-radius: 20px;
    margin-left: 10px;
}

.products-table1 th {
    padding: 10px 60px;
    margin-left: 5%;
    margin: 20%;
    text-align: center;
    background: none;
    color: rgb(0, 0, 0);
    font-family: 'Poppins', sans-serif;
}

.products-table1 td {
    text-align: center;
    font-family: 'Poppins', sans-serif;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.651);
}

.imgproductos {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    float: left;
}

.checkbox {
    margin: 10%;
    float: right;
    width: 30px;
    height: 30px;
    background-color: rgb(116, 118, 119);
}

a{
    text-decoration: none;
    color: #ffffff;
}

.botond{
    border: none;
    display:block;
    background-color: #007bff;
    width: 200px;
    border-radius: 20px;
    color: white;
    padding: 10px 0px;
    margin-top: 10px;
    margin-left: 2px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
.contenedorP {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid rgb(0, 0, 0);
}

</style>
