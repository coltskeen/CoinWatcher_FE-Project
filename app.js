console.log("loaded");

//call the input element
let searchInput = document.querySelector('#crypto');
let searchButton = document.getElementById("submit");
let $displayDiv = $("#dataCard");
let $headerDiv = $("#coinHeader");

searchButton.addEventListener("click", function () {
    let inputData = searchInput.value;
    // console.log(inputData);
    $.get(`https://api.coincap.io/v2/assets`, (data) => {
        console.log(data.data[0]);
        
        for (var i = 0; i < data.data.length; i++) {
            //find the data and add data to list items 
            if (data.data[i].id === inputData || data.data[i].name === inputData || data.data[i].symbol === inputData) {
                // console.log("is this working?");
                // console.log(data.data[i].name);

                //create and append card elements
                $headerDiv.text( data.data[i]?.name );
                
                let $h1 = $("<h1 class='card-title pricing-card-title'></h1>");
                $($h1).appendTo($displayDiv);
                // $h1.text(data.data[i]?.img)

                let $ul = $("<ul class='list-unstyled mt-3 mb-4'>");
                $($ul).appendTo($displayDiv);

                let $rankLi = $("<li id='rank'></li>");
                $($rankLi).appendTo($ul);
                $rankLi.text(`Rank: ${data.data[i]?.rank}`);

                let $price = $("<li id='price'></li>");
                $($price).appendTo($ul);
                $price.text(`Price: ${data.data[i]?.priceUsd}`);

                let $percentChange = $("<li id='percentChange'></li>");
                $($percentChange).appendTo($ul);
                $percentChange.text(`24Hr Percent Change: ${data.data[i]?.changePercent24Hr}%`);

                let $infoBtn = $(`<a href='${data.data[i].explorer}'><button id='moreInfo' type='button' class='btn btn-lg btn-block btn-outline-primary'>More Info</button></a>`);
                $($infoBtn).appendTo($displayDiv);
                

                //add data to elements

            }
        }
    })
})



{/* <img src="https://assets.coincap.io/assets/icons/btc@2x.png" class="AssetLogo__ImageStyled-sc-1m18p9x-0 itlbLb ui mini right spaced middle aligned image"> */}
