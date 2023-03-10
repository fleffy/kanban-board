import { useDispatch } from 'react-redux'
import { addColumn } from '../../../store/kanbanSlice'

export const AddColumn = () => {
	const dispatch = useDispatch()

	const createNewColumn = (title) => {
		dispatch(addColumn(title))
	}
	return (
		<button
			title='Add new column'
			onClick={() => createNewColumn('new column')}
			className='text-white p-2 px-5 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-700'
		>
			Add column
		</button>
	)
}
