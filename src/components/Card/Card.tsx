import React from 'react'

interface CardType {
  value: string
  colour: boolean 
}

const Card: React.FC<CardType> = ({ value, colour }) => {

  const setColour = (colour: boolean) => {
    return colour ? 'bg-green-400' : 'bg-red-400'
  }

return (
  <div className={`card border border-gray-300 w-2 h-2 justify-center items-center flex ${setColour(colour)}`}>
    {value}
  </div>
)

}

export default Card