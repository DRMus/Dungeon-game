import React from 'react'

interface Props {
  restartGame: () => void;
}

const LevelComplete = (props: Props) => {
  return (
    <div className='absolute inset-0 flex justify-center items-center animate-opacity backdrop-blur-[2px] z-10'>
      <div className="flex flex-col items-center gap-2">
        <p className='Font16Bit text-emerald-400 text-xl select-none'>Level Complete</p>
        {/* <p className='Font16Bit text-emerald-400 hover:text-black cursor-pointer text-sm' onClick={props.restartGame}>Restart</p> */}
      </div>
    </div>
  )
}

export default LevelComplete