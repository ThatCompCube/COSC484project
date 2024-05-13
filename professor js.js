var profName = "Jal Irani";
var profTemp = 2;
var reviews = []; // Array to store reviews

// Function to populate stars based on rating
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

// Function to fetch reviews from backend (mock implementation)
function fetchReviews(professorId) {
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
function populateReviews(reviewsData) {
    const reviewList = document.querySelector(".ReviewList");
    reviewList.innerHTML = ""; // Clear existing reviews

    reviewsData.forEach((review, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="ReviewInfo">
                <div class="RatingHeader">${"★".repeat(review.rating)}</div>
                <div class="courseMeta">${review.course}</div>
                <div class="Comment">${review.comment}</div>
                <button class="remove-btn" onclick="openRemoveReviewSection(${index})">Remove</button>
            </div>
        `;
        reviewList.appendChild(li);
    });
}

// Function to open remove review section
function openRemoveReviewSection(index) {
    var section = document.querySelector('.remove-review-section');
    section.style.display = 'block';
    var submitButton = document.querySelector('.submit-btn');
    submitButton.onclick = function() {
        var reasonSelect = document.querySelector('#reason-select');
        var reason = reasonSelect.value;
        if (reason !== 'select') {
            removeReview(index, reason);
            section.style.display = 'none';
        }
    };
}

// Function to remove a review
function removeReview(index, reason) {
    // Remove the review from the reviews array
    reviews.splice(index, 1);
    // Repopulate the reviews section
    populateReviews(reviews);
    // Log the reason for removal (for demonstration)
    console.log(`Review removed due to: ${reason}`);
}

// Example usage:
reviews = fetchReviews("professorId"); // Fetch reviews for a professor
populateReviews(reviews); // Populate the review section with fetched reviews

// Function to calculate and display rating percentage
function ratingPercent() {
    // This will be calculated but for now it's hard coded
    var percentage = 70;
    document.getElementById("ratingPercentage").innerHTML = percentage + "%";
}
ratingPercent();

// Function to create university link based on temp
function createUniversityLink() {
    var temp = 2; // Default value
    temp = profTemp;
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
    } else if (temp === 3) {
        var link = document.createElement("a");
        link.href = "https://umd.edu/";
        link.textContent = "University of Maryland";
        return link;
    } else if (temp === 4) {
        var link = document.createElement("a");
        link.href = "https://umbc.edu/";
        link.textContent = "University of Maryland, Baltimore County";
        return link;
    } else if (temp === 5) {
        var link = document.createElement("a");
        link.href = "https://www.jhu.edu/";
        link.textContent = "John Hopkins University";
        return link;
    }
}

// Call the function and append the created link to the UniLink element
var nameProf = document.createElement("h3");
nameProf.textContent = profName;
document.getElementById("UniLink").appendChild(createUniversityLink());
document.getElementById("ProfessorName").appendChild(nameProf);
