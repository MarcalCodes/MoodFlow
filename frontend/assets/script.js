const applicationState = {
    quote: null,
    history: [],
    searchValue: "",
    searchBy: "by_content",
}

// Bind the "keyup" event on the "Find quote" input
const searchQuoteInputElement = document.getElementById("findQuote")
searchQuoteInputElement
    .addEventListener("keyup", () => {
        // Update the state 'searchValue' and update the UI with this new filter
        applicationState.searchValue = searchQuoteInputElement.value
        displayHistory()
    })

const searchQuoteDropdownElement = document.getElementById("findQuoteBy")
searchQuoteDropdownElement
    .addEventListener("change", () => {
        // Update the state 'searchValue' and update the UI with this new filter
        applicationState.searchBy = searchQuoteDropdownElement.value
        displayHistory()
    })

// Error toast code
// Comes from https://getbootstrap.com/docs/5.3/components/toasts/#overview
const errorToastElement = document.getElementById('liveToast')
const errorToast = bootstrap.Toast.getOrCreateInstance(errorToastElement)

/**
 * Function to fetch a quote based on the selected mood
 */
const fetchCorrespondingQuotes = async (mood) => {
    try {
        // Fetch data from local API
        const response = await fetch(`http://localhost:3000/${mood}`);

        if (!response.ok) {
            errorToast.show()
        }

        return await response.json(); // Convert response to JSON
    } catch (error) {
        console.error(`Error fetching quote: ${error}`);
        errorToast.show()
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
 * Displays the quote state in a card in the webpage
 */
const displayQuote = () => {
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

    const quote = applicationState.quote.q
    const author = applicationState.quote.a

    card.innerHTML = quoteCard(quote, author);
};

/**
 * Displays the history state in the webpage
 */
const displayHistory = () => {
    const historyTableBody = document.getElementById("history-table-body");

    // Select the history to display by applying the user filter
    let filteredHistory = applicationState.history
    const quoteFilterIsNonEmpty = applicationState.searchValue !== ""
    if (quoteFilterIsNonEmpty) {
        filteredHistory = applicationState.history.filter((quote) => {
            switch (applicationState.searchBy) {
                case "by_content":
                    return quote.q.toLowerCase().includes(applicationState.searchValue.toLowerCase())
                case "by_author":
                    return quote.a.toLowerCase().includes(applicationState.searchValue.toLowerCase())
                default:
                    throw new Error("Should never happen: No 'search_by' selected, which is an impossible state")
            }
        })
    }

    // computes the table new content
    const tableContent =
        filteredHistory
            .map((quote) => {
                return `<tr>
                    <td>${quote.q}</td>
                    <td>${quote.a}</td>
                </tr>`
            })
            .join("")

    // Inject the new table content in the UI
    historyTableBody.innerHTML = tableContent
}

/**
 * Updates the webpage with the current state
 */
const updateUiWithNewState = () => {
    displayQuote()
    displayHistory()
}

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

/**
 * Function to handle mood button clicks
 */
const showRandomQuote = async (mood) => {
    // Fetch the quotes corresponding to the mood from the BE
    const fetchedQuotes = await fetchCorrespondingQuotes(mood);

    // Update the `history` state
    const hasPreviousQuote = applicationState.quote != null
    if (hasPreviousQuote) {
        applicationState.history.unshift(applicationState.quote);
    }

    // Select a random quote from the fetched quotes
    const lastArrayIndex = fetchedQuotes.length - 1
    const selectedQuoteIndex = randomNumberBetween(0, lastArrayIndex)
    const selectedQuote = fetchedQuotes[selectedQuoteIndex];

    // update the `quote` state
    applicationState.quote = selectedQuote;

    // Update the UI with the new state
    updateUiWithNewState()
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