document.addEventListener('DOMContentLoaded', () => {
    
    const navbarHTML = `
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="profiles.html">Profiles</a></li>
                <li><a href="reports.html">Reports</a></li>
                <li><a href="vacation_requests.html">Vacation Requests</a></li>
                <li><a href="settings.html">Settings</a></li>
                <li class="bell-icon"><a href="#"><i class="fa-solid fa-bell fa-1x"></i></a></li>
                <li class="circle-user-icon"><a href="#"><i class="fa-solid fa-circle-user fa-1x"></i></a></li>
            </ul>
        </nav>`;

   
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;

        const navLinks = document.querySelectorAll('nav ul li a');
        function setBold(link) {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        }
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === window.location.pathname.split('/').pop()) {
                setBold(link);
            }
            link.addEventListener('click', function(event) {
                if (href === 'reports.html' || href === 'settings.html') {
                    event.preventDefault();
                    setBold(link);
                    window.location.href = href;
                }
            });
        });
    } else {
        console.error('Navbar container not found.');
    }

    const vacationRequests = [
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "1000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "6000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "1000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "1000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "6000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "1000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "6000 AED" },
        { name: "Ahmad Attar", profileImage: "Imges/employee.jpeg", submittedOn: "1/3/2024", duration: "2 Weeks (1/4/2023 - 14/4/2023)", salary: "6000 AED" },
       
    ];

    const container = document.getElementById('card-container');
    const selectAllCheckbox = document.getElementById('select-all');
    
    function renderCards(requests) {
        if (container) {
            container.innerHTML = '';
            requests.forEach(request => {
                const cardHTML = `
                    <div class="col">
                        <div class="card" style="position:relative;">
                            <input type="checkbox" class="card-checkbox" style="display:none; position:absolute; top:10px; right:10px;">
                            <img src="${request.profileImage}" alt="Profile Picture" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${request.name}</h5>
                                <div class="details">
                                    <p class="text-muted">Submitted on: <br><strong>${request.submittedOn}</strong></p>
                                    <p class="text-muted">Duration:<br><strong>${request.duration}</strong></p>
                                    <p class="text-muted">Salary:<br> <strong>${request.salary}</strong></p>
                                </div>
                                <div class="d-flex justify-content-between mt-3">
                                    <button class="btn-decline">Decline</button>
                                    <button class="btn-approve">Approve</button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                container.insertAdjacentHTML('beforeend', cardHTML);
            });
        } else {
            console.error('Card container not found.');
        }
    }

    // Determine which cards to display based on the current page
    const currentPage = window.location.pathname.split('/').pop();
    let requestsToDisplay;

    if (currentPage === 'index.html') {
        requestsToDisplay = vacationRequests.slice(0, 4);
    } else if (currentPage === 'vacation_requests.html') {
        requestsToDisplay = vacationRequests;
    }

    if (requestsToDisplay) {
        renderCards(requestsToDisplay);

        // Search functionality
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const cards = container.querySelectorAll('.card');

                cards.forEach(card => {
                    const title = card.querySelector('.card-title').textContent.toLowerCase();
                    const salary = card.querySelector('.details').textContent.toLowerCase();
                    const matchesTitle = title.includes(query);
                    const matchesSalary = salary.includes(query);
                    
                    card.parentElement.style.display = matchesTitle || matchesSalary ? 'block' : 'none';
                });
            });
        }

        // Handle 'Select All' checkbox
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', () => {
                const allCheckboxes = container.querySelectorAll('.card-checkbox');
                allCheckboxes.forEach(checkbox => {
                    checkbox.style.display = selectAllCheckbox.checked ? 'block' : 'none';
                    checkbox.checked = selectAllCheckbox.checked;
                });
            });
        }
    } else {
        console.log('No requests to display.');
    }

    
});

