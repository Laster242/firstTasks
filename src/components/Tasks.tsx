//import { useState } from 'react'
import { useState } from 'react'
import styles from './Tasks.module.css'
type Task = {
	tasks: string[]
	deleteTask: (index: number) => void
	editTask: (index: number, newValue: string) => void
}
export default function TaskList({ tasks, deleteTask, editTask }: Task) {
	const [editIndex, setEditIndex] = useState<number | null>(null)
	const [editValue, setEdit] = useState('')
	return (
		<div className={styles.taskContainer}>
			{tasks.length === 0 ? (
				<p className={styles.nullTasks}></p>
			) : (
				tasks.map(function (task, index) {
					return (
						<div key={index} className={styles.Tasks}>
							{editIndex === index ? (
								<input
									className={styles.editInput}
									value={editValue}
									onChange={e => setEdit(e.target.value)}
									onBlur={() => {
										editTask(index, editValue)
										setEditIndex(null)
									}}
								/>
							) : (
								<p className={styles.Taskname}>{task}</p>
							)}

							<button
								className={styles.Edit}
								onClick={() => {
									setEditIndex(index)
									setEdit(task)
								}}
							>
								edit
							</button>

							<button
								className={styles.Delete}
								onClick={() => deleteTask(index)}
							>
								-
							</button>
						</div>
					)
				})
			)}
		</div>
	)
}
