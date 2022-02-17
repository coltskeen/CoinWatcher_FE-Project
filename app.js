console.log("loaded");

//Reference the html elements
let $searchInput = $('#crypto');
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

//Number formatters with International API
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const ΔFormatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 });

//Search Funtion w/ Button EventListener
searchButton.addEventListener("click", search);

function search() {
    let inputData = $searchInput.val();

    $.get(`https://api.coincap.io/v2/assets`, (data) => {
        console.log(data.data[0]);
        
        for (var i = 0; i < data.data.length; i++) {
            //find the data and add data to list items 
            if (data.data[i].id === inputData || data.data[i].name === inputData || data.data[i].symbol === inputData) {

                //add data to card
                $headerDiv.text( data.data[i]?.name );
                
                let symbol = data.data[i].symbol.toLowerCase();
                $h1.attr("src", `https://assets.coincap.io/assets/icons/${symbol}@2x.png`);
                
                //ROW 1:
                $rankTitle.text("Rank: ");
                $rankData.text(`#${data.data[i]?.rank}`);
                
                //ROW 2:
                $priceTitle.text("Price: ");
                let price = currencyFormatter.format(Number(data.data[i]?.priceUsd));
                $priceData.text(`${price}`);
                
                //ROW 3:
                $ΔTitle.text("24Hr (Δ): ")
                let Δ = ΔFormatter.format(Number(data.data[i]?.changePercent24Hr));
                $percentChangeData.text(`${Δ}%`);
                if(data.data[i]?.changePercent24Hr < 0) {
                    $percentChangeData.css({"color": "red"});
                } else if(data.data[i]?.changePercent24Hr > 0) {
                    $percentChangeData.css({"color": "Green"});
                }
                
                $infoBtn.attr("href", `${data.data[i].explorer}`);
            } 
        } 
    })
}

//Trying to add functionality when just enter is pressed...
$searchInput.on("keyup", function (e) {
    if (e.keyCode === 13) {
        // e.preventDefault();
        console.log("isthison?");
        search();
    }   
})
    
    
    