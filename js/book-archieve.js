// initially declared error message is none
document.getElementById("error-message").style.display = "none";

// on click search function
const searchBook = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // clear data
  searchField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText === "") {
    // write something to display
    displayError();
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    displaySearchResult(data);
  }
};

// display error message
const displayError = () => {
  document.getElementById("error-message").style.display = "block";
};

// display search result
const displaySearchResult = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  if (data.docs.length === 0) {
    document.getElementById("total-result").innerHTML = `No result is found`;
  } else {
    //   set total result field value
    document.getElementById(
      "total-result"
    ).innerHTML = `Total Result Found: ${data.numFound}`;
    // run foreach loop for get individual data
    data.docs.forEach((doc) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${
              doc.cover_i ? doc.cover_i : "N/A"
            }-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Book Name:${doc.title}</h5>
                <p class="card-text">Author Name:${doc.author_name}</p>
                <p class="card-text">Publisher:${doc.publisher}</p>
                <p class="card-text">First Published Year:${
                  doc.first_publish_year
                }</p>
            </div>
        </div>
        `;
      searchResult.appendChild(div);
    });
  }
};
