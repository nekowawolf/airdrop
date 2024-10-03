import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-d1.js";
import { urlAPIFree } from "./config/url.js";

get(urlAPIFree, fillTableAirdrop);

function searchFreeAirdrops(searchTerm) {
    const apiUrlFree = searchTerm === ''
        ? urlAPIFree
        : `${urlAPIFree}/search/${encodeURIComponent(searchTerm)}`;

    get(apiUrlFree)
        .then(freeData => {
            fillTableAirdrop(freeData);
        })
        .catch(error => console.error('Error fetching free airdrop data:', error));
}

searchFreeAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchFreeAirdrops(searchTerm);
});
