import { useNavigate } from "react-router-dom";
import { LogOutIcon } from "../Icons";
import { useAuth } from "../../hooks/useAuth";

export function LogOutButton({ handle }) {
  const { logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await logout();
      
      if (handle) {
        handle();
      }
      
      navigate("/");

    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Hubo un problema al cerrar la sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <button
      onClick={handleLogoutClick}
      disabled={isLoading}
      className="flex items-center justify-center border-rose-200 border rounded-xl mb-[5rem] px-4 py-2 gap-2 bg-gradient-to-t from-rose-50 to-rose-50 bg-[length:100%_0%] bg-bottom bg-no-repeat transition-all duration-150 hover:bg-[length:100%_100%] hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
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