let table = document.querySelector("table");

window.addEventListener("message", (event) => {
    if (event.data.type === "infos") {
        const infos = event.data.data;
        console.log(infos);
        /*var infos = Object.keys(infos).map((cle) => {
            return [infos[cle].toFixed(3), cle];
        });*/
        infos.sort((a, b) => {
            return b[0] - a[0];
        });

        //console.log(Object.values(infos));
        // Utiliser les données pour construire le tableau
        for (let i = 0; i < infos.length; i++) {
            table.innerHTML +=
                '<tr><th scope="row">' +
                i +
                "</th><td>" +
                infos[i][1] +
                "</td><td>" +
                infos[i][0] +
                "</td></tr>";
        }
    }
});
