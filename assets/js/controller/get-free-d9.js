import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTableFree } from "../temp/table-free-d3.js";

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
        const activeData = response.data.filter(item => item.status === 'active');

        if (activeData.length === 0) {
            console.log("no active search results");
            noDataMessage.style.display = "block"; 
            paginationContainer.style.display = "none"; 
        } else {
            noDataMessage.style.display = "none"; 
            allData = activeData;
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


function getTaskClass(task) {
    switch (task) {
        case 'daily':
            return 'border-violet-700 bg-violet-700';
        case 'testnet':
            return 'border-red-600 bg-red-600';
        case 'game':
            return 'border-sky-400 bg-sky-400';
        case 'social':
            return 'border-fuchsia-600 bg-fuchsia-600';
        case 'depin':
            return 'border-green-500 bg-green-500';
        default:
            return 'border-yellow-400 bg-yellow-400';
    }
}

function renderTable() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const sortedData = [...allData].reverse();
    const currentData = sortedData.slice(startIndex, endIndex);

    document.getElementById("fillAirdrop").innerHTML = ""; 

    currentData.forEach(fillRow);
}

function fillRow(value) {
    let taskClass = getTaskClass(value.task);
    let content = fillTableFree.replace("#NAME#", value.name) 
                               .replace("#TASK#", `<div class="flex items-center justify-center border rounded-md h-7 w-16 text-white ${taskClass}"><span class="p-2">${value.task.toUpperCase()}</span></div>`)
                               .replace("#LINK#", value.link);
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

    addPageButton(1);

    if (currentPage > 3) {
        addEllipsis();
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        addPageButton(i);
    }

    if (currentPage < totalPages - 2) {
        addEllipsis();
    }

    if (totalPages > 1) {
        addPageButton(totalPages);
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

    function addPageButton(page) {
        const li = document.createElement("li");
        const pageButton = document.createElement("a");
        pageButton.innerText = page;
        pageButton.href = "#";
        pageButton.className = `flex items-center justify-center px-3 h-8 leading-tight ${
            currentPage === page ? "z-10 text-blue-600 border paginb pagin-page pagin-hover-page hover:text-blue-700" : "text-gray-500 pagin paginb border pagin-hover"
        }`;
        pageButton.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = page;
            renderTable();
            renderPaginationControls();
        });
        li.appendChild(pageButton);
        ul.appendChild(li);
    }

    function addEllipsis() {
        const li = document.createElement("li");
        li.className = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500";
        li.innerText = "...";
        ul.appendChild(li);
    }
}
