
/* RGB */
colorScheme = ["rgba(243, 169, 79, 1)", 
    "rgba(127, 181, 142, 1)", 
    "rgba(251, 87, 82, 1)", 
    "rgba(241, 247, 237, 1)", 
    "rgba(36, 62, 54, 1)"];

function tagButtonClick(text) {
    document.getElementById('search-input').value = text;
    window.simpleJekyllSearch.search(text);
}

$( document ).ready(function() {
    panelColors = document.getElementsByClassName('panel-color');
    for (var i=0; i<panelColors.length; i++) {
        panelColors[i].style.backgroundColor = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    }

    // Search
    window.simpleJekyllSearch = SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
        searchResultTemplate: '<li>{author} on {title} ({category})</a></li>'
    })
});