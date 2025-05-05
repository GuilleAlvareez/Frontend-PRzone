import { HeaderIcon, Graph, Calendar } from "../Icons.jsx";

export function MainFeatures() {
    return (
        <>
            <h1 className="text-3xl font-bold text-center mt-2">Key Features</h1>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-15 px-30">
                
                <article className="group flex flex-col items-center justify-center gap-4 p-8 border border-gray-300 rounded-lg transition-all duration-200 ease-linear hover:border-gray-600 hover:shadow-lg">
                    <HeaderIcon width={45} height={45} className="transition duration-200 group-hover:rotate-12 group-hover:scale-105"/>
                    <h1 className="text-2xl font-bold">Training log</h1>
                    <p className="text-gray-500">Record your exercises, sets, reps, and weights quickly and easily. Keep a complete history of your sessions.</p>
                </article>

                <article className="flex flex-col items-center justify-center gap-4 p-8 border border-gray-300 rounded-lg transition-all duration-200 ease-linear hover:border-gray-600 hover:shadow-lg">
                    <Graph width={45} height={45}/>
                    <h1 className="text-2xl font-bold">Progress Analysis</h1>
                    <p className="text-gray-500">Visualize your progress with detailed graphs. Analyze your progress on each exercise, training volume, and more.
                    </p>
                </article>

                <article className="flex flex-col items-center justify-center gap-4 p-8 border border-gray-300 rounded-lg transition-all duration-200 ease-linear hover:border-gray-600 hover:shadow-lg">
                    <Calendar width={45} height={45}/>
                    <h1 className="text-2xl font-bold">Planning</h1>
                    <p className="text-gray-500">Create and customize your workout routines. Organize your week and maintain consistency in your sessions.</p>
                </article>
            </section>
        </>
    )
}