import { DarkModeToggler } from './DarkMode/DarkModeToggler'

export const Header = () => {
	return (
		<div className='sticky top-0 z-30 backdrop-blur-lg bg-white bg-opacity-50 dark:bg-transparent'>
			<div className='p-6 px-[1.5rem] xl:px-[7.5rem] shadow-lg'>
				<div className='flex justify-between items-center'>
					<div className='flex flex-row'>
						<div className='font-bold text-2xl hover:scale-105 cursor-default transition-all text-indigo-500 dark:text-white'>
							<span className='bg-indigo-500 rounded-lg px-3 py-1 dark:bg-indigo-700 text-white transition mr-[5px]'>
								K
							</span>
							anban
						</div>
					</div>
					<DarkModeToggler />
				</div>
			</div>
		</div>
	)
}
