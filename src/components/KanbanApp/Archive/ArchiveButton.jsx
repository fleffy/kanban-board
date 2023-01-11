export const ArchiveButton = () => {
	return (
		<button
			onClick={() => createNewColumn('new column')}
			className='text-white p-2 px-5 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-700 mb-[60px]'
		>
			Archive
		</button>
	)
}
