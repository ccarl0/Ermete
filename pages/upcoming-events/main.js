document.addEventListener("DOMContentLoaded", async function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const cardHostDiv = document.querySelector("#card-host");

    await fetch("https://lldev.thespacedevs.com/2.2.0/event/upcoming/", requestOptions)
        .then(response => response.json())
        .then(resJson => resJson["results"])
        .then(results => {
            results.forEach(element => {
                fetch(element['url'], requestOptions)
                    .then(response => response.json())
                    .then(resJson => {
                        console.log(resJson);

                        const colDiv = document.createElement("div");
                        colDiv.setAttribute("class", "col");
                        cardHostDiv.appendChild(colDiv);

                        const infoA = document.createElement("a");
                        if (resJson["updates"] && resJson["updates"].length > 0 && resJson["updates"][0]["info_url"] !== undefined) {
                            console.log("info url " + resJson["updates"][0]["info_url"]);
                            infoA.setAttribute("href", resJson["updates"][0]["info_url"]);
                            colDiv.appendChild(infoA);
                        } else {
                            if (resJson["video_url"] !== null) {
                                console.log("video yt " + resJson["video_url"]);
                                infoA.setAttribute("href", resJson["video_url"]);
                                colDiv.appendChild(infoA);
                            } else {
                                console.log("no url");
                                colDiv.appendChild(infoA);
                            }
                        }

                        const cardDiv = document.createElement("div");
                        cardDiv.setAttribute("class", "card mb-3 mt-4");
                        infoA.appendChild(cardDiv);

                        const cardRowDiv = document.createElement("div");
                        cardRowDiv.setAttribute("class", "row g-0");
                        cardDiv.appendChild(cardRowDiv);

                        const imgCol = document.createElement("div");
                        imgCol.setAttribute("class", "col-lg-4 col-xl-5");
                        cardRowDiv.appendChild(imgCol);

                        const cardImgTop = document.createElement("img");
                        cardImgTop.setAttribute("class", "card-img-top bg-cards");
                        cardImgTop.setAttribute("src", resJson["feature_image"]);
                        cardImgTop.setAttribute("alt", resJson["description"]);
                        imgCol.appendChild(cardImgTop);

                        const bodyCol2 = document.createElement("div");
                        bodyCol2.setAttribute("class", "col-lg-8 col-xl-7 position-relative");
                        cardRowDiv.appendChild(bodyCol2);

                        const cardBody = document.createElement("div");
                        cardBody.setAttribute("class", "card-body");
                        bodyCol2.appendChild(cardBody);

                        const cardTitle = document.createElement("h5");
                        cardTitle.setAttribute("class", "card-title fs-4");
                        cardTitle.innerHTML = resJson["name"];
                        cardBody.append(cardTitle);

                        const descrAgenciesRow = document.createElement("div");
                        descrAgenciesRow.setAttribute("class", "row");
                        cardBody.appendChild(descrAgenciesRow);

                        const colDescr = document.createElement("div");
                        colDescr.setAttribute("class", "col-12 col-xl-10");
                        descrAgenciesRow.appendChild(colDescr);

                        const colAgencies = document.createElement("div");
                        colAgencies.setAttribute("class", "col-12 col-xl-2 d-none d-xl-block ag");
                        descrAgenciesRow.appendChild(colAgencies);

                        const descriptionP = document.createElement("p");
                        descriptionP.setAttribute("class", "card-text fs-6");
                        descriptionP.innerHTML = resJson["description"];
                        colDescr.append(descriptionP);

                        const agTitleP = document.createElement("p");
                        agTitleP.setAttribute("class", "lead text-center")
                        agTitleP.innerHTML = "Agencies";
                        colAgencies.append(agTitleP);

                        const agenciesP = document.createElement("p");
                        agenciesP.setAttribute("class", "card-card-text fs-4");
                        resJson["agencies"].forEach(element => {

                            const agA = document.createElement("a");
                            fetch(element["url"], requestOptions)
                                .then(response => response.json())
                                .then(resJson => {
                                    console.log(resJson);
                                    agA.setAttribute("href", resJson["info_url"]);
                                    colAgencies.append(agA);
                                });

                            const agP = document.createElement("p");
                            agP.setAttribute("class", "text-center tag");
                            agP.innerHTML = element["abbrev"];
                            agA.append(agP);
                        });

                        colAgencies.append(agenciesP);



                        // footer
                        const dateLocCardBody = document.createElement("div");
                        dateLocCardBody.setAttribute("class", "card-footer text-center position-absolute start-0 start-0 bottom-0 end-0");
                        bodyCol2.appendChild(dateLocCardBody);

                        const dateLocRow = document.createElement("div");
                        dateLocRow.setAttribute("class", "row fs-6");
                        dateLocCardBody.appendChild(dateLocRow);

                        const locCol = document.createElement("div");
                        locCol.setAttribute("class", "col-8");
                        dateLocRow.appendChild(locCol);

                        const locP = document.createElement("p");
                        locP.setAttribute("class", "text-start")
                        locP.innerHTML = resJson["location"];
                        locCol.append(locP);

                        const dateCol = document.createElement("div");
                        dateCol.setAttribute("class", "col-4");
                        dateLocRow.appendChild(dateCol);

                        const dateP = document.createElement("p");
                        dateP.setAttribute("class", "text-end")
                        dateP.innerHTML = formatDate(resJson["date"]);
                        dateCol.append(dateP);
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