
const baseURL = "https://652088b7906e276284c4880c.mockapi.io/jobs";

getJobs = async () => {
    showView('spinner');
    let response = await fetch(`${baseURL}/jobs`); //esto por defecto hace un get
    let data = await response.json();
    setTimeout(() => {
        renderJobs(data);
    }, 3000);
};

// getJobs();

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
        console.log(job);
    } catch (error) {
        alert(error);
    } finally {
        window.location.href = "index.html";
    }
};

const getJobDetail = async (id) => {
    try {
        showView('spinner');
        let response = await fetch (`${baseURL}/jobs/${id}`);
        let data = await response.json();
        // showJobDetails(data, id); 
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




// const searchButtonHandler = async () => {
//     const categoryFilter = $("#category-filter").value;
//     const locationFilter = $("#location-filter").value;
//     const seniorityFilter = $("#seniority-filter").value;

//     try {
//         // Obtén la lista completa de trabajos
//         const allJobs = await getJobs();

//         // Inicializa filterJobs con todos los trabajos
//         let filterJobs = allJobs;

//         // Filtra por categoría si se seleccionó una categoría
//         filterJobs = categoryFilter !== "category"
//             ? filterJobs.filter((job) => job.category === categoryFilter)
//             : filterJobs;

//         // Filtra por ubicación si se seleccionó una ubicación
//         filterJobs = locationFilter !== "location"
//             ? filterJobs.filter((job) => job.location === locationFilter)
//             : filterJobs;

//         // Filtra por seniority si se seleccionó una seniority
//         filterJobs = seniorityFilter !== "seniority"
//             ? filterJobs.filter((job) => job.seniority === seniorityFilter)
//             : filterJobs;

//         // Renderiza los trabajos filtrados
//         renderJobs(filterJobs);
//     } catch (error) {
//         console.error(error);
//     }
// };

// const optionsSearchForm = (jobs) => {
//     const uniqueCategories = new Set(jobs.map((job) => job.category));
//     const uniqueLocations = new Set(jobs.map((job) => job.location));
//     const uniqueSeniorities = new Set(jobs.map((job) => job.seniority));
  
//     // Limpiar opciones existentes en los select
//     $("#category-filter").innerHTML = "";
//     $("#location-filter").innerHTML = "";
//     $("#seniority-filter").innerHTML = "";

//     // options select category
//     uniqueCategories.forEach((category) => {
//         $("#category-filter").innerHTML += `<option value="${category}">${category}</option>`;
//     });
  
//     // options select location
//     uniqueLocations.forEach((location) => {
//         $("#location-filter").innerHTML += `<option value="${location}">${location}</option>`;
//     });
  
//     // options select seniority
//     uniqueSeniorities.forEach((seniority) => {
//         $("#seniority-filter").innerHTML += `<option value="${seniority}">${seniority}</option>`;
//     });
// };

// // Asocia la función al evento click del botón Search
// $("#search-button").addEventListener("click", searchButtonHandler);



window.onload = () => {
    getJobs();
};



    //como refrescamos el html? getJobs es la funcion q va a la api y pinta. Asi que en borrarEmpleo, al finalizr, llamas a getJobs() (tal vez hay que ponerle un await para q pinte ok)
//}

//CLASE MIÉRCOLES 4 HAY FUNCIONES CON DISTINTOS METODOS