// Function to fetch a random motivational quote
function fetchQuote(mood) {
  try {
    let responseData; 
mood === undefined ? mood= "happy": mood 

    // Fetch data from ZenQuotes API
    fetch("http://localhost:3000/"+ mood)
    .then((response)=> responseData = response.data)
    console.log(responseData);

    // console.log(`response: ${response.body}`)

    // // Convert response to JSON
    // const data = await response.json();

    // Extract the quote and author
    // const quoteText = data[0].q;
    // const quoteAuthor = data[0].a;

    // // Log the fetched quote in the console (for testing)
    // console.log(`Quote: "${quoteText}" - ${quoteAuthor}`);

    // Return the formatted quote
    // return `"${quoteText}" - ${quoteAuthor}`;
  } catch (error) {
    console.error(`"Error fetching quote: ${error}`);
    return "Stay positive and keep going!";
  }
}

// Test the API fetch function
fetchQuote();

const selectMood = (mood) => {
  // TODO ingrid: Implement ask ai for sad and anxious 
} 