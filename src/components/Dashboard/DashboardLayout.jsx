export function DashboardLayout() {
    return (
        <div className="flex-1 p-5 overflow-auto bg-gray-50 dark:bg-gray-900">
            {/* Stats Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">General Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-blue-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Total Weight Lifted</h3>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">12,540 kg</p>
                        <div className="w-full h-1 bg-blue-100 dark:bg-blue-900 mt-3">
                            <div className="h-1 bg-blue-500 w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-purple-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Workouts Completed</h3>
                        <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">24</p>
                        <div className="w-full h-1 bg-purple-100 dark:bg-purple-900 mt-3">
                            <div className="h-1 bg-purple-500 w-2/3 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-green-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Exercises Done</h3>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">156</p>
                        <div className="w-full h-1 bg-green-100 dark:bg-green-900 mt-3">
                            <div className="h-1 bg-green-500 w-4/5 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border-t-4 border-amber-500 rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Personal Records</h3>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">18</p>
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
                    <div className="p-4 border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                        <h3 className="font-semibold">Upper Body - 12 May 2023</h3>
                        <p className="text-gray-600">Duration: 65 min • 6 exercises • 1250 kg total</p>
                    </div>
                    <div className="p-4 border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                        <h3 className="font-semibold">Leg Day - 10 May 2023</h3>
                        <p className="text-gray-600">Duration: 75 min • 5 exercises • 1800 kg total</p>
                    </div>
                    <div className="p-4 border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200">
                        <h3 className="font-semibold">Push Workout - 8 May 2023</h3>
                        <p className="text-gray-600">Duration: 55 min • 4 exercises • 950 kg total</p>
                    </div>
                    <div className="p-4 hover:bg-blue-50 transition-colors duration-200">
                        <h3 className="font-semibold">Pull Workout - 6 May 2023</h3>
                        <p className="text-gray-600">Duration: 60 min • 5 exercises • 1100 kg total</p>
                    </div>
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
