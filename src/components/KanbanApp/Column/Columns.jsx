import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	removeColumn,
	addTask,
	editColumnTitle,
} from '../../../store/kanbanSlice'
import { Tasks } from './Tasks'

import { BiEdit } from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid'
import { Droppable } from '@hello-pangea/dnd'

export const Columns = ({ kanban }) => {
	const dispatch = useDispatch()

	const [titleEditing, setTitleEditing] = useState(false)

	const [editedColumnTitle, setEditedColumnTitle] = useState(kanban.title)

	const deleteColumn = (id) => {
		dispatch(removeColumn(id))
	}

	const addNewTask = (id, newTaskText) => {
		const newTask = {
			taskText: newTaskText,
			taskTime: new Date().toLocaleString(),
			taskID: uuidv4(),
		}
		dispatch(addTask({ id, newTask }))
	}

	const confirmNewColumnTitle = (id, newTitle) => {
		if (newTitle.length > 0) {
			dispatch(editColumnTitle({ id, newTitle }))
		}
	}

	return (
		<div className='flex flex-col gap-5 text-white bg-indigo-300 dark:bg-[#202123] rounded-lg min-w-[360px] p-6'>
			<div className='rounded-lg p-2 flex items-center justify-between'>
				{titleEditing ? (
					<div>
						<input
							value={editedColumnTitle}
							onChange={(e) => setEditedColumnTitle(e.target.value)}
							className='rounded-lg text-black dark:bg-[#2a2c2d] dark:text-white py-2 px-2 w-[150px] font-semibold mr-3'
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									confirmNewColumnTitle(kanban.id, editedColumnTitle),
										setTitleEditing(false)
								}
							}}
						></input>
						<button
							onClick={() => {
								confirmNewColumnTitle(kanban.id, editedColumnTitle),
									setTitleEditing(false)
							}}
							className='rounded-lg bg-indigo-400 dark:bg-indigo-700 font-semibold p-2 dark:opacity-40 dark:hover:opacity-100 transition-all'
						>
							Confirm
						</button>
					</div>
				) : (
					<button
						onClick={() => setTitleEditing(true)}
						className='flex items-center hover:opacity-80 transition-all overflow-hidden max-w-[230px] '
					>
						<h3 className='font-semibold text-xl text-start'>{kanban.title}</h3>
						<BiEdit className='ml-2 mt-1 w-[20px] h-[20px]' />
					</button>
				)}
				<button
					onClick={() => deleteColumn(kanban.id)}
					className='bg-indigo-400 dark:bg-indigo-700 py-2 px-4 rounded-lg  dark:opacity-40 dark:hover:opacity-100 transition'
				>
					X
				</button>
			</div>
			<Droppable droppableId={kanban.id}>
				{(provided) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className='min-h-[110px] transition-all'
					>
						{kanban.tasks.map((task, index) => (
							<Tasks
								key={task.taskID}
								kanban={kanban}
								task={task}
								index={index}
							/>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<button
				onClick={() => addNewTask(kanban.id, 'Task Text')}
				className='bg-indigo-400 dark:bg-indigo-700 rounded-lg p-2 opacity-50 hover:opacity-100 transition-all'
			>
				Add
			</button>
		</div>
	)
}
