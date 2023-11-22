console.log('%c HI', 'color: firebrick')


// ## Challenge 1

// ```js
// const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
// ```

// Add JavaScript that:

// - on page load, fetches the images using the url above ⬆️
// - parses the response as `JSON`
// - adds image elements to the DOM **for each** 🤔 image in the array

// ---

// **Hint:** Recall that you will need to ensure that your JavaScript doesn't run
// until _after_ the HTML has loaded. You can use whichever method you prefer to
// accomplish this.

// Challenge 1 Steps:
// 1. Fetch data from the url "https://dog.ceo/api/breeds/image/random/4" and parse the response as Json.
// 2. Add images inside the <div id="dog-image-container"> element.
//     a. Create a function that creates an img tag for a single dog.
//     b. Write a forEach loop that executes the function.

// Challenge 2 Steps:
// 1. Fetch list of breeds from "https://dog.ceo/api/breeds/list/all".
// 2. Add the breeds to the element <ul id="dog-breeds"></ul>.
//     a. Write a function that takes a dog breed, creates and appends a single <li> to the UL element.
//         - If the breed is an empty array (index of its array [1] is empty), then add the name of the breed.
//         - If the breed is an array with multiple breed variants (index [1]), then for each breed variant add a string with the breed variant and the breed name.

// Challenge 3 Steps:
// 1. Add JavaScript so that, when the user clicks on one of the lis, the font color style of the li changes to any color. 
// the user clicks on any one of the `<li>`s, the font color of that `<li>`
// changes. This can be a color of your choosing.

// Challenge 4: add functionality to the breed-dropdown
// Steps:
// 1. When an option (letter) is selected in the #breed-dropdown, we will modify the list to include only list items whose textContent begins with the selectedLetter.

// Fetch images and run the addDogImg function to append the 4 images.

fetch("https://dog.ceo/api/breeds/image/random/4")
.then(response => response.json())
.then(images => {
    
    // console.log(images);
    images.message.forEach(image => {
        addDogImg(image);
    })
})

function addDogImg(image) {
    const imgTag = document.createElement("img");
    imgTag.src = image;
    imgTag.style = "width: 200px; height: 200px";
    document.querySelector("#dog-image-container").append(imgTag);
};

// Initialize an empty array to store the list of dog breeds with variants:
let listOfAllBreeds = [];

// Fetch raw data from the database:
fetch("https://dog.ceo/api/breeds/list/all")
.then(res => res.json())
.then(breeds => {

    // Convert the breeds object into an array for iteration, and store it in the breedsArray variable:
    const breedsArray = Object.entries(breeds.message);

    // Run the createSetOfBreeds function and pass breedsArray (raw data) as argument:
    createSetOfBreeds(breedsArray);

    // Run the addBreedToList function to create a list item for each item in the listOfBreedsToDisplay argument:
    addBreedToList(listOfAllBreeds);
})

// Define function that takes in a set of raw data with dog breeds arrays, iterates through each sub-item, and push each breed name (with or without variant) to the listOfBreedsToDisplay: 
function createSetOfBreeds(breedsArray) {
    breedsArray.forEach(breed => {

        // The dog breeds that don't have a variant are an empty array on index [1]. The code below checks if that array is empty (length === 0). It also removes the comma that came in with the raw data after each breed name as the last character ("-1"):
        if (breed[1].length === 0) {
            listOfAllBreeds.push(`${breed.slice(0, -1)}`);
        } 
        else {

            // If the variant array is not empty, we need to iterate it and add each breed+variant to the listOfBreedsToDisplay:
            breed[1].forEach(breedVariant => {
                listOfAllBreeds.push(`${breed[0]} (${breedVariant})`);
            });
        };
    })
}

// Define function that takes in a listOfBreeds and appends a list item for each item in the list:
function addBreedToList(listOfBreeds) {
        listOfBreeds.forEach(breed => {
            const liTag = document.createElement("li");
            document.querySelector("#dog-breeds").append(liTag);

            liTag.textContent = breed;

            liTag.addEventListener("click", event => {
            liTag.style = "color: blue";
        });
    });
}

// Define a change eventListener on the select element (letter dropdown):
document.querySelector("#breed-dropdown").addEventListener("change", event => {
    
    const selectedLetter = document.querySelector("#breed-dropdown").value;
    console.log(selectedLetter);

    // Create a filteredList variable and assign it to the listOfAllBreeds filter() method. It will add the name of the breed for those that match the test inside the filter function (first character must equal the selectedLetter).
    let filteredList = listOfAllBreeds.filter(breed => {
        return breed.charAt(0) === selectedLetter;
    });

    console.log(filteredList);

    // Clear the innerHTML of the UL
    document.querySelector("#dog-breeds").innerHTML = "";

    // Execute the function to add LI items to the UL element again, this time taking only the filteredList array values.
    addBreedToList(filteredList);
})