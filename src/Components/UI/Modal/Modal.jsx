import React from 'react'
import classes from "./Modal.module.css"

export default function Modal({ children, visible, setVisible }) {
	const rootClasses = [classes]

	if (visible) {
		rootClasses.push("active")
	}

	return (
		<div className={rootClasses.join(' ')} onClick={(() => setVisible(false))}>
			<div onClick={(e) => { e.stopPropagation() }}>
				{children}
			</div>
		</div>
	)
}
