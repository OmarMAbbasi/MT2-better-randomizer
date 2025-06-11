import { useState, useEffect } from 'react'
import './App.css'

const CLANS = ["Banished", "Pyreborn", "Luna", "Underlegion", "Lazarus League", "Hellhorned", "Awoken", "Stygian Guard", "Umbra", "Melting Remnant"]
const CHAMPIONS = {
  "Banished": ["Fel", "Talos"],
   "Pyreborn": ["Lord Fenix", "Lady Gilda"],
   "Luna": ["Ekka", "Arduhn"],
   "Underlegion": ["Bolete", "Lionsmane"],
   "Lazarus League": ["Orechi", "Grael"],
   "Hellhorned": ["Hornbreaker", "Shardtail"],
   "Awoken": ["Sentient", "Wyldenten"],
   "Stygian Guard": ["Tethys", "Solgard"],
   "Umbra": ["Penumbra", "Primordium"],
   "Melting Remnant": ["Flicker", "Fade"],
}


function App() {

  const [clans, setClans] = useState(false)

  const genDefaultClans = () => {
    const DEFAULT_CLANS = {};
    for (let mainClan = 0; mainClan < CLANS.length; mainClan++) {
      const champ1 = CHAMPIONS[CLANS[mainClan]][0];
      const champ2 = CHAMPIONS[CLANS[mainClan]][1];
      DEFAULT_CLANS[champ1] = {};
      DEFAULT_CLANS[champ2] = {}
      for (let subClan = 0; subClan < CLANS.length; subClan++) {
        if(mainClan != subClan){
          DEFAULT_CLANS[champ1][CLANS[subClan]] = "false";
          DEFAULT_CLANS[champ2][CLANS[subClan]] = "false";
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
      <div>
        {clans ? <div>{clans["Fel"]["Pyreborn"]}</div> : <div>loading</div>}
      </div>
    </>
  )
}

export default App
