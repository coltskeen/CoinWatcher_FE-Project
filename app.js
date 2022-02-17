console.log("loaded");

//call the html elements
let searchInput = document.querySelector('#crypto');
let searchButton = document.getElementById("submit");
let $displayDiv = $("#dataCard");
let $headerDiv = $("#coinHeader");
let $h1 = $("#iconHeader");
let $rankTitle = $("#rankTitle");
let $rankData = $("#rankData");
let $priceTitle = $("#priceTitle");
let $priceData = $(".editPrice");
let $ΔTitle = $("#ΔTitle");
let $percentChangeData = $(".editPercent");
let $infoBtn = $("#moreInfoBtn");


searchButton.addEventListener("click", function () {
    let inputData = searchInput.value;

    $.get(`https://api.coincap.io/v2/assets`, (data) => {
        // console.log(data.data[0]);
        
        for (var i = 0; i < data.data.length; i++) {
            //find the data and add data to list items 
            if (data.data[i].id === inputData || data.data[i].name === inputData || data.data[i].symbol === inputData) {

                //add data to card
                $headerDiv.text( data.data[i]?.name );
                
                let symbol = data.data[i].symbol.toLowerCase();
                $h1.attr("src", `https://assets.coincap.io/assets/icons/${symbol}@2x.png`);
                
                //ROW 1:
                $rankTitle.text("Rank: ");
                $rankData.text(`${data.data[i]?.rank}`);

                //ROW 2:
                $priceTitle.text("Price: ");
                $priceData.text(`$ ${data.data[i]?.priceUsd}`);
                
                //ROW 3:
                $ΔTitle.text("24Hr (Δ): ")
                $percentChangeData.text(`${data.data[i]?.changePercent24Hr}%`);
                if(data.data[i]?.changePercent24Hr < 0) {
                    $percentChangeData.css({"color": "red"});
                } else if(data.data[i]?.changePercent24Hr > 0) {
                    $percentChangeData.css({"color": "Green"});
                }
                
                $infoBtn.attr("href", `${data.data[i].explorer}`);
            } else {
                console.log("hmm...");
            }
        } 
    })
})
    
    
    