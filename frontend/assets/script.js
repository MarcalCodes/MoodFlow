const applicationState = {
    quote: null,
    history: [],
}

/**
 * Function to fetch a quote based on the selected mood
 */
const fetchCorrespondingQuotes = async (mood) => {
    try {
        // Fetch data from local API
        const response = await fetch(`http://localhost:3000/${mood}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json(); // Convert response to JSON
    } catch (error) {
        console.error(`Error fetching quote: ${error}`);
        throw `Error fetching quote: ${error}`;
    }
};

/**
 * takes a quote and an author and returns an HTML Card (as a String) to nicely display the quote and the author
 *
 * (Needs Bootstrap)
 *
 * Comes from https://getbootstrap.com/docs/5.3/components/card/
 */
const quoteCard = (quote, author) => {
    return `<div class="card">
        <div class="card-header">Quote</div>
        <div class="card-body">
            <blockquote class="blockquote mb-0">
                <p>${quote}</p>
                <footer class="blockquote-footer">${author}</footer>
            </blockquote>
        </div>
    </div>`
}


/**
 * Function to display the fetched quote in a card
 */
const displayQuote = (quote, author) => {
    const quoteSection = document.getElementById("quote-section");

    // Create or update the card
    let card = document.getElementById("quote-card");
    const cardNotPresentInThePage = !card
    if (cardNotPresentInThePage) {
        card = document.createElement("div");
        card.id = "quote-card";
        card.className = "quote-card";
        quoteSection.appendChild(card);
    }

    card.innerHTML = quoteCard(quote, author);
};

/**
 * Generate a random number between min and max.
 *
 * min and max are included.
 *
 * Comes from https://stackoverflow.com/a/7228322/29476271
 */
const randomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// TODO Ingrid:
//   1. Implement the algorithm:
//      - Fetch the list of quotes
//      - If I have a quote in my state (the `applicationState.quote` field is not null), then add the `applicationState.quote` value to the history
//      - select randomly a quote from the list of fetched quotes
//      - update my `applicationState.quote` with this selected randomly quote
//      - update the display with the new state
//

/**
 * Function to handle mood button clicks
 */
const showRandomQuote = async (mood) => {
    // Fetch the quotes corresponding to the mood from the BE
    const fetchedQuotes = await fetchCorrespondingQuotes(mood);

    const hasPreviousQuote = applicationState.quote != null
    if (hasPreviousQuote) {
        applicationState.history.push(applicationState.quote);
    }

    // Select a random quote from the fetched quotes
    const lastArrayIndex = fetchedQuotes.length - 1
    const selectedQuoteIndex = randomNumberBetween(0, lastArrayIndex)
    const selectedQuote = fetchedQuotes[selectedQuoteIndex];

    applicationState.quote = selectedQuote;

    // Display the selected quote
    const selectedQuoteText = selectedQuote.q;
    const selectQuoteAuthor = selectedQuote.a;

    displayQuote(selectedQuoteText, selectQuoteAuthor);
};


// What and How separation:
// -----------------------
// With a function correctly named, you can use the function for what it does, without having
// to know how it does it
//
// That's why it's important to give good names to functions.
//
// A good name for a function is a name which:
//   1. tell what the function does
//   2. the function only does what the names says and nothing more
// 
// With such function, you don't need to read the code to know what it does.
// So that when you use it, you know what is happening in your program and can avoid to care about how it's done.