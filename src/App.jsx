import { Body } from './pages/Body/Body'
import './App.css'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [isServerUp, setIsServerUp] = useState(false)

  useEffect(() => {
    const pingServer = async () => {
      const isAlive = await axios.get("http://localhost:4000/");
      setIsServerUp(isAlive)
    };
    pingServer()


  }, [])

  return (
    <>
      {
        isServerUp ? (
          <>
            <Header />
            <Body />
          </>
        ) : (
          <div className='loader-style d-flex flex-column justify-content-center align-items-center bg-secondary'>
            <div className='loader'></div>
            <h3>Waiting Server</h3>
          </div>

        )
      }
    </>
  )
}

export default App
