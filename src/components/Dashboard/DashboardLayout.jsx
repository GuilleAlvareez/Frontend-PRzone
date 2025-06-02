import { useEffect, useState } from "react";
import { RecentWorkoutCard } from "./RecentWorkoutCard";

export function DashboardLayout() {
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [user, setUser] = useState(null);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch("http://localhost:3000/recentworkouts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error fetching workouts");
                }

                const data = await response.json();
                setWorkouts(data.results || []);
            } catch (error) {
                console.error("Error loading workouts:", error);
            }
        };

        const fetchExercises = async () => {
            try {
                const response = await fetch("http://localhost:3000/exercises", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error fetching exercises");
                }

                const data = await response.json();
                setExercises(data.results || []);
            } catch (error) {
                console.error("Error loading exercises:", error);
            }
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error fetching user");
                }

                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        const fetchStreak = async () => {
            try {
                const response = await fetch(`http://localhost:3000/dias-consecutivos/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error fetching streak");
                }

                const data = await response.json();
                setStreak(data.diasConsecutivos);
            } catch (error) {
                console.error("Error fetching streak:", error);
            }
        }

        fetchUser();
        fetchWorkouts();
        fetchExercises();
        fetchStreak();
    }, []);

    useEffect(() => {
        const calculateTotal = async () => {
            const total = await totalWeightLifted();
            setTotalWeight(total);
        };

        if (workouts.length > 0) {
            calculateTotal();
        }
    }, [workouts]);

    const fetchExercisesWorkout = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/workouts/${id}`, {
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
            return data.ejercicios
        } catch (error) {
            console.error("Error loading exercises:", error);
        }
    }

    const totalWeightLifted = async () => {
        const allExercisesArrays = await Promise.all(
            workouts.map((workout) => fetchExercisesWorkout(workout.id))
        );

        const total = allExercisesArrays.flat().reduce((acc, exercise) => {
            return acc + (exercise.peso * exercise.repeticiones * exercise.series);
        }, 0);

        return total;
    };


    const totalExercisesDone = workouts.reduce((acc, workout) => {
        return acc + workout.numero_ejercicios;
    }, 0)

    console.log(exercises)
    return (
        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900">
            {/* Stats Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">General Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-blue-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Weight Lifted</h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{totalWeight} kg</p>
                        <div className="w-full h-1 bg-blue-100 dark:bg-blue-900 mt-3">
                            <div className="h-1 bg-blue-500 w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-purple-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Workouts Completed</h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{workouts.length}</p>
                        <div className="w-full h-1 bg-purple-100 dark:bg-purple-900 mt-3">
                            <div className="h-1 bg-purple-500 w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-green-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Exercises Done</h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{totalExercisesDone}</p>
                        <div className="w-full h-1 bg-green-100 dark:bg-green-900 mt-3">
                            <div className="h-1 bg-green-500 w-4/5 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-amber-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Personal Records</h3>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">{streak}</p>
                        <div className="w-full h-1 bg-amber-100 dark:bg-amber-900 mt-3">
                            <div className="h-1 bg-amber-500 w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workouts Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Recent Workouts</h2>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    {workouts.map(({id, nombre, fecha, valoracion, numero_ejercicios }) => (
                        <RecentWorkoutCard key={id} id={id} nombre={nombre} fecha={fecha} valoracion={valoracion} numero_ejercicios={numero_ejercicios} />
                    ))}
                </div>
            </section>

            {/* Popular Exercises Section */}
            <section>
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Most Used Exercises</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-blue-500 transition-transform duration-300 hover:scale-105">
                        <h3 className="font-semibold">Bench Press</h3>
                        <p className="text-gray-600">Used in 18 workouts</p>
                        <p className="text-sm text-gray-500 mt-2">Last PR: 100kg × 5 reps</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-purple-500 transition-transform duration-300 hover:scale-105">
                        <h3 className="font-semibold">Squat</h3>
                        <p className="text-gray-600">Used in 15 workouts</p>
                        <p className="text-sm text-gray-500 mt-2">Last PR: 140kg × 3 reps</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 border-green-500 transition-transform duration-300 hover:scale-105">
                        <h3 className="font-semibold">Deadlift</h3>
                        <p className="text-gray-600">Used in 12 workouts</p>
                        <p className="text-sm text-gray-500 mt-2">Last PR: 160kg × 1 rep</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
