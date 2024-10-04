import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-d2.js";
import { urlAPIFree } from "./config/url.js";

let currentPage = 1; 

get(urlAPIFree, fillTableAirdrop);

function searchFreeAirdrops(searchTerm) {
    const apiUrlFree = searchTerm === ''
        ? urlAPIFree
        : `${urlAPIFree}/search/${encodeURIComponent(searchTerm)}`;

    document.getElementById('loading').style.display = 'flex';
    document.getElementById('fillAirdrop').style.display = 'none';
    document.getElementById('pagination-controls').style.display = 'none';

    currentPage = 1;

    get(apiUrlFree)
        .then(freeData => {
            fillTableAirdrop(freeData);

            document.getElementById('loading').style.display = 'none';
            document.getElementById('fillAirdrop').style.display = 'table-row-group';
        })
        .catch(error => {
            console.error('Error fetching free airdrop data:', error);

            document.getElementById('loading').style.display = 'none';
        });
}

searchFreeAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchFreeAirdrops(searchTerm);
});