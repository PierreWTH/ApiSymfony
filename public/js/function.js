// RECUPERE TOUS LES JEUX D'APRES LA RECHERCHE EFFECTUEE DANS L'INPUT

// A la sortie de l'input de recherche
search.addEventListener('focusout', (e) => {
    // Vider le select
    Select.innerText = null
    e.preventDefault();
    // Valeur saisie dans l'input
    const searchValue = search.value;
    console.log(searchValue)
    // URL a fetch
    const url = '/games'
    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept' : '*/*'
        },
        //Paramètres de la route du controller (searchValue)
        body: new URLSearchParams({
            'searchValue' : searchValue
        })
    })
    // Création des options du select
    .then(async(response) => {
        const rep = await response.json();
        // Boucler sur les résultats de l'api
        for(r in rep["games"]) {
            let option = document.createElement('option');
            option.innerText = rep["games"][r]["name"] + "(" + rep["games"][r]["year_published"] + ")";
            option.value = rep ["games"][r]["id"];
            select.append(option);
        }
        console.log(rep["games"])
    })
})

// AFFICHE LES INFORMATIONS DU JEU SELECTIONNE DANS LA LISTE

select.addEventListener('change', (e) => {
    e.preventDefault();
    const gameId = select.selectedOptions[0].value
    console.log(gameId)
    const urlGame = '/game';
    fetch(urlGame, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-form-urlencoded',
            'Accept': '*/*'
        },
        // Parametre de la route du controller(gameId)
        body: new URLSearchParams({
            'gameId': gameId
        })
    })
    .then(async (response) => {
        const rep = await response.json();
        console.log(rep);
        img.src = rep["games"][0]["image_url"] ? rep ["games"][0]["image_url"] : '../img/image.svg';
        p.innerHTML = rep["games"][0]["description"]
        title.innerHTML = rep["games"][0]["name"]
        players.innerHTML = "From "+rep["games"][0]["min_players"] + "to " +rep["games"][0]["max_players"]+" players";
        minutes.innerHTML = rep["games"][0]["playtime"]+" min";

    })
})