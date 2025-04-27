<template>
    <div class="container">
        <!-- Barra Lateral -->
        <div class="sidebar">

            <!-- Menú -->
            <ul class="menu">
                <RouterLink to="/CatalogoClientes" class="menu-item ">
                    <img src="/Img/Clientes.png" alt="icoCliente" class="menu-icon" />
                    Clientes
                </RouterLink>
                <RouterLink to="/CatalogoProductos" class="menu-item">
                    <img src="/Img/Productos.png" alt="icoProductos" class="menu-icon" />
                    Productos
                </RouterLink>
                <RouterLink to="/CatalogoServicios" class="menu-item active">
                    <img src="/Img/Servicios.png" alt="icoServicios" class="menu-icon" />
                    Servicios
                </RouterLink>
            </ul>


        </div>

        <!-- Contenido Principal -->
        <main class="content">
            <header class="header">
                <img src="/Img/sispng.png" alt="Pag Logo" class="nav-brands" />
                <h1>Servicios</h1>
                <div class="buttons-container">
                    <RouterLink to="/Inicio" class="home-button">
                        <img src="/Img/home.png" alt="Home">
                    </RouterLink>
                </div>
            </header>

            <section class="services">
                <div class="service-card">
                    <img src="/Img/mantenimiento.png" alt="Mantenimiento" class="service-image" />
                    <div class="service-title">MANTENIMIENTO</div>
                </div>
                <div class="service-card">
                    <img src="/Img/instalacion.png" alt="Instalacion" class="service-image" />
                    <div class="service-title">INSTALACIÓN</div>
                </div>
                <div class="service-card">
                    <img src="/Img/monitoreo.png" alt="Monitoreo" class="service-image" />
                    <div class="service-title">MONITOREO</div>
                </div>
                <div class="service-card new-service">
                    <div class="service-title">Nuevo Servicio</div>
                    <button class="add-service-btn">+</button>
                </div>
            </section>

        </main>
    </div>
</template>

<script>

</script>

<style scoped>
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

.services {
    display: flex;
    justify-content: space-between;
    /* Distribuye las tarjetas equitativamente */
    flex-wrap: wrap;
    /* Permite que las tarjetas se muevan a una nueva línea si es necesario */
    gap: 10px;
    /* Espacio entre las tarjetas */
}

/* Estilo de las tarjetas de servicio */
.service-card {
    text-align: center;
    width: 200px;
    padding: 20px;
    /* Eliminar el color de fondo */
    background: none;
    border-radius: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
    /* Animación */
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    margin: 5px;
    cursor: pointer;
    /* Puntero al pasar el mouse */
}

/* Efecto hover */
.service-card:hover {
    transform: scale(1.05);
    /* Aumento de tamaño */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    /* Sombra intensificada */
}

/* Imagen dentro de la tarjeta */
.service-image {
    width: 150px;
    /* Aumentar tamaño de la imagen */
    height: 150px;
    /* Aumentar tamaño de la imagen */
    margin-bottom: 15px;
    border-radius: 10px;
    /* Bordes redondeados */
    border: 2px solid gray;
}

/* Título de la tarjeta */
.service-title {
    font-size: 16px;
    font-weight: bold;
    color: black;
    margin-top: 10px;
    font-family: 'Poppins', sans-serif;

}

/* Estilo para la tarjeta de "Nuevo Servicio" */
.new-service {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
    color: #007bff;
    font-size: 18px;
    font-weight: bold;
    border: 2px solid gray;
    cursor: pointer;
    padding: 20px;
    margin-left: 370px;
    border-radius: 12px;
}

.add-service-btn {
    background-color: #007bff;
    color: white;
    font-size: 30px;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 15px;
}

.add-service-btn:hover {
    background-color: #0056b3;
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
    text-decoration: none;
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

.nav-brands {
    width: 500px;
    display: block;
    margin: auto;
    text-align: center;
}

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


/* Asegurarse que el contenido se vea bien en pantallas pequeñas */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

}
</style>