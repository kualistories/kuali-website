
/* RGB */
colorScheme = ["rgba(243, 169, 79, 1)", 
    "rgba(127, 181, 142, 1)", 
    "rgba(251, 87, 82, 1)", 
    "rgba(241, 247, 237, 1)", 
    "rgba(36, 62, 54, 1)"];

function colorTiles() {
    panelColors = document.getElementsByClassName('panel-color');
    for (var i=0; i<panelColors.length; i++) {
        panelColors[i].style.backgroundColor = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    }
}

function colorSearchTiles() {
    panelColors = document.getElementsByClassName('panel-color-search');
    for (var i=0; i<panelColors.length; i++) {
        panelColors[i].style.backgroundColor = colorScheme[Math.floor(Math.random() * colorScheme.length)];
    }
}

function tagButtonClick(text) {
    // Actually perform search
    // window.simpleJekyllSearch.emptyResultsContainer();
    window.simpleJekyllSearch.search(text);
    // Update search input to reflect new search
    document.getElementById('search-input').value = text;
    // Give color to the new tiles
    colorSearchTiles();
}

function buildTemplate(author, title, summary, url, silhouette, background) {
    var htmlString = `
        <div class="preview-panel">
            <a href="${url}">
                <!-- Fancy image blending stuff for thumbnails -->
                <div class="panel-container">
                    <div class="panel-img" style="background: 
                        url('${background}'), 
                        url('${silhouette}');
                        background-size:cover;"></div>
                    <div class="panel-color-search"></div>

                    <!-- Title -->
                    <div class="panel-info">
                        <h2><span>${title}</span></h2>
                        <h3><span>${author}</span></h3>
                        <p class="excerpt"><i>${summary}</i></p>
                    </div>
                </div>
            </a>
        </div>`
    return htmlString;
}

function emptySearch() {
    searchInput = document.getElementById("search-input");
    if (searchInput.value.length == 0) {
        console.log('asdoin');
        setTimeout(() => {
            window.simpleJekyllSearch.search(' ');
        }, 400);
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

$( document ).ready(function() {
    // Scroll-to-top button
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollToTopButton").style.display = "block";
        } else {
            document.getElementById("scrollToTopButton").style.display = "none";
        }
    }

    // Make sure to update colors on each new search
    resultsContainer = document.getElementById ("results-container");
    if (resultsContainer.addEventListener) {
        resultsContainer.addEventListener ('DOMSubtreeModified', colorSearchTiles, false);
    }

    // Check if input is empty, then search for everything
    searchInput = document.getElementById("search-input");
    if (searchInput.addEventListener) {
        searchInput.addEventListener('input', emptySearch, false);
    }

    // Search
    window.simpleJekyllSearch = SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json',
        fuzzy: false,
        limit: 30,
        searchResultTemplate: buildTemplate('{author}','{title}','{summary}',
                                            '{url}','{silhouette}','{background}')
    });

    // Update tile colours
    colorTiles();
    colorSearchTiles();
});
