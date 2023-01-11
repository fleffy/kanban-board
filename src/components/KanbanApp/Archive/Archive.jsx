import { useState } from 'react'
import { DropToArchive } from './DropToArchive'
import { ArchiveModal } from './ArchiveModal'

export const Archive = () => {
	const [openModal, setOpenModal] = useState(false)

	return (
		<div>
			<div className='flex gap-5 transition-all'>
				<button
					onClick={() => setOpenModal(true)}
					className='text-white p-2 px-5 rounded-lg font-semibold bg-indigo-500 dark:bg-indigo-700'
				>
					Archive
				</button>
				<DropToArchive />
			</div>
			{openModal ? <ArchiveModal setOpenModal={setOpenModal} /> : <div></div>}
		</div>
	)
}
