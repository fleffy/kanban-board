import { useDispatch } from 'react-redux'
import { addColumn } from '../../../store/kanbanSlice'

export const AddColumn = () => {
	const dispatch = useDispatch()

	const createNewColumn = () => {
		dispatch(
			addColumn({
				id: crypto.randomUUID(),
				title: 'Column',
				tasks: [
					{
						taskText: 'taskText',
						taskTime: new Date().toLocaleString(),
						taskID: crypto.randomUUID(),
					},
				],
			})
		)
	}
	return (
		<div>
			<button
				onClick={() => createNewColumn()}
				className='text-white p-2 px-5 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-700 outline-none'
			>
				+ column
			</button>
		</div>
	)
}
