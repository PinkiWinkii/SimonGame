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
    },
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

  const initGame = () => {
    randomNumber();
    setIsGameOn(true);
  }

  const randomNumber = () => {
    setIsAllowedToPlay(false);
    const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
    setSequence([...sequence, randomNumber]);
    setTurn(turn + 1);
  }

  const handleClick = (index) => {
    if (isAllowedToPlay) {
      play({ id: colors[index].sound });
      colors[index].ref.current.style.opacity = 1;
      colors[index].ref.current.style.transform = 'scale(0.9)';
      setTimeout(() => {
        colors[index].ref.current.style.opacity = 0.6;
        colors[index].ref.current.style.transform = 'scale(1)';
        setCurrentGame([...currentGame, index]);
        setPulses(pulses + 1);
      }, speed / 2);
    }
  };
  

  useEffect(() => {
    if(pulses > 0) {
      if(Number(sequence[pulses - 1]) === Number(currentGame[pulses - 1])){
          setSuccess(success + 1);
          console.log("ACIERTO");
        } else {
          console.log("FALLO");
          const index = sequence[pulses - 1];
          if(index) colors[index].ref.current.style.opacity = (1);
          play({id: 'error'});
          setTimeout(() => {
            if(index) colors[index].ref.current.style.opacity = (0.5);
            setIsGameOn(false);
          }, speed * 2);
          setIsAllowedToPlay(false);
        }
      }
    }, [pulses]);

  useEffect(() => {
    if(!isGameOn) {
      setSequence([]);
      setCurrentGame([]);
      setIsAllowedToPlay(false);
      setSpeed(speedGame);
      setSuccess(0);
      setPulses(0);
      setTurn(0);
    }
  }, [isGameOn]);

  useEffect(() => {
    if(success === sequence.length && success > 0) {
      setSpeed(speed - sequence.length * 2);
      setTimeout(() => {
        setSuccess(0);
        setPulses(0);
        setCurrentGame([]);
        randomNumber();
      }, 500);
    }
  }, [success]);

  useEffect(() => {
    if(!isAllowedToPlay) {
      sequence.map((item, index) => {
        setTimeout(() => {
          play({id: colors[item].sound});
          colors[item].ref.current.style.opacity = (1);
          setTimeout(() => {
            colors[item].ref.current.style.opacity = (0.5);
          }, speed / 2);
        }, speed * index);
      })
    }
    setIsAllowedToPlay(true);
  }, [sequence]);
  
  return (
  <>
    <div className={`app-container ${isGameOn ? 'background-game' : 'background-start'}`}>
  {
  isGameOn
  ?
  <>
      <h2>Turn: {turn}</h2>
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
  <div>


    <h1 className='simon-potions'>SIMON'S POTIONS</h1>
    
    <button onClick={initGame}>GRAB A DRINK</button>
    </div>

  </>
  }
  </div>
  </>
  )
}

export default App
