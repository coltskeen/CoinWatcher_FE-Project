console.log("loaded");

//Reference the html elements
let $searchInput = $('#crypto');
let searchButton = document.getElementById("submit");


//Number formatters with International API
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const numFormatter1 = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 });
const numFormatter2 = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 5 });

//Search Funtion w/ Button EventListener
searchButton.addEventListener("click", search);

function search() {
    let inputData = $searchInput.val();
    let $displayDiv = $("#dataCard");
    let $headerDiv = $("#coinHeader");
    let $h1 = $("#iconHeader");
    let $rankTitle = $("#rankTitle");
    let $rankData = $("#rankData");
    let $marketCapTitle = $("#marketCapTitle");
    let $marketCapData = $("#marketCapData");
    let $priceTitle = $("#priceTitle");
    let $priceData = $(".editPrice");
    let $volumeTitle = $("#volumeTitle");
    let $volumeData = $("#volumeData");
    let $ΔTitle = $("#ΔTitle");
    let $percentChangeData = $(".editPercent");
    let $supplyTitle = $("#supplyTitle");
    let $supplyData = $("#supplyData");
    let $infoBtn = $("#moreInfoBtn");


    $.get(`https://api.coincap.io/v2/assets`, (data) => {
        console.log(data.data);
        
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
                $marketCapTitle.text("Market Cap: ");
                let marketCap = currencyFormatter.format(Number(data.data[i]?.marketCapUsd));
                $marketCapData.text(`${marketCap}`);
                
                //ROW 2:
                $priceTitle.text("Price: ");
                let price = currencyFormatter.format(Number(data.data[i]?.priceUsd));
                $priceData.text(`${price}`);
                $volumeTitle.text("Volume(24Hr): ");
                let volume = numFormatter2.format(Number(data.data[i]?.volumeUsd24Hr));
                $volumeData.text(`${volume}`);
                
                //ROW 3:
                $ΔTitle.text("24Hr (Δ): ")
                let Δ = numFormatter1.format(Number(data.data[i]?.changePercent24Hr));
                $percentChangeData.text(`${Δ}%`);
                if(data.data[i]?.changePercent24Hr < 0) {
                    $percentChangeData.css({"color": "red"});
                } else if(data.data[i]?.changePercent24Hr > 0) {
                    $percentChangeData.css({"color": "Green"});
                }
                $supplyTitle.text("Supply: ");
                let supply = numFormatter2.format(Number(data.data[i]?.supply));
                $supplyData.text(`${supply}`);
                $infoBtn.attr("href", `${data.data[i].explorer}`);
            } 
        } 
    })
}

//Adding functionality when just enter is pressed
$searchInput.on("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("isthison?");
        search();
    }   
})

//Adding help button
var $collapsibleBtn = $(".collapsible");
var j;

for (j = 0; j < $collapsibleBtn.length; j++) {
  $collapsibleBtn[j].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}    
    
    