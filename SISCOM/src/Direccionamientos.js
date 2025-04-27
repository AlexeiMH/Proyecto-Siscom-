import { createRouter, createWebHistory } from "vue-router";
import pruebas from "./components/pruebas.vue";
import InicioGeneral from "@/components/InicioGeneral.vue";
import Login from "@/components/Login.vue";
import CatalogoClientes from "@/components/CatalogoClientes.vue";
import CrearUsuario from "@/components/CrearUsuario.vue";
import Inicio from "@/components/Inicio.vue";
import CatalogoProductos from "@/components/CatalogoProductos.vue";
import CrearCliente from "@/components/CrearCliente.vue";
import Cotizacion2 from "@/components/Cotizacion2.vue";
import CatalogoServicios from "@/components/CatalogoServicios.vue";
import verificacion from "./components/verificacion.vue";
import CrearProducto from "@/components/CrearProducto.vue";
import ProductosClientes from "@/components/ProductosClientes.vue";
import ProductosC from "@/components/ProductosC.vue";
import ModificarCliente from "@/components/ModificarCliente.vue";



const routes = [
  {
    path: "/", // Ruta raíz
    name: "InicioGeneral",
    component: InicioGeneral,
  },
  {
    path: "/login", // Ruta para Login
    name: "Login",
    component: Login,
  },
  {
    path: "/CatalogoClientes",
    name: "CatalogoClientes",
    component: CatalogoClientes,
    meta: { requiresAuth: true }, //
  },

  {

    path: "/CrearUsuario",
    name: "CrearUsuario",
    component: CrearUsuario,
  },

  {
    path: "/Inicio",
    name: "Inicio",
    component: Inicio,
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/CatalogoProductos",
    name: "CatalogoProductos",
    component: CatalogoProductos,
    meta: { requiresAuth: true }, //
  },

  {
    path: "/CrearCliente",
    name: "CrearCliente",
    component: CrearCliente,
    meta: { requiresAuth: true }, // Ruta protegida
  },
  {
    path: "/Cotizacion2",
    name: "Cotizacion2",
    component: Cotizacion2,
    meta: { requiresAuth: true }, // Ruta protegida

  },

  {
    path: "/CatalogoServicios",
    name: "CatalogoServicios",
    component: CatalogoServicios,
    meta: { requiresAuth: true }, //
  },

  {
    path: "/verificacion",
    name: "verificacion",
    component: verificacion,
  },

  {
    path: "/crearProducto",
    name: "crearProducto",
    component: CrearProducto,
    meta: { requiresAuth: true }, //
  },

  {
    path: "/productosClientes",
    name: "productosClientes",
    component: ProductosClientes,
    meta: { requiresAuth: true },
  },

  {
    path: "/pruebas",
    name: "pruebas",
    component: pruebas,
  },

  {
    path: "/productosC",
    name: "productosC",
    component: ProductosC,
  },

  {
    path:"/ModificarCliente",
    name:"ModificarCliente",
    component: ModificarCliente,
    meta: { requiresAuth: true }, // Ruta protegida
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware global para proteger rutas
router.beforeEach(async (to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("authToken");

    if (token === "") {
      // Si no hay token, redirigir al login
      alert("Por favor inicia sesión para acceder a esta página.");
      return next("/login");
    }
    //alert("token existente.");
    // Verificar la validez del token con una solicitud al backend
    try {
      const response = await fetch("http://localhost:8080/api/v1/TokenV", {
        method: "GET",
        headers: {
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include"
      });

      if (response.ok) {
        // Token válido, permitir acceso
        return next();
      } else {
        // Token inválido, redirigir al login
        alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        localStorage.removeItem("authToken"); // Eliminar token inválido
        return next("/login");
      }
    } catch (error) {
      console.error("Error al verificar el token:", error);
      alert("Error al verificar la sesión. Por favor inicia sesión nuevamente.");
      return next("/login");
    }
  } else {
    // Si no requiere autenticación, permitir acceso
    next();
  }
});

export default router;
