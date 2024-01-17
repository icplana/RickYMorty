import { navgitationProperties, nextAsideBtn, prevAsideBtn } from './GlobalVariables.js';
import { handleNextAsideBtnCharactersClick, handleNextAsideBtnEpisodesClick, handleNextAsideBtnLocationsClick, handlePrevAsideBtnCharactersClick, handlePrevAsideBtnEpisodesClick, handlePrevAsideBtnLocationsClick } from './functions/EventHandlers.js';
import { printEpisodesAside, printEspisodeMain } from './functions/PrintingFunctions.js';


   

// printEpisodesAside(1,11)


document.addEventListener('DOMContentLoaded', () => {
    printEpisodesAside(1,11)

    printEspisodeMain(1)

    nextAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') { handleNextAsideBtnEpisodesClick() }
        if (navgitationProperties.aside === 'characters') { handleNextAsideBtnCharactersClick() }
        if (navgitationProperties.aside === 'locations') { handleNextAsideBtnLocationsClick() }
    })

    prevAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') { handlePrevAsideBtnEpisodesClick() }
        if (navgitationProperties.aside === 'characters') { handlePrevAsideBtnCharactersClick() }
        if (navgitationProperties.aside === 'locations') { handlePrevAsideBtnLocationsClick() }
    } )

    
})



// PENDING

    // - Avoid innerHTML in main renders
    // DONE - Organize the code in diferent sheets
    // - create cleaning event listener in main and aside
    // - create function to avoid repeating code in aside and main render functions
    // - use variables to avoid hardcoding suchs as 'episodes'/'characters'/'locations', urls or others
