//Container for all the posts
const container = document.getElementById('main-container');
//Getting the footer element (For later use/ loading more posts when we react this element)
const footer = document.getElementById('footer');

// Function to fetch the data of posts
function fetchHomeData() {
    // API Endpoint: https://jsonplaceholder.typicode.com/posts
    limit = 9;              // Limit of posts to display
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {           
        if (!response.ok) {         // If no response we get an error
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    /* 
    * If we have a response and getting the data from the API, i place each 
    * data in different elements. these elements can be retrived in the css where
    * I can style and structure how its going to be displayed on the webpage.
    * 
    * @posts        - Posts is the array that is containing every post
    * @post         - Post is each element in the posts array.
    * 
    */
    .then((posts) => {
        for (let i = 0; i<= limit; i++){        // Loop for each post
            const post = posts[i];              // a post is inside the posts array
            // Creating elements to be displayed in the html
            const article = document.createElement('article');
            const title = document.createElement("h1");
            const body = document.createElement("p");

            title.textContent = post.title;
            body.textContent = post.body;

            // Creating a class to the article element for styling in css
            article.setAttribute('class', 'article-box');

            article.appendChild(title);
            article.appendChild(body);
            container.appendChild(article)
        }
    })
}

// Eventlist for scroll event, load more posts when nearing the footer.
// Using the fetchHomeData() function to load more posts.
document.addEventListener('scroll', () =>{
    /* Checking if we are at the bottom/footer*/
    if (footer.getBoundingClientRect().top <= window.innerHeight + 10){
        fetchHomeData();
    }
})

// Calling the function
fetchHomeData();