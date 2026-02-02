import { useState, useEffect } from 'react'
import './App.css'
import Square from './Square.jsx'

const CLANS = ["Banished", "Pyreborn", "Luna", "Underlegion", "Lazarus League", "Hellhorned", "Awoken", "Stygian Guard", "Umbra", "Melting Remnant", "Wyrmkin", "Railforged"]
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
  "Wyrmkin": ["Spine Chief", "Echowright"],
  "Railforged": ["Herzal", "Heph"],
}

const SPELL_MAP = {
  "Fel": "Just Cause",
  "Talos": "Inspire",
  "Lord Fenix": "Firestarter",
  "Lady Gilda": "Bloated Whelp",
  "Ekka": "Witchweave",
  "Arduhn": "Moon Ritual",
  "Bolete": "Eager Conscript",
  "Lionsmane": "Sporetouch",
  "Orechi": "Secret Ingredient",
  "Grael": "Erratic Assistant",
  "Hornbreaker": "Torch",
  "Shardtail": "Queen's Impling",
  "Sentient": "Restore",
  "Wyldenten": "Rotseeds",
  "Tethys": "Frozen Lance",
  "Solgard": "Foregone Power",
  "Penumbra": "Shadesplitter",
  "Primordium": "Plink",
  "Flicker": "Dreg",
  "Fade": "Stygian Mold",
  "Spine Chief": "Fracture",
  "Echowright": "Echo Break",
  "Herzal": "Unknown Spell",
  "Heph": "Unknown Spell",
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
  "Spine Chief": "Wyrmkin",
  "Echowright": "Wyrmkin",
  "Herzal": "Railforged",
  "Heph": "Railforged",
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
    if (loadedClans && !loadedClans['Herzal']) {
      const extra = ["Spine Chief", "Echowright", "Herzal", "Heph"];
      Object.keys(loadedClans).forEach((champ) => {
        extra.forEach((name) => {
          if (!(name in loadedClans[champ])) {
            loadedClans[champ][name] = false;
          }
        })
      })
      extra.forEach((name) => {
        loadedClans[name] = {};
        Object.keys(CHAMP_CLANS).forEach((clan) => {
          if (CHAMP_CLANS[clan] !== name && CHAMP_CLANS[clan] !== name) {
            loadedClans[name][clan] = false;
          }
        })
      })
    }


    return loadedClans || genDefaultClans()
  })

  const [selectedClan, setSelectedClan] = useState("");

  const [altClan, setAltClan] = useState(0)

  const allImages = import.meta.glob('/src/assets/*.png', { eager: true, query: '?url', import: 'default' });

  const getImage = (key) => allImages[`/src/assets/${key}.png`]

  useEffect(() => {
    localStorage.setItem('clans', JSON.stringify(clans));
  }, [clans]);

  const renderRow = () => {
    const rows = [
      <div className="firstColumn">
        {CLANS.map((clan) =>
          <div className='columnItem'>
            <img className="champIcon" src={getImage(clan)} />
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
          cols.push(<Square champ1={champ1} champ2={champ2} subClan={subClan} clans={clans} setClans={setClans} getImage={getImage} />)
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

    const coinFlip = Math.floor(Math.random() * 2)
    const randomSubclan = randomCombo.split('/')[1]
    setAltClan(SPELL_MAP[CHAMPION_MAP[randomSubclan][coinFlip]])
    setSelectedClan(randomCombo)
  }

  return (
    <>
      <div>
        <div className="topRow">
          <div className="mt2IconContainer">
            <img className="mt2Icon" src={getImage("Train")} />
          </div>
           {CLANS.map((clan) => <div className='topItem'><img className="champIcon" src={getImage(clan)} /></div>)}
        </div>
        {clans ? <div className="container">{renderRow()}</div> : <div>loading</div>}
        <button onClick={selectClan}>RANDOMIZE</button>
        {selectedClan && <div>{`${selectedClan}(${altClan})`}</div>}
      </div>
    </>
  )
}

export default App
