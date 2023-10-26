
const baseURL = "https://652088b7906e276284c4880c.mockapi.io/jobs";


const getJobs = async () => {
    showView('spinner');
    try {
        let response = await fetch(`${baseURL}/jobs`);
        let data = await response.json();
        setTimeout(() => {
            getFiltersData(data);
            renderJobs(data);
        }, 3000);
    } catch (error) {
        console.error(error);
    }
};

const getFiltersData = (data) => {
    getSeniority(data);
    getCategory(data);
    getLocation(data);
};


const createJob = () => {
    const internetPaid = $("#internet-paid").checked;
    const longTerm = $("#long-term").checked;

    const newJob = {
        id: "",
        name: $("#job-title").value,
        image: $("#image-url").value,
        description: $("#description").value,
        location: $("#location").value,
        seniority: $("#seniority").value,
        category: $("#category").value,
        salary: Number($("#salary").value),
        languages: $("#languages").value.split(","),
        long_term: longTerm,
        benefits: {
            vacation: $("#vacation").value,
            health_ensurance: $("#health-ensurance").value,
            internet_paid: internetPaid,
        },
        internetPaidText: internetPaid ? "Yes" : "No",
        longTermText: longTerm ? "Yes" : "No",
    };

    return newJob;
};


const registerJob = async (newJob) => {
    try {
        const response = await fetch(`${baseURL}/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newJob),
        });
        const job = await response.json();
    } catch (error) {
        alert(error);
    } finally {
        window.location.href = "index.html";
    }
};

const getJobDetail = async (id) => {
    try {
        showView('spinner');
        let response = await fetch(`${baseURL}/jobs/${id}`);
        let data = await response.json();

        const jobId = data.id;
        showJobDetails(data, jobId);
    } catch (error) {
        console.error(error);
    }
};

const deleteJob = async (id) => {
    try {
        await fetch(`${baseURL}/jobs/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        alert(`Error al eliminar puesto de trabajo ${id}`);
    } finally {
        window.location.href = "index.html";
    }
};

const editJob = async (id) => {
    showView("spinner");

    let response = await fetch(`${baseURL}/jobs/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            name: $("#edit-job-title").value,
            image: $("#edit-image-url").value,
            description: $("#edit-description").value,
            location: $("#edit-location").value,
            seniority: $("#edit-seniority").value,
            category: $("#edit-category").value,
            salary: Number($("#edit-salary").value),
            languages: $("#edit-languages").value.split(","),
            long_term: longTermValue,
            benefits: {
                vacation: $("#edit-vacation").value,
                health_ensurance: $("#edit-health-ensurance").value,
                internet_paid: $("#edit-internet-paid").checked,
            }
        }),
        headers: {
            'Content-type': 'application/json',
        }
    });

    let data = await response.json();

    setTimeout(() => {
        getJobs(data);
    }, 2000);
};

const getFilteredJobs = async () => {
    try {
        showView("spinner");
        const selectedSeniority = $("#seniority-filter").value;
        const selectedCategory = $("#category-filter").value;
        const selectedLocation = $("#location-filter").value;

        let url = new URL(`${baseURL}/jobs`);

        if (selectedSeniority) {
            url.searchParams.append("seniority", selectedSeniority);
        }

        if (selectedCategory) {
            url.searchParams.append("category", selectedCategory);
        }

        if (selectedLocation) {
            url.searchParams.append("location", selectedLocation);
        }

        let response = await fetch(url);
        let data = await response.json();

        renderJobs(data);
    } catch (error) {
        console.error(error);
    }
};

document.getElementById("search-button").addEventListener("click", getFilteredJobs);

const loadAllJobs = async () => {
    try {
        showView('spinner');
        let response = await fetch(`${baseURL}/jobs`);
        let data = await response.json();
        renderJobs(data);
    } catch (error) {
        console.error(error);
    }
};

window.onload = () => {
    getJobs();
};

