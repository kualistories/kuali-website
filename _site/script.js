
/* RGB */
colorScheme = ["rgba(243, 169, 79, 1)", 
    "rgba(127, 181, 142, 1)", 
    "rgba(251, 87, 82, 1)", 
    "rgba(241, 247, 237, 1)", 
    "rgba(36, 62, 54, 1)"];

function tagButtonClick(text) {
    // Actually perform search
    // window.simpleJekyllSearch.emptyResultsContainer();
    window.simpleJekyllSearch.search(text);
    // Update search input to reflect new search
    document.getElementById('search-input').value = text;
    document.getElementById('search-input').focus();
}

function buildTemplate(author, title, excerpt, silhouette, background) {
    var htmlString = `
        <div class="preview-panel">
            <a href="{{ post.url | prepend: site.baseurl }}">
                <!-- Fancy image blending stuff for thumbnails -->
                <div class="panel-container">
                    <div class="panel-img" style="background: 
                        url('${background}'), 
                        url('${silhouette}');
                        background-size:cover;"></div>
                    <div class="panel-color"></div>

                    <!-- Title -->
                    <div class="panel-info">
                        <h2><span>${author}</span></h2>
                        <h3><span>${title}</span></h3>
                        <p class="excerpt"><i>${excerpt}</i></p>
                    </div>
                </div>
            </a>
        </div>`
    // '<li>'+author+' on '+title+' ('+category+')</a></li>';
    return htmlString;
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
        searchResultTemplate: buildTemplate('{author}','{title}','{excerpt}','{silhouette}','{background}')
    })
});