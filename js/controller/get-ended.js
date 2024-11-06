import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTableEnded } from "../temp/table-ended.js";

const ITEMS_PER_PAGE = 10; 
let currentPage = 1; 
let totalPages = 1; 
let allData = []; 

export function fillTableAirdrop(response) {
    const tableBody = document.getElementById("fillAirdrop");
    tableBody.innerHTML = ""; 
    const paginationContainer = document.getElementById("pagination-controls");
    const noDataMessage = document.getElementById("no-data-message");

    paginationContainer.style.display = "none"; 
    noDataMessage.style.display = "none"; 

    if (response && Array.isArray(response.data)) {
        const endedData = response.data.filter(item => item.status === 'ended');
        console.log("Filtered ended data:", endedData); 

        if (endedData.length === 0) {
            console.log("no ended search results");
            noDataMessage.style.display = "block"; 
            paginationContainer.style.display = "none";
        } else {
            noDataMessage.style.display = "none"; 
            allData = endedData;
            totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE); 
            currentPage = 1; 
            renderTable(); 
            renderPaginationControls(); 

            paginationContainer.style.display = totalPages > 0 ? "block" : "none"; 
        }
    } else {
        console.error("error: invalid data format", response); 
        noDataMessage.style.display = "block"; 
        paginationContainer.style.display = "none"; 
    }
}

function getVestingClass(vesting) {
    switch (vesting) {
        case 'yes':
            return 'border-red-500 bg-red-500';
        case 'no':
            return 'border-sky-400 bg-sky-400';
    }
}

function renderTable() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = allData.slice(startIndex, endIndex);

    document.getElementById("fillAirdrop").innerHTML = ""; 

    currentData.forEach(fillRow);
}

function fillRow(value) {
    let vestingClass = getVestingClass(value.vesting);
    let content = fillTableEnded.replace("#NAME#", value.name) 
                               .replace("#VESTING#", `<div class="flex items-center justify-center border rounded-md h-7 w-16 text-white ${vestingClass}"><span class="p-2">${value.vesting.toUpperCase()}</span></div>`) 
                               .replace("#LINK#", value.link_claim);
    addInner("fillAirdrop", content);
}

function renderPaginationControls() {
    const paginationContainer = document.getElementById("pagination-controls");
    paginationContainer.innerHTML = ""; 

    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation example");
    nav.className = "flex justify-center mt-6";

    const ul = document.createElement("ul");
    ul.className = "flex items-center -space-x-px h-8 text-sm";

    const liPrev = document.createElement("li");
    const prevButton = document.createElement("a");
    prevButton.className = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 pagin paginb border border-e-0 rounded-l-lg pagin-hover";
    prevButton.innerHTML = `<span class="sr-only">Previous</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>`;
    prevButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPaginationControls();
        }
    });
    liPrev.appendChild(prevButton);
    ul.appendChild(liPrev);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        const pageButton = document.createElement("a");
        pageButton.innerText = i;
        pageButton.href = "#";
        pageButton.className = `flex items-center justify-center px-3 h-8 leading-tight ${
            currentPage === i ? "z-10 text-blue-600 border paginb pagin-page pagin-hover-page hover:text-blue-700" : "text-gray-500 pagin paginb border pagin-hover"
        }`;
        pageButton.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = i;
            renderTable();
            renderPaginationControls();
        });
        li.appendChild(pageButton);
        ul.appendChild(li);
    }

    const liNext = document.createElement("li");
    const nextButton = document.createElement("a");
    nextButton.className = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 pagin paginb border rounded-r-lg pagin-hover";
    nextButton.innerHTML = `<span class="sr-only">Next</span>
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>`;
    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPaginationControls();
        }
    });
    liNext.appendChild(nextButton);
    ul.appendChild(liNext);

    nav.appendChild(ul);
    paginationContainer.appendChild(nav);
}

function filterData() {
    const selectedTasks = Array.from(dropdown.querySelectorAll('input[type="checkbox"][value="yes"], input[type="checkbox"][value="no"]'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value.trim());
    
    console.log("Selected tasks for filtering:", selectedTasks); 

    const filteredData = allData.filter(item => {
        if (selectedTasks.length === 0) return true; 
        return selectedTasks.includes(item.vesting); 
    });

    console.log("Filtered data based on selected tasks:", filteredData); 

    if (filteredData.length > 0) {
        allData = filteredData; 
        renderTable(); 
    } else {
        console.log("No results found after filtering");
    }
}