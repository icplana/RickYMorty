//HANDLE CLICK EVENTS

import { characterStartUrl, locationStartUrl, nextAsideBtn, prevAsideBtn } from "../GlobalVariables.js"
import { printCharacterMain, printCharactersAside, printEpisodesAside, printEspisodeMain, printLocationMain, printLocationsAside } from "./PrintingFunctions.js"



export const handleMainCharacterClick = (e:any):void => {
    
    const characterId:number = Number(e.target.getAttribute('char-id') || e.target.parentElement.getAttribute('char-id')||e.target.parentElement.parentElement.getAttribute('char-id'))
    printCharactersAside( characterStartUrl )
    printCharacterMain(characterId)
}

export const handleMainEpisodeClick = (e:any):void => {

    const episodeId = Number( e.target?.getAttribute('episode-id') || e.target?.parentElement.getAttribute('episode-id')) 
    printEspisodeMain( episodeId )
    printEpisodesAside( 1, 11 )
}

export const handleMainLocationClick = ():void => {  

    const locationFromCharacter = document.getElementById('locationFromMain') as HTMLSpanElement
    const locationIdNumber = Number(locationFromCharacter.getAttribute('location-id'))
    printLocationMain(locationIdNumber)
    printLocationsAside( locationStartUrl )
}






export const handleAsideEpisodeClick = (e:any):void => {
    
    const id = e.target.getAttribute('episode-id') || e.target.parentElement.getAttribute('episode-id')
 
    printEspisodeMain(id)    
 }
 
 export const handleAsideCharacterClick = (e:any):void => {
     
    const id = e.target.getAttribute('character-id')
 
    printCharacterMain(id)    
 }
 
 export const handleAsideLocationClick = (e:any):void => {
     const id = e.target.getAttribute('location-id')
 
     printLocationMain(id)   
 }
 
 
 export const handleNextAsideBtnEpisodesClick = ():void => {
     if ( nextAsideBtn.classList.contains('disabled')) return
 
     const start:number = Number(nextAsideBtn.getAttribute('start-data'))
     const end:number = Number(nextAsideBtn.getAttribute('end-data'))
 
     if ( start === 12 ){
         prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
         prevAsideBtn.classList.add('bg-gray-800')
     }
 
     printEpisodesAside(start, end)
 }
 
 export const handlePrevAsideBtnEpisodesClick = ():void => {
     if ( prevAsideBtn.classList.contains('disabled')) return
 
     const start:number = Number(prevAsideBtn.getAttribute('start-data'))
     const end:number = Number(prevAsideBtn.getAttribute('end-data'))
 
     if ( start === 32 ){
         nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default','disabled')
         nextAsideBtn.classList.add('bg-gray-800')
     }
 
     printEpisodesAside(start, end)
 }
 
 export const handlePrevAsideBtnCharactersClick = ():void => {
     if ( prevAsideBtn.classList.contains('disabled') ) return
 
     const url:string = prevAsideBtn.getAttribute('prev-data')!
 
     printCharactersAside( url )
 }
 
 export const handleNextAsideBtnCharactersClick = ():void => {
     if ( nextAsideBtn.classList.contains('disabled') ) return
 
     const url:string = nextAsideBtn.getAttribute('next-data')!
 
     printCharactersAside( url )
 
 }
 
 export const handlePrevAsideBtnLocationsClick = ():void => {
     if ( prevAsideBtn.classList.contains('disabled') ) return
 
     const url:string = prevAsideBtn.getAttribute('prev-data')!
 
     printLocationsAside( url )
 }
 
 export const handleNextAsideBtnLocationsClick = ():void => {
     if ( nextAsideBtn.classList.contains('disabled') ) return
 
     const url:string = nextAsideBtn.getAttribute('next-data')!
 
     printLocationsAside( url )
 }
 
 