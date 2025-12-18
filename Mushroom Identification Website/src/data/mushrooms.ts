export interface Mushroom {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  edibility: 'edible' | 'poisonous' | 'inedible';
  description: string;
  habitat: string;
  season: string;
  identification: string[];
  lookAlikes?: string;
  culinaryUse?: string;
}

export const mushroomData: Mushroom[] = [
  {
    id: '1',
    name: 'Morel',
    scientificName: 'Morchella esculenta',
    image: 'https://images.unsplash.com/photo-1609133882370-2f02bd2e6edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JlbCUyMG11c2hyb29tfGVufDF8fHx8MTc2NDcxMjk3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'edible',
    description: 'Morels are among the most prized edible mushrooms, known for their distinctive honeycomb appearance and nutty flavor. They are highly sought after by foragers and chefs alike.',
    habitat: 'Found in deciduous forests, orchards, and recently disturbed areas. Often near dead elm, ash, and apple trees.',
    season: 'Spring (March-May in Northern Hemisphere)',
    identification: [
      'Honeycomb-patterned cap with pits and ridges',
      'Hollow from cap to stem base',
      'Cap attached to stem at the bottom',
      'Light tan to dark brown coloring',
      'No gills - the entire fruiting body is hollow'
    ],
    lookAlikes: 'False Morels (Gyromitra species) - poisonous. False morels have wrinkled, brain-like caps instead of honeycomb patterns.',
    culinaryUse: 'Excellent in cream sauces, with pasta, or simply sautéed in butter. Must be cooked before consumption.'
  },
  {
    id: '2',
    name: 'Chanterelle',
    scientificName: 'Cantharellus cibarius',
    image: 'https://images.unsplash.com/photo-1633859159647-11134b20658f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFudGVyZWxsZSUyMG11c2hyb29tfGVufDF8fHx8MTc2NDcxMjk3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'edible',
    description: 'Chanterelles are popular edible mushrooms with a distinctive golden color and fruity aroma reminiscent of apricots. They have a peppery taste when raw and a delicate flavor when cooked.',
    habitat: 'Grows in association with hardwood and conifer trees, particularly oak, beech, and pine.',
    season: 'Summer to Fall (June-November)',
    identification: [
      'Golden yellow to orange color',
      'Funnel or vase-shaped cap',
      'False gills (ridges) that run down the stem',
      'Solid, not hollow',
      'Fruity, apricot-like aroma'
    ],
    lookAlikes: 'Jack O\'Lantern mushrooms (Omphalotus olearius) - poisonous. Jack O\'Lanterns have true gills and grow in clusters on wood.',
    culinaryUse: 'Delicious sautéed with butter and herbs, in risottos, or as a complement to eggs and poultry.'
  },
  {
    id: '3',
    name: 'Oyster Mushroom',
    scientificName: 'Pleurotus ostreatus',
    image: 'https://images.unsplash.com/photo-1586686804243-d763a9afb755?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveXN0ZXIlMjBtdXNocm9vbXxlbnwxfHx8fDE3NjQ3MTI5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'edible',
    description: 'Oyster mushrooms are versatile edible fungi that grow in shelf-like clusters. They have a mild, slightly sweet flavor and a delicate texture.',
    habitat: 'Saprobic on dead or dying hardwood trees, particularly beech, oak, and maple. Often found on logs and stumps.',
    season: 'Fall to Spring (September-April)',
    identification: [
      'Fan or oyster-shaped caps',
      'White to gray, brown, or tan coloring',
      'Short or absent stem, attached to the side',
      'White gills running down the stem',
      'Grows in shelf-like clusters'
    ],
    culinaryUse: 'Excellent in stir-fries, soups, and pasta dishes. Can be grilled or roasted. Often used as a meat substitute.'
  },
  {
    id: '4',
    name: 'Shiitake',
    scientificName: 'Lentinula edodes',
    image: 'https://images.unsplash.com/photo-1629665001701-a232a0ba4eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlpdGFrZSUyMG11c2hyb29tfGVufDF8fHx8MTc2NDcxMjk3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'edible',
    description: 'Shiitake is one of the most popular edible mushrooms worldwide, known for its rich, umami flavor. Originally from East Asia, it\'s now cultivated globally.',
    habitat: 'Grows on dead or dying hardwood trees, particularly shii, oak, maple, and beech. Commonly cultivated on logs.',
    season: 'Spring and Fall (cultivated year-round)',
    identification: [
      'Brown cap with white or tan scales',
      'Cap edges often curl under',
      'Cream-colored gills',
      'Tough, fibrous stem',
      'Distinct umami aroma when fresh'
    ],
    culinaryUse: 'Essential in Asian cuisine. Great in soups, stir-fries, and broths. Can be dried for intense flavor. Remove tough stems before cooking.'
  },
  {
    id: '5',
    name: 'Porcini',
    scientificName: 'Boletus edulis',
    image: 'https://images.unsplash.com/photo-1636887893497-3b13ea6f812d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3JjaW5pJTIwbXVzaHJvb218ZW58MXx8fHwxNzY0NzEyOTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'edible',
    description: 'Porcini, also known as King Bolete, is a highly prized edible mushroom with a rich, nutty flavor. It\'s a favorite in Italian and French cuisine.',
    habitat: 'Mycorrhizal with various trees including spruce, pine, chestnut, and oak. Found in forests and woodland areas.',
    season: 'Summer to Fall (June-November)',
    identification: [
      'Large, brown convex cap',
      'White to yellowish pore surface (no gills)',
      'Thick, bulbous white stem',
      'White net-like pattern on upper stem',
      'Does not bruise blue when cut'
    ],
    lookAlikes: 'Some bitter boletes. Always taste a small piece raw (and spit out) to check for bitterness before cooking.',
    culinaryUse: 'Excellent in risottos, pasta dishes, and soups. Can be dried for long-term storage and intense flavor.'
  },
  {
    id: '6',
    name: 'Fly Agaric',
    scientificName: 'Amanita muscaria',
    image: 'https://images.unsplash.com/photo-1602696288257-8da93a8b8c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBtdXNocm9vbXxlbnwxfHx8fDE3NjQ3MTI5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    edibility: 'poisonous',
    description: 'The Fly Agaric is one of the most iconic and recognizable mushrooms, featuring a bright red cap with white spots. It contains psychoactive compounds and is poisonous.',
    habitat: 'Mycorrhizal with birch and pine trees. Common in forests throughout temperate regions.',
    season: 'Summer to Fall (July-November)',
    identification: [
      'Bright red to orange cap',
      'White wart-like spots on cap',
      'White gills',
      'White stem with a ring',
      'Bulbous base with remnants of universal veil'
    ],
    lookAlikes: 'Caesar\'s mushroom (Amanita caesarea) is edible but rare in North America. It has a smooth yellow cap edge.',
    culinaryUse: 'DO NOT EAT. Contains toxic and psychoactive compounds including muscimol and ibotenic acid.'
  }
];
