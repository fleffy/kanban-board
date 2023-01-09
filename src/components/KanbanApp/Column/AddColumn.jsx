import { useDispatch } from 'react-redux'
import { addColumn } from '../../../store/kanbanSlice'
import { v4 as uuidv4 } from 'uuid'

export const AddColumn = () => {
	const dispatch = useDispatch()

	const createNewColumn = (title) => {
		dispatch(addColumn(title))
	}
	return (
		<div className='mb-[60px]'>
			<button
				onClick={() => createNewColumn('new column')}
				className='text-white p-2 px-5 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-700'
			>
				+ column
			</button>
		</div>
	)
}
