var profName = "Jal Irani"
var profTemp = 2

// function fetchName() {
//   var name = document.querySelector('.ProfessorName')
//   name.appendChild(profData.name)
// }

function setStars(rating) {
    var starRating = document.querySelector('.star-rating');

    starRating.innerHTML = ''; // Clear existing stars
    for (var i = 1; i <= 5; i++) {
      var star = document.createElement('span');
      if (i <= rating) {
        star.textContent = '★'; // Filled star
      } else {
        star.textContent = '☆'; // Empty star
      }
      starRating.appendChild(star);
    }
  }
  setStars(3);


// Assume this function fetches reviews from your backend
function fetchReviews(professorId) {
  // Code to fetch reviews goes here
  // This is just a mock implementation
  return [
      {
          rating: 4,
          course: "Computer Science 101",
          comment: "Great professor, very knowledgeable!"
      },
      {
          rating: 3,
          course: "Mathematics 201",
          comment: "Decent professor, but lectures are a bit dry."
      }
  ];
}

// Function to populate reviews dynamically
function populateReviews(reviews) {
  const reviewList = document.querySelector(".ReviewList");
  reviewList.innerHTML = ""; // Clear existing reviews

  reviews.forEach(review => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div class="ReviewInfo">
              <div class="RatingHeader">${"★".repeat(review.rating)}</div>
              <div class="courseMeta">${review.course}</div>
              <div class="Comment">${review.comment}</div>
          </div>
      `;
      reviewList.appendChild(li);
  });
}

// Example usage:
const reviews = fetchReviews("professorId"); // Fetch reviews for a professor
populateReviews(reviews); // Populate the review section with fetched reviews

function ratingPercent(){
  // this will be calculated but for now it's hard coded
  var percentage = 70;
  document.getElementById("ratingPercentage").innerHTML = percentage + "%";
}

ratingPercent();

function createUniversityLink() {
  var temp = 2;
  temp = profTemp
  if (temp === 1) {
    var link = document.createElement("a");
    link.href = "https://towson.edu";
    link.textContent = "Towson University";
    return link;
  } else if (temp === 2) {
    var link = document.createElement("a");
    link.href = "https://morgan.edu";
    link.textContent = "Morgan State University";
    return link;
  } else if (temp == 3) {
    var link = document.createElement("a");
    link.href = "https://umd.edu/";
    link.textContent = "University of Maryland";
    return link;
  } else if (temp == 4) {
    var link = document.createElement("a");
    link.href = "https://umbc.edu/";
    link.textContent = "University of Maryland, Baltimore County";
    return link;
  } else if (temp == 5) {
    var link = document.createElement("a");
    link.href = "https://www.jhu.edu/";
    link.textContent = "John Hopkins University";
    return link;
  }
}



// Call the function and append the created link to the UniLink element
var nameProf = document.createElement("h3")
nameProf.textContent = profName
document.getElementById("UniLink").appendChild(createUniversityLink());
document.getElementById("ProfessorName").appendChild(nameProf);
