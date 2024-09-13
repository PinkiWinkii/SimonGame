import { useState , useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import useSound from 'use-sound'
import simon from './assets/sounds/sprite.mp3'
import './App.css'

function App() {
  
  const blueRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const redRef = useRef(null);

  const [play] = useSound(simon, {
    sprite: {
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      error: [4000, 500],
    }
  })

  const colors = [
    {
      color:'#FAF303',
      ref: yellowRef,
      sound: 'one'
    },
    {
      color:'#030AFA',
      ref: blueRef,
      sound: 'two'
    },
    {
      color:'#FA0E03',
      ref: redRef,
      sound: 'three'
    },
    {
      color:'#0AFA03',
      ref: greenRef,
      sound: 'four'
    }
  ]

  const minNumber = 0;
  const maxNumber = 3;
  const speedGame = 400;

  const [sequence, setSequence] = useState([]);
  const [currentGame, setCurrentGame] = useState([]);
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(false);
  const [speed, setSpeed] = useState(speedGame);
  const [turn, setTurn] = useState(0);
  const [pulses, setPulses] = useState(0);
  const [success, setSuccess] = useState(0);
  const [isGameOn, setIsGameOn] = useState(false);

  return (
  <>
  {
  isGameOn
  ?
  <>
    <div className='header'>
      <h1>Turn {turn}</h1>
    </div>
    <div className='container'>

      {colors.map((item, index) => {
        return (
          <div
            key={index}
            ref={item.ref}
            className={`pad pad-${index}`}
            style={{backgroundColor:`${item.color}`, opacity:0.6}}
            onClick={() => handleClick(index)}
          >
          </div>
        )
      })}
    </div>
    </>
  :
  <>
    <div className='header'>
      <h1>SUPER SIMON</h1>
    </div>
    <button onClick={initGame}>START</button>
  </>
  }
  </>
  )
}

export default App
