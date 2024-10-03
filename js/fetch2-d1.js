import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-d1.js";
import { urlAPIPaid } from "./config/url.js";

get(urlAPIPaid, fillTableAirdrop);

function searchPaidAirdrops(searchTerm) {
    const apiUrlPaid = searchTerm === ''
        ? urlAPIPaid
        : `${urlAPIPaid}/search/${encodeURIComponent(searchTerm)}`;

    get(apiUrlPaid)
        .then(paidData => {
            fillTableAirdrop(paidData);
        })
        .catch(error => console.error('Error fetching paid airdrop data:', error));
}

searchPaidAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchPaidAirdrops(searchTerm);
});
