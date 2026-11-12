// ======================================================
// SAM ETHNAN COMMUNITY GUIDE
// Main JavaScript
// ======================================================


// ======================================================
// DOM ELEMENTS
// ======================================================

const menuBtn = document.querySelector("#menuBtn");
const navLinks = document.querySelector("#navLinks");

const searchInput = document.querySelector("#search");
const clearButton = document.querySelector("#clear");

const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

const noResults = document.querySelector("#none");

const topButton = document.querySelector("#top");

const categoryLinks = document.querySelectorAll(
    "[data-filter-link]"
);

const checklistBoxes = document.querySelectorAll(
    ".checklist input"
);


// ======================================================
// APPLICATION STATE
// ======================================================

let selectedCategory = "all";


// ======================================================
// MOBILE NAVIGATION
// ======================================================

function initMobileMenu() {

    if (!menuBtn || !navLinks) {
        return;
    }

    menuBtn.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // Close menu when a navigation link is clicked

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


// ======================================================
// DIRECTORY FILTERING
// ======================================================

function updateCards() {

    if (!cards.length) {
        return;
    }


    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    let visibleCards = 0;


    cards.forEach(card => {

        const category =
            card.dataset.category || "";

        const searchData =
            card.dataset.search
                ? card.dataset.search.toLowerCase()
                : "";


        // Check category

        const categoryMatches =
            selectedCategory === "all" ||
            category === selectedCategory;


        // Check search

        const searchMatches =
            searchText === "" ||
            searchData.includes(searchText);


        // Determine whether card should appear

        const shouldShow =
            categoryMatches &&
            searchMatches;


        card.hidden = !shouldShow;


        if (shouldShow) {
            visibleCards++;
        }

    });


    // Update "no results" message

    if (noResults) {

        noResults.hidden =
            visibleCards !== 0;

    }


    // Update result count

    updateResultCount(visibleCards);

}


// ======================================================
// RESULT COUNT
// ======================================================

function updateResultCount(count) {

    const resultCount =
        document.querySelector("#resultCount");


    if (!resultCount) {
        return;
    }


    resultCount.textContent =
        `${count} ${count === 1 ? "place" : "places"} found`;

}


// ======================================================
// SEARCH
// ======================================================

function initSearch() {

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        updateCards
    );

}


// ======================================================
// CLEAR SEARCH
// ======================================================

function clearSearch() {

    if (searchInput) {
        searchInput.value = "";
    }


    setCategory("all");


    if (searchInput) {
        searchInput.focus();
    }

}


// ======================================================
// CATEGORY SELECTION
// ======================================================

function setCategory(category) {

    selectedCategory = category;


    // Update active button

    filterButtons.forEach(button => {

        const isActive =
            button.dataset.filter === category;

        button.classList.toggle(
            "active",
            isActive
        );

    });


    updateCards();

}


// ======================================================
// CATEGORY BUTTONS
// ======================================================

function initFilters() {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.filter;

            setCategory(category);

        });

    });

}


// ======================================================
// CLEAR BUTTON
// ======================================================

function initClearButton() {

    if (!clearButton) {
        return;
    }


    clearButton.addEventListener(
        "click",
        clearSearch
    );

}


// ======================================================
// CATEGORY LINKS
// ======================================================

function initCategoryLinks() {

    categoryLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();


                const category =
                    link.dataset.filterLink;


                if (!category) {
                    return;
                }


                setCategory(category);


                // Scroll to directory

                const directory =
                    document.querySelector("#places");


                if (directory) {

                    directory.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });

}


// ======================================================
// BACK TO TOP
// ======================================================

function initBackToTop() {

    if (!topButton) {
        return;
    }


    function toggleTopButton() {

        topButton.classList.toggle(
            "show",
            window.scrollY > 450
        );

    }


    window.addEventListener(
        "scroll",
        toggleTopButton
    );


    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    toggleTopButton();

}


// ======================================================
// CHECKLIST
// ======================================================

function initChecklist() {

    if (!checklistBoxes.length) {
        return;
    }


    checklistBoxes.forEach(
        (checkbox, index) => {

            const storageKey =
                `sam-ethnan-check-${index}`;


            // Restore saved state

            checkbox.checked =
                sessionStorage.getItem(
                    storageKey
                ) === "true";


            // Save state

            checkbox.addEventListener(
                "change",
                () => {

                    sessionStorage.setItem(
                        storageKey,
                        checkbox.checked
                    );

                }
            );

        }
    );

}


// ======================================================
// INITIALIZE APPLICATION
// ======================================================

function init() {

    initMobileMenu();

    initSearch();

    initClearButton();

    initFilters();

    initCategoryLinks();

    initBackToTop();

    initChecklist();

    // Show all cards initially

    setCategory("all");

}


// ======================================================
// START APPLICATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    init
);