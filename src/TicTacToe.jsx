import React, { useEffect, useState } from 'react'

const TicTacToe = () => {
	const [winner, setwinner] = useState(() => { return { winstate: -1, player: null } })
	const [state, setstate] = useState(() => 0)
	const [history, sethistory] = useState(() => [])

	const evalList = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	const evaluateWinner = () => {
		if (winner.winstate !== -1) {
			return winner
		}
		let indexArray = []
		let possible = true
		for (const l of evalList) {
			indexArray = []
			possible = true
			for (let i = 0; i < 3; ++i) {
				indexArray.push(history.indexOf(l[i].toString()))
				if (indexArray[i] === -1) {
					possible = false
					break
				} else {
					indexArray[i] &= 1
				}
			}
			if (possible) {
				if (indexArray[0] === indexArray[1] && indexArray[1] === indexArray[2]) {
					return { winstate: state, player: indexArray[0] }
				}
			}
		}
		return winner
	}

	useEffect(() => {
		setwinner(evaluateWinner)
	}, [history])

	const addMark = (id) => {
		setstate(state => state + 1);
		document.getElementById(id).innerText = state % 2 === 0 ? 'X' : 'O'
	}

	const handleGridClick = (event) => {
		if (state < history.length) {
			const newhistory = history.splice(0, state)

			if (!newhistory.includes(event.target.id)) {
				newhistory.push(event.target.id)
				sethistory(newhistory)
				addMark(event.target.id)
				setwinner({ winstate: -1, player: null });
			}
		}
		else if (!history.includes(event.target.id)) {
			sethistory(history => [...history, event.target.id]);
			addMark(event.target.id)
		}
	}

	const handleUndo = () => {
		if (state > 0) {
			setstate(state => state - 1)
			document.getElementById(history[state - 1]).innerText = ''
		}
	}

	const handleRedo = () => {
		if (state < history.length) {
			document.getElementById(history[state]).innerText = state % 2 === 0 ? 'X' : 'O'
			setstate(state => state + 1)
		}
	}
	const createGrid = () => {
		console.log("Render!")
		const squares = Array(9).fill(null);

		return (
			<>
				<p style={{
					margin: '0px',
					border: '0px',
					textAlign: 'center',
					fontSize: '1.5rem'
				}}>{
						winner.winstate !== -1 && winner.winstate <= state ? `Player${winner.player + 1} WON` : (state % 2 === 0 ? "Player1's turn" : "Player2's turn")
					}</p>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					border: '1px solid black',
				}}>
					{squares.map((square, i) => (
						<div key={i} id={i.toString()} onClick={handleGridClick} style={{
							border: '1px solid black',
							width: '50px',
							height: '50px',
							fontSize: '40px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
						</div>
					))}
				</div>
				<div style={{
					display: 'flex',
					gap: '10px'
				}}>
					<button onClick={handleUndo}>Undo</button>
					<button onClick={handleRedo}>Redo</button>
				</div>
			</>
		);
	}
	return (
		<div style={{
			position: 'relative',
			height: '100%',
			width: '100%'
		}}>
			<div style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '20px'
			}}>
				{createGrid()}
			</div>
		</div>
	)
}

export default TicTacToe
