import React, {useState, useEffect} from 'react'
import { capitaliseFirstLetter } from '../../helpers/capitaliseFirstLetter'

interface CardType {
  value: string
  colour: boolean 
}

const Card: React.FC<CardType> = ({ value, colour }) => {

  const setColour = (colour: boolean, value: string) => {
    return value.startsWith('http') ? '' : (colour ? 'bg-green-400 hover:bg-green-700' : 'bg-red-400 hover:bg-red-700')
  }
  const [isVisible, setVisible] = useState(false);

  // Use useEffect to trigger opacity change after render
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`card w-28 h-28 flex justify-center items-center text-center
        transition-colors duration-600 ease-in-out

        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${setColour(colour, value)} font-pixelify text-xl`}>

      {value !== undefined ? 
        (value.startsWith('http') ? (
          <img src={value} alt='Image' className='min-h-28 min-w-28' />
        ) : (
          capitaliseFirstLetter(value) 
        )
      ) : ''}
    </div>
  );

}

export default Card