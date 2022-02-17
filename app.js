console.log("loaded");

//call the input element
let searchInput = document.querySelector('#crypto');
let searchButton = document.getElementById("submit");
let $displayDiv = $("#dataCard");
let $headerDiv = $("#coinHeader");

searchButton.addEventListener("click", function () {
    let inputData = searchInput.value;


    $.get(`https://api.coincap.io/v2/assets`, (data) => {
        // console.log(data.data[0]);
        
        for (var i = 0; i < data.data.length; i++) {
            //find the data and add data to list items 
            if (data.data[i].id === inputData || data.data[i].name === inputData || data.data[i].symbol === inputData) {

                //create and append card elements and add data
                $headerDiv.text( data.data[i]?.name );
                // let symbol = data.data[i].symbol.toLowerCase();
                
                let symbol = data.data[i].symbol.toLowerCase();
                let $h1 = $("<img class='card-title pricing-card-title'>");
                $h1.attr("src", `https://assets.coincap.io/assets/icons/${symbol}@2x.png`);
                $($h1).appendTo($displayDiv);

                
                //CREATE A DATA TABLE
                let $table = $("<table class='h6'></table>");
                $($table).appendTo($displayDiv);
                
                //ROW 1:
                let $rankRow = $("<tr></tr>");
                let $rankTitle = $("<td class='editTitle'>Rank: </td>");
                let $rankData = $("<td></td>");
                $rankData.text(`${data.data[i]?.rank}`);
                $($rankRow).appendTo($table);
                $($rankTitle).appendTo($rankRow);
                $($rankData).appendTo($rankRow);
                
                //ROW 2:
                let $priceRow = $("<tr></tr>");
                let $priceTitle = $("<td class='editTitle'>Price: </td>");
                let $priceData = $("<td class='editPrice'></td>");
                $priceData.text(`${data.data[i]?.priceUsd}`);
                $($priceRow).appendTo($table);
                $($priceTitle).appendTo($priceRow);
                $($priceData).appendTo($priceRow);
                
                //ROW 3:
                let $percentChangeRow = $("<tr></tr>");
                let $percentChangeTitle = $("<td class='editTitle'>24Hr (Δ): </td>");
                let $percentChangeData = $("<td class='editPercent'></td>");
                $percentChangeData.text(`${data.data[i]?.changePercent24Hr}%`);
                $($percentChangeRow).appendTo($table);
                $($percentChangeTitle).appendTo($percentChangeRow);
                $($percentChangeData).appendTo($percentChangeRow);
                if(data.data[i]?.changePercent24Hr < 0) {
                    $percentChangeData.css({"color": "red"});
                } else if(data.data[i]?.changePercent24Hr > 0) {
                    $percentChangeData.css({"color": "Green"});
                }
                
                let $infoBtn = $(`<a href='${data.data[i].explorer}'><button id='moreInfo' type='button' class='btn btn-lg btn-block btn-outline-primary'>More Info</button></a>`);
                $($infoBtn).appendTo($displayDiv);
                
                
                // if ($h1) { function clearScreen() {
                    //     $($h1).remove();
                    // } }
                }
            }
        })
    })
    
    
    
    {/* <img src="https://assets.coincap.io/assets/icons/btc@2x.png" class="AssetLogo__ImageStyled-sc-1m18p9x-0 itlbLb ui mini right spaced middle aligned image"> */}
    
    // let $ul = $("<ul class='dataInfo'>");
    // $($ul).appendTo($displayDiv);

    // let $rankLi = $("<li class='rank' id='rank'></li>");
    // $($rankLi).appendTo($ul);
    // $rankLi.text(`Rank: ${data.data[i]?.rank}`);

    // let $price = $("<li id='price'></li>");
    // $($price).appendTo($ul);
    // $price.text(`Price: ${data.data[i]?.priceUsd}`);

    // let $percentChange = $("<li id='percentChange'></li>");
    // $($percentChange).appendTo($ul);
    // $percentChange.text(`24Hr Percent Change: ${data.data[i]?.changePercent24Hr}%`);