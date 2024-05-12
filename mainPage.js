document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    if (token) {
        axios.get('http://localhost:3000/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            document.getElementById('profile-name').textContent = `Name: ${data.firstName} ${data.lastName}`;
            document.getElementById('profile-email').textContent = `Email: ${data.username}`;
            document.getElementById('profile-school').textContent = `School: ${data.school}`;
            document.getElementById('userProfile').classList.add('show');
        })
        .catch(error => {
            console.error('Error fetching profile:', error);
            window.location.href = 'login.html';
        });
    } else {
        window.location.href = 'login.html';
    }

    document.getElementById('school-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('school-search-input').value;
        console.log('Search term:', searchTerm);
        // Implement search functionality here
    });

    document.getElementById('professor-search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const searchTerm = document.getElementById('professor-search-input').value;
        console.log('Search term:', searchTerm);
        // Implement search functionality here
    });
});

function loadBackgroundColor() {
    var selectedColor = localStorage.getItem('selectedColor');
    if (selectedColor) {
        document.body.style.backgroundColor = selectedColor;
    }
}

function toggleRegistrationInfo() {
    var userProfile = document.getElementById('userProfile');
    userProfile.classList.toggle('show');
}

function signOut() {
    localStorage.clear();
    window.location.href = 'login.html';
}

function goBack() {
    window.history.back();
}
