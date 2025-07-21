type subMenu = {
  title: string;
  href: string;
};

export type NavigationData = {
  title: string;
  href: string;
  submenu?: subMenu[];
};

export type Contents = {
  heading: string;
  body?: string | any;
};

type typePearlProps = {
  name_type: string;
  description: string;
  image: string;
  color_bg: string;
};

export type DetailContent = {
  heading: string;
  image?: string;
  body: string;
};

type colorProps = {
  name_color: string;
  color: string;
  description: string[];
  image: string[];
};

type NecklareProps = {
  name_length: string;
  description: string;
  size: string;
  image: string;
};

export interface FounderPage extends Contents {
  content: Contents;
  image: string;
}

export interface OurBrandDNA extends Contents {
  image: string;
  content1: DetailContent;
  content2: DetailContent;
  content3: DetailContent;
}

export interface OurKeyConsiderate extends Contents {
  image: string;
  content1: DetailContent;
  content2: DetailContent;
  content3: DetailContent;
}

export interface OurMarketCustomers extends Contents {
  image: string;
  content1: DetailContent;
  content2: DetailContent;
  content3: {
    heading: string;
    image?: string;
    body: string;
    contact: string;
  };
}

// occasions

export interface FounderPage extends Contents {
  content: Contents;
  image: string;
}

type Occasions = {
  heading: string;
  body: string;
  image?: string;
};

type Detail = {
  heading: string;
  description: string[];
  image?: string;
};

type OcationSteps = {
  name_steps: string;
  image?: string;
  description: string[];
};

export interface Anniversary extends Occasions {
  details: Detail[];
}

export interface Birthday extends Occasions {
  details: Detail[];
}

export interface Holidays extends Occasions {
  steps: OcationSteps[];
}

export interface Weddings extends Occasions {
  steps: OcationSteps[];
}

export interface AboutPearls extends Contents {
  image: string;
}

export interface PearlType extends Contents {
  pearl_type: typePearlProps[];
}

export interface PearlColor extends Contents {
  pearl_color: colorProps[];
}

export interface NecklaceLength extends Contents {
  necklareData: NecklareProps[];
}
