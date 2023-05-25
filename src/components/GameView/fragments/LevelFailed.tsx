import React from 'react'

interface Props {
  restartGame: () => void;
}

const LevelFailed = (props: Props) => {
  return (
    <div className='absolute inset-0 flex justify-center items-center animate-opacity backdrop-blur-[2px] z-10'>
      <div className="flex flex-col items-center gap-2">
        <p className='Font16Bit text-red-600 text-xl select-none'>Game over</p>
        {/* <p className='Font16Bit text-red-600 hover:text-black cursor-pointer text-sm' onClick={props.restartGame}>Restart</p> */}
      </div>
    </div>
  )
}

export default LevelFailed