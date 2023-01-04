import { HiSun, HiMoon } from 'react-icons/hi'
import { useDarkMode } from './useDarkMode'

export const DarkModeToggler = () => {
	const [isDarkMode, setIsDarkMode] = useDarkMode()
	return (
		<div>
			<button
				onClick={setIsDarkMode}
				className='relative w-[70px] h-[35px] bg-indigo-500 rounded-full flex items-center dark:bg-indigo-700 '
			>
				<div className='w-[25px] h-[25px] bg-white rounded-full ml-2 absolute flex items-center justify-center text-indigo-400 dark:text-yellow-400 dark:ml-9 transition-all'>
					{isDarkMode ? <HiMoon /> : <HiSun />}
				</div>
			</button>
		</div>
	)
}
