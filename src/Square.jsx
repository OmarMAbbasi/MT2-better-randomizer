import { useState, useEffect } from 'react'
import './Square.css'

function Square({champ1, champ2, subClan, blocked, clans, setClans, getImage}) {
  
  const handleClick = (champ) => {
    const newClans = structuredClone(clans)
    newClans[champ][subClan] = !clans[champ][subClan]
    setClans(newClans)
  }
  
  return (
    <>
    {!!!blocked ? 
      <div className="square">
        <div className={clans[champ1][subClan] ? "item-complete" : "item"} onClick={() => handleClick(champ1)}>
          <img className="champIcon" src={getImage(champ1)} />
          <img className="clanIcon" src={getImage(subClan)} />
        </div>
        <div className={clans[champ2][subClan] ? "item-complete" : "item"} onClick={() => handleClick(champ2)}>
          <img className="champIcon" src={getImage(champ2)} />
          <img className="clanIcon" src={getImage(subClan)} />
        </div>

      </div>
      :
      <div className="blocked"/>
  }

    </>
  )
}

export default Square