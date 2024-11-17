import { get } from "./wrappedFetch.js"; 
import { fillTableAirdrop } from "./controller/get-free-d3.js"; 
import { urlAPIFree } from "./config/url.js";

let currentPage = 1; 

get(urlAPIFree, fillTableAirdrop);

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

function searchFreeAirdrops(searchTerm) {
    const apiUrlFree = searchTerm === ''
        ? urlAPIFree
        : `${urlAPIFree}/search/${encodeURIComponent(searchTerm)}`;

    showLoading();
    currentPage = 1;

    get(apiUrlFree)
        .then(freeData => {
            displayData(freeData);
        })
        .catch(error => {
            console.error('Error fetching free airdrop data:', error);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('no-data-message').style.display = 'block';
        });
}

searchFreeAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchFreeAirdrops(searchTerm);
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
            
        const selectedTasks = Array.from(dropdown.querySelectorAll('input[type="checkbox"][value="daily"], input[type="checkbox"][value="testnet"], input[type="checkbox"][value="game"], input[type="checkbox"][value="gacha"], input[type="checkbox"][value="social"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.trim());

        showLoading();

        get(urlAPIFree)
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