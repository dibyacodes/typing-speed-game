// TODO
/*

Don't store the words in a variable, this takes more time to render slowing the process a bit and most importantly messing with the count down timer.

Instead => Take 100 words from the API and store it in an array and show the around 50 words to the user and then keep on generating in rounds.

*/

import { useCallback, useEffect, useState } from "react";

function App() {

  const [countdown, setCountDown] = useState(60)
  const [typeStart, setTypeStart] = useState(false)
  // const [wordsArray,setUserInput] = useState('')
  const [random, setRandomWord] = useState([]) // now this is an array
  const [startAPI,setStartAPI] = useState(false)
  const [randomIndex,setRandomWordIndex] = useState(0)
  // let str = ""

  const API = fetch(`https://random-word-api.herokuapp.com/word?number=100`)

    const type = () => {
      setTypeStart(true)
    }
    
    const startTimer = useCallback(() => {
      if (typeStart === true) {
        const timer = setTimeout(() => {
          setCountDown((prevTime) => {
            if (prevTime <= 0 || countdown <= 0) {
              clearTimeout(timer)
              setTypeStart(false)
              return 60
            }
            return prevTime - 1
          })
        }, 1000);
      }
    }, [setCountDown, typeStart,countdown])
    
    useEffect(() => {
      startTimer()
    },[setCountDown,startTimer])

    
    useEffect(()=>{

      async function fetchAPI(){
        const words = await(await API).json()
        console.log(words)
        setRandomWord(words)
      }

      if (startAPI === true){
        fetchAPI()
        setStartAPI(false)
      }
    },[startAPI,API])


    // console.log(inputBox.current?.value)
    return (
      <div className="flex flex-col gap-20 items-center bg-black h-screen pt-[10%]">
      <div className="text-center rounded-full font-sans border-8 border-white w-[15rem] h-[15rem] font-bold flex flex-col items-center justify-center">
        <h1 className="text-8xl text-white">{countdown}</h1>
        <p className="font-1xl text-white">
          seconds
        </p>
      </div>

      {/* random words from the API */}
      <div>
        <h1 className="text-white text-9xl flex flex-wrap text-wrap max-w-[100ch]">
          {
            random[randomIndex]
          }
        </h1>
      </div>

      {/* user input field */}
      <div className="w-[50%]">
        <input
          className="w-full outline-none px-2 py-2 rounded-md"
          onChange={type}
          type="text"
          name=""
          id="userInput"
          onKeyDown={(e)=>{
            if (e.key === 'Enter'){
              setRandomWordIndex((prev)=>prev+1)
            }
          }}
          />
      </div>

      <div>
        <button
        onClick={()=>{
          setStartAPI(true)
        }}
        className="bg-white"
        >
          Start
        </button>
      </div>
    </div>
  )
}

export default App
