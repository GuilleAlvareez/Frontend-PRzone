import { LogOutIcon } from "./Icons";
import { useNavigate } from "react-router-dom";

export function LogOutButton({ handle }) {
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        handle();
        navigate("/");
      } else {
        console.error("Error logging out:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleButton}
      className="flex items-center justify-center border-rose-200 border rounded-xl px-4 py-2 gap-2 bg-gradient-to-t from-rose-50 to-rose-50 bg-[length:100%_0%] bg-bottom bg-no-repeat transition-all duration-300 hover:bg-[length:100%_100%] hover:shadow-md"
    >
      <LogOutIcon />
      <span className="text-rose-600">Log Out</span>
    </button>
  );
}
