import { useState, useEffect } from 'react'
import { DropToArchive } from './DropToArchive'
import { ArchiveModal } from './ArchiveModal'

export const Archive = () => {
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		const closeModal = (e) => {
			if (e.keyCode === 27) {
				setOpenModal(false)
			}
		}
		window.addEventListener('keydown', closeModal)
		return () => window.removeEventListener('keydown', closeModal)
	}, [])

	return (
		<div>
			<div className='flex gap-5 transition-all'>
				<button
					onClick={() => setOpenModal(true)}
					title='Open archive'
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
