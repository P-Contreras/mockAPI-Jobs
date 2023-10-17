
const baseURL = "https://652088b7906e276284c4880c.mockapi.io/jobs";

getJobs = async () => {
    showView('spinner');
    let response = await fetch(`${baseURL}/jobs`); //esto por defecto hace un get
    let data = await response.json();
    console.log(data);
    setTimeout(() => {
        renderJobs(data);
    }, 3000);
};

getJobs();

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
        showJobDetails(data, id); // Pasa el id a showJobDetails
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

// editar ==> PATCH para editar parcialmente o PUT si queremos cambiarle todos los campos -->editarEmpleo(id)


//borrarEmpleo = async (id) => {
    //DELETE
    // let response = await fetch(
    //     "https://652088b7906e276284c4880c.mockapi.io/api/jobs"
    // );
    // let data = await response.json();


    //como refrescamos el html? getJobs es la funcion q va a la api y pinta. Asi que en borrarEmpleo, al finalizr, llamas a getJobs() (tal vez hay que ponerle un await para q pinte ok)
//}

//CLASE MIÉRCOLES 4 HAY FUNCIONES CON DISTINTOS METODOS