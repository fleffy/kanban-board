import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeColumn, editColumnTitle } from '../../../store/kanbanSlice'
import { ArchiveTasks } from './ArchiveTasks'

import { BiEdit } from 'react-icons/bi'

export const ArchiveColumns = ({ column, tasks }) => {
	const dispatch = useDispatch()

	const [titleEditing, setTitleEditing] = useState(false)

	const [editedColumnTitle, setEditedColumnTitle] = useState(column.title)

	const deleteColumn = (id) => {
		dispatch(removeColumn(id))
	}

	const confirmNewColumnTitle = (columnId, newTitle) => {
		if (newTitle.length > 0) {
			dispatch(editColumnTitle({ columnId, newTitle }))
		}
	}

	return (
		<div className='mr-5 flex flex-col gap-5 text-white bg-indigo-400 dark:bg-[#202123] rounded-lg min-w-[360px] p-6'>
			<div className='rounded-lg p-2 flex items-center justify-between'>
				{titleEditing ? (
					<div>
						<input
							value={editedColumnTitle}
							onChange={(e) => setEditedColumnTitle(e.target.value)}
							className='rounded-lg text-black dark:bg-[#2a2c2d] dark:text-white py-2 px-2 w-[150px] font-semibold mr-4'
							autoFocus
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									confirmNewColumnTitle(column.id, editedColumnTitle),
										setTitleEditing(false)
								}
							}}
						></input>
						<button
							onClick={() => {
								confirmNewColumnTitle(column.id, editedColumnTitle),
									setTitleEditing(false)
							}}
							className='rounded-lg bg-indigo-500 dark:bg-indigo-700 font-semibold p-2 opacity-60 hover:opacity-100 transition-all'
						>
							Confirm
						</button>
					</div>
				) : (
					<button
						onClick={() => setTitleEditing(true)}
						className='flex items-center hover:opacity-80 transition-all overflow-hidden max-w-[230px] '
					>
						<h3 className='font-semibold text-xl text-start'>{column.title}</h3>
						<BiEdit className='ml-2 mt-1 w-[20px] h-[20px]' />
					</button>
				)}
				<button
					onClick={() => deleteColumn(column.id)}
					className='bg-indigo-500 dark:bg-indigo-700 py-2 px-4 rounded-lg opacity-60 hover:opacity-100  dark:opacity-60 dark:hover:opacity-100 transition font-semibold'
				>
					X
				</button>
			</div>

			<div className='min-h-[110px] transition-all'>
				{tasks.map((task) => (
					<ArchiveTasks key={task.id} column={column} task={task} />
				))}
			</div>
		</div>
	)
}
