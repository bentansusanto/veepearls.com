'use client'
import { heading } from '@/components/ui/font-family'
import { pearlSizing } from '@/lib/pearl-education'
import { useState } from 'react'

export const PearlSizing = () => {
  const [selectedType, setSelectedType] = useState<string>('Freshwater Pearls')

  const selectedPearl = pearlSizing.pearlTypes.find(type => type.name === selectedType)

  return (
    <div className="bg-[#F5F5F5] dark:bg-black min-h-screen p-5 md:p-10">
      {/* Header */}
      <div className="text-center mx-auto mb-8">
        <h1
          className={`text-2xl font-medium lg:text-5xl xl:text-6xl ${heading.className} text-gray-800 dark:text-white`}
          style={{ lineHeight: '130%' }}
        >
          {pearlSizing.heading}
        </h1>
        <p className="text-gray-600 text-xs mt-4 max-w-2xl mx-auto dark:text-gray-400">
          {pearlSizing.description}
        </p>
      </div>

      {/* Pearl Type Bars */}
      <div className="max-w-3xl mx-auto space-y-3 mb-12">
        {pearlSizing.pearlTypes.map(type => {
          const totalRange = 15 - 2 // 2mm to 15mm
          const typeRange = type.maxSize - type.minSize
          const startPercent = ((type.minSize - 2) / totalRange) * 100
          const widthPercent = (typeRange / totalRange) * 100
          const isActive = selectedType === type.name

          return (
            <div key={type.name} className="relative">
              <div className="relative h-12 bg-transparent">
                <div
                  className="absolute h-full flex items-center justify-center cursor-pointer transition-all hover:opacity-90"
                  style={{
                    backgroundColor: isActive ? '#8B7355' : type.color,
                    color: isActive ? type.textColor : '#6B7280',
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                  }}
                  onClick={() => setSelectedType(type.name)}
                >
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Size Scale */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex justify-between items-center px-2">
          {pearlSizing.sizeScale.map(size => (
            <div key={size} className="text-center">
              <span className="text-xs text-gray-600 dark:text-white">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Pearl Type Info */}
      {selectedPearl && (
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2
            className={`text-2xl font-medium mb-4 ${heading.className}`}
            style={{ color: '#8B7355' }}
          >
            {selectedPearl.name}
          </h2>
          <p className="text-gray-600 text-xs dark:text-white">
            Size range: {selectedPearl.minSize}mm - {selectedPearl.maxSize}mm
          </p>
          <p className="text-gray-400 text-xs mt-2 dark:text-gray-400">
            {selectedPearl.description}
          </p>
        </div>
      )}

      {/* Interactive Slider */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Background Bar */}
          <div className="relative h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-8">
            {/* Sliding Indicator Bar */}
            <div
              className="absolute top-0 h-full bg-[#8B7355] rounded-full transition-all duration-300 ease-in-out"
              style={{
                left: `${
                  (pearlSizing.pearlTypes.findIndex(t => t.name === selectedType) /
                    pearlSizing.pearlTypes.length) *
                  100
                }%`,
                width: `${100 / pearlSizing.pearlTypes.length}%`,
              }}
            />
          </div>

          {/* Pearl Type Labels */}
          <div className="flex justify-between text-center -mt-4">
            {pearlSizing.pearlTypes.map(type => (
              <div
                key={type.name}
                className={`flex-1 cursor-pointer transition-all ${
                  selectedType === type.name ? 'opacity-100 scale-105' : 'opacity-60'
                }`}
                onClick={() => setSelectedType(type.name)}
              >
                <p className="text-xs text-gray-700 font-medium dark:text-white">
                  {type.name.replace(' Pearls', '')}
                </p>
                <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                  {type.name.includes('South Sea') && ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
