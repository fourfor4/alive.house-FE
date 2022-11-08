import React from 'react'
import Footer from '../HomeScreenPage/components/Footer'
import Nav from '../HomeScreenPage/components/Nav'
import ArtistSongs from './components/ArtistSongs'
import Details from './components/Details'
import HeroSection from './components/HeroSection'

const ArtistPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Nav/>
      <HeroSection/>
      <Details/>
      <ArtistSongs/>
      <Footer dark/>
    </div>
  )
}

export default ArtistPage