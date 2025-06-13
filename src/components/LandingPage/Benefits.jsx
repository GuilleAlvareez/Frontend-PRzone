import { Bars, Phone, Shield } from "../Icons.jsx";

export function Benefits() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 pt-12">
            <h1 className="text-3xl font-bold text-center mt-2 text-gray-900 dark:text-white">Benefits</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-15 px-30">
                <article className="flex flex-col items-start justify-center gap-4 p-6 border bg-white border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <Bars width={30} height={30} className="text-gray-800 dark:text-gray-200"/>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Maximize Your Results</h1>
                    </div>
                    <ul className="text-start space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-400">
                        <li className="transition-all duration-200 hover:translate-x-2">Detailed monitoring of each exercise</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Identification of strengths and weaknesses</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Workload optimization</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Preventing deadlocks</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Clear visualization of your progress</li>
                    </ul>
                </article>
                <article className="flex flex-col items-start justify-center gap-4 p-6 border bg-white border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <Phone width={30} height={30} className="text-gray-800 dark:text-gray-200"/>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Easy to Use</h1>
                    </div>
                    <ul className="text-start space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-400">
                        <li className="transition-all duration-200 hover:translate-x-2">Intuitive and friendly interface</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Quick training log</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Access from any device</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Works without internet connection</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Automatic data synchronization</li>
                    </ul>
                </article>
                <article className="flex flex-col items-start justify-center gap-4 p-6 border bg-white border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <Shield width={30} height={30} className="text-gray-800 dark:text-gray-200"/>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Constant Motivation</h1>
                    </div>
                    <ul className="text-start space-y-2 list-disc pl-5 text-gray-600 dark:text-gray-400">
                        <li className="transition-all duration-200 hover:translate-x-2">Celebrating new personal records</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Motivating statistics</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Tracking short and long-term goals</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Workout Reminders</li>
                        <li className="transition-all duration-200 hover:translate-x-2">Performance comparisons</li>
                    </ul>
                </article>
            </section>
        </div>
    )
}