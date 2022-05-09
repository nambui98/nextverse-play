const staticSrc = 'https://nextverse.org/static/booldp';

export const UpcomingItems = [
  ...[...Array(16)].map((el, idx) => ({
    poster: `${staticSrc}/output${idx}.png`,
    mov: `${staticSrc}/output${idx}.mov`,
    webm: `${staticSrc}/output${idx}.webm`,
    name: 'Product Name',
    price: '0,0090 Nver',
    type: 'upcoming',
  })),
]

export const SellingItems = [
  ...[...Array(16)].map((el, idx) => ({
    poster: `${staticSrc}/output${idx}.png`,
    mov: `${staticSrc}/output${idx}.mov`,
    webm: `${staticSrc}/output${idx}.webm`,
    name: 'Product Name',
    price: '0,0090 Nver',
    type: 'selling',
  })),
]

export const PastSellingItems = [
  ...[...Array(16)].map((el, idx) => ({
    poster: `${staticSrc}/output${idx}.png`,
    mov: `${staticSrc}/output${idx}.mov`,
    webm: `${staticSrc}/output${idx}.webm`,
    name: 'Product Name',
    price: '0,0090 Nver',
    type: 'past',
  })),
]