import { useState, useEffect, useCallback } from 'react';
import { exerciseServices } from '../services/exercisesServices';

export function useExercises(username, userId) {
  const [exercises, setExercises] = useState([]);
  const [mostUsedExercises, setMostUsedExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExerciseDetails, setSelectedExerciseDetails] = useState(null);

  const fetchExercises = useCallback(async () => {
    if (!username) {
      setExercises([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await exerciseServices.getExercises(username);
      setExercises(data.results || []);
    } catch (err) {
      setError(err);
      setExercises([]);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  const fetchMostUsed = useCallback(async () => {
    if (!userId) {
      setMostUsedExercises([]);
      return;
    }
    // No manejamos isLoading aquí para no interferir con la carga principal,
    // ya que se llaman juntas. Si se necesitaran cargas independientes,
    // se requerirían estados de carga separados.
    try {
      const data = await exerciseServices.getMostUsedExercises(userId);
      setMostUsedExercises(data || []);
    } catch (err) {
      // Podríamos tener un estado de error separado si quisiéramos
      console.error("Error fetching most used exercises:", err);
      setMostUsedExercises([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchExercises();
    fetchMostUsed();
  }, [fetchExercises, fetchMostUsed]);

  const addExercise = useCallback(async (exerciseData) => {
    const dataToSend = { ...exerciseData, username };
    try {
      await exerciseServices.createExercise(dataToSend);
      await fetchExercises();
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [username, fetchExercises]);

  const updateExistingExercise = useCallback(async (exerciseId, exerciseData) => {
    try {
      await exerciseServices.updateExercise(exerciseId, exerciseData);
      await fetchExercises();
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [fetchExercises]);

  const removeExercise = useCallback(async (exerciseId) => {
    try {
      await exerciseServices.deleteExercise(exerciseId);
      setExercises(prev => prev.filter(ex => ex.id !== exerciseId));
    } catch (err) {
      setError(err);
      await fetchExercises();
      throw err;
    }
  }, [fetchExercises]);

  const fetchExerciseDetails = useCallback(async (exerciseId) => {
      setIsLoading(true);
      setError(null);
      try {
        const details = await exerciseServices.getExerciseDetails(exerciseId);
        setSelectedExerciseDetails(details);
      } catch (err) {
        setError(err);
        setSelectedExerciseDetails(null);
      } finally {
        setIsLoading(false);
      }
    }, []);

  return { exercises, isLoading, error, selectedExerciseDetails, addExercise, updateExistingExercise, removeExercise, fetchExerciseDetails, refreshExercises: fetchExercises, mostUsedExercises, refreshMostUsed: fetchMostUsed };
}