import Dexie from "https://unpkg.com/dexie@latest/dist/modern/dexie.mjs";
let select1 = document.querySelector("#select1");
let select2 = document.querySelector("#select2");
let infos;
let input1 = document.querySelector("#nb1");
let input2 = document.querySelector("#nb2");
let btnClass = document.querySelector("#class");
let btnConvert = document.querySelector("#convert");


// extraire les informations de conversion de l'api et les mettre dans un tableau
fetch("https://api.frankfurter.app/latest")
.then((data) => data.json())
.then((data) => {
    infos = Object.entries(data);
    infos = infos[3][1];
    let monTab = Object.keys(infos).map((cle) => {
        return [infos[cle].toFixed(3), cle];
    });
    ///////////////////Notification///////////////////////
        // console.log(monTab);
        for (let i = 0; i < monTab.length; i++) {
            select1.innerHTML +=
                ' <option value="' +
                monTab[i][1] +
                '">' +
                monTab[i][1] +
                "</option>";
            select2.innerHTML +=
                ' <option value="' +
                monTab[i][1] +
                '">' +
                monTab[i][1] +
                "</option>";
            if (monTab[i][1] == "USD") {
                if (monTab[i][0] > 1.1039) {
                    //alert("le taux du Dollar américain'USD' a augmenté Sa valeur actuelle est: " + monTab[i][0] );
                    setTimeout(() => {
                        new Notification(
                            "currencies",
                            {
                                body:
                                    "le taux du Dollar américain'USD' a augmenté Sa valeur actuelle est: " +
                                    monTab[i][0],
                            },
                            { icon: "bell.svg" }
                            ).onclick = function () {
                                window.focus();
                                this.close();
                            };
                        }, 10000);
                    } else if (monTab[i][0] < 1.1039) {
                        setTimeout(() => {
                            new Notification(
                                "currencies",
                                {
                                    body:
                                    "le taux du Dollar américain'USD' a diminué Sa valeur actuelle est: " +
                                    monTab[i][0],
                                },
                            { icon: "bell.svg" }
                        ).onclick = function () {
                            window.focus();
                            this.close();
                        };
                    }, 10000);
                } else {
                    setTimeout(() => {
                        new Notification(
                            "currencies",
                            {
                                body:
                                "le taux du Dollar américain'USD' est le meme Sa valeur actuelle est: " +
                                monTab[i][0],
                            },
                            { icon: "bell.svg" }
                            ).onclick = function () {
                                window.focus();
                            this.close();
                        };
                    }, 10000);
                }
            }
        }
        btnClass.addEventListener("click", () => {
            const nouvelleFenetre = window.open(
                "classement.html",
                "classement des taux",
                `width=${600}, height=${1000}`
                );
                nouvelleFenetre.addEventListener("load", () => {
                    nouvelleFenetre.postMessage(
                        { type: "infos", data: monTab },
                        "*"
                        );
                    });
                });
            });
            
            //////////////////convertir taux/////////////////////////
            btnConvert.addEventListener("click", () => {
                let value1 = input1.value;
                if (select1.value != select2.value) {
                    const host = "api.frankfurter.app";
                    fetch(
                        `https://${host}/latest?amount=${value1}&from=${select1.value}&to=${select2.value}`
                        )
                        .then((val) => val.json())
                        .then(async (val) => {
                            input2.value = Object.values(val.rates)[0];
                            //console.log(Object.values(val.rates)[0]);
                            
                            ///////////////////utiliser la base de données/////////////////////
                
                const db = new Dexie("currencies");
                db.version(1).stores({
                    currencie: "++id,choice1,choice2,amount,convert",
                });

                try {
                    await db.currencie.add({
                        choice1: select1.value,
                        choice2: select2.value,
                        amount: value1,
                        convert: input2.value,
                    });
                } catch (e) {
                    alert(`Error: ${e}`);
                }
            });

        // alert("right");
    } else {
        alert("please select two different currency");
    }
});
