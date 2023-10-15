
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
    const newJob = {
        name: $("#job-title").value,
        image: $("#image-url").value,
        description: $("#description").value,
        location: $("#location").value,
        seniority: $("#seniority").value,
        category: $("#category").value,
        salary: Number($("#salary").value),
        languages: $("#languages").value.split(","),
        long_term: $("#long-term").checked,
        benefits: {
            vacation: $("#vacation").value,
            health_ensurance: $("#health-ensurance").value,
            internet_paid: $("#internet-paid").checked,
        },
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


// editar ==> PATCH para editar parcialmente o PUT si queremos cambiarle todos los campos -->editarEmpleo(id)

//borrar ==> DELETE --> borrarEmpleo(id). Para ir a buscarlo, lo buscamos por ID, le pasamos el ID por parámetro

//borrarEmpleo = async (id) => {
    //DELETE
    // let response = await fetch(
    //     "https://652088b7906e276284c4880c.mockapi.io/api/jobs"
    // );
    // let data = await response.json();


    //como refrescamos el html? getJobs es la funcion q va a la api y pinta. Asi que en borrarEmpleo, al finalizr, llamas a getJobs() (tal vez hay que ponerle un await para q pinte ok)
//}

//CLASE MIÉRCOLES 4 HAY FUNCIONES CON DISTINTOS METODOS