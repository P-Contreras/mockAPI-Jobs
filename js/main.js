$ = (selector) => document.querySelector(selector);
$$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${view}`).classList.remove("visually-hidden")};

    $("#create-job-link").addEventListener("click", function (event) {
        event.preventDefault();
        
        $("#search-filters").classList.add("visually-hidden");
        showView("create-job");
    });
    
    $("#cancel-btn").addEventListener("click", () =>
        showView("jobs-list")
    );

    $("#home-btn").addEventListener("click", function (event) {
        event.preventDefault();
        showView("jobs-list");
    });

    $("#home").addEventListener("click", function (event) {
        event.preventDefault();
        showView("jobs-list");
    });


const renderJobs = (jobs) => {
    $("#jobs-list").innerHTML = "";
    if (jobs) {
        showView("jobs-list");
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        row.classList.add("gap-4")
        for (let { name, description, id, location, seniority, category} of jobs) {
            row.innerHTML += `
            <div class="card card-jobs shadow" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text job-description">${description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-action list-group-item-success">${location}</li>
                <li class="list-group-item list-group-item-action list-group-item-info">${seniority}</li>
                <li class="list-group-item list-group-item-action list-group-item-dark">${category}</li>
            </ul>
            <div class="card-body">
            <a href="#" class='btn btn-outline-dark boton' onclick=(${id})>View details</a>
            </div>
            </div>
    `;
            $("#jobs-list").appendChild(row);
        }
    } else {
    }
};
