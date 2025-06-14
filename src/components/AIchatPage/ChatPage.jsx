import { useContext, useRef, useEffect } from "react";
import { SidebarContext } from "../../context/SideBarContext";
import { NavBar } from "../Dashboard/NavBar";
import { Header } from "../Dashboard/Header";
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import './ChatScrollbar.css';
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";

export function ChatPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const {
    messages,
    isLoading: isChatLoading, // Estado de carga para cuando el bot está "escribiendo"
    isHistoryLoading, // Estado de carga para la carga inicial del historial
    error: chatError,
    sendMessage,
    startNewConversation,
  } = useChat(user?.id); // El hook se activa cuando user.id está disponible.

  const { sideBarOpen } = useContext(SidebarContext);

  const chatInputRef = useRef(null);

  const prevIsLoadingRef = useRef(isChatLoading);

  useEffect(() => {
    // Cuando pasa de true a false (es decir, cuando la IA deja de escribir)
    if (prevIsLoadingRef.current && !isChatLoading) {
      chatInputRef.current?.focusInput();
    }
    prevIsLoadingRef.current = isChatLoading;
  }, [isChatLoading]);

  const handleSendMessage = async (userMessage) => {
    try {
      await sendMessage(userMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleNewConversation = async () => {
    if (window.confirm("¿Estás seguro de que quieres borrar el historial y empezar una nueva conversación?")) {
      try {
        await startNewConversation();
      } catch (error) {
        console.error("Error starting new conversation:", error);
        alert("Hubo un problema al intentar borrar el historial.");
      }
    }
  };
  
  if (isAuthLoading || isHistoryLoading) {
    return (
      <div className="w-screen h-screen flex bg-white dark:bg-gray-900">
        <NavBar />
        <div className={`flex flex-col flex-1 h-full transition-all duration-300 ${sideBarOpen ? "ml-64" : "ml-0"}`}>
          <Header />
          <div className="flex-1 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        </div>
      </div>
    );
  }

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

            {/* El botón solo se muestra si hay un usuario logueado */}
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
            {chatError && (
              <div className="p-4 text-center text-red-500 bg-red-100 dark:bg-red-900/50">
                Error: {chatError.message}
              </div>
            )}
            
            <MessageList 
              messages={messages} 
              isLoading={isChatLoading}
            />
            <ChatInput 
              ref={chatInputRef}
              onSendMessage={handleSendMessage} 
              isLoading={isChatLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}