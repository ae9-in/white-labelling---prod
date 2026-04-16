export const ZONES = [
  { value: 'Bangalore South', label: 'Bangalore South' },
  { value: 'Bangalore North', label: 'Bangalore North' },
  { value: 'Bangalore Central', label: 'Bangalore Central' },
  { value: 'Bangalore East', label: 'Bangalore East' },
  { value: 'Bangalore West', label: 'Bangalore West' },
  { value: 'Bangalore Rural', label: 'Bangalore Rural' },
  { value: 'Mysore Road', label: 'Mysore Road' },
  { value: 'Hosur', label: 'Hosur' },
  { value: 'Mysore', label: 'Mysore' }
];

export const PLACES_BY_ZONE = {
  'Bangalore South': [
    'Banashankari',
    'Jayanagar',
    'Jp nagar',
    'BTM layout',
    'Uttarahalli,Padmanabanagar',
    'Bommanahalli',
    'Koramangala',
    'RR nagar',
    'Basavanagudi'
  ],
  'Bangalore North': [
    'Yelahanka',
    'Vidyaranyapura',
    'Sahakarnagar',
    'Hebbal',
    'RT Nagar',
    'Thanisandra',
    'Kodigehalli ,Jakkur',
    'Sanjaynagar &RMV extenstion',
    'Mathikere'
  ],
  'Bangalore Central': [
    'Ashoknagar',
    'Malleshwaram',
    'Church street, Mg road , Brigade road',
    'Sadashivnagar',
    'Ulsoor',
    'Bel Circle',
    'Shivajinagar, Commercial street',
    'Vasanth nagar & Guttahalli',
    'Rajajinagar+Sheshadripuram'
  ],
  'Bangalore East': [
    'Whitefield',
    'Marathahalli',
    'Indiranagar',
    'HSR layout',
    'KR Puram',
    'Cv Raman Nagar',
    'Mahadevpura',
    'Bellandur',
    'Sarjapur'
  ],
  'Bangalore West': [
    'Jalahalli',
    'Yashwanthpur',
    'Vijayanagar',
    'Kengeri',
    'Nagarbhavi',
    'Peenya',
    'Vijayanagar',
    'Basaveshwaranagar',
    'Nayandahalli,Hanumanthnagar'
  ],
  'Bangalore Rural': [
    'Devanahalli',
    'Dodaballapura',
    'Hoskote',
    'Airport Road Bangalore',
    'Tumkur Road',
    'Vijayapura',
    'Nelamangala',
    'Magadi',
    'Hesarghatta'
  ],
  'Mysore Road': [
    'Bidadi',
    'Ramnagar',
    'Kanakpura',
    'Channapatna',
    'Maddur',
    'Mandya',
    'Srirangapatna',
    'Other side of Mysore'
  ],
  'Hosur': [
    'Bagalur Road',
    'Mathigiri',
    'Dankanikottai Road',
    'Anthivadi Hosur'
  ],
  'Mysore': [
    'Vijayanagar',
    'Gokulam',
    'Kuvempunagar',
    'Jayanagar',
    'Bannimantap,Palace road',
    'Yadavgiri',
    'Brindavan Extension',
    'Siddhartha Nagar',
    'Chamundipuram'
  ]
};

export const ALL_PLACES = Object.values(PLACES_BY_ZONE).flat();
