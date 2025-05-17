export let fillTableFree = 
`
<tr class="nav border-underline transition-all duration-300">
    <td class="py-4 px-2 sm:px-6 font-medium textp text-center sm:text-left">
        <div class="flex items-center gap-1 ml-4 sm:ml-6 justify-start">
            #NAME#
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="16px" fill="" class="filter-color cursor-pointer info-icon" onclick="showCardFree()">
                <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
            </svg>
        </div>
    </td>
    
    <!-- TASK -->
    <td class="py-3 px-2 sm:px-6 text-center">
        <div class="flex items-center justify-center border border-violet-700 bg-violet-700 text-white rounded-md h-7 w-16 mx-auto">
            <span class="p-2">#TASK#</span>
        </div>
    </td>

    <!-- LINK -->
    <td class="py-3 px-2 sm:px-6 text-center">
        <a href="#LINK#" target="_blank" class="inline-block py-1 px-5 rounded-md text-white bg-gradient-to-r from-blue-500 to-violet-600">
            Visit
        </a>
    </td>
</tr>
`;

const cardFree = `
<div id="cardFree" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
    <div class="nav rounded-lg p-8 max-w-md w-full mx-4 transform transition-all">
        <div class="text-center">
            <h2 class="text-2xl font-bold textp mb-4">Coming Soon!</h2>
            <p class="textp mb-6">This feature is currently under development. Stay tuned for updates!</p>
            <button onclick="hideCardFree()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-colors">
                Close
            </button>
        </div>
    </div>
</div>
`;

document.body.insertAdjacentHTML('beforeend', cardFree);

window.showCardFree = function() {
    document.getElementById('cardFree').classList.remove('hidden');
};

window.hideCardFree = function() {
    document.getElementById('cardFree').classList.add('hidden');
};