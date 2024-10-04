import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-d2.js";
import { urlAPIPaid } from "./config/url.js";

let currentPage = 1; 

get(urlAPIPaid, fillTableAirdrop);

function searchPaidAirdrops(searchTerm) {
    const apiUrlPaid = searchTerm === ''
        ? urlAPIPaid
        : `${urlAPIPaid}/search/${encodeURIComponent(searchTerm)}`;

    document.getElementById('loading').style.display = 'flex';
    document.getElementById('fillAirdrop').style.display = 'none';
    document.getElementById('pagination-controls').style.display = 'none';

    currentPage = 1;

    get(apiUrlPaid)
        .then(paidData => {
            fillTableAirdrop(paidData);

            document.getElementById('loading').style.display = 'none';
            document.getElementById('fillAirdrop').style.display = 'table-row-group';
        })
        .catch(error => {
            console.error('Error fetching paid airdrop data:', error);

            document.getElementById('loading').style.display = 'none';
        });
}

searchPaidAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchPaidAirdrops(searchTerm);
});