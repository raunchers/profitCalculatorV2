/* 
    TO DO:
        1. Not have table headers generate every time the user clicks submit.
            a. Have a check to see if the header already exist in the DOM, do not create if it does
        2. Error handling
            a. Do not let users input negative values
            b. Make all input fields required before being able to submit the data
            c. Check if there is enough asset balance left over to continue the calculation operations
                1. Kill the loop if the balance is not high enough to continue selling
                2. Sell all remaining assets at last price point able to be calculated? (if the checkbox is checked)
        3. Add more options for the calculations
            a. Add a radio box to select selling remaining assets at ending price
        4. Style the spreadsheet
            a. Keep the spreadsheet in an internal window with an internal scroll bar? Similar to textarea
            b. Edit HTML to put the spreadsheet in a container of it's own for further styling
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

    // Array to hold each price points selling information. Will hold maps
    let sellingData = [];

        // Loop through the price points, calculate at that point, add data to a new map.
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
                6. Total gross profits over all current selling price points
            */
            const sellData = new Map([
                ["Asset balance", currentAssetBalance.toFixed(2)],
                ["Asset to be sold", sellableAmount.toFixed(2)],
                ["Remaining asset", remainingBalance.toFixed(2)],
                ["Current sell price", currentSellPrice.toFixed(2)],
                ["Gross profits", grossProfits.toFixed(2)],
                ["Total gross profits", totalGrossProfits.toFixed(2)],
            ]);
            
            // Push the map to the array
            sellingData.push(sellData);
        }

    // Pass the first map of the array to generate the table headers
    generateTableHead(sellingData[0]);
    // Generate the table data for the current calculations
    outPutProfits(sellingData);
}

// outPutProfits outputs the calculated profits to the end user
function outPutProfits(sellingData){

    // Iterate through the array of maps
    for(let i = 0; i < sellingData.length; i++){
        // Get the current map
        let currentMap = sellingData[i];

        // Grab the values from the current map using it's keys
        let assetBalance = currentMap.get("Asset balance");
        let sellAmount = currentMap.get("Asset to be sold");
        let remainAsset = currentMap.get("Remaining asset");
        let currSellPrice = currentMap.get("Current sell price");
        let gProfits = currentMap.get("Gross profits");
        let totalProfits = currentMap.get("Total gross profits");

        // Grab the table
        let table = document.getElementById("profitData");

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

// generateTableHead generates the table head, dynamically, by accessing each key of the first map in the array
// The first map from the array of maps is passed to this function
function generateTableHead(data){
    // Grab the table
    let table = document.getElementById("profitData");

    // Create the table header
    let thead = table.createTHead();

    // Create a new row for the table header
    let theadRow = thead.insertRow();

    // Dynmically grab each key from the map to generate the headers for the table
    data.forEach(function(value, key){
        // Create a new table headers
        let th = document.createElement("th");
        // Grab the key from the map
        let text = document.createTextNode(key);
        // Add the map key to the table header
        th.appendChild(text);
        // Add the table header to the current table row
        theadRow.appendChild(th);
    });
}