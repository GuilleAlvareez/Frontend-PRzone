import { HeaderIcon } from './Icons';

export default function NavbarLanding() {
    return (
        <nav className='fixed z-50 backdrop-blur-lg w-screen h-16 flex justify-between items-center px-20 border-b border-gray-300'>
            <div className='flex items-center gap-3'>
                <HeaderIcon width={24} height={24}/>
                <h1 className='text-2xl font-bold'>PRzone</h1>
            </div>

            <ul className='flex gap-6'>
                <li className='text-gray-600 hover:text-black'>Features</li>
                <li className='text-gray-600 hover:text-black'>Programs</li>
                <li className='text-gray-600 hover:text-black'>About</li>
            </ul>
            
            <div className='flex gap-4'>
                <a className='cursor-pointer py-2 px-4 rounded border bg-white border-gray-300 hover:bg-gray-100'>Login</a>
                <a className='cursor-pointer py-2 px-4 bg-black text-white rounded hover:bg-[#1c1c1c]'>Sign Up</a>
            </div>
        </nav>
    )
}