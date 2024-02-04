/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");


function addGamesToPage(games) {
    // Loop over each item in the games array
    games.forEach(game => {
        // Create a new div element for the game card
        let newGameDiv = document.createElement('div');

        // Add the class game-card to the div's class list
        newGameDiv.classList.add('game-card');

        // Set the inner HTML using a template literal to display game information
        newGameDiv.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img">
            <h2>${game.name}</h2>
            <p>Description: ${game.description}</p>
            <p>Pledged: ${game.pledged}</p>
            <!-- Add more game attributes here -->
        `;

        // Append the new game card div to the gamesContainer
        gamesContainer.appendChild(newGameDiv);
    });
}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} individual contributions`;



// Grab the amount raised card element
const raisedCard = document.getElementById("total-raised");

// Use reduce() to calculate the total amount raised across all games
const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0); // 0 is the initial value for the total

// Set inner HTML using template literal to display the total amount raised with a dollar sign
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// Grab the number of games card element
const gamesCard = document.getElementById("num-games");

// Set the inner HTML to display the total number of games
gamesCard.innerHTML = GAMES_JSON.length;



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}


function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length;


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = numUnfundedGames === 1 ? 'There is 1 unfunded game.' : `There are ${numUnfundedGames} unfunded games.`;


// create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement('p');
unfundedGamesElement.textContent = unfundedGamesString;

descriptionContainer.appendChild(unfundedGamesElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameName = document.createElement("p");
const secondGameName = document.createElement("p");
firstGameName.textContent = firstGame.name;
secondGameName.textContent = secondGame.name;



// do the same for the runner up item
firstGameContainer.appendChild(firstGameName);
secondGameContainer.appendChild(secondGameName);


