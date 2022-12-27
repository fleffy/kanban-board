import { useDispatch } from 'react-redux'
import { BiTime } from 'react-icons/bi'
import { removeTask, editTaskTitle } from '../../../store/kanbanSlice'

export const Tasks = ({ kanban, task }) => {
	const dispatch = useDispatch()

	const deleteTask = (kanbanID, taskID) => {
		dispatch(removeTask({ kanbanID, taskID }))
	}

	return (
		<div
			key={`keyID-${task.taskID}`}
			className='bg-indigo-400 dark:bg-[#2a2c2d] rounded-lg p-4 flex flex-col gap-3 mb-4'
		>
			<div className='flex justify-between border-b-[1px] border-b-white border-opacity-40 pb-2'>
				<div>
					<button
						onClick={() => setTaskEditing(true)}
						className='font-bold text-lg overflow-hidden max-w-[230px]'
					>
						{task.taskText}
					</button>
				</div>
				<button
					onClick={() => deleteTask(kanban.id, task.taskID)}
					className='px-2 rounded-lg outline-none'
				>
					X
				</button>
			</div>
			<div className='text-sm'>
				<div className='flex items-center gap-1'>
					<BiTime />
					{task.taskTime}
				</div>
			</div>
		</div>
	)
}
