import { useState } from "react";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutDetails } from "./WorkoutDetails";

export function WorkoutsList({ workouts, onDelete, user }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  console.log("WorkoutsList: ", selectedWorkout);

  const handleViewDetails = async (workoutId) => {
    try {
      const response = await fetch(`http://localhost:3000/workouts/details/${workoutId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching workout details");
      }

      const data = await response.json();
      setSelectedWorkout(data);
    } catch (error) {
      console.error("Error loading workout details:", error);
    }
  };

  const closeDetails = () => {
    setSelectedWorkout(null);
  };

  if (workouts.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No workouts found. Start by adding your first workout!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Lista de entrenamientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onDelete={onDelete}
            onViewDetails={() => handleViewDetails(workout.id)}
            isAdmin={user?.admin === 1}
          />
        ))}
      </div>
      
      {/* Modal de detalles*/}
      {selectedWorkout && (
        <>
          <div 
            className="fixed inset-0 bg-black/65"
            // onClick={onClose}
          />
          <WorkoutDetails 
            workout={selectedWorkout} 
            onClose={closeDetails} 
          />
        </>
      )}
    </>
  );
}



