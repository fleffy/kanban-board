import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	removeArchiveColumn,
	editColumnTitle,
	setKanban,
} from '../../../store/kanbanSlice'
import { ArchiveTasks } from './ArchiveTasks'

import { BiEdit, BiX, BiUndo } from 'react-icons/bi'
import { MdCheck } from 'react-icons/md'

export const ArchiveColumns = ({ column, tasks }) => {
	const kanbanData = useSelector((state) => state.kanbanApp)
	const dispatch = useDispatch()

	const setInitialData = (state) => {
		dispatch(setKanban(state))
	}

	const [titleEditing, setTitleEditing] = useState(false)

	const [editedColumnTitle, setEditedColumnTitle] = useState(column.title)

	const deleteArchiveColumn = (id) => {
		dispatch(removeArchiveColumn(id))
	}

	const confirmNewColumnTitle = (columnId, newTitle) => {
		if (newTitle.length > 0) {
			dispatch(editColumnTitle({ columnId, newTitle }))
		}
	}

	const returnColumn = (id) => {
		const newColumnOrder = Array.from(kanbanData.columnsOrder)
		const newArchiveList = Array.from(kanbanData.archive)
		const indexOfArchiveColumn = kanbanData.archive.indexOf(id)

		newArchiveList.splice(indexOfArchiveColumn, 1)
		newColumnOrder.splice(0, 0, id)

		const newState = {
			...kanbanData,
			columnsOrder: newColumnOrder,
			archive: newArchiveList,
		}

		setInitialData(newState)
	}

	return (
		<div className='mr-5 flex flex-col gap-5 text-white bg-indigo-400 dark:bg-[#202123] rounded-lg min-w-[360px] p-6'>
			<div className='rounded-lg p-2 flex items-center justify-between'>
				{titleEditing ? (
					<div className='flex items-center'>
						<input
							maxLength='18'
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
							title='Confirm editing'
							onClick={() => {
								confirmNewColumnTitle(column.id, editedColumnTitle),
									setTitleEditing(false)
							}}
							className='bg-indigo-500 dark:bg-indigo-700 rounded-lg opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 transition font-semibold mr-3'
						>
							<div className='bg-indigo-500 dark:bg-indigo-700 p-2 rounded-lg opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 transition font-semibold'>
								<MdCheck className='w-[22px] h-[22px]' />
							</div>
						</button>
					</div>
				) : (
					<button
						title='Edit column title'
						onClick={() => setTitleEditing(true)}
						className='flex items-center hover:opacity-80 transition-all overflow-hidden max-w-[230px] '
					>
						<h3 className='font-semibold text-xl text-start'>{column.title}</h3>
						<BiEdit className='ml-2 w-[20px] h-[20px]' />
					</button>
				)}
				<div className='flex gap-3'>
					<button
						onClick={() => returnColumn(column.id)}
						title='Get from the archive'
						className='bg-indigo-500 dark:bg-indigo-700 p-2 rounded-lg opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 transition font-semibold'
					>
						<BiUndo className='w-[22px] h-[22px]' />
					</button>
					<button
						title='Delete from archive'
						onClick={() => deleteArchiveColumn(column.id)}
						className='bg-indigo-500 dark:bg-indigo-700 p-2 rounded-lg opacity-60 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100 transition font-semibold'
					>
						<BiX className='w-[22px] h-[22px]' />
					</button>
				</div>
			</div>

			<div className='min-h-[110px] transition-all'>
				{tasks.map((task) => (
					<ArchiveTasks key={task.id} column={column} task={task} />
				))}
			</div>
		</div>
	)
}
