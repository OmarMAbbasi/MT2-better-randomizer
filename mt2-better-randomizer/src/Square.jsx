import { useState, useEffect } from 'react'
// import './App.css'

function Square(mainClan, subClan) {

  const [clans, setClans] = useState(false)

  const genDefaultClans = () => {
    const DEFAULT_CLANS = {};
    for (let mainClan = 0; mainClan < CLANS.length; mainClan++) {
      DEFAULT_CLANS[CLANS[mainClan]] = {};
      for (let subClan = 0; subClan < CLANS.length; subClan++) {
        if(mainClan != subClan){
          DEFAULT_CLANS[CLANS[mainClan]][CLANS[subClan]] = "false";
        }
      }
    }
    return DEFAULT_CLANS
  }

  useEffect(()=> {
    const loadedClans = JSON.parse(localStorage.getItem('clans'));
    loadedClans ? setClans(loadedClans) : setClans(genDefaultClans())
  }, [])

  return (
    <>
      <div >
        
      </div>
    </>
  )
}

export default App