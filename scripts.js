/* 
1. Collect use information
    1a. Get total asset amount
    1b. Percentage of total to be sold at each price point
    1c. Price increase increment (does the user want to sell on every whole dollar, .50 cents, etc...)
        * EX: Start selling 10% of total remaining asset at 1 dollar, then sell at ever dollar increment. 2 dollars, 3 dollars, etc.
    1d. Starting price to start selling at
    1e. Ending price to stop selling
        EX: Start at 1 dollar, stop at 5 dollars. 
2. After clicking submit, output information in table format (similar to excel)
    2a. Have column headers
        A. Remaining Asset
        B. Amount sold
        C. Price sold at
        D. Gross Profits
*/

// submitData handles collecting the data input by the end user
function submitData(){
    // Total starting asset balance
    let totalAssetAmount = parseFloat(document.getElementById("totalAssetAmount").value);
    // Percentage to sell of asset balance
    let sellPercentage = parseFloat(document.getElementById("sellingPercentage").value);
    // How much to increase the selling price by
    let priceIncrement = parseFloat(document.getElementById("priceIncrement").value);
    // Starting sell price
    let startSellPrice = parseFloat(document.getElementById("startSellPrice").value);
    // Ending sell price
    let endSellPrice = parseFloat(document.getElementById("endSellPrice").value);

    // Call the function to calculate the profits at each price point
    calculateProfits(totalAssetAmount, sellPercentage, priceIncrement, startSellPrice, endSellPrice)

}

// calculateProfits calculate the profits at each price point set by the end user
function calculateProfits(totalAssets, sellPercent, priceIncrease, startPrice, endPrice){
    // The current balance at each price point
    let remainingBalance = totalAssets;
    
    // Total gross profits over all price points
    let totalGrossProfits = 0;

    // Array to hold each price points selling information
    let sellingData = [];

        /* 
            1. Iterate through the price points
            2. Calculate the current price to be sold at
                a. Set the current selling price
            3. Calculate the amount of the asset to be sold
                a. Set the amount of asset being sold
            4. Update the remaining balance
            5. Update gross profits at this price point
        */
        for(let currentSellPrice = startPrice; currentSellPrice <= endPrice; currentSellPrice += priceIncrease){
            // Calculate how much of the remaining balance to sell at the price point
            let sellableAmount = remainingBalance * sellPercent;
    
            // Set what the current asset balance at this price point is
            let currentAssetBalance = remainingBalance;
    
            // Update the remaining balance of assets
            remainingBalance = remainingBalance - sellableAmount;
    
            // Calculate the gross profits at this price point
            let grossProfits = sellableAmount * currentSellPrice;
    
            // Calculate the total gross profits over all price points
            totalGrossProfits += grossProfits;
    
            /*
                Map to store the data that will be output to the user
                1. Starting asset balance at this price point
                2. Amount of asset that was sold
                3. Remaining amount of asset
                4. Current selling price
                5. Gross profits
            */
            const sellData = new Map([
                ["Asset balance", currentAssetBalance.toFixed(2)],
                ["Asset to be sold", sellableAmount.toFixed(2)],
                ["Remaining asset", remainingBalance.toFixed(2)],
                ["Current sell price", currentSellPrice.toFixed(2)],
                ["Gross profits", grossProfits.toFixed(2)],
                ["Total gross profits", totalGrossProfits.toFixed(2)],
            ]);
    
            sellingData.push(sellData);
        }

    outPutProfits(sellingData)
}

// outPutProfits outputs the calculated profits to the end user
/* 
    1. Have a for loop go through the array of maps
        a. Add a new tr(in JS) for the new set of data
    2. Inner loop (use Map.forEach()) to go through each map entry
        a. Add each maps entry to the new tr just created (new TD for each entry)
*/
function outPutProfits(sellingData){

    // Iterate through the array of maps
    for(let i = 0; i < sellingData.length; i++){
        // Get the current map
        let currentMap = sellingData[i];

        // Each key of the map in the sellingData array
        let assetBalance = currentMap.get("Asset balance");
        let sellAmount = currentMap.get("Asset to be sold");
        let remainAsset = currentMap.get("Remaining asset");
        let currSellPrice = currentMap.get("Current sell price");
        let gProfits = currentMap.get("Gross profits");
        let totalProfits = currentMap.get("Total gross profits");

        // Grab the table
        let table = document.getElementById("profitData")

        // Create a new row
        let newRow = table.insertRow(-1);

        // Insert the table data
        newRow.insertCell(-1).innerHTML = assetBalance;
        newRow.insertCell(-1).innerHTML = sellAmount;
        newRow.insertCell(-1).innerHTML = remainAsset;
        newRow.insertCell(-1).innerHTML = currSellPrice;
        newRow.insertCell(-1).innerHTML = gProfits;
        newRow.insertCell(-1).innerHTML = totalProfits;
    }
}