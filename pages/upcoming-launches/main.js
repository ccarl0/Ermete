document.addEventListener("DOMContentLoaded", async function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const cardHostDiv = document.querySelector("#card-host");

    await fetch("https://lldev.thespacedevs.com/2.2.0/launch/upcoming/", requestOptions)
        .then(response => response.json())
        .then(resJson => resJson["results"])
        .then(results => {
            results.forEach(element => {
                fetch(element['url'], requestOptions)
                    .then(response => response.json())
                    .then(resJson => {
                        console.log(resJson);

                        // div.col
                        const colDiv = document.createElement("div");
                        colDiv.setAttribute("class", "col");
                        // append
                        cardHostDiv.appendChild(colDiv);

                        // div.card h-100
                        const cardDiv = document.createElement("div");
                        cardDiv.setAttribute("class", "card h-100");
                        // append
                        colDiv.appendChild(cardDiv);

                        const cardImgTop = document.createElement("img");
                        cardImgTop.setAttribute("class", "card-img-top bg-cards");
                        cardImgTop.setAttribute("src", resJson["image"]);
                        cardImgTop.setAttribute("alt", resJson["description"]);
                        cardDiv.appendChild(cardImgTop);

                        const cardBody = document.createElement("div");
                        cardBody.setAttribute("class", "card-body");
                        cardDiv.appendChild(cardBody);

                        const cardTitle = document.createElement("h5");
                        cardTitle.setAttribute("class", "card-title fs-4");
                        cardTitle.innerHTML = resJson["name"];
                        cardBody.append(cardTitle);

                        const descriptionP = document.createElement("p");
                        descriptionP.setAttribute("class", "card-text fs-6");
                        descriptionP.innerHTML = resJson["mission"]["description"];
                        cardBody.append(descriptionP);

                        const cardFooter = document.createElement("div");
                        cardFooter.setAttribute("class", "card-footer text-center mb-2 position-absolute bottom-0 start-0 end-0");
                        cardBody.appendChild(cardFooter);

                        // container
                        // footer
                        const bottomCardContainer = document.createElement("div");
                        bottomCardContainer.setAttribute("class", "container ");
                        // append
                        cardFooter.append(bottomCardContainer)

                        // row
                        const bottomCardRow = document.createElement("div");
                        bottomCardRow.setAttribute("class", "row fs-6");
                        // append
                        bottomCardContainer.append(bottomCardRow)

                        // col2
                        const padDiv = document.createElement("div");
                        padDiv.setAttribute("class", "col-12 col-lg-7 footer");
                        // append
                        bottomCardRow.append(padDiv);

                        const padP = document.createElement("p");
                        padP.innerHTML = resJson["pad"]["name"];
                        padDiv.appendChild(padP);

                        // col1
                        const agencyDiv = document.createElement("div");
                        agencyDiv.setAttribute("class", "col-6 col-lg-2 fs-6 footer");
                        // append
                        bottomCardRow.append(agencyDiv);

                        const agencyP = document.createElement("p");
                        agencyP.innerHTML = resJson["mission"]["agencies"][0]["abbrev"];
                        agencyDiv.appendChild(agencyP);

                        

                        // col3
                        const dateDiv = document.createElement("div");
                        dateDiv.setAttribute("class", "col-6 col-lg-3");
                        // append
                        bottomCardRow.append(dateDiv);

                        const dateP = document.createElement("p");
                        dateP.innerHTML = formatDate(resJson["window_start"]);
                        dateDiv.appendChild(dateP);
                    })
                    .catch(error => console.log('error', error));
            });
        })
        .catch(error => console.log('error', error));
});


function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}