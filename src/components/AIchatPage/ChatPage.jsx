// src/components/ChatPage/ChatPage.jsx
import { useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import './ChatScrollbar.css';

export function ChatPage() {
  const { sideBarOpen } = useContext(SidebarContext);
  
  // CAMBIO 1: El estado de los mensajes empieza VACÍO.
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  // CAMBIO 2: El estado de carga ahora es más simple. O está cargando o no.
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          setUser(null);
          setIsHistoryLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setIsHistoryLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // CAMBIO 3: Lógica de carga de historial REFACTORIZADA y DEPENDIENTE de 'user'.
  useEffect(() => {
    const fetchHistory = async () => {
      // Si no hay usuario, ponemos el mensaje de bienvenida y terminamos.
      if (!user) {
        setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de PRzone. ¿En qué puedo ayudarte hoy?' }]);
        setIsHistoryLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/chat/history/${user.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });

        if (!response.ok) throw new Error('No se pudo cargar el historial.');

        const history = await response.json();

        if (history.length > 0) {
          setMessages(history);
        } else {
          // Si el historial está vacío, ponemos el mensaje de bienvenida.
          setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de PRzone. ¿En qué puedo ayudarte hoy?' }]);
        }
      } catch (error) {
        console.error("Error al cargar el historial:", error);
        // Si hay un error, también ponemos el mensaje de bienvenida.
        setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de PRzone. ¿En qué puedo ayudarte hoy?' }]);
      } finally {
        setIsHistoryLoading(false);
      }
    };

    // Solo ejecutamos fetchHistory si 'user' no es null.
    // Si 'user' es null, el primer useEffect ya se encargó de la carga.
    if (user !== null) {
        fetchHistory();
    }
  }, [user]);

  const handleSendMessage = async (userMessage) => {
    const newUserMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, userId: user?.id }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();
      
      setMessages(prev => [...prev, { role: data.role, content: data.reply }]);
    } catch (error) {
      console.error("Error al contactar al bot:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, algo salió mal. Por favor, inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

   const handleNewConversation = async () => {
    if (!window.confirm("¿Estás seguro de que quieres borrar el historial y empezar una nueva conversación?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/chat/history/${user.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('No se pudo borrar el historial.');
      }

      setMessages([{ role: 'assistant', content: '¡Hola! Soy tu asistente de PRzone. ¿Cómo puedo ayudarte ahora?' }]);

    } catch (error) {
      console.error("Error al iniciar nueva conversación:", error);
      alert("Hubo un problema al intentar borrar el historial. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />
      <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
        <Header />
        
        <main className="flex-1 flex flex-col p-4 md:p-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asistente de IA</h1>
              <p className="text-gray-500 dark:text-gray-400">Tu historial de conversación se guarda automáticamente.</p>
            </div>

            {user && (
              <button
                onClick={handleNewConversation}
                className="px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Nueva Conversación
              </button>
            )}
          </div>
          
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 min-h-0">
            {isHistoryLoading ? (
              <div className="flex-1 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : (
              <>
                <MessageList 
                  messages={messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                  }))} 
                  isLoading={isLoading} 
                />
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}