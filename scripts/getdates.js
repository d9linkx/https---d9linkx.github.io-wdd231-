// Function to set the current year
function setCurrentYear() {
    const currentYearSpan = document.querySelector('#currentyear');
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
}

// Function to set the last modified date
function setLastModifiedDate() {
    const lastModifiedParagraph = document.querySelector('#lastModified');
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
}

// Call the functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModifiedDate();
});


const courses = [
    { code: "CSE 110", type: "CSE", completed: true },
    { code: "CSE 210", type: "CSE", completed: false },
    { code: "WDD 130", type: "WDD", completed: true },
    { code: "WDD 131", type: "WDD", completed: false },
    { code: "CSE 111", type: "CSE", completed: false },
    { code: "WDD 231", type: "WDD", completed: true },
];

// Function to render courses
function renderCourses(filter = 'All') {
    const container = document.getElementById("courses-container");
    container.innerHTML = '';

    const filteredCourses = filter === 'All' ? courses : courses.filter(course => course.type === filter);

    filteredCourses.forEach(course => {
        const courseBtn = document.createElement("button");
        courseBtn.classList.add("course-btn");
        if (course.completed) {
            courseBtn.classList.add("completed");
        }
        courseBtn.textContent = course.code;
        container.appendChild(courseBtn);
    });

    // Calculate total credits (each course = 3 credits as an example)
    const totalCredits = courses.reduce((acc, course) => acc + 3, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

// Filter buttons event listeners
document.getElementById("all-btn").addEventListener("click", () => renderCourses('All'));
document.getElementById("cse-btn").addEventListener("click", () => renderCourses('CSE'));
document.getElementById("wdd-btn").addEventListener("click", () => renderCourses('WDD'));

// Initial rendering of all courses
renderCourses();


// Automatically add active class to the current page's nav link
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });
  

  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
  }
  