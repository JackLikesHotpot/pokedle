import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'

interface PokemonBase {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Type[];
}

interface GuessProps extends PokemonBase {
  choice: PokemonBase;
}

interface Type {
  slot: number;
  type: {name: string, url: string;}
}

const Guess: React.FC<GuessProps> = ({name, id, height, weight, types, choice}) => {

  const getGeneration = (id: number): number => {
    if (id < 152) {
      return 1;
    }
    else if (id < 252) {
      return 2;
    }
    return 3;
  }

  if (choice) {
    const cardValues = [choice.name, getGeneration(choice.id), choice.height, choice.weight, choice.types[0]?.type.name, choice.types[1]?.type.name]
    const targetValues = [name, getGeneration(id), height, weight, types[0]?.type.name, types[1]?.type.name]
    const setColour = (index: number) => {
      if (cardValues[index] === targetValues[index])
      {
        return true
      }
      return false
    }

    return (
    <>
      {cardValues.map((value, index) => (
        <Card key={index} value={value?.toString() || ''} colour={setColour(index)} />
      ))}
    </>
  );

    }
}

export default Guess