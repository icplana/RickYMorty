const asideBox = document.getElementById('asideBox') as HTMLElement
const asideBoxTitle = document.getElementById('asideBoxTitle') as HTMLHeadingElement
const asideBoxList = document.getElementById('asideBoxList') as HTMLUListElement
const prevAsideBtn = document.getElementById('prevAsideBtn') as HTMLButtonElement
const nextAsideBtn = document.getElementById('nextAsideBtn') as HTMLButtonElement




type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

type LocationD = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string,
}

type Character = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: object,
    location: object,
    image: string,
    episode: string[],
    url: string,
    created: string,
}

const getEpisodes = async () => {
    
    const url = 'https://rickandmortyapi.com/api/episode'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

const getCharacters = async () => {

    const url = 'https://rickandmortyapi.com/api/character'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

const getLocations = async () => {

    const url = 'https://rickandmortyapi.com/api/locations'
    const response = await fetch(url)
    const data = await response.json()

    return data
}

const getEpisodeData = async ( id: number ):Promise<Episode> => {

    const url = 'https://rickandmortyapi.com/api/episode/' + id
    const response = await fetch(url)
    const data = await response.json()

    return data
}

const getCharacterData = async (id: number ):Promise<Character> => {

    const url = 'https://rickandmortyapi.com/api/character/' + id
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data
}

const getLocationData = async (id: number ):Promise<LocationD> => {

    const url = 'https://rickandmortyapi.com/api/location/' + id
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data
}


const printEpisodesAside = async (start:number, end: number ) => {
    let season: string = ''
    if ( start === 1 ) {
        season = "Season 01";
        prevAsideBtn.setAttribute('start-data', '')
        prevAsideBtn.setAttribute('end-data', '')
        prevAsideBtn.classList.add('bg-gray-500', 'cursor-default','disabled')
        prevAsideBtn.classList.remove('bg-gray-800')

        nextAsideBtn.setAttribute('start-data', '12')
        nextAsideBtn.setAttribute('end-data', '21')
    }
    if ( start === 12 ) {
        season = "Season 02"
        prevAsideBtn.setAttribute('start-data', '1')
        prevAsideBtn.setAttribute('end-data', '11')

        nextAsideBtn.setAttribute('start-data', '22')
        nextAsideBtn.setAttribute('end-data', '31')
    }
    if ( start === 22 ) {
        season = "Season 03"
        prevAsideBtn.setAttribute('start-data', '12')
        prevAsideBtn.setAttribute('end-data', '21')

        nextAsideBtn.setAttribute('start-data', '32')
        nextAsideBtn.setAttribute('end-data', '41')
    }
    if ( start === 32 ) {
        season = "Season 04"
        prevAsideBtn.setAttribute('start-data', '22')
        prevAsideBtn.setAttribute('end-data', '31')

        nextAsideBtn.setAttribute('start-data', '42')
        nextAsideBtn.setAttribute('end-data', '51')
    }
    if ( start === 42 ) {
        season = "Season 05"
        prevAsideBtn.setAttribute('start-data', '32')
        prevAsideBtn.setAttribute('end-data', '41')

        nextAsideBtn.setAttribute('start-data', '')
        nextAsideBtn.setAttribute('end-data', '')
        nextAsideBtn.classList.add('bg-gray-500', 'cursor-default', 'disabled')
        nextAsideBtn.classList.remove('bg-gray-800')
    }
    
    asideBoxTitle.textContent = season

    let htmlFragment = document.createDocumentFragment()

    for ( let i:number = start; i <= end; i++ ){
        const data: Episode = await getEpisodeData(i)
        const newLi = document.createElement('li')
        newLi.classList.add('mb-1.5','hover:underline', 'cursor-pointer')
        newLi.textContent = data.name + ' '
        const newSpan = document.createElement('span')
        newSpan.textContent = data.episode
        newSpan.classList.add('italic', 'text-sm')
        newLi.appendChild(newSpan)

        htmlFragment.appendChild(newLi)
    }

    asideBoxList.innerHTML = ''
    asideBoxList.appendChild( htmlFragment )

    
}


document.addEventListener('DOMContentLoaded', () => {
    printEpisodesAside(1,11)

    nextAsideBtn.addEventListener('click', () => {

        if ( nextAsideBtn.classList.contains('disabled')) return

        const start:number = Number(nextAsideBtn.getAttribute('start-data'))
        const end:number = Number(nextAsideBtn.getAttribute('end-data'))

        if ( start === 12 ){
            prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
            prevAsideBtn.classList.add('bg-gray-800')
        }

        printEpisodesAside(start, end)
    })

    prevAsideBtn.addEventListener('click', () => {

        if ( prevAsideBtn.classList.contains('disabled')) return

        const start:number = Number(prevAsideBtn.getAttribute('start-data'))
        const end:number = Number(prevAsideBtn.getAttribute('end-data'))

        if ( start === 32 ){
            nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
            nextAsideBtn.classList.add('bg-gray-800')
        }

        printEpisodesAside(start, end)
    })
})


