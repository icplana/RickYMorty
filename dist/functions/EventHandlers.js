import { nextAsideBtn, prevAsideBtn } from "../GlobalVariables.js";
import { printCharacterMain, printCharactersAside, printEpisodesAside, printEspisodeMain, printLocationMain, printLocationsAside } from "./PrintingFunctions.js";
export const handleAsideEpisodeClick = (e) => {
    const id = e.target.getAttribute('episode-id') || e.target.parentElement.getAttribute('episode-id');
    printEspisodeMain(id);
};
export const handleAsideCharacterClick = (e) => {
    const id = e.target.getAttribute('character-id');
    printCharacterMain(id);
};
export const handleAsideLocationClick = (e) => {
    const id = e.target.getAttribute('location-id');
    printLocationMain(id);
};
export const handleNextAsideBtnEpisodesClick = () => {
    if (nextAsideBtn.classList.contains('disabled'))
        return;
    const start = Number(nextAsideBtn.getAttribute('start-data'));
    const end = Number(nextAsideBtn.getAttribute('end-data'));
    if (start === 12) {
        prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default', 'disabled');
        prevAsideBtn.classList.add('bg-gray-800');
    }
    printEpisodesAside(start, end);
};
export const handlePrevAsideBtnEpisodesClick = () => {
    if (prevAsideBtn.classList.contains('disabled'))
        return;
    const start = Number(prevAsideBtn.getAttribute('start-data'));
    const end = Number(prevAsideBtn.getAttribute('end-data'));
    if (start === 32) {
        nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default', 'disabled');
        nextAsideBtn.classList.add('bg-gray-800');
    }
    printEpisodesAside(start, end);
};
export const handlePrevAsideBtnCharactersClick = () => {
    if (prevAsideBtn.classList.contains('disabled'))
        return;
    const url = prevAsideBtn.getAttribute('prev-data');
    printCharactersAside(url);
};
export const handleNextAsideBtnCharactersClick = () => {
    if (nextAsideBtn.classList.contains('disabled'))
        return;
    const url = nextAsideBtn.getAttribute('next-data');
    printCharactersAside(url);
};
export const handlePrevAsideBtnLocationsClick = () => {
    if (prevAsideBtn.classList.contains('disabled'))
        return;
    const url = prevAsideBtn.getAttribute('prev-data');
    printLocationsAside(url);
};
export const handleNextAsideBtnLocationsClick = () => {
    if (nextAsideBtn.classList.contains('disabled'))
        return;
    const url = nextAsideBtn.getAttribute('next-data');
    printLocationsAside(url);
};
//# sourceMappingURL=EventHandlers.js.map