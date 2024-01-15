var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mainBox = document.getElementById('mainBox');
const asideBox = document.getElementById('asideBox');
const asideBoxTitle = document.getElementById('asideBoxTitle');
const asideBoxP = document.getElementById('asideBoxP');
const asideBoxList = document.getElementById('asideBoxList');
const prevAsideBtn = document.getElementById('prevAsideBtn');
const nextAsideBtn = document.getElementById('nextAsideBtn');
const navgitationProperties = {
    aside: 'episodes',
    main: 'episodes'
};
const getEpisodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://rickandmortyapi.com/api/episode';
    const response = yield fetch(url);
    const data = yield response.json();
    return data;
});
const getCharacters = (url) => __awaiter(void 0, void 0, void 0, function* () {
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
const printCharactersAside = (url) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (url === null)
        return;
    const page = url.charAt(url.length - 1);
    const initialCharacter = '';
    const lastCharacter = '';
    const data = yield getCharacters(url);
    prevAsideBtn.setAttribute('prev-data', (_a = data === null || data === void 0 ? void 0 : data.info) === null || _a === void 0 ? void 0 : _a.prev);
    nextAsideBtn.setAttribute('next-data', (_b = data === null || data === void 0 ? void 0 : data.info) === null || _b === void 0 ? void 0 : _b.next);
    asideBoxP.textContent = `There are ${data.info.count} characters. Showing from ${initialCharacter} to ${lastCharacter} `;
});
const printEspisodeMain = (id) => __awaiter(void 0, void 0, void 0, function* () {
    mainBox.innerHTML = '';
    const { name, air_date, episode, characters, url, created } = yield getEpisodeData(id);
    const HTMLFragment = document.createDocumentFragment();
    const episodeHeader = document.createElement('h3');
    episodeHeader.classList.add('text-3xl', 'mb-2');
    episodeHeader.textContent = name;
    HTMLFragment.appendChild(episodeHeader);
    const episodeInfoBox = document.createElement('div');
    episodeInfoBox.classList.add('ms-2', 'mb-3');
    const airDateP = document.createElement('p');
    airDateP.textContent = `Air date: ${air_date}`;
    episodeInfoBox.appendChild(airDateP);
    const episodeCodeP = document.createElement('p');
    episodeCodeP.textContent = `Episode code: ${episode}`;
    episodeInfoBox.appendChild(episodeCodeP);
    HTMLFragment.appendChild(episodeInfoBox);
    const charactersBox = document.createElement('div');
    const charactersHeader = document.createElement('h4');
    charactersHeader.classList.add('text-2xl', 'mb-2');
    charactersHeader.textContent = 'Characters in this episode';
    charactersBox.appendChild(charactersHeader);
    const charactersUl = document.createElement('ul');
    charactersUl.classList.add('ps-2', 'flex', 'flex-wrap', 'gap-4');
    characters.forEach(each => {
        const li = document.createElement('li');
        const liBox = document.createElement('div');
        liBox.classList.add('mb-1', 'mr-2');
        fetch(each)
            .then(resp => resp.json())
            .then(data => {
            liBox.setAttribute('char-id', data.id);
            const img = document.createElement('img');
            img.src = data.image;
            img.classList.add('w-60', 'rounded-lg', 'cursor-pointer');
            liBox.appendChild(img);
            const characterHeader = document.createElement('h5');
            characterHeader.classList.add('text-xl');
            characterHeader.textContent = data.name;
            liBox.appendChild(characterHeader);
            const characterInfoBox = document.createElement('div');
            const characterStatusP = document.createElement('p');
            characterStatusP.textContent = `Status: ${data.status}`;
            characterInfoBox.appendChild(characterStatusP);
            const characterSpecieP = document.createElement('p');
            characterSpecieP.textContent = `Specie: ${data.species}`;
            characterInfoBox.appendChild(characterSpecieP);
            liBox.appendChild(characterInfoBox);
        });
        li.appendChild(liBox);
        charactersUl.appendChild(li);
    });
    charactersBox.appendChild(charactersUl);
    HTMLFragment.appendChild(charactersBox);
    mainBox.appendChild(HTMLFragment);
});
const handleNextAsideBtnEpisodesClick = () => {
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
const handlePrevAsideBtnEpisodesClick = () => {
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
document.addEventListener('DOMContentLoaded', () => {
    printEpisodesAside(1, 11);
    printEspisodeMain(1);
    nextAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') {
            handleNextAsideBtnEpisodesClick();
        }
    });
    prevAsideBtn.addEventListener('click', () => {
        if (navgitationProperties.aside === 'episodes') {
            handlePrevAsideBtnEpisodesClick();
        }
    });
});
export {};
//# sourceMappingURL=app.js.map