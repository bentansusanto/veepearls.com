'use client'
import React from 'react'
import Herosection from './Section/Herosection'
import PearlTypeSection from './Section/PearlTypeSection'
import { CommentsSection } from './Section/CommentsSection'

const Homepage = () => {
  return (
    <div>
        <Herosection/>
        <PearlTypeSection/>
        <CommentsSection/>
    </div>
  )
}

export default Homepage