'use client'
import { heading } from '@/components/ui/font-family'
import { pearlGrading, pearlSizing } from '@/lib/pearl-education'
import { useState } from 'react'

export const PearlGrading = () => {
  const [selectedType, setSelectedType] = useState<string>('Freshwater')

  // Map pearl type names from pearlSizing to pearlGrading keys
  const getGradingKey = (typeName: string) => {
    if (typeName === 'Akoya') return 'Japanese Akoya'
    return typeName
  }

  // Get grading data for selected type
  const gradingKey = getGradingKey(selectedType)
  const currentGrading =
    pearlGrading.gradingByType[gradingKey as keyof typeof pearlGrading.gradingByType]

  return (
    <div className="bg-[#F5F5F5] dark:bg-black min-h-screen p-5 md:p-10">
      {/* Header */}
      <div className="text-center mx-auto mb-8">
        <h1
          className={`text-2xl font-medium lg:text-5xl xl:text-6xl ${heading.className} text-gray-800 dark:text-white`}
          style={{ lineHeight: '130%' }}
        >
          {pearlGrading.heading}
        </h1>
      </div>

      {/* Pearl Type Selector - Sliding Indicator */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          {/* Background Bar */}
          <div className="relative h-2 bg-gray-300 dark:bg-gray-700 rounded-full mb-8">
            {/* Sliding Indicator Bar */}
            <div
              className="absolute top-0 h-full bg-[#8B7355] rounded-full transition-all duration-300 ease-in-out"
              style={{
                left: `${
                  (pearlSizing.pearlTypes.findIndex(
                    t => t.name.replace(' Pearls', '') === selectedType
                  ) /
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
                  selectedType === type.name.replace(' Pearls', '')
                    ? 'opacity-100 scale-105'
                    : 'opacity-60'
                }`}
                onClick={() => setSelectedType(type.name.replace(' Pearls', ''))}
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

      {/* Selected Type Description */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className={`text-xl font-medium mb-2 ${heading.className} text-[#8B7355]`}>
          {selectedType}
        </h2>
        <p className="text-gray-600 text-xs dark:text-gray-400">
          {pearlSizing.pearlTypes.find(t => t.name.includes(selectedType))?.description}
        </p>
      </div>

      {/* Grading Table */}
      <div className="max-w-4xl mx-auto">
        {/* Table Container with Horizontal Scroll */}
        <div
          className="overflow-x-auto"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE and Edge
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>

          <table className="w-full min-w-[600px] bg-white dark:bg-gray-900 border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-gray-100 dark:bg-gray-800 z-10"></th>
                {currentGrading.grades.map(grade => (
                  <th
                    key={grade}
                    className="border border-gray-300 dark:border-gray-700 p-3 text-center text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[200px]"
                  >
                    {grade}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentGrading.rows.map(row => {
                return (
                  <tr key={row}>
                    <td className="border border-gray-300 dark:border-gray-700 p-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 sticky -left-1 z-10">
                      {row}
                    </td>
                    {currentGrading.grades.map(grade => {
                      const gradeData =
                        currentGrading.data[grade as keyof typeof currentGrading.data]
                      let cellContent = ''

                      // Map row names to data keys
                      if (row === 'INFORMATION') {
                        cellContent = gradeData.information
                      } else if (row === 'SURFACE') {
                        cellContent = gradeData.surface
                      } else if (row === 'LUSTER') {
                        cellContent = gradeData.luster
                      } else if (row === 'SHAPE') {
                        cellContent = (gradeData as any).shape || ''
                      } else if (row === 'NACRE') {
                        cellContent = (gradeData as any).nacre || ''
                      } else if (row === 'A-D GRADING SYSTEM') {
                        cellContent = (gradeData as any).grading || ''
                      }

                      return (
                        <td
                          key={grade}
                          className="border border-gray-300 dark:border-gray-700 p-3 text-xs text-gray-600 dark:text-gray-400"
                        >
                          {cellContent}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
