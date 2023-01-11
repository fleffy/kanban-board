import { useState } from 'react'
import { ArchiveButton } from './ArchiveButton'
import { DropToArchive } from './DropToArchive'

export const Archive = () => {
	const [openModal, setOpenModal] = useState(false)

	return (
		<div>
			<div className='flex gap-5'>
				<ArchiveButton />
				<DropToArchive />
			</div>
		</div>
	)
}
