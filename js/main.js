$ = (selector) => document.querySelector(selector);
$$ = (selector) => document.querySelectorAll(selector);

// const randomId = () => self.crypto.randomUUID();

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
        showView("search-filters");
        showView("jobs-list");
    });

    $("#home").addEventListener("click", function (event) {
        event.preventDefault();
        showView("search-filters");
        showView("jobs-list");
    });

    $("#create-btn").addEventListener("click", async function (event) {
        event.preventDefault();
    
        const newJob = createJob();
    
        await registerJob(newJob);
        getJobs();  
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
            <a href="#" class='btn btn-outline-dark boton' onclick="getJobDetail('${id}')">View details</a>
            </div>
            </div>
    `;
            $("#jobs-list").appendChild(row);
        }
    } else {
        console.error("Invalid jobs data");
    }
};


// const showJobDetails = (job, id) => {
//     $("#search-filters").classList.add("visually-hidden");
//     const jobDetailsContainer = $("#job-details-container");
//     showView("job-details-container");

//     const jobDetailsHTML = `
//         <div class="card" style="width: 38rem;">
//             <img src="${job.image}" class="card-img-top job-image" alt="...">
//             <div class="card-body">
//                 <h3 class="card-title">${job.name}</h3>
//                 <p class="card-text">${job.description}</p>
//                 <ul class="list-group list-group-flush">
//                     <li class="list-group-item list-group-item-action list-group-item-success">${job.location}</li>
//                     <li class="list-group-item list-group-item-action list-group-item-info">${job.seniority}</li>
//                     <li class="list-group-item list-group-item-action list-group-item-dark">${job.category}</li>
//                 </ul>
//             </div>
//             <div class="card-body">
//                 <p class="card-text">Salary: $ ${job.salary}</p>
//                 <p class="card-text">Languages: ${job.languages}</p>
//                 <p class="card-text">Long term: ${job.longTermText}</p>
//                 <h5 class="card-title">Benefits</h5>
//                 <p class="card-text">Vacation: ${job.benefits.vacation}</p>
//                 <p class="card-text">Health insurance: ${job.benefits.health_ensurance}</p>
//                 <p class="card-text">Internet paid: ${job.internetPaidText}</p>
//             </div>
//             <div class="card-body">
//                 <button type="button" id="edit-job-btn" class="col btn btn-success">Edit Job</button>
//                 <button type="button" id="delete-job-btn" class="col btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#modal-delete-job">Delete Job</button>
//             </div>
//         </div>
//     `;

//     jobDetailsContainer.innerHTML = jobDetailsHTML;

//     $("#delete-job-btn").addEventListener("click", () => {
//         const userConfirmed = window.confirm("Are you sure you want to delete this job?");

//         if (userConfirmed) {
//             deleteJob(id);
//         } else {
//         }
//     });
    
// };

const showJobDetails = (job, id) => {
    $("#search-filters").classList.add("visually-hidden");
    const jobDetailsContainer = $("#job-details-container");
    showView("job-details-container");

    const jobDetailsHTML = `
        <div class="card" style="width: 38rem;">
            <img src="${job.image}" class="card-img-top job-image" alt="...">
            <div class="card-body">
                <h3 class="card-title">${job.name}</h3>
                <p class="card-text">${job.description}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item list-group-item-action list-group-item-success">${job.location}</li>
                    <li class="list-group-item list-group-item-action list-group-item-info">${job.seniority}</li>
                    <li class="list-group-item list-group-item-action list-group-item-dark">${job.category}</li>
                </ul>
            </div>
            <div class="card-body">
                <p class="card-text">Salary: $ ${job.salary}</p>
                <p class="card-text">Languages: ${job.languages}</p>
                <p class="card-text">Long term: ${job.longTermText}</p>
                <h5 class="card-title">Benefits</h5>
                <p class="card-text">Vacation: ${job.benefits.vacation}</p>
                <p class="card-text">Health insurance: ${job.benefits.health_ensurance}</p>
                <p class="card-text">Internet paid: ${job.internetPaidText}</p>
            </div>
            <div class="card-body">
                <button type="button" id="edit-job-btn" class="col btn btn-success">Edit Job</button>
                <button type="button" id="delete-job-btn" class="col btn btn-danger ms-3" data-bs-toggle="modal" data-bs-target="#modal-delete-job">Delete Job</button>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modal-delete-job" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm elimination</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this job?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="confirm-delete-btn">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    jobDetailsContainer.innerHTML = jobDetailsHTML;

    $("#delete-job-btn").addEventListener("click", () => {
        $("#confirm-delete-btn").addEventListener("click", () => {
            deleteJob(id);
            $("#modal-delete-job").modal("hide");
        });

        $("#modal-delete-job").modal("show");
    });
};


