export const CardMostUsed = ({ ejercicio, veces_realizado, color }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border-l-4 ${color} transition-transform duration-300 hover:scale-105`}>
            <h3 className="font-semibold">{ejercicio}</h3>
            <p className="text-gray-600">Used in {veces_realizado} workouts</p>
            <p className="text-sm text-gray-500 mt-2">Last PR: 160kg × 1 rep</p>
        </div>
    )
}
