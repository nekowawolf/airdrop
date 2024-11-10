import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-paid-d1.js"; 
import { urlAPIPaid } from "./config/url.js";

let currentPage = 1; 

get(urlAPIPaid, fillTableAirdrop);

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('fillAirdrop').style.display = 'none';
    document.getElementById('pagination-controls').style.display = 'none';
    document.getElementById('no-data-message').style.display = 'none';
}

function displayData(data) {
    const tableBody = document.getElementById('fillAirdrop');
    tableBody.innerHTML = ""; 
    document.getElementById('loading').style.display = 'none';
    document.getElementById('fillAirdrop').style.display = 'table-row-group';
    fillTableAirdrop(data);
    
    const checkboxes = document.querySelectorAll('#dropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false); 
}

function searchPaidAirdrops(searchTerm) {
    const apiUrlPaid = searchTerm === ''
        ? urlAPIPaid
        : `${urlAPIPaid}/search/${encodeURIComponent(searchTerm)}`;

    showLoading();
    currentPage = 1; 

    get(apiUrlPaid)
        .then(paidData => {
            displayData(paidData);
        })
        .catch(error => {
            console.error('Error fetching paid airdrop data:', error);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('no-data-message').style.display = 'block';
        });
}

searchPaidAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchPaidAirdrops(searchTerm);
});

document.addEventListener("DOMContentLoaded", function () {
    const filterButton = document.getElementById("filterButton");
    const dropdown = document.getElementById("dropdown");
    const chevronIcon = filterButton.querySelector("svg:last-of-type");
    const okButton = document.getElementById("okButton");

    filterButton.addEventListener("click", function () {
        dropdown.classList.toggle("hidden");
        chevronIcon.classList.toggle("rotate-chevron");
    });

    document.addEventListener("click", function (event) {
        if (!filterButton.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
            chevronIcon.classList.remove("rotate-chevron");
        }
    });

    function filterData() {
        const selectedLevels = Array.from(dropdown.querySelectorAll('input[type="checkbox"][value="easy"], input[type="checkbox"][value="medium"], input[type="checkbox"][value="hard"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.trim());
            
        const selectedTasks = Array.from(dropdown.querySelectorAll('input[type="checkbox"][value="retro"], input[type="checkbox"][value="hold"], input[type="checkbox"][value="stake"], input[type="checkbox"][value="node"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.trim());

        showLoading();

        get(urlAPIPaid)
        .then(response => {
            const filteredData = response.data.filter(item =>
                (selectedLevels.length === 0 || selectedLevels.includes(item.level.trim())) &&
                (selectedTasks.length === 0 || selectedTasks.includes(item.task.trim())) &&
                item.status === 'active'
            );
            displayData({ data: filteredData });
        })
        .catch(error => {
            console.error("Error fetching filtered data:", error);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('no-data-message').style.display = 'block';
        });
    }

    okButton.addEventListener("click", function () {
        filterData();
        dropdown.classList.add("hidden"); 
        chevronIcon.classList.remove("rotate-chevron");
    });
});