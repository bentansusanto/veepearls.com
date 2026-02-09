import { AboutPearls, NecklaceLength, PearlColor, PearlType } from '@/types/global-types'

export const aboutPearls: AboutPearls = {
  heading: 'What is Pearls',
  body: [
    'Pearls are a symbol of purity and innocence, and are believed to bring clarity and wisdom. This stone is said to help one find inner peace and increase self-acceptance.',
    'Indonesia is recorded as the largest producer of South Sea pearl commodities in the world.',
    'The process of forming pearls is very rare and takes a long time, making pearls a very valuable. In addition, pearls are also a symbol of beauty, luxury, and eternity, so many people consider pearls to be very special and valuable.',
    'Pearls are generally white or ivory in color. But they can also be light pink, yellow, or even black.',
    'Pearls contain more than 30 types of minerals such as magnesium and calcium that can maintain healthy skin. The protein contained in pearls can also increase collagen production, increase skin moisture and make it look brighter.',
    'Pearls are more popular with a perfectly round shape, but the shape is not always round, there are other pearl shapes such as semi-round, drop, baroque, and circle baroque which are considered rarer and more unique.',
  ],
  image: 'bg-about-pearl1.jpg',
}

export const pearlTypes: PearlType = {
  heading: 'Pearl Types',
  body: 'Since Veepearls offers such a wide range of pearl types, our customers can often times be confused on which type of pearl offers the best value at their budget. Read our brief summaries below to educate yourself regarding the origin, value, size and quality of each pearl type.',
  pearl_type: [
    {
      name_type: 'Freshwater Pearls',
      description:
        'Freshwater pearls are typically found in lakes and rivers in China. In recent years, the quality of Freshwater pearls has drastically improved and has resulted in beautiful pearls that are cleaner, rounder, and more lustrous. Due to their mass production, freshwater pearls are also popular for their affordable price points.',
      image: 'freshwater-pearl.png',
      color_bg: '#E3C1C1',
    },
    {
      name_type: 'Japanese Akoya Pearls',
      description:
        "Since the 1930's, Akoya pearls are the world's best-known pearl. Akoya pearls are often very round and spherical in shape and are complemented by very high luster. Produced by a small oyster called the Pinctada Fucata off the seas of Japan and China, they are commonly found in sizes ranging from 2mm to 10mm in size. ",
      image: 'akoya-pearl.png',
      color_bg: '#F3F3F4',
    },
    {
      name_type: 'White & Golden South Sea Pearls',
      description:
        'White & Golden South Sea pearls are cherished for their classic color as well as their exceptional sizes. These rare gems are produced by the Pinctada Maxima oyster, found in very deep and offshore waters. White South Sea pearls are commonly found off the shores of Australia and are typically creamy white in color with a silver overtone.',
      image: 'south-sea-whitegolden-pearls.png',
      color_bg: '#FFFFFF',
    },
    {
      name_type: 'Tahitian South Sea Pearls',
      description:
        'Tahitian pearls, also known as black South Sea pearls or simply black pearls, are cherished for their incredibly exotic colors and mirror-like luster. Whereas other pearl types are typically limited in color, Tahitian pearls consist of hundreds of overtones with incredibly exotic colors such as peacock green, silver green, blue, and eggplant, just to name a few.',
      image: 'tahitian-south-pearls.png',
      color_bg: '#C2C5CF',
    },
  ],
}

export const pearlColor: PearlColor = {
  heading: 'Pearl Color',
  pearl_color: [
    {
      name_color: 'White Pearl',
      color: 'White',
      description: [
        `The most popular and classic pearl color is white pearls. White pearls convey beauty, harmony, and loyalty to those that adorn them. Whether you choose budget-friendly Freshwater, lustrous Akoya, or premium-size South Sea, you can't go wrong with this classic hue.`,
        `Common overtones for white pearls include sparkling silver, blushing rose, and creamy ivory. The color of the pearl depends on the color of the oyster’s shell. White pearls are the gem of choice for brides because they symbolize new beginnings, purity, and abundance.`,
      ],
      image: ['white-pearls.jpg'],
    },
    {
      name_color: 'Black Pearl',
      color: 'Black',
      description: [
        `Since their discovery centuries ago, exotic black pearls have been captivating humanity’s imagination. While black Freshwater and black Akoya pearls are usually treated to achieve their dark hues, Tahitian black pearls grow naturally in the warm waters of French Polynesia.`,
        `Common overtones for black pearls include radiant grey, brilliant blue-green, and iridescent peacock. The color of the pearl depends on the color of the oyster’s shell. Due to their rarity, black pearls have always symbolized wealth, everlasting love, and wisdom.  `,
      ],
      image: ['black-pearls.jpg'],
    },
    {
      name_color: 'Golden Pearl',
      color: 'Golden',
      description: [
        `Among the rarest cultured pearls in the world, the large size and warm, regal tones of Golden South Sea pearls make them a favorite among gem enthusiasts.`,
        `Golden pearls are particularly popular in Chinese folklore. Believed to have fallen from the sky as dragons fought among the clouds, Golden pearls are considered to be lucky jewels that bring wealth, success, and courage to their owners.`,
        `When you’re looking for something unique, Golden South Sea pearls make an exquisitely elegant personal statement.`,
      ],
      image: ['golden-pearl/golden1.jpg', 'golden-pearl/golden2.jpg', 'golden-pearl/golden3.jpg'],
    },
    {
      name_color: 'Pink Pearl',
      color: 'Pink',
      description: [
        `Rare and delicate, pearls have been a beloved gem since their discovery thousands of years ago. An excellent alternative to classic white, pink pearls offer a unique twist to any jewelry collection.`,
        `The color of the pearl depends on the color of the oyster’s shell. Pink pearls typically grow in freshwater environments and range in hues from blush hues to rich roses.`,
        `Because pink pearls convey love, generosity, and kindness, they are a particular favorite of mothers around the globe.`,
      ],
      image: ['pink-pearls.jpg'],
    },
    {
      name_color: 'Peach Pearl',
      color: 'Peach',
      description: [
        `While white is the most common color, pearls come in a rainbow of hues. Soft and feminine, peach pearls offer a flirty touch of romance to any wardrobe.`,
        `Grown in freshwater environments, peach pearls come from special oysters with a peach-toned shell. Colors range from pastel coral to a deep, rich apricot.`,
        `Peach pearls convey passion, romance, and happiness, making them an ideal choice for holidays, birthdays, anniversaries, or just because.`,
      ],
      image: ['peach-pearls.jpg'],
    },
    {
      name_color: 'Multicolor Pearl',
      color: 'Multicolor',
      description: [
        `Considered to be the ‘Queen of Gems,’ pearls are beloved by jewelry enthusiasts around the world. Dazzling and nuanced, multicolor pearls take any jewelry collection to the next level.`,
        `Why choose one color when you can have them all? The perfect mix of hues and overtones of multicolor pearls unite to create a unique and captivating look.`,
      ],
      image: ['multicolor-pearls.webp'],
    },
  ],
}

export const colorPearl = [
  {
    name_color: 'White',
  },
  {
    name_color: 'Black',
  },
  {
    name_color: 'Pink',
  },
  {
    name_color: 'Peach',
  },
  {
    name_color: 'Multicolor',
  },
]

export const pearlSizing = {
  heading: 'Pearl Sizing',
  description:
    'Pearl sizes are measured in millimeters (mm). The size of a pearl can vary greatly depending on the type of pearl. Below we have provided these images for comparison purposes.',
  pearlTypes: [
    {
      name: 'Akoya Pearls',
      minSize: 2,
      maxSize: 10,
      color: '#E8E8E8',
      textColor: '#FFFFFF',
      description:
        'Japanese Akoya pearls range in size from as small as 2mm to as large as 10mm. Pearls below 6.0mm in size are considered to be on the smaller side, while anything between 6.0mm and 8.0mm are common sizes selected for pearl jewelry items on The Pearl Source. Akoya pearls sized above 8.0mm are considered to be above average in size, and such pearls are more rare and valuable. Please download and print our pearl sizing guide below for more information.',
    },
    {
      name: 'Freshwater Pearls',
      minSize: 5,
      maxSize: 13,
      color: '#E8E8E8',
      textColor: '#FFFFFF',
      description:
        'Freshwater pearls range in size from as small as 5mm to as large as 13mm. Pearls below 7mm in size are considered to be on the smaller side, while 7-8mm and 8-9mm are among the more popular sizes selected for necklaces in Freshwater pearls. Anything sized from 9-10mm and above is considered to be above average in size, and such pearls are more rare and valuable. Please download and print our pearl sizing guide below for more information',
    },
    {
      name: 'Tahitian South Sea',
      minSize: 8,
      maxSize: 15,
      color: '#E8E8E8',
      textColor: '#FFFFFF',
      description:
        'Tahitian South Sea pearls range in size from as small as 8mm to as large as 20mm in rare cases! The smallest size Tahitian pearls offered on The Pearl Source are 8-9mm in size, with more common sizes including 9-10mm and 10-11mm. Generally, any sizes from 11-12mm and above are considered to be above average. Such pearls are very rare and valuable, especially in higher qualities. Please download and print our pearl sizing guide below for more information.',
    },
    {
      name: 'White & Golden South Sea',
      minSize: 8,
      maxSize: 15,
      color: '#E8E8E8',
      textColor: '#FFFFFF',
      description:
        'White & Golden South Sea pearls range in size from as small as 7-8mm to as large as 20mm in extremely rare pieces. The smaller size of the range offered on The Pearl Source are usually 8-9mm in size, with more common sizes including 9-10mm and 10-11mm. Generally, any sizes from 11-12mm and above are considered to be above average. Such pearls are very rare and valuable, especially in higher qualities.',
    },
  ],
  sizeScale: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
}

export const pearlGrading = {
  heading: 'Pearl Grading',
  gradingByType: {
    Freshwater: {
      grades: ['A', 'AA', 'AAA', 'AAAA'],
      rows: ['INFORMATION', 'SURFACE', 'LUSTER', 'SHAPE'],
      data: {
        A: {
          information:
            'Low Quality Freshwater representing the bottom 60% of pearl harvest. (Not Sold at The Pearl Source)',
          surface: 'Heavy blemishing with only a 50% or less clean surface.',
          luster: 'Poor',
          shape: 'Off Round',
        },
        AA: {
          information:
            'Medium-Grade Freshwater representing top 20% of harvest. Found in most Jewelry Stores and major department stores (Not Sold at The Pearl Source)',
          surface: 'Minor to medium blemishing with a 70-80% clean surface.',
          luster: 'Medium',
          shape: 'Off Round',
        },
        AAA: {
          information:
            'High-Grade Freshwater representing the top 10% of a pearl harvest. Found in Finer Jewelry Stores.',
          surface: 'Minor blemishing with at least 90% of the pearl surface clean.',
          luster: 'High',
          shape: 'Near Round to Round',
        },
        AAAA: {
          information: 'Very High-Grade Freshwater representing the top 1-2% of a pearl harvest.',
          surface: 'Very minor to no blemishing with at least 95% of the pearl surface clean.',
          luster: 'Very High',
          shape: 'Round',
        },
      },
    },
    'Japanese Akoya': {
      grades: ['A', 'AA', 'AA+', 'AAA', 'Hanadama'],
      rows: ['INFORMATION', 'SURFACE', 'LUSTER', 'NACRE', 'SHAPE'],
      data: {
        A: {
          information:
            'Low Quality Japanese Akoya representing the bottom 60% of pearl harvest. (Not Sold at Pearl Source)',
          surface: 'Heavy blemishing with only a 50% or less clean surface.',
          luster: 'Poor',
          nacre: 'Thin',
          shape: 'Round/Off Round',
        },
        AA: {
          information:
            'Medium-Grade Japanese Akoya representing top 20% of Harvest. Found in most jewelry stores and Major Department Stores (Not Sold at Pearl Source)',
          surface: 'Minor to medium blemishing with a 70-80% clean surface.',
          luster: 'Medium',
          nacre: 'Medium',
          shape: 'Round',
        },
        'AA+': {
          information:
            'High-Grade Japanese Akoya representing the top 5-10% of a pearl harvest. Found in Finer Jewelry Stores.',
          surface: 'Minor blemishing with at least 90% of the pearl surface clean.',
          luster: 'High',
          nacre: 'Thick',
          shape: 'Perfectly Round',
        },
        AAA: {
          information:
            'Very High-Grade Japanese Akoya representing the top 1-5% of a pearl harvest.',
          surface: 'Very Minor to no blemishing with at least 95% of the pearl surface clean.',
          luster: 'Very High',
          nacre: 'Very Thick',
          shape: 'Perfectly Round',
        },
        Hanadama: {
          information:
            'Gem Quality Japanese Akoya Pearls representing the highest 1% of a pearl harvest. Accompanied by a numbered certificate by the Pearl Science Laboratory of Japan.',
          surface: '99% or cleaner pearl surface with either very minor to no blemishes visible.',
          luster: 'Superior',
          nacre: 'Very Thick',
          shape: 'Perfectly Round',
        },
      },
    },
    'Tahitian South Sea': {
      grades: ['A', 'AA', 'AAA', 'AAAA'],
      rows: ['INFORMATION', 'SURFACE', 'LUSTER', 'A-D GRADING SYSTEM'],
      data: {
        A: {
          information:
            'Low Quality South Sea representing the bottom 50% of pearl harvest (Not Sold at Pearl Source)',
          surface:
            'Pearls having flaws on at least 60% of the pearl surface, with 20% containing only minor imperfections.',
          luster: 'Poor',
          grading: '"D" Quality',
        },
        AA: {
          information:
            'Medium-Grade South Sea representing top 60% of harvest. Commonly found at jewelry stores and Major Department Stores (Not Sold at Pearl Source)',
          surface:
            'Flawless pearl on 40% of its surface, with the remaining 60% having minor imperfections or blemishes containing deep flaws.',
          luster: 'Medium',
          grading: '"C" Quality',
        },
        AAA: {
          information:
            'High-Grade South Sea representing the top 5-10% of a pearl harvest. Found in Finer Jewelry Stores.',
          surface:
            'Flawless pearl on at least 80-85% of its surface, with remaining 15-20% containing only minor imperfections with one or two deep imperfections.',
          luster: 'High',
          grading: '"A/B" Quality',
        },
        AAAA: {
          information: 'Very High-Grade South Sea representing the top 1-5% of a pearl harvest.',
          surface: 'Flawless pearl on at least 95% of the pearl surface, with 5% imperfections.',
          luster: 'Very High',
          grading: '"A" Quality',
        },
      },
    },
    'White & Golden South Sea': {
      grades: ['A', 'AA', 'AAA', 'AAAA'],
      rows: ['INFORMATION', 'SURFACE', 'LUSTER', 'A-D GRADING SYSTEM'],
      data: {
        A: {
          information:
            'Low Quality South Sea representing the bottom 50% of pearl harvest (Not Sold at Pearl Source)',
          surface:
            'Pearls having flaws on at least 60% of the pearl surface, with 20% containing only minor imperfections.',
          luster: 'Poor',
          grading: '"D" Quality',
        },
        AA: {
          information:
            'Medium-Grade South Sea representing top 60% of harvest. Commonly found at jewelry stores and Major Department Stores (Not Sold at Pearl Source)',
          surface:
            'Flawless pearl on 40% of its surface, with the remaining 60% having minor imperfections or blemishes containing deep flaws.',
          luster: 'Medium',
          grading: '"C" Quality',
        },
        AAA: {
          information:
            'High-Grade South Sea representing the top 5-10% of a pearl harvest. Found in Finer Jewelry Stores.',
          surface:
            'Flawless pearl on at least 80-85% of its surface, with remaining 15-20% containing only minor imperfections with one or two deep imperfections.',
          luster: 'High',
          grading: '"A/B" Quality',
        },
        AAAA: {
          information: 'Very High-Grade South Sea representing the top 1-5% of a pearl harvest.',
          surface: 'Flawless pearl on at least 95% of the pearl surface, with 5% imperfections.',
          luster: 'Very High',
          grading: '"A" Quality',
        },
      },
    },
  },
}

export const necklareLength: NecklaceLength = {
  heading: 'Necklace Lengths',
  body: 'Veepearls has the largest collection of pearl necklaces on the Internet with pearls available in all shapes, sizes, colors, and qualities.',
  necklareData: [
    {
      name_length: `16" Choker Length`,
      description:
        'A choker length pearl necklace is one of the most classic lengths. This versatile size can be worn with almost any neckline and for any occasion.',
      size: `16"`,
      image: 'pearl-necklare-size-16.svg',
    },
    {
      name_length: `17" Princess Length`,
      description:
        "One of the most popular length selected by women today, the princess length is intended to sit at or right below the collar bone. Its length creates versatility and is well suited with a variety of women's attire, including V-neck shirts and button-up blouses.",
      size: `17"`,
      image: 'pearl-necklare-size-17.svg',
    },
    {
      name_length: `18" Princess Length`,
      description:
        "One of the most popular length selected by women today, the princess length is intended to sit at or right below the collar bone. Its length creates versatility and is well suited with a variety of women's attire, including V-neck shirts and button-up blouses.",
      size: `18"`,
      image: 'pearl-necklare-size-18.svg',
    },
    {
      name_length: `20" Matinee Length`,
      description:
        'The pearl matinee necklace is a great choice for casual or business attire. It typically sits well below the neckline and is desired because of its versatility as a casual necklace, as well as a necklace for formal occasions. The matinee length also goes well as a multi-layered necklace, with a shorter choker or princess length sitting above it.',
      size: `20"`,
      image: 'pearl-necklare-size-20.svg',
    },
    {
      name_length: `24" Matinee Length`,
      description:
        'The pearl matinee necklace is a great choice for casual or business attire. It typically sits well below the neckline and is desired because of its versatility as a casual necklace, as well as a necklace for formal occasions. The matinee length also goes well as a multi-layered necklace, with a shorter choker or princess length sitting above it. The pearl matinee necklace is a great choice for casual or business attire. It typically sits well below the neckline and is desired because of its versatility as a casual necklace, as well as a necklace for formal occasions. The matinee length also goes well as a multi-layered necklace, with a shorter choker or princess length sitting above it.',
      size: `24"`,
      image: 'pearl-necklare-size-24.svg',
    },
    {
      name_length: `36" Opera Length`,
      description:
        "This pearl length is popular for its versatility as one long necklace or the ability to rap around a woman's neck twice, creating a double strand of pearls. This necklace length is also very suitable for layering and its ability to be appropriate in both casual and formal settings.",
      size: `36"`,
      image: 'pearl-necklare-size-36.svg',
    },
    {
      name_length: `51" Rope Length`,
      description: `A necklace any longer than Opera Length is typically considered a "pearl rope" and can be designed to create maximum versatility for the wearer, such as one long necklace, two layered necklaces, or three shorter necklaces when wrapped around the neck multiple times.`,
      size: `51"`,
      image: 'pearl-necklare-size-51.svg',
    },
  ],
}
