import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeTask, editTaskTitle } from '../../../store/kanbanSlice'

import { Draggable } from '@hello-pangea/dnd'

import { BiTime, BiX } from 'react-icons/bi'
import { MdCheck } from 'react-icons/md'

export const Tasks = ({ column, task, index }) => {
	const dispatch = useDispatch()

	const [taskEditing, setTaskEditing] = useState(false)
	const [editedTaskText, setEditedTaskText] = useState(task.content)

	const deleteTask = (columnId, taskId) => {
		dispatch(removeTask({ columnId, taskId }))
	}

	const confirmEditTask = (taskId, newContent) => {
		if (newContent.length > 0) {
			dispatch(editTaskTitle({ taskId, newContent }))
		}
	}

	return (
		<Draggable draggableId={task.id} index={index}>
			{(provided) => (
				<div
					{...provided.dragHandleProps}
					{...provided.draggableProps}
					ref={provided.innerRef}
					className='pb-3 cursor-grab'
				>
					<div className='bg-indigo-500 dark:bg-[#2a2c2d] rounded-lg p-4 flex flex-col gap-3'>
						<div className='flex justify-between border-b-[1px] border-b-white border-opacity-40 pb-2'>
							<div>
								{taskEditing ? (
									<div className='flex items-center'>
										<input
											maxLength='100'
											value={editedTaskText}
											onChange={(e) => setEditedTaskText(e.target.value)}
											className='rounded-lg  text-black dark:bg-[#202123] dark:text-white py-2 px-2 w-[150px] font-semibold mr-3'
											autoFocus
											onKeyDown={(e) => {
												if (e.key === 'Enter') {
													confirmEditTask(task.id, editedTaskText)
													setTaskEditing(false)
												}
											}}
										></input>
										<button
											title='Confirm editing'
											onClick={() => {
												confirmEditTask(task.id, editedTaskText)
												setTaskEditing(false)
											}}
											className='rounded-lg bg-indigo-300 dark:bg-indigo-700 font-semibold p-2 dark:opacity-40 dark:hover:opacity-100 transition-all'
										>
											<MdCheck className='w-[22px] h-[22px]' />
										</button>
									</div>
								) : (
									<button
										title='Edit task'
										onClick={() => setTaskEditing(true)}
										className='font-bold text-lg overflow-hidden max-w-[230px]  text-start'
									>
										{task.content}
									</button>
								)}
							</div>
							<button
								title='Delete task'
								onClick={() => deleteTask(column.id, task.id)}
								className='px-2 rounded-lg'
							>
								<BiX className='w-[22px] h-[22px]' />
							</button>
						</div>
						<div className='text-sm'>
							<div className='flex items-center gap-1'>
								<BiTime />
								{task.time}
							</div>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	)
}
