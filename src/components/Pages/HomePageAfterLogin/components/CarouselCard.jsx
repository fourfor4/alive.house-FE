import React from 'react'
import carcard from '../../../../assets/SongHomePage/carcard.svg'

const CarouselCard = ({style}) => {
  return (
    <div >
      <img style={{...style}} src={carcard} />
    </div>
  )
}

export default CarouselCard