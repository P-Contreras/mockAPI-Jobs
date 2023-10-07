$ = (selector) => document.querySelector(selector);
$$ = (selector) => document.querySelectorAll(selector);

const showView = (view) => {
    $$(".view").forEach((view) => view.classList.add("visually-hidden"));
    $(`#${view}`).classList.remove("visually-hidden")};


// renderJobs = (jobs) => {
//     console.log(jobs);
//     showView("jobs-lists");
// };


const renderJobs = (jobs) => {
    $("#jobs-list").innerHTML = "";
    if (jobs) {
        showView("jobs-list");
        let row = document.createElement("div")
        row.setAttribute("class", "row")
        row.classList.add("gap-4")
        for (let { name, description, id, location, seniority, category } of jobs) {
            row.innerHTML += `
        <div class="card" style="width: 18rem;">
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
        <a href="#" class='btn btn-outline-dark boton' onclick=getCharacterById(${id})>Ver Detalles</a>
        </div>
        </div>
    `;
            $("#jobs-list").appendChild(row);
        }
    } else {
        showView("");
    }
};