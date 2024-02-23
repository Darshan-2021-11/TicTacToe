import { useEffect } from 'react';
import TicTacToe from './TicTacToe'
/*
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
*/
function App() {

  useEffect(() => {
    // Get the viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    document.getElementById('root').style.height = `${viewportHeight}px`;
    document.getElementById('root').style.width = `${viewportWidth}px`;
    document.getElementById('root').style.margin = '0';
  }, [])

  return (
    <>
      <TicTacToe />
    </>
  )
}

export default App
