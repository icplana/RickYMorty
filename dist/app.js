import { navgitationProperties, nextAsideBtn, prevAsideBtn } from './GlobalVariables.js';
import { handleNextAsideBtnCharactersClick, handleNextAsideBtnEpisodesClick, handleNextAsideBtnLocationsClick, handlePrevAsideBtnCharactersClick, handlePrevAsideBtnEpisodesClick, handlePrevAsideBtnLocationsClick } from './functions/EventHandlers.js';
import { printEpisodesAside, printEspisodeMain } from './functions/PrintingFunctions.js';
document.addEventListener('DOMContentLoaded', () => {
    printEpisodesAside(1, 11);
    printEspisodeMain(1);
    nextAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') {
            handleNextAsideBtnEpisodesClick();
        }
        if (navgitationProperties.aside === 'characters') {
            handleNextAsideBtnCharactersClick();
        }
        if (navgitationProperties.aside === 'locations') {
            handleNextAsideBtnLocationsClick();
        }
    });
    prevAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') {
            handlePrevAsideBtnEpisodesClick();
        }
        if (navgitationProperties.aside === 'characters') {
            handlePrevAsideBtnCharactersClick();
        }
        if (navgitationProperties.aside === 'locations') {
            handlePrevAsideBtnLocationsClick();
        }
    });
});
//# sourceMappingURL=app.js.map