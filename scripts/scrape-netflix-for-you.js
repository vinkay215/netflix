// Function to extract movie data by blocks
function extractAllMovieRows() {
    const rows = [];

    // Select each row block
    document.querySelectorAll('.single-row-lomo.has-inline-left-gutter').forEach(rowBlock => {
        // Get the row title
        const rowTitle = rowBlock.querySelector('.lomo-name.row-name').textContent.trim();
        const movies = [];

        // Select each movie within the row block
        rowBlock.querySelectorAll('.lomo .watch-title').forEach(movie => {
            const id = movie.getAttribute('href').split('/').pop();
            const style = movie.querySelector('.title-boxart').style.backgroundImage;
            const imageUrl = style.slice(5, -2); // Clean up the 'url("")' format

            movies.push({ id, imageUrl });
        });

        // Push the row data to the rows array
        rows.push({ rowTitle, movies });
    });

    // Convert list to JSON and return
    return JSON.stringify(rows, null, 2);
}

// Run the function and log the JSON output
console.log(extractAllMovieRows());
