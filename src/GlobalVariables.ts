export const characterStartUrl = 'https://rickandmortyapi.com/api/character?page=1'
export const locationStartUrl = 'https://rickandmortyapi.com/api/location?page=1'


export const mainBox = document.getElementById('mainBox') as HTMLElement

export const asideBox = document.getElementById('asideBox') as HTMLElement
export const asideBoxTitle = document.getElementById('asideBoxTitle') as HTMLHeadingElement
export const asideBoxP = document.getElementById('asideBoxP') as HTMLParagraphElement
export const asideBoxList = document.getElementById('asideBoxList') as HTMLUListElement
export const prevAsideBtn = document.getElementById('prevAsideBtn') as HTMLButtonElement
export const nextAsideBtn = document.getElementById('nextAsideBtn') as HTMLButtonElement

export const navgitationProperties:{
    aside: string,
    main: string,
} = {
    aside: 'episodes',
    main: 'episodes'
}



