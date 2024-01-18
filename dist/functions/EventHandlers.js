import { characterStartUrl, locationStartUrl, nextAsideBtn, prevAsideBtn } from "../GlobalVariables.js";
import { printCharacterMain, printCharactersAside, printEpisodesAside, printEspisodeMain, printLocationMain, printLocationsAside } from "./PrintingFunctions.js";
export const handleMainCharacterClick = (e) => {
    const characterId = Number(e.target.getAttribute('char-id') || e.target.parentElement.getAttribute('char-id') || e.target.parentElement.parentElement.getAttribute('char-id'));
    printCharactersAside(characterStartUrl);
    printCharacterMain(characterId);
};
export const handleMainEpisodeClick = (e) => {
    var _a, _b;
    const episodeId = Number(((_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute('episode-id')) || ((_b = e.target) === null || _b === void 0 ? void 0 : _b.parentElement.getAttribute('episode-id')));
    printEspisodeMain(episodeId);
    printEpisodesAside(1, 11);
};
export const handleMainLocationClick = () => {
    const locationFromCharacter = document.getElementById('locationFromMain');
    const locationIdNumber = Number(locationFromCharacter.getAttribute('location-id'));
    printLocationMain(locationIdNumber);
    printLocationsAside(locationStartUrl);
};
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