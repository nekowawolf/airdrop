import { get } from "./wrappedFetch.js";
import { fillTableAirdrop } from "./controller/get-ended-d3.js";
import { urlAPIEnded } from "./config/url.js";

let currentPage = 1;

get(urlAPIEnded, fillTableAirdrop);

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
    document.getElementById('fillAirdrop').style.display = 'none';
    document.getElementById('pagination-controls').style.display = 'none';
    document.getElementById('no-data-message').style.display = 'none';
}

function displayData(data) {
    const tableBody = document.getElementById('fillAirdrop');
    if (!tableBody) {
        console.error("Element with ID 'fillAirdrop' not found.");
        return;
    }
    tableBody.innerHTML = "";
    document.getElementById('loading').style.display = 'none';
    document.getElementById('fillAirdrop').style.display = 'table-row-group';
    fillTableAirdrop(data);
    
    const checkboxes = document.querySelectorAll('#dropdown input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

function searchEndedAirdrops(searchTerm) {
    const apiUrlEnded = searchTerm === ''
        ? urlAPIEnded
        : `${urlAPIEnded}/search/${encodeURIComponent(searchTerm)}`;

    showLoading();
    currentPage = 1;

    get(apiUrlEnded)
        .then(endedData => {
            displayData(endedData);
        })
        .catch(error => {
            console.error('Error fetching ended airdrop data:', error);
            document.getElementById('loading').style.display = 'none';
            document.getElementById('no-data-message').style.display = 'block';
        });
}

searchEndedAirdrops('');

document.getElementById('search-input').addEventListener('input', function (e) {
    const searchTerm = e.target.value.trim();
    searchEndedAirdrops(searchTerm);
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
        const selectedTasks = Array.from(dropdown.querySelectorAll('input[type="checkbox"][value="yes"], input[type="checkbox"][value="no"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value.trim());

        console.log("Selected tasks for filtering:", selectedTasks);

        showLoading();

        get(urlAPIEnded)
            .then(response => {
                const filteredData = response.data.filter(item => {
                    if (item.status !== 'ended') return false;

                    if (selectedTasks.length === 0) return true;

                    return selectedTasks.includes(item.vesting.trim());
                });

                console.log("Filtered data based on selected tasks:", filteredData);
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
