// TODO
/*

track down the number of characters types and then
track down the WPM

*/
1
import { useCallback, useEffect, useRef, useState } from "react";

function App() {

  const [countdown, setCountDown] = useState(60)
  const [typeStart, setTypeStart] = useState(false)
  const [random, setRandomWord] = useState([]) // now this is an array
  const [startAPI, setStartAPI] = useState(false)
  const [randomIndex, setRandomWordIndex] = useState(0)
  const InputReference = useRef(null)

  const [numOfChars,setNumberOfChars] = useState(0)
  
  const [hiddenInput, setInput] = useState(false)
  let str = ''
  // setUserInput(str)
  const [score, setScore] = useState(0)
  
  const [readonly, setReadOnly] = useState(false)

  const API = fetch(`https://random-word-api.herokuapp.com/word?number=100`)


  // the scoring system
  const scoring = () => {
    console.log(str)
    if (str == random[randomIndex]){
      setNumberOfChars(numOfChars + str.length)
      setScore(score + 1)
      console.log(score)
    }
    return score
  }


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
            setReadOnly(true)
            setRandomWordIndex(0)
            setInput(true)
            return 60
          }
          return prevTime - 1
        })
      }, 1000);
    }
  }, [setCountDown, typeStart, countdown])

  useEffect(() => {
    startTimer()
  }, [setCountDown, startTimer])


  useEffect(() => {

    async function fetchAPI() {
      const words = await (await API).json()
      console.log(words)
      setRandomWord(words)
    }

    if (startAPI === true) {
      fetchAPI()
      setStartAPI(false)
    }
  }, [startAPI, API])

  // console.log(inputBox.current?.value)
  return (
    <div className="flex flex-col gap-20 items-center bg-black h-screen pt-[1%]">
      <div className="text-center rounded-full font-sans border-8 border-white w-[15rem] h-[15rem] font-bold flex flex-col items-center justify-center">
        <h1 className="text-8xl text-white">{countdown}</h1>
        <p className="font-1xl text-white">
          seconds
        </p>
      </div>

      {/* scoring dashboard */}
      {/* should contain the score, and the wpm */}

      <div className="flex flex-row gap-3">
        <div className="p-4 bg-gray-700 rounded-lg flex flex-col items-center">
          <h1 className="text-white text-3xl">
            {score}
          </h1>
          <p className="text-white font-bold">
            Score
          </p>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg flex flex-col items-center">
          <h1 className="text-white text-3xl">
            {numOfChars}
          </h1>
          <p className="text-white font-bold">
            Number Of Characters
          </p>
        </div>
      </div>

      {/* random words from the API */}
      <div>
        <div className="text-3xl font-mono flex flex-wrap text-wrap max-w-[100ch] gap-4">
          <h1 className="text-white">
          {
            random[randomIndex]
          }
          </h1>

          <h1 className="text-gray-400">
          {
            random[randomIndex+1]
          }
          </h1>
        </div>
      </div>

      {/* user input field */}
      <div className="w-[50%]">
        <input
          className="w-full outline-none px-2 py-2 rounded-md text-center cursor-text font-mono"
          onChange={type}
          type="text"
          hidden={hiddenInput}
          id="userInput"
          onKeyDown={(e) => {
            // console.log(e.keyCode);
            
            if (e.keyCode === 32) {
              e.preventDefault()
              setRandomWordIndex((prev) => prev + 1)
              str = e.target.value
              scoring()
              e.target.value = ''
              
              if (randomIndex >= 99){
                setRandomWordIndex(0)
              }

            }
          }}
          ref={InputReference}
          readOnly={readonly}
        />
      </div>

      <div>
        <button
          onClick={() => {
            setStartAPI(true)
          }}
          className="bg-white py-2 px-4 rounded-sm text-2xl font-bold"
          hidden={false}
        >
          Click to Start
        </button>
      </div>
    </div>
  )
}

export default App
