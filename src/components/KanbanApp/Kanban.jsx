import { AddColumn } from './Column/AddColumn'
import { Columns } from './Column/Columns'

import { useSelector } from 'react-redux'

export const Kanban = () => {
	const kanbanData = useSelector((state) => state.kanbanApp)

	return (
		<div className='p-6 px-[1.5rem] xl:px-[7.5rem] mt-[50px]'>
			<AddColumn />
			<div className='flex overflow-auto gap-5 pb-3 items-start'>
				{kanbanData.columnsOrder.map((columnId) => {
					const column = kanbanData.columns[columnId]
					const tasks = column.tasksOrder.map(
						(taskId) => kanbanData.tasks[taskId]
					)
					return <Columns key={column.id} column={column} tasks={tasks} />
				})}
			</div>
		</div>
	)
}
