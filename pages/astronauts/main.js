// agencies js
document.addEventListener("DOMContentLoaded", async function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const cardHostDiv = document.querySelector("#card-host");

    await fetch("https://lldev.thespacedevs.com/2.2.0/astronaut", requestOptions)
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
                        wikiA.setAttribute("href", resJson["wiki"]);
                        //append
                        colDiv.append(wikiA);

                        // div.card h-100
                        const cardDiv = document.createElement("div");
                        cardDiv.setAttribute("class", "card h-100");
                        // append
                        wikiA.appendChild(cardDiv);

                        // img.card-img-top
                        const cardImgTop = document.createElement("img");
                        cardImgTop.setAttribute("class", "card-img-top bg-cards");
                        cardImgTop.setAttribute("src", resJson["profile_image"]);
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
                        cardTitle.innerHTML = resJson["name"] + "\t|\t" + resJson["nationality"];
                        // append
                        cardBodyDiv.append(cardTitle);

                        // cardBio
                        const cardBio = document.createElement("p");
                        cardBio.setAttribute("class", "card-card-text fs-6");
                        cardBio.innerHTML = resJson["bio"];
                        // append
                        cardBodyDiv.append(cardBio);


                        // container
                        const bottomCardContainer = document.createElement("div");
                        bottomCardContainer.setAttribute("class", "container text-center position-absolute bottom-0 start-50 translate-middle-x mb-3");
                        // append
                        cardBodyDiv.append(bottomCardContainer)

                        // row
                        const bottomCardRow = document.createElement("div");
                        bottomCardRow.setAttribute("class", "row mt-3");
                        // append
                        bottomCardContainer.append(bottomCardRow)

                        // col1
                        const dobDiv = document.createElement("div");
                        dobDiv.setAttribute("class", "col-4 country");
                        // append
                        bottomCardRow.append(dobDiv);

                        // title
                        const dobTitleP = document.createElement("p");
                        // title
                        dobTitleP.setAttribute("class", "card-text fw-bold text-center");
                        dobTitleP.innerHTML = "Birthdate";
                        // append
                        dobDiv.appendChild(dobTitleP);

                        // dobP
                        const dobP = document.createElement("p");
                        dobP.setAttribute("class", "card-text");
                        dobP.innerHTML = resJson["date_of_birth"];
                        // append
                        dobDiv.appendChild(dobP);

                        // ------------------------------------

                        // col2
                        const tisDiv = document.createElement("div");
                        tisDiv.setAttribute("class", "col-4 country");
                        // append
                        bottomCardRow.append(tisDiv);

                        //tisP
                        console.log(transformDuration(resJson["time_in_space"]));
                        const tisTitleP = document.createElement("p");
                        const tisHoursP = document.createElement("p");
                        const tisMinsP = document.createElement("p");
                        const tisSecsP = document.createElement("p");

                        // title
                        tisTitleP.setAttribute("class", "card-text fw-bold text-center");
                        tisTitleP.innerHTML = "Time In Space";
                        // hours
                        tisHoursP.setAttribute("class", "card-text");
                        tisHoursP.innerHTML = "Days: " + transformDuration(resJson["time_in_space"])[0];
                        // min
                        tisMinsP.setAttribute("class", "card-text");
                        tisMinsP.innerHTML = "Hours: " + transformDuration(resJson["time_in_space"])[1];
                        // secs
                        tisSecsP.setAttribute("class", "card-text");
                        tisSecsP.innerHTML = "Min: " + transformDuration(resJson["time_in_space"])[2];
                        // append
                        tisDiv.appendChild(tisTitleP);
                        tisDiv.appendChild(tisHoursP);
                        tisDiv.appendChild(tisMinsP);
                        tisDiv.appendChild(tisSecsP);

                        // ------------------------------------

                        // col3
                        const socialDiv = document.createElement("div");
                        socialDiv.setAttribute("class", "col-4 country");
                        // append
                        bottomCardRow.append(socialDiv);

                        //tisP
                        const socialTitleDiv = document.createElement("p");
                        // title
                        socialTitleDiv.setAttribute("class", "card-text fw-bold text-center");
                        socialTitleDiv.innerHTML = "References";
                        // ref logos
                        const igA = document.createElement("a");
                        const xA = document.createElement("a");
                        const agencyA = document.createElement("a");
                        const igLogo = document.createElement("i");
                        const xLogo = document.createElement("i");
                        const agencyLogo = document.createElement("img");
                        // anchors
                        igA.setAttribute("href", resJson["instagram"]);
                        xA.setAttribute("href", resJson["twitter"]);
                        agencyA.setAttribute("href", resJson["agency"]["url"]);
                        // imgs
                        igLogo.setAttribute("class", "fa fa-instagram");
                        xLogo.setAttribute("class", "fa fa-twitter");
                        console.log(resJson["agency"]["name"]);
                        agencyLogo.setAttribute("src", resJson["agency"]);

                        // append to anchors
                        socialDiv.appendChild(socialTitleDiv);

                        igA.appendChild(igLogo);
                        socialDiv.appendChild(igA);

                        xA.appendChild(xLogo);
                        socialDiv.appendChild(xA);

                        // agencyA.appendChild(agencyLogo);
                        // socialDiv.appendChild(agencyA);



                    })
                    .catch(error => console.log('error', error));
            });
        })
        .catch(error => console.log('error', error));
});


function transformDuration(durationString) {
    // Extracting days, hours, minutes, and seconds from the duration string
    const matches = durationString.match(/P(?:([0-9]+)D)?T?(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/);

    if (!matches) {
        return "Invalid duration format";
    }

    const days = matches[1] ? parseInt(matches[1]) : 0;
    const hours = matches[2] ? parseInt(matches[2]) : 0;
    const minutes = matches[3] ? parseInt(matches[3]) : 0;
    const seconds = matches[4] ? parseInt(matches[4]) : 0;

    // Constructing the array with hours, minutes, and seconds
    const resultArray = [days, hours, minutes, seconds];

    return resultArray;
}