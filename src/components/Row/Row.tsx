import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'

interface PokemonBase {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Type[];
}

interface Pokemon extends PokemonBase {
  choice: PokemonBase;
}

interface Type {
  slot: number;
  type: {name: string, url: string;}
}

const Guess: React.FC<Pokemon> = ({name, id, height, weight, types, choice}) => {

  const cardValues = [choice.name, choice.id, choice.height, choice.weight, choice.types[0].type.name, choice.types[1]?.type.name]
  const targetValues = [name, id, height, weight, types[0].type.name, types[1].type.name]
  // console.log(cardValues)


const setColour = (index: number) => {

  if (cardValues[index] === targetValues[index])
  {
    return true
  }
  return false
}

return (
  <div className='guess flex flex-row'>
    {cardValues.map((value, index) => 
    ( value !== undefined ? (
        <Card 
          key={index} 
          value={value.toString()} 
          colour={setColour(index)}/>
      ) : (
        <Card 
          key={index} 
          value={value}
          colour={setColour(index)}/>
      )
    )
  )}
  </div>  
)

}

export default Guess