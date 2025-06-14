import { useState, useEffect, useCallback } from 'react';
import { chatService } from '../services/chatService';

export function useChat(userId) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    if (!userId) {
      setMessages([{ role: 'assistant', content: '¡Hola! Soy PR-Bot, el asistente de IA y entrenador personal integrado en la aplicación PRzone.' }]);
      setIsHistoryLoading(false);
      return;
    }
    setIsHistoryLoading(true);
    setError(null);
    try {
      const history = await chatService.getChatHistory(userId);
      if (history && history.length > 0) {
        setMessages(history.map(msg => ({ role: msg.role, content: msg.content })));
      } else {
        setMessages([{ role: 'assistant', content: '¡Hola! Soy PR-Bot, el asistente de IA y entrenador personal integrado en la aplicación PRzone.' }]);
      }
    } catch (err) {
      setError(err);
      setMessages([{ role: 'assistant', content: 'Error al cargar el historial. ¿En qué puedo ayudarte?' }]);
    } finally {
      setIsHistoryLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const sendMessageToChat = useCallback(async (userMessageContent) => {
    const newUserMessage = { role: 'user', content: userMessageContent };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);
    const messagesToSend = [...messages, newUserMessage];

    try {
      const response = await chatService.sendMessage({ messages: messagesToSend, userId });
      setMessages(prevMessages => [...prevMessages, { role: response.role, content: response.reply }]);
    } catch (err) {
      setError(err);
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Lo siento, algo salió mal. Inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [userId, messages]);

  const startNewConversation = useCallback(async () => {
    if (!userId) {
      setMessages([{ role: 'assistant', content: '¡Hola! Soy PR-Bot, el asistente de IA y entrenador personal integrado en la aplicación PRzone.' }]);
      return;
    }
    try {
      await chatService.deleteChatHistory(userId);
      setMessages([{ role: 'assistant', content: '¡Hola! Soy PR-Bot, el asistente de IA y entrenador personal integrado en la aplicación PRzone.' }]);
    } catch (err) {
      setError(err);
    }
  }, [userId]);

  return { messages, isLoading, isHistoryLoading, error, sendMessage: sendMessageToChat, startNewConversation, refreshHistory: loadHistory };
}