import { useState, useEffect } from 'react'
import './App.css'
import Square from './Square.jsx'

const CLANS = ["Banished", "Pyreborn", "Luna", "Underlegion", "Lazarus League", "Hellhorned", "Awoken", "Stygian Guard", "Umbra", "Melting Remnant"]
const CHAMPION_MAP = {
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

const CHAMP_CLANS = {
  "Fel": "Banished",
  "Talos": "Banished",
  "Lord Fenix": "Pyreborn",
  "Lady Gilda": "Pyreborn",
  "Ekka": "Luna",
  "Arduhn": "Luna",
  "Bolete": "Underlegion",
  "Lionsmane": "Underlegion",
  "Orechi": "Lazarus League",
  "Grael": "Lazarus League",
  "Hornbreaker": "Hellhorned",
  "Shardtail": "Hellhorned",
  "Sentient": "Awoken",
  "Wyldenten": "Awoken",
  "Tethys": "Stygian Guard",
  "Solgard": "Stygian Guard",
  "Penumbra": "Umbra",
  "Primordium": "Umbra",
  "Flicker": "Melting Remnant",
  "Fade": "Melting Remnant",
}

const genDefaultClans = () => {
  const DEFAULT_CLANS = {};
  for (let mainClan = 0; mainClan < CLANS.length; mainClan++) {
    const champ1 = CHAMPION_MAP[CLANS[mainClan]][0];
    const champ2 = CHAMPION_MAP[CLANS[mainClan]][1];
    DEFAULT_CLANS[champ1] = {};
    DEFAULT_CLANS[champ2] = {}
    for (let subClan = 0; subClan < CLANS.length; subClan++) {
      if(mainClan != subClan){
        DEFAULT_CLANS[champ1][CLANS[subClan]] = false;
        DEFAULT_CLANS[champ2][CLANS[subClan]] = false;
      }
    }
  }
  return DEFAULT_CLANS
}

function App() {

  const [clans, setClans] = useState(() => {
    const loadedClans = JSON.parse(localStorage.getItem('clans'));
    return loadedClans || genDefaultClans()
  })

  const [selectedClan, setSelectedClan] = useState("");

  useEffect(() => {
    localStorage.setItem('clans', JSON.stringify(clans));
  }, [clans]);
  
  const renderRow = () => {
    const rows = [
      <div className="firstColumn">
        {CLANS.map((clan) => 
          <div className='columnItem'>
            {clan}
          </div>)
        }</div>
    ]
    Object.keys(CHAMPION_MAP).map((clan) => {
      const champ1 = CHAMPION_MAP[clan][0];
      const champ2 = CHAMPION_MAP[clan][1];
      const cols = []
      Object.keys(CHAMPION_MAP).forEach((subClan) => {
        if (clan !== subClan) {
          cols.push(<Square champ1={champ1} champ2={champ2} subClan={subClan} clans={clans} setClans={setClans}/>)
        }
        else (cols.push(<Square blocked={true}/>))
      })
      rows.push(<div className="inner">{cols}</div>)
    })
    return rows
  }

  const selectClan = () => {
    const possibleClans = [];
    Object.keys(clans).map((champion) => {
      const champData = clans[champion]
      Object.keys(champData).map((subClan)=> {
        if(!clans[champion][subClan]){
          possibleClans.push(`${champion}(${CHAMP_CLANS[champion]})/${subClan}`)
        }
      })
    })
    const randomCombo = possibleClans[Math.floor(Math.random()*possibleClans.length)]
    setSelectedClan(randomCombo)
  }

  return (
    <>
      <div>
        <div className="topRow">
          <div className='mt2Icon'>MT2 ICON PLACEHOLDER</div>
          {CLANS.map((clan) => <div className='topItem'>{clan}</div>)}
        </div>
        {clans ? <div className="container">{renderRow()}</div> : <div>loading</div>}
        <button onClick={selectClan}>RANDOMIZE</button>
        {selectedClan && <div>{selectedClan}</div>}
      </div>
    </>
  )
}

export default App
