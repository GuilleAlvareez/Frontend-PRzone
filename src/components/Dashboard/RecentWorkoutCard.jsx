export function RecentWorkoutCard({ nombre, fecha, valoracion, numero_ejercicios}) {
  function formatDate(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-lg ${
            i <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-4 border-b border-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors duration-200">
      <h3 className="font-semibold">
        {nombre} - {formatDate(fecha)}
      </h3>
      <p className="text-gray-600">
        Rate: {renderRating(valoracion)} • {numero_ejercicios} exercises
      </p>
    </div>
  );
}
