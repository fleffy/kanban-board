import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BiTime } from 'react-icons/bi'
import { removeTask, editTaskTitle } from '../../../store/kanbanSlice'
import { Draggable } from 'react-beautiful-dnd'

export const Tasks = ({ kanban, task, index }) => {
	const dispatch = useDispatch()

	const [taskEditing, setTaskEditing] = useState(false)
	const [editedTaskText, setEditedTaskText] = useState(task.taskText)

	const deleteTask = (kanbanID, taskID) => {
		dispatch(removeTask({ kanbanID, taskID }))
	}

	const confirmEditTask = (kanbanID, taskID, editedTaskText) => {
		if (editedTaskText.length > 0) {
			dispatch(editTaskTitle({ kanbanID, taskID, editedTaskText }))
		}
	}

	return (
		<Draggable draggableId={task.taskID} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					key={task.taskID}
					className='bg-indigo-400 dark:bg-[#2a2c2d] rounded-lg p-4 flex flex-col gap-3 mb-4'
				>
					<div className='flex justify-between border-b-[1px] border-b-white border-opacity-40 pb-2'>
						<div>
							{taskEditing ? (
								<div>
									<input
										value={editedTaskText}
										onChange={(e) => setEditedTaskText(e.target.value)}
										className='rounded-lg outline-none text-black dark:bg-[#202123] dark:text-white py-2 px-2 w-[150px] font-semibold mr-3'
										autoFocus
									></input>
									<button
										onClick={() => {
											confirmEditTask(kanban.id, task.taskID, editedTaskText)
											setTaskEditing(false)
										}}
										className='rounded-lg bg-indigo-300 dark:bg-indigo-700 font-semibold p-2 dark:opacity-40 dark:hover:opacity-100 transition-all'
									>
										Confirm
									</button>
								</div>
							) : (
								<button
									onClick={() => setTaskEditing(true)}
									className='font-bold text-lg overflow-hidden max-w-[230px] outline-none'
								>
									{task.taskText}
								</button>
							)}
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
			)}
		</Draggable>
	)
}
