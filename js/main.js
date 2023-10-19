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

    $("#edit-job-btn").addEventListener("click", () => {
        showEditForm(job);
    });
};

let longTermValue;
let internetPaidValue;

// edit job
const showEditForm = (job, id) => {
    const jobDetailsContainer = $("#job-details-container");
    const editFormHTML = `
        <div class="edit-form">
        <div class="d-flex justify-content-center">
        <div class="col-md-8 mb-4">
            <div class="card mb-4 shadow-lg border-dark">
                <div class="card-body">
                    <form>
                        <div class="row mb-4">
                            <!-- TITLE input -->
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="job-title">Job Title</label>
                                    <input type="text" id="edit-job-title" class="form-control" />
                                </div>
                            </div>
                            <!-- IMG input -->
                            <div class="col mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="edit-image-url">Image Url</label>
                                    <input type="text" id="edit-image-url" class="form-control" />
                                </div>
                            </div>

                            <!-- DESCRIPTION input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="description">Description</label>
                                <textarea class="form-control" id="edit-description" rows="4"></textarea>
                            </div>

                            <!-- LOCATION input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="location">Location</label>
                                <input type="text" id="edit-location" class="form-control" />
                            </div>

                            <!-- SENIORITY input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="seniority">Seniority</label>
                                <input type="text" id="edit-seniority" class="form-control" />
                            </div>

                            <!-- CATEGORY input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="category">Category</label>
                                <input type="text" id="edit-category" class="form-control" />
                            </div>

                            <!-- SALARY input -->
                            <div class="row">
                                <div class="col form-outline mb-4">
                                    <label class="form-label" for="salary">Salary</label>
                                    <input type="number" id="edit-salary" class="form-control" />
                                </div>

                                <!-- LANGUEAGES input -->
                                <div class="col form-outline mb-4">
                                    <label class="form-label" for="languages">Languages</label>
                                    <input type="text" id="edit-languages" class="form-control" />
                                </div>
                            </div>

                            <!-- LONG-TERM checkbox -->
                            <div class="form-check d-flex justify-content-center mb-2">
                                <input class="form-check-input me-2" type="checkbox" id="edit-long-term"/>
                                <label class="form-check-label" for="edit-long-term">
                                    Long Term
                                </label>
                            </div>

                            <div>
                                <h5 class="card-subtitle mb-4 text-body-secondary">
                                    Benefits
                                </h5>
                                <div class="row">
                                    <div class="col form-outline mb-4">
                                        <label class="form-label" for="vacation">Vacation</label>
                                        <input type="text" id="edit-vacation" class="form-control" />
                                    </div>
                                    <div class="col form-outline mb-4">
                                        <label class="form-label" for="health-ensurance">Health Ensurance</label>
                                        <input type="text" id="edit-health-ensurance" class="form-control" />
                                    </div>
                                    <div class="form-outline">
                                        <div class="form-check d-flex justify-content-center mb-2">
                                            <input class="form-check-input me-2" type="checkbox" value=""
                                                id="edit-internet-paid"/>
                                            <label class="form-check-label" for="edit-internet-paid">
                                                Internet Paid
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-end">
                                <button type="button" id="bn-edit-job" class="col-1 btn btn-success">Edit Job</button>
                                <button type="button" id="btn-cancel-edit" class="col-1 btn btn-danger ms-3">Cancel</button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </div>
    `;

    jobDetailsContainer.innerHTML = editFormHTML;

    const longTermValue = job.long_term;
    const internetPaidValue = job.benefits.internet_paid;

    $("#edit-job-title").value = job.name;
    $("#edit-image-url").value = job.image;
    $("#edit-description").value = job.description;
    $("#edit-location").value = job.location;
    $("#edit-seniority").value = job.seniority;
    $("#edit-category").value = job.category;
    $("#edit-salary").value = job.salary;
    $("#edit-languages").value = job.languages.join(","); 
    $("#edit-long-term").checked = longTermValue;
    $("#edit-vacation").value = job.benefits.vacation;
    $("#edit-health-ensurance").value = job.benefits.health_ensurance;
    $("#edit-internet-paid").checked = internetPaidValue;

    $("#bn-edit-job").addEventListener("click", () => {
        editJob(job.id);
        
    });

    $("#btn-cancel-edit").addEventListener("click", () => {
        showJobDetails(job, id);
    });
};



// onclick="editJob('${id}')" --> tengo que pasarle esto al boton que guarda la edicion

