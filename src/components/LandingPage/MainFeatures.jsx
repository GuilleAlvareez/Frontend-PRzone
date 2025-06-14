import { HeaderIcon, Graph, Calendar } from "../Icons.jsx";

export function MainFeatures() {
    return (
        <div className="bg-white dark:bg-slate-800 pt-6">
            <h1 className="text-3xl font-bold text-center mt-2 text-gray-900 dark:text-white">Key Features</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-15 px-30">
                <article className="group flex flex-col items-center justify-center gap-4 p-8 border border-gray-200 rounded-lg transition-all duration-200 ease-linear hover:border-gray-400 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500">
                    <HeaderIcon width={45} height={45} className="transition duration-200 group-hover:rotate-12 group-hover:scale-105 text-gray-800 dark:text-gray-200"/>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Training log</h1>
                    <p className="text-gray-500 dark:text-gray-400">Record your exercises, sets, reps, and weights quickly and easily. Keep a complete history of your sessions.</p>
                </article>
                <article className="group flex flex-col items-center justify-center gap-4 p-8 border border-gray-200 rounded-lg transition-all duration-200 ease-linear hover:border-gray-400 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500">
                    <Graph width={45} height={45} className="text-gray-800 dark:text-gray-200"/>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Progress Analysis</h1>
                    <p className="text-gray-500 dark:text-gray-400">Visualize your progress with detailed graphs. Analyze your progress on each exercise, training volume, and more.</p>
                </article>
                <article className="group flex flex-col items-center justify-center gap-4 p-8 border border-gray-200 rounded-lg transition-all duration-200 ease-linear hover:border-gray-400 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500">
                    <Calendar width={45} height={45} className="text-gray-800 dark:text-gray-200"/>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Planning</h1>
                    <p className="text-gray-500 dark:text-gray-400">Create and customize your workout routines. Organize your week and maintain consistency in your sessions.</p>
                </article>
            </section>
        </div>
    )
}