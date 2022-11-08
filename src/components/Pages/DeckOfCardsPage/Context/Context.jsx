import React, { useState, useEffect } from 'react';



const EffectsContext = React.createContext();

const ContextProvider = ({ children }) => {
  const [effects, setEffects] = React.useState([]);
  const [isFill, setFill] = React.useState(false)

  const handleEffectAdd = (id) => {

    if(effects.length<3){
      let alreadyHas = false
      effects.forEach(e=>{
        if(e.id===id){
          alreadyHas = true
          return 
        }
      })
      if(alreadyHas===false){
        setEffects([...effects,{id, img:'1'}])
      }
    }
    else{
      setFill(true)
    }
  }

  const handleEffectRemove = (id)=>{
    const tempEffects = effects.filter(e=> e.id !== id)
    setEffects(tempEffects)
    setFill(false)
  }


  return (<EffectsContext.Provider value={{ effects,handleEffectRemove, handleEffectAdd, setFill,isFill }}>{children}</EffectsContext.Provider >)
}

export { EffectsContext };
export default ContextProvider;