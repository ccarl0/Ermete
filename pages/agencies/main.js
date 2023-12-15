// agencies js
document.addEventListener("DOMContentLoaded", async function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const cardHostDiv = document.querySelector("#card-host");

    await fetch("https://lldev.thespacedevs.com/2.2.0/agencies?format=json&limit=500", requestOptions)
        .then(response => response.json())
        .then(resJson => resJson["results"])
        .then(results => {
            results.forEach(element => {
                fetch(element['url'], requestOptions)
                    .then(response => response.json())
                    .then(resJson => {
                        console.log(resJson["name"]);

                        // div.col
                        const colDiv = document.createElement("div");
                        colDiv.setAttribute("class", "col")
                        // append
                        cardHostDiv.append(colDiv);

                        // wikiA
                        const wikiA = document.createElement("a");
                        wikiA.setAttribute("href", resJson["wiki_url"]);
                        //append
                        colDiv.append(wikiA);

                        // div.card h-100
                        const cardDiv = document.createElement("div");
                        cardDiv.setAttribute("class", "card h-100 ");
                        // append
                        wikiA.appendChild(cardDiv);

                        // img.card-img-top
                        const cardImgTop = document.createElement("img");
                        cardImgTop.setAttribute("class", "card-img-top bg-cards");

                        if (resJson["logo_url"] == null) {
                            if (resJson["image_url"] == null) {
                                cardImgTop.setAttribute("src", "../../ErmeteLogo-nobg.png");
                            }
                            else {
                                cardImgTop.setAttribute("src", resJson["image_url"]);
                            }
                        }
                        else {
                            cardImgTop.setAttribute("src", resJson["logo_url"]);
                        }
                        // append
                        cardDiv.appendChild(cardImgTop);

                        // text

                        // div.card-body
                        const cardBodyDiv = document.createElement("div");
                        cardBodyDiv.setAttribute("class", "card-body");
                        // append
                        cardDiv.appendChild(cardBodyDiv);


                        // cardTitle
                        const cardTitle = document.createElement("h5");
                        cardTitle.setAttribute("class", "card-title");
                        cardTitle.innerHTML = resJson["name"];
                        // append
                        cardBodyDiv.append(cardTitle);

                        // container
                        const bottomCardContainer = document.createElement("div");
                        bottomCardContainer.setAttribute("class", "container text-center");
                        // append
                        cardBodyDiv.append(bottomCardContainer)

                        // row
                        const bottomCardRow = document.createElement("div");
                        bottomCardRow.setAttribute("class", "row mt-3");
                        // append
                        bottomCardContainer.append(bottomCardRow)

                        // ------------------

                        // col1
                        const countryDiv = document.createElement("div");
                        countryDiv.setAttribute("class", "col-9 country");
                        // append
                        bottomCardRow.append(countryDiv);

                        //countryP
                        const countryP = document.createElement("p");
                        countryP.setAttribute("class", "card-text fs-7");
                        countryP.innerHTML = "Countries: " + resJson["country_code"];
                        // append
                        countryDiv.appendChild(countryP);

                        
                        // ------------------

                        // div.vr
                        // const vr = document.createElement("div");
                        // vr.setAttribute("class","clol-1 vr");
                        // bottomCardRow.appendChild(vr);

                        // col2
                        // const abbrevDiv = document.createElement("p");
                        // abbrevDiv.setAttribute("class", "col-4");
                        // // append
                        // bottomCardRow.append(abbrevDiv);

                        // // abbrevP
                        // const abbrevP = document.createElement("p");
                        // abbrevP.setAttribute("class","card-text");
                        // abbrevP.innerHTML = resJson["abbrev"];
                        // // append
                        // abbrevDiv.appendChild(abbrevP);

                        // ------------------

                        // col3
                        const launchesDiv = document.createElement("div");
                        launchesDiv.setAttribute("class", "col-3");
                        // append
                        bottomCardRow.append(launchesDiv);

                        // abbrevP
                        const abbrevP = document.createElement("p");
                        abbrevP.setAttribute("class", "card-text");
                        abbrevP.innerHTML = resJson["abbrev"];
                        // append
                        launchesDiv.appendChild(abbrevP);

                        // sucLunchesP
                        const sucLunchesP = document.createElement("p");
                        sucLunchesP.setAttribute("class", "card-text");
                        sucLunchesP.innerHTML = "SL: " + resJson["successful_launches"];
                        // append
                        launchesDiv.appendChild(sucLunchesP);

                        // totLaunchesP
                        const totLaunchesP = document.createElement("p");
                        totLaunchesP.setAttribute("class", "card-text");
                        totLaunchesP.innerHTML = "TOT: " + resJson["total_launch_count"];
                        // append
                        launchesDiv.appendChild(totLaunchesP);
                    })
                    .catch(error => console.log('error', error));
            });
        })
        .catch(error => console.log('error', error));
});
