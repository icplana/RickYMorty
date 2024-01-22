//PRINT ASIDES

import { getCharacterData, getCharacters, getEpisodeData, getLocationData, getLocations } from "../API/APIRequests.js";
import { asideBoxList, asideBoxP, asideBoxTitle, mainBox, navgitationProperties, nextAsideBtn, prevAsideBtn } from "../GlobalVariables.js";
import { Character, Episode, Location } from "../types/types.js";
import { handleAsideCharacterClick, handleAsideEpisodeClick, handleAsideLocationClick, handleMainCharacterClick, handleMainEpisodeClick, handleMainLocationClick } from "./EventHandlers.js";



//GENERAL FUNCTIONS

const printCharactersListForMain =  ( characters: string[] ) => {

    const charactersUl = document.createElement('ul')
    charactersUl.classList.add('ps-2', 'flex', 'flex-wrap', 'gap-4')

    characters.forEach( each => {

        const li = document.createElement('li')

        const liBox = document.createElement('div')
        liBox.classList.add('mb-1', 'mr-2','characterFromMain')
        

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

    return charactersUl
}
const printEpisodesListForMain =  ( episodes: string[] ) => {

    const episodesUl = document.createElement('ul')
    episodesUl.classList.add('ps-2', 'flex', 'flex-wrap', 'gap-4')

    episodes.forEach( each => {

        const li = document.createElement('li')

        const liBox = document.createElement('div')
        liBox.classList.add('mb-1', 'mr-2','episodeFromMain', 'w-48', 'cursor-pointer')
        

        fetch(each)
            .then( resp => resp.json())
            .then( data => {
                liBox.setAttribute('episode-id', data.id )                

                const episodeHeader = document.createElement('h5')
                episodeHeader.classList.add('text-xl')
                episodeHeader.textContent = data.name
                liBox.appendChild(episodeHeader)

                const episodeCodeP = document.createElement('p')
                episodeCodeP.textContent = data.episode
                liBox.appendChild( episodeCodeP )
                
                const episodeAirDateP = document.createElement('p')
                episodeAirDateP.textContent = data.air_date
                liBox.appendChild( episodeAirDateP )

            })

        li.appendChild(liBox)

        episodesUl.appendChild(li)
        
    })

    return episodesUl
}




//PRINT ASIDE

export const cleanAsideEvents = ():void => {

    const episodesList = document.querySelectorAll('.asideListEpisode')
    episodesList?.forEach( element => element.removeEventListener('click', handleAsideEpisodeClick ))

    const characterList = document.querySelectorAll('.asideListCharacter')
    characterList?.forEach( element => element.addEventListener('click', handleAsideCharacterClick ))

    const locationList = document.querySelectorAll('.asideListLocation')
    locationList?.forEach( element => element.addEventListener('click', handleAsideLocationClick ))


}

export const printEpisodesAside = async (start:number, end: number ):Promise<void> => {

    if ( !start || !end ) return

    cleanAsideEvents()

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
    asideBoxP.textContent = ''

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

    const episodesList = document.querySelectorAll('.asideListEpisode')

    episodesList.forEach( element => element.addEventListener('click', handleAsideEpisodeClick ))

    
}

export const printCharactersAside = async ( url: string ):Promise<void> => {
    
    if ( url === null ) return

    cleanAsideEvents()

    navgitationProperties.aside = 'characters'

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

export const printLocationsAside = async ( url: string ):Promise<void> => {

    if ( url === null ) return

    cleanAsideEvents()

    navgitationProperties.aside = 'locations'

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

export const cleanMainEvents = ():void => {

    const characterList = document.querySelectorAll('.characterFromMain') as NodeList    
    characterList?.forEach(each => each.removeEventListener('click', handleMainCharacterClick ))

    const episodeList = document.querySelectorAll('.episodeFromMain') as NodeList
    episodeList?.forEach( each => each.removeEventListener('click', (e:any) => handleMainEpisodeClick ))

    const locationFromCharacter = document.getElementById('locationFromCharacter') as HTMLSpanElement
    locationFromCharacter?.removeEventListener('click', () => handleMainLocationClick())
}

export const printEspisodeMain = async (id:number):Promise<void> => {
    
    cleanMainEvents()

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


    const charactersUl = printCharactersListForMain(characters)

    charactersBox.appendChild(charactersUl)

    HTMLFragment.appendChild( charactersBox )

    mainBox.appendChild( HTMLFragment )

    const characterList = document.querySelectorAll('.characterFromMain') as NodeList    
    characterList.forEach(each => each.addEventListener('click', handleMainCharacterClick ))
}


export const printCharacterMain = async (id:number):Promise<void> => {

    cleanMainEvents()


    const { name, status, species, type, gender, origin, location, image, episode, url, created }:Character = await getCharacterData( id )
    const locationId = location.url.slice(41)

    mainBox.innerHTML = ''

    const firstDiv = document.createElement('div')
    firstDiv.classList.add('flex', 'gap-4', 'mb-4')

    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    img.src = image
    imgDiv.appendChild(img)

    firstDiv.appendChild(imgDiv)

    const textDiv = document.createElement('div')

    const textHeader = document.createElement('h3')
    textHeader.classList.add('text-3xl')
    textHeader.textContent = name
    textDiv.appendChild(textHeader)

    const specieP = document.createElement('p')
    specieP.classList.add('font-bold')
    specieP.textContent = 'Specie: '
    const specieSpan = document.createElement('span')
    specieSpan.classList.add('font-normal')
    specieSpan.textContent = species
    specieP.appendChild(specieSpan)
    textDiv.appendChild(specieP)

    const statusP = document.createElement('p')
    statusP.classList.add('font-bold')
    statusP.textContent = 'Status: '
    const statusSpan = document.createElement('span')
    statusSpan.classList.add('font-normal')
    statusSpan.textContent = status
    statusP.appendChild(statusSpan)
    textDiv.appendChild(statusP)

    const genderP = document.createElement('p')
    genderP.classList.add('font-bold')
    genderP.textContent = 'Gender: '
    const genderSpan = document.createElement('span')
    genderSpan.classList.add('font-normal')
    genderSpan.textContent = gender
    genderP.appendChild(genderSpan)
    textDiv.appendChild(genderP)

    const locationP = document.createElement('p')
    locationP.classList.add('font-bold')
    locationP.textContent = 'Location: '
    const locationSpan = document.createElement('span')
    locationSpan.id = 'locationFromMain'
    locationSpan.classList.add('font-normal','cursor-pointer')
    locationSpan.setAttribute('location-id', locationId)
    locationSpan.textContent = location.name
    locationP.appendChild(locationSpan)
    textDiv.appendChild(locationP)

    firstDiv.appendChild(textDiv)

    const secondDiv = document.createElement('div')
    secondDiv.classList.add('ms-2')
    
    const secondDivHeader = document.createElement('h4')
    secondDivHeader.classList.add('text-2xl', 'mb-2', 'font-semibold')
    secondDivHeader.textContent =`List of episodes where ${name} appears`
    secondDiv.appendChild(secondDivHeader)

    const episodeUl = printEpisodesListForMain(episode)
    secondDiv.appendChild(episodeUl)

    mainBox.append(firstDiv, secondDiv)

    
    const episodeList = document.querySelectorAll('.episodeFromMain') as NodeList
    episodeList.forEach( each => each.addEventListener('click', handleMainEpisodeClick ))

    const locationFromCharacter = document.getElementById('locationFromMain') as HTMLSpanElement
    locationFromCharacter.addEventListener('click', handleMainLocationClick )
}


export const printLocationMain = async (id:number):Promise<void> => {

    cleanMainEvents()

    const { name, type, dimension, residents, url, created } = await getLocationData( id )

    mainBox.innerHTML = ''

    const HTMLFragment = document.createDocumentFragment()

    const locationHeader = document.createElement('h3')
    locationHeader.classList.add('text-3xl', 'mb-2')
    locationHeader.textContent = name
    HTMLFragment.appendChild(locationHeader)

    const typeP = document.createElement('p')
    typeP.classList.add('font-bold', 'mb-2')
    typeP.textContent = 'Type: '
    const typeSpan = document.createElement('span')
    typeSpan.classList.add('font-normal')
    typeSpan.textContent = type
    typeP.appendChild(typeSpan)
    HTMLFragment.appendChild(typeP)

    const dimensionP = document.createElement('p')
    dimensionP.classList.add('font-bold', 'mb-2')
    dimensionP.textContent = 'Dimension: '
    const dimensionSpan = document.createElement('span')
    dimensionSpan.classList.add('font-normal')
    dimensionSpan.textContent = dimension
    dimensionP.appendChild(dimensionSpan)
    HTMLFragment.appendChild(dimensionP)

    const listDiv = document.createElement('div')
    listDiv.classList.add('mb-4')

    const listHeader = document.createElement('h4')
    listHeader.classList.add('text-2xl', 'mb-2')
    listHeader.textContent = 'Characters from this dimension'
    listDiv.appendChild(listHeader)

    const charactersUl = printCharactersListForMain(residents)
    listDiv.appendChild(charactersUl)

    HTMLFragment.appendChild(listDiv)

    mainBox.appendChild(HTMLFragment)   

    const characterList = document.querySelectorAll('.characterFromMain') as NodeList    
    characterList.forEach(each => each.addEventListener('click', handleMainCharacterClick ))

}
