
document.addEventListener("DOMContentLoaded", async function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const spinner = document.querySelector(".moon");

    
    await fetch("https://api.nasa.gov/planetary/apod?start_date=2023-11-20&api_key=2bDtElNwJxRfoPhRAznf9XnIN2n5qyefPVJCFkRt", requestOptions)
        .then(response => response.json())
        .then(result => {
            result.reverse();
            result.forEach(element => {
                console.log("\n");
                console.log(element["url"]);

                // buttons
                var slidebuttonTag = document.createElement("button");
                slidebuttonTag.setAttribute("type", "button");
                slidebuttonTag.setAttribute("data-bs-target", "#apodCarousel");
                slidebuttonTag.setAttribute("data-bs-slide-to", `${result.indexOf(element)}`);
                slidebuttonTag.setAttribute("aria-label", "Slide " + result.indexOf(element));
                if (result.indexOf(element) == 0) {
                    slidebuttonTag.setAttribute("class", "active");
                    slidebuttonTag.setAttribute("aria-current", "true");
                }
                // appending button
                const parentButtonDiv = document.querySelector("#apod-indicators")
                parentButtonDiv.appendChild(slidebuttonTag);

                // actual apod slides (div)
                const slideDiv = document.createElement("div");
                slideDiv.setAttribute("class", "carousel-item");
                if (result.indexOf(element) === 0) {
                    slideDiv.setAttribute("class", "carousel-item active");
                }

                // a tag
                const anchorImgTag = document.createElement("a");
                anchorImgTag.setAttribute("href", element["hdurl"]);
                anchorImgTag.setAttribute("target", "_blank");
                // append a tag
                slideDiv.append(anchorImgTag);


                // sometimes api returns a video
                if (!(element["url"].includes("youtube.com"))) {
                    // img tag
                    const slideImg = document.createElement("img");
                    slideImg.setAttribute("src", element["url"]);
                    slideImg.setAttribute("alt", "title");
                    slideImg.setAttribute("class", "d-block w-100");
                    slideImg.style.height = "500px";
                    slideImg.style.objectFit = "cover";
                    // appending img
                    anchorImgTag.appendChild(slideImg);
                }
                else {
                    // Create an iframe for the YouTube video
                    const videoIframe = document.createElement("iframe");
                    videoIframe.setAttribute("src", element["url"]);
                    videoIframe.setAttribute("allowfullscreen", "");
                    videoIframe.setAttribute("class", "d-block w-100");
                    videoIframe.style.height = "500px"; // Adjust height as needed
                    videoIframe.style.objectFit = "cover";
                    // Append the iframe to the slide
                    slideDiv.appendChild(videoIframe);
                }




                // appending slide
                const parentSlideDiv = document.querySelector(".carousel-inner");
                parentSlideDiv.appendChild(slideDiv);

                // title date container
                const titledivContainer = document.createElement("div");
                titledivContainer.setAttribute("class", "carousel-caption d-flex flex-column");
                // append titleDiv
                slideDiv.appendChild(titledivContainer);

                // container row
                const titleDateRow = document.createElement("div");
                titleDateRow.setAttribute("class", "row");
                // append row to container
                titledivContainer.appendChild(titleDateRow);

                // title div
                const titleDiv = document.createElement("div");
                titleDiv.setAttribute("class", "col-12 col-xl-8 m-0 text-start");
                // append
                titleDateRow.appendChild(titleDiv);

                // date div
                const dateDiv = document.createElement("div");
                dateDiv.setAttribute("class", "d-none d-xl-block col-md-4 mt-auto text-end");
                // append
                titleDateRow.appendChild(dateDiv);

                // title tag (title)
                const h1TitleTag = document.createElement("h1");
                h1TitleTag.innerText = element["title"];
                // append title
                titleDiv.appendChild(h1TitleTag);

                // date tag
                const h3DateTag = document.createElement("h3");
                h3DateTag.innerText = element["date"];
                // append date
                dateDiv.appendChild(h3DateTag);              
            });
            spinner.style.display = "none";
            console.log("Finish spinning!");;
        })
        .catch(error => console.error('Error fetching APOD data:', error));

        
});