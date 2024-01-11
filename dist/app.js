"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const asideBox = document.getElementById('asideBox');
const asideBoxTitle = document.getElementById('asideBoxTitle');
const asideBoxList = document.getElementById('asideBoxList');
const prevAsideBtn = document.getElementById('prevAsideBtn');
const nextAsideBtn = document.getElementById('nextAsideBtn');
const getEpisodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/episode';
    const response = yield fetch(url);
    const data = yield response.json();
    return data;
});
const getCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/character';
    const response = yield fetch(url);
    const data = yield response.json();
    return data;
});
const getLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/locations';
    const response = yield fetch(url);
    const data = yield response.json();
    return data;
});
const getEpisodeData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/episode/' + id;
    const response = yield fetch(url);
    const data = yield response.json();
    return data;
});
const getCharacterData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/character/' + id;
    const response = yield fetch(url);
    const data = yield response.json();
    console.log(data);
    return data;
});
const getLocationData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/location/' + id;
    const response = yield fetch(url);
    const data = yield response.json();
    console.log(data);
    return data;
});
const printEpisodesAside = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    let season = '';
    if (start === 1) {
        season = "Season 01";
        prevAsideBtn.setAttribute('start-data', '');
        prevAsideBtn.setAttribute('end-data', '');
        prevAsideBtn.classList.add('bg-gray-500', 'cursor-default', 'disabled');
        prevAsideBtn.classList.remove('bg-gray-800');
        nextAsideBtn.setAttribute('start-data', '12');
        nextAsideBtn.setAttribute('end-data', '21');
    }
    if (start === 12) {
        season = "Season 02";
        prevAsideBtn.setAttribute('start-data', '1');
        prevAsideBtn.setAttribute('end-data', '11');
        nextAsideBtn.setAttribute('start-data', '22');
        nextAsideBtn.setAttribute('end-data', '31');
    }
    if (start === 22) {
        season = "Season 03";
        prevAsideBtn.setAttribute('start-data', '12');
        prevAsideBtn.setAttribute('end-data', '21');
        nextAsideBtn.setAttribute('start-data', '32');
        nextAsideBtn.setAttribute('end-data', '41');
    }
    if (start === 32) {
        season = "Season 04";
        prevAsideBtn.setAttribute('start-data', '22');
        prevAsideBtn.setAttribute('end-data', '31');
        nextAsideBtn.setAttribute('start-data', '42');
        nextAsideBtn.setAttribute('end-data', '51');
    }
    if (start === 42) {
        season = "Season 05";
        prevAsideBtn.setAttribute('start-data', '32');
        prevAsideBtn.setAttribute('end-data', '41');
        nextAsideBtn.setAttribute('start-data', '');
        nextAsideBtn.setAttribute('end-data', '');
        nextAsideBtn.classList.add('bg-gray-500', 'cursor-default', 'disabled');
        nextAsideBtn.classList.remove('bg-gray-800');
    }
    asideBoxTitle.textContent = season;
    let htmlFragment = document.createDocumentFragment();
    for (let i = start; i <= end; i++) {
        const data = yield getEpisodeData(i);
        const newLi = document.createElement('li');
        newLi.classList.add('mb-1.5', 'hover:underline', 'cursor-pointer');
        newLi.textContent = data.name + ' ';
        const newSpan = document.createElement('span');
        newSpan.textContent = data.episode;
        newSpan.classList.add('italic', 'text-sm');
        newLi.appendChild(newSpan);
        htmlFragment.appendChild(newLi);
    }
    asideBoxList.innerHTML = '';
    asideBoxList.appendChild(htmlFragment);
});
document.addEventListener('DOMContentLoaded', () => {
    printEpisodesAside(1, 11);
    nextAsideBtn.addEventListener('click', () => {
        if (nextAsideBtn.classList.contains('disabled'))
            return;
        const start = Number(nextAsideBtn.getAttribute('start-data'));
        const end = Number(nextAsideBtn.getAttribute('end-data'));
        if (start === 12) {
            prevAsideBtn.classList.remove('bg-gray-500', 'cursor-default', 'disabled');
            prevAsideBtn.classList.add('bg-gray-800');
        }
        printEpisodesAside(start, end);
    });
    prevAsideBtn.addEventListener('click', () => {
        if (prevAsideBtn.classList.contains('disabled'))
            return;
        const start = Number(prevAsideBtn.getAttribute('start-data'));
        const end = Number(prevAsideBtn.getAttribute('end-data'));
        if (start === 32) {
            nextAsideBtn.classList.remove('bg-gray-500', 'cursor-default', 'disabled');
            nextAsideBtn.classList.add('bg-gray-800');
        }
        printEpisodesAside(start, end);
    });
});
//# sourceMappingURL=app.js.map