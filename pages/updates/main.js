document.addEventListener("DOMContentLoaded", function () {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const listGroup = document.querySelector("#lgroup");

    fetch("https://lldev.thespacedevs.com/2.2.0/updates/?limit=100", requestOptions)
        .then(response => response.json())
        .then(resJson => resJson["results"])
        .then(results => {
            results.forEach(element => {
                console.log(element);

                // infoUrl
                const infoUrl = document.createElement("a");
                infoUrl.setAttribute("href", element["info_url"]);
                infoUrl.setAttribute("aria-current", "active");
                infoUrl.setAttribute("class", "list-group-item m-2 py-3 px-5 rounded-3");
                //append
                listGroup.append(infoUrl);

                // group item
                const lGroupItem = document.createElement("div");
                lGroupItem.setAttribute("class", "justify-content-between");
                // lGroupItem
                infoUrl.appendChild(lGroupItem);

                // Add this HTML structure for the date inside a row in two separate columns
                const lGroupItemRow = document.createElement("div");
                lGroupItemRow.setAttribute("class", "row");
                // append
                lGroupItem.appendChild(lGroupItemRow);

                // title column
                const titleCol = document.createElement("div");
                titleCol.setAttribute("class", "col-9");
                // append
                lGroupItemRow.appendChild(titleCol);

                // date column
                const dateCol = document.createElement("div");
                dateCol.setAttribute("class", "col-lg-3");
                // append
                lGroupItemRow.appendChild(dateCol);

                // title
                const title = document.createElement("h5");
                title.setAttribute("class", "w-100")
                title.innerHTML = element["comment"];
                // append
                titleCol.appendChild(title);

                // // date
                // const date = document.createElement("small");
                // const originalDate = new Date(element["created_on"]);
                // const formattedDate = originalDate.toLocaleDateString('en-US', {
                //     year: 'numeric',
                //     month: '2-digit',
                //     day: '2-digit'
                // });
                // // Format time
                // const formattedTime = originalDate.toLocaleTimeString('en-US', {
                //     hour12: false,
                //     hour: '2-digit',
                //     minute: '2-digit',
                //     second: '2-digit'
                // });
                // date.innerHTML = `${formattedDate} | ${formattedTime}`;
                // date.setAttribute("class", "my-auto");
                // // append
                // dateCol.appendChild(date);

            })
        })
        .catch(error => console.log('error', error));
});
