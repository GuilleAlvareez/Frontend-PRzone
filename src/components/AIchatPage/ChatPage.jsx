import { useContext, useState } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import './ChatScrollbar.css'; // Import the custom scrollbar CSS

export function ChatPage() {
  const { sideBarOpen, toggleSideBar } = useContext(SidebarContext);
  const [messages, setMessages] = useState([
    { rol: 'assistant', content: '¡Hola! Soy tu asistente de PRzone. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (userMessage) => {
    // Creo una copia de los mensajes anteriores y añado el nuevo del usuario
    const newUserMessage = { role: 'user', content: userMessage };

    // CAMBIO 2: Actualizar el estado local inmediatamente con el nuevo mensaje del usuario
    // y preparar el historial completo para enviar al backend.
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/chat', { // <-- CAMBIA ESTA URL SI ES NECESARIO
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      const data = await response.json();
      
      // Creo una copia de los mensajes anteriores y añado el nuevo del asistente
      setMessages(prev => [...prev, { role: data.role, content: data.reply }]);
    } catch (error) {
      console.error("Error al contactar al bot:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, algo salió mal. Por favor, inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
      <NavBar />

      <div
        className={`flex flex-col flex-1 h-full transition-all duration-300 ${
          sideBarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header toggleSideBar={toggleSideBar} />
      
        <main className="flex-1 flex flex-col p-4 md:p-6 bg-gray-50 dark:bg-gray-900 overflow-hidden">
          {/* Encabezado de la página de Chat */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asistente de IA</h1>
            <p className="text-gray-500 dark:text-gray-400">Haz una pregunta para empezar la conversación.</p>
          </div>
          {/* Contenedor del Chat */}
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden">
            <MessageList messages={messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}
