import React, {useState, useEffect} from 'react'
import { capitaliseFirstLetter } from '../../helpers/capitaliseFirstLetter'

interface CardType {
  value: string
  colour: boolean 
}

const Card: React.FC<CardType> = ({ value, colour }) => {

  const setColour = (colour: boolean) => {
    return colour ? 'bg-green-400' : 'bg-red-400'
  }
  const [isVisible, setVisible] = useState(false);

  // Use useEffect to trigger opacity change after render
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`card border border-gray-300 w-32 h-32 flex justify-center items-center 
        opacity-0 
        transition-opacity duration-300 ease-in-out 
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${setColour(colour)} font-pixelify text-xl`}
    >
      {value !== undefined ? 
        (value.startsWith('http') ? (
          <img src={value} alt='Image' className='image'/>
        ) : (
          capitaliseFirstLetter(value) 
        )
      ) : ''}
    </div>
  );

}

export default Card