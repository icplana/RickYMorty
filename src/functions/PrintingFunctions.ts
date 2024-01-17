//PRINT ASIDES

import { getCharacterData, getCharacters, getEpisodeData, getLocationData, getLocations } from "../API/APIRequests.js";
import { asideBoxList, asideBoxP, asideBoxTitle, mainBox, navgitationProperties, nextAsideBtn, prevAsideBtn } from "../GlobalVariables.js";
import { Character, Episode, Location } from "../types/types.js";
import { handleAsideCharacterClick, handleAsideEpisodeClick, handleAsideLocationClick } from "./EventHandlers.js";

export const cleanAsideEvents = () => {}

export const printEpisodesAside = async (start:number, end: number ) => {

    navgitationProperties.aside = 'episodes'

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
        newLi.setAttribute('episode-id', data.id.toString() )
        newLi.classList.add('mb-1.5','hover:underline', 'cursor-pointer','asideListEpisode')
        newLi.textContent = data.name + ' '
        const newSpan = document.createElement('span')
        newSpan.textContent = data.episode
        newSpan.classList.add('italic', 'text-sm')
        newLi.appendChild(newSpan)

        htmlFragment.appendChild(newLi)
    }

    asideBoxList.innerHTML = ''
    asideBoxList.appendChild( htmlFragment )

    const list = document.querySelectorAll('.asideListEpisode')

    list.forEach( element => element.addEventListener('click', handleAsideEpisodeClick ))

    
}

export const printCharactersAside = async ( url: string ) => {
    
    if ( url === null ) return

    navgitationProperties.aside = 'characters'

    const list = document.querySelectorAll('.asideListEpisode')
    list.forEach( element => element.removeEventListener('click', handleAsideEpisodeClick ))

    const data = await getCharacters( url )

    const page:number = Number(url.slice(47))
    const initialCharacter:number = page * 20 - 19
    const lastCharacter:number = Math.min(page * 20, data.info.count )

  
    if ( initialCharacter === 1 ) {
        prevAsideBtn.classList.add('bg-gray-500', 'cursor-default','disabled')
        prevAsideBtn.classList.remove('bg-gray-800')
    } else {
        prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
        prevAsideBtn.classList.add('bg-gray-800')
    }

    if ( lastCharacter === data.info.count ) {
        nextAsideBtn.classList.add('bg-gray-500', 'cursor-default','disabled')
        nextAsideBtn.classList.remove('bg-gray-800')
    } else{
        nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
        nextAsideBtn.classList.add('bg-gray-800')
    }

    prevAsideBtn.setAttribute('prev-data', data?.info?.prev )
    prevAsideBtn.setAttribute('first-character', initialCharacter.toString() )

    nextAsideBtn.setAttribute('next-data', data?.info?.next )
    nextAsideBtn.setAttribute('last-character', lastCharacter.toString() )


    asideBoxTitle.textContent = 'Characters'
    asideBoxP.textContent = `There are ${data.info.count} characters. Showing from ${initialCharacter} to ${lastCharacter}. Page ${page}/${data.info.pages} `

    const charactersList:Character[] = data.results
    asideBoxList.innerHTML = ''

    const HTMLFragment = document.createDocumentFragment()

    charactersList.forEach( each => {
        const newLi = document.createElement('li')
        newLi.classList.add('mb-1.5', 'hover:underline', 'cursor-pointer', 'asideListCharacter')
        newLi.setAttribute('character-id', each.id.toString() )
        newLi.textContent = each.name
        HTMLFragment.appendChild(newLi)
    })

    asideBoxList.appendChild(HTMLFragment)

    const characterList = document.querySelectorAll('.asideListCharacter')

    characterList.forEach( element => element.addEventListener('click', handleAsideCharacterClick ))

    
}

export const printLocationsAside = async ( url: string ) => {

    if ( url === null ) return

    navgitationProperties.aside = 'locations'

    const episodesList = document.querySelectorAll('.asideListEpisode')
    episodesList.forEach( element => element.removeEventListener('click', handleAsideEpisodeClick ))

    const characterList = document.querySelectorAll('.asideListCharacter')
    characterList.forEach( element => element.removeEventListener('click', handleAsideCharacterClick ))

    const data = await getLocations( url )

    const page:number = Number(url.slice(46))
    const initialLocation:number = page * 20 - 19
    const lastLocation:number = Math.min(page * 20, data.info.count )

  
    if ( initialLocation === 1 ) {
        prevAsideBtn.classList.add('bg-gray-500', 'cursor-default','disabled')
        prevAsideBtn.classList.remove('bg-gray-800')
    } else {
        prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
        prevAsideBtn.classList.add('bg-gray-800')
    }

    if ( lastLocation === data.info.count ) {
        nextAsideBtn.classList.add('bg-gray-500', 'cursor-default','disabled')
        nextAsideBtn.classList.remove('bg-gray-800')
    } else{
        nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
        nextAsideBtn.classList.add('bg-gray-800')
    }

    prevAsideBtn.setAttribute('prev-data', data?.info?.prev )
    prevAsideBtn.setAttribute('first-location', initialLocation.toString() )

    nextAsideBtn.setAttribute('next-data', data?.info?.next )
    nextAsideBtn.setAttribute('last-location', lastLocation.toString() )


    asideBoxTitle.textContent = 'Location'
    asideBoxP.textContent = `There are ${data.info.count} locations. Showing from ${initialLocation} to ${lastLocation}. Page ${page}/${data.info.pages} `

    const locationsList:Location[] = data.results
    asideBoxList.innerHTML = ''

    const HTMLFragment = document.createDocumentFragment()

    locationsList.forEach( each => {
        const newLi = document.createElement('li')
        newLi.classList.add('mb-1.5', 'hover:underline', 'cursor-pointer', 'asideListLocation')
        newLi.setAttribute('location-id', each.id.toString() )
        newLi.textContent = each.name
        HTMLFragment.appendChild(newLi)
    })

    asideBoxList.appendChild(HTMLFragment)

    const locationList = document.querySelectorAll('.asideListLocation')

    locationList.forEach( element => element.addEventListener('click', handleAsideLocationClick ))
}


//PRINT MAINS

export const cleanMainEvens = () => {}

export const printEspisodeMain = async (id:number) => {
    
    mainBox.innerHTML = ''

    const { name, air_date, episode, characters, url, created } = await getEpisodeData(id)

    const HTMLFragment = document.createDocumentFragment()

    const episodeHeader = document.createElement('h3')
    episodeHeader.classList.add('text-3xl', 'mb-2')
    episodeHeader.textContent = name
    HTMLFragment.appendChild( episodeHeader )

    const episodeInfoBox = document.createElement('div')
    episodeInfoBox.classList.add('ms-2', 'mb-3')

    const airDateP = document.createElement('p')
    airDateP.textContent = `Air date: ${air_date}`
    episodeInfoBox.appendChild( airDateP )

    const episodeCodeP = document.createElement('p')
    episodeCodeP.textContent = `Episode code: ${episode}`
    episodeInfoBox.appendChild( episodeCodeP )

    HTMLFragment.appendChild(episodeInfoBox)

    const charactersBox = document.createElement('div')

    const charactersHeader = document.createElement('h4')
    charactersHeader.classList.add('text-2xl', 'mb-2')
    charactersHeader.textContent = 'Characters in this episode'
    charactersBox.appendChild( charactersHeader )    

    const charactersUl = document.createElement('ul')
    charactersUl.classList.add('ps-2', 'flex', 'flex-wrap', 'gap-4')
    characters.forEach( each => {

        const li = document.createElement('li')

        const liBox = document.createElement('div')
        liBox.classList.add('mb-1', 'mr-2','characterFromEpisodeMain')
        

        fetch(each)
            .then( resp => resp.json())
            .then( data => {
                liBox.setAttribute('char-id', data.id )

                const img = document.createElement('img')
                img.src = data.image
                img.classList.add('w-60', 'rounded-lg', 'cursor-pointer')
                liBox.appendChild( img )

                const characterHeader = document.createElement('h5')
                characterHeader.classList.add('text-xl')
                characterHeader.textContent = data.name
                liBox.appendChild(characterHeader)

                const characterInfoBox = document.createElement('div')
                
                const characterStatusP = document.createElement('p')
                characterStatusP.textContent = `Status: ${data.status}`
                characterInfoBox.appendChild( characterStatusP )

                const characterSpecieP = document.createElement('p')
                characterSpecieP.textContent = `Specie: ${data.species}`
                characterInfoBox.appendChild( characterSpecieP )

                liBox.appendChild( characterInfoBox )
   

            })

        li.appendChild(liBox)

        charactersUl.appendChild(li)
        
    })

    charactersBox.appendChild(charactersUl)

    HTMLFragment.appendChild( charactersBox )

    mainBox.appendChild( HTMLFragment )

    const characterList = document.querySelectorAll('.characterFromEpisodeMain') as NodeList

    

    characterList.forEach(each => each.addEventListener('click', (e:any) => {
      
        const characterId:number = Number(e.target.parentElement.getAttribute('char-id')||e.target.parentElement.parentElement.getAttribute('char-id'))
        
        printCharactersAside('https://rickandmortyapi.com/api/character?page=1')
        printCharacterMain(characterId)

    }))
}


export const printCharacterMain = async (id:number):Promise<void> => {

    const { name, status, species, type, gender, origin, location, image, episode, url, created }:Character = await getCharacterData( id )
    const locationId = location.url.slice(41)
    mainBox.innerHTML = `
    <div class="flex gap-4 mb-4">
        <div>
            <img src="${image}" class="rounded-2xl" alt="">
        </div>
        <div>
            <h3 class="text-3xl">${name}</h3>
            <p class="font-bold">Specie: <span class="font-normal">${species}</span></p>
            <p class="font-bold">Status: <span class="font-normal">${status}</span></p>
            <p class="font-bold">Gender: <span class="font-normal">${gender}</span></p>
            <p class="font-bold">Dimension: <span location-id="${locationId}" id="locationFromCharacter" class="font-normal hover:underline cursor-pointer">${location.name}</span></p>
        </div>
    </div>

    <div class="ms-2">
        <h4 class="text-2xl mb-2 font-semibold">List of episodes where ${name} appears</h4>
        <ul class="flex flex-wrap gap-6">
            ${episode.map( each => {
                const id = each.slice(40)
                return `
                <li class="cursor-pointer hover:underline episodeFromCharacterMain">
                    <div>
                        <h5 class="text-xl bold" episode-id="${id}">Episode ${id}</h5>
                    </div>
                </li>
                `
            }).join('')}
        </ul>
    </div>`
    
    const list = document.querySelectorAll('.episodeFromCharacterMain') as NodeList

    list.forEach( each => {
        each.addEventListener('click', (e:any) => {
            const episodeId = Number( e.target?.getAttribute('episode-id'))
            printEspisodeMain( episodeId )
            printEpisodesAside( 1, 11)
        })
    })

    const locationFromCharacter = document.getElementById('locationFromCharacter') as HTMLSpanElement
    locationFromCharacter.addEventListener('click', () => {
        const locationId = Number(locationFromCharacter.getAttribute('location-id'))
        printLocationMain(locationId)
        printLocationsAside( 'https://rickandmortyapi.com/api/location?page=1' )
    })
}


export const printLocationMain = async (id:number):Promise<void> => {

    const { name, type, dimension, residents, url, created } = await getLocationData( id )

    mainBox.innerHTML =`<h3 class="text-3xl mb-2">${name}</h3>
    <p class="font-bold mb-2">Type: <span class="font-normal">${type}</span></p>
    <p class="font-bold mb-2">Dimension: <span class="font-normal">${dimension}</span></p>

    <div class="mb-4">
        <h4 class="text-2xl mb-2">Characters from this dimension</h4>
        <ul class="ps-2 flex flex-wrap gap-4">
        ${residents.map( each => {
            const id = each.slice(42)
            return `
            <li class="cursor-pointer hover:underline characterFromLocationMain">
                <div>
                    <h5 class="text-xl bold" character-id="${id}">Character ${id}</h5>
                </div>
            </li>
            `
        }).join('')}
        </ul>
    </div>`

    const list = document.querySelectorAll('.characterFromLocationMain') as NodeList

    list.forEach( each => {
        each.addEventListener('click', (e:any) => {
            const characterId = Number( e.target?.getAttribute('character-id'))
            printCharacterMain( characterId )
            printCharactersAside( 'https://rickandmortyapi.com/api/character?page=1' )
        })
    })

}
