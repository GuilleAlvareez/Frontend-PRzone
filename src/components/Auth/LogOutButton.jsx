import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "../Icons";
// --- NUEVO IMPORT DEL HOOK ---
import { useAuth } from "../../hooks/useAuth";

// La prop 'handle' ya no es estrictamente necesaria si el hook maneja el estado global,
// pero la mantendremos por si el componente padre necesita hacer algo adicional.
export function LogOutButton({ handle }) {
  // --- USO DE HOOKS ---
  // 1. Obtenemos la función `logout` y el estado `isLoading` de nuestro hook.
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();

  // --- LÓGICA DE ENVÍO SIMPLIFICADA ---
  const handleLogoutClick = async () => {
    try {
      // 2. Llamamos a la función `logout` del hook.
      //    Toda la lógica de API y de actualización de estado del usuario está encapsulada aquí.
      await logout();
      
      // 3. Si el padre pasó una función `handle`, la llamamos.
      if (handle) {
        handle();
      }
      
      // 4. Navegamos a la página de inicio después de un logout exitoso.
      navigate("/");

    } catch (error) {
      // 5. Si el logout falla, el hook lanzará un error.
      //    Podemos mostrar una alerta o simplemente registrarlo.
      console.error("Error logging out:", error.message);
      alert("Hubo un problema al cerrar la sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <button
      onClick={handleLogoutClick}
      // 6. Deshabilitamos el botón mientras se procesa el logout.
      disabled={isLoading}
      className="flex items-center justify-center border-rose-200 border rounded-xl mb-[5rem] px-4 py-2 gap-2 bg-gradient-to-t from-rose-50 to-rose-50 bg-[length:100%_0%] bg-bottom bg-no-repeat transition-all duration-150 hover:bg-[length:100%_100%] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        // Opcional: Mostrar un texto de "Cerrando sesión..."
        <span>Cerrando...</span>
      ) : (
        <>
          <LogOutIcon />
          <span className="text-rose-600">Log Out</span>
        </>
      )}
    </button>
  );
}