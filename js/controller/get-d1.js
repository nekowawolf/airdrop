import { addInner } from "https://bukulapak.github.io/element/process.js";
import { fillTable } from "../temp/table-d1.js";

const ITEMS_PER_PAGE = 10; 
let currentPage = 1; 
let totalPages = 1; 
let allData = []; 

export function fillTableAirdrop(response) {
    const tableBody = document.getElementById("fillAirdrop");
    tableBody.innerHTML = ""; // Kosongkan tabel
    const paginationContainer = document.getElementById("pagination-controls");
    paginationContainer.style.display = "none"; // Sembunyikan pagination secara default

    if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" class="text-center">Tidak ada hasil pencarian</td>
                </tr>
            `;
            // Pastikan pagination disembunyikan
            paginationContainer.style.display = "none";
        } else {
            allData = response.data; 
            totalPages = Math.ceil(allData.length / ITEMS_PER_PAGE); // Hitung total halaman

            renderTable(); 
            renderPaginationControls();

            // Tampilkan pagination hanya jika ada data
            if (totalPages > 0) {
                paginationContainer.style.display = "block"; // Tampilkan pagination
            } else {
                paginationContainer.style.display = "none"; // Sembunyikan jika tidak ada halaman
            }
        }
    } else {
        console.error("Error: Format data tidak valid.");
        paginationContainer.style.display = "none"; // Sembunyikan jika format tidak valid
    }
}


function getTaskClass(task) {
    switch (task) {
        case 'DAILY':
            return 'border-violet-700 bg-violet-700';
        case 'TESTNET':
            return 'border-green-500 bg-green-500';
        case 'GAME':
            return 'border-sky-400 bg-sky-400';
        case 'SOCIAL':
            return 'border-fuchsia-600 bg-fuchsia-600';
        case 'RETRO':
            return 'border-red-500 bg-red-500';
        case 'HOLD':
            return 'border-gray-500 bg-gray-500';
        case 'STAKE':
            return 'border-indigo-950 bg-indigo-950';
        default:
            return 'border-yellow-400 bg-yellow-400';
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
    let taskClass = getTaskClass(value.task);
    let content = fillTable.replace("#NAME#", value.name)
                           .replace("#TASK#", `<div class="flex items-center justify-center border rounded-md h-7 w-16 text-white ${taskClass}"><span class="p-2">${value.task}</span></div>`)
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

    // previous button
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

    // number pagination button
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

    // next button
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