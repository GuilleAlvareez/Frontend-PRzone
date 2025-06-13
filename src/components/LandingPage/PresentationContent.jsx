export function PresentationContent() {
    return (
        <div className="h-[calc(100vh-14rem)] relative top-16 flex flex-col items-center justify-center w-full bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-slate-800 gap-10 mb-30">
            <h1 className="text-7xl font-bold text-gray-900 dark:text-white">Track Your Gym Progress</h1>
            <p className="w-4xl text-center text-xl text-gray-500 dark:text-gray-400 line-clamp-2">A comprehensive platform for individuals to manage weightlifting training, track progress, and achieve new personal records.</p>
            <div className='flex gap-4'>
                <a className='cursor-pointer py-2 px-4 bg-black text-white rounded transition-all duration-100 ease-linear hover:bg-[#1c1c1c] active:scale-95 dark:bg-white dark:text-black dark:hover:bg-gray-200'>Get Started</a>
                <a className='cursor-pointer py-2 px-4 bg-white rounded border border-gray-300 transition-all duration-100 ease-linear hover:bg-gray-100 active:scale-95 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700'>Learn More</a>
            </div>
        </div>
    )
}