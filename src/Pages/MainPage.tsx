import { useEffect, useState } from 'react'
import TaskList from '../components/Tasks'
import styles from './Mainpage.module.css'

export default function MainPage() {
	const [task, setTask] = useState<string[]>(() => {
		const saved = localStorage.getItem('task')
		return saved ? JSON.parse(saved) : []
	})
	const [inputValue, setInput] = useState('')
	useEffect(() => {
		localStorage.setItem('task', JSON.stringify(task))
	}, [task])

	function addTask() {
		if (inputValue.trim() === '') return
		setTask([...task, inputValue])
		setInput('')
	}

	function deleteTask(index: number) {
		setTask(task.filter((_, i) => i !== index))
	}

	function editTask(index: number, newValue: string) {
		const updated = [...task]
		updated[index] = newValue
		setTask(updated)
	}

	return (
		<>
			<main className={styles.main}>
				<header className={styles.header}>
					<h1 className={styles.title}>To-Do-List</h1>
					<input
						className={styles.firstInput}
						type='text'
						placeholder='Add your task'
						value={inputValue}
						onChange={e => setInput(e.target.value)}
					/>
					<button className={styles.addButton} onClick={addTask}>
						Add
					</button>
					<div className={styles.taskList}>
						<TaskList
							tasks={task}
							deleteTask={deleteTask}
							editTask={editTask}
						/>
					</div>
				</header>
			</main>
		</>
	)
}
