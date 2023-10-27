//add style for Table Search name with id parameter
// Loop element order : <table> => <tbody> => <tr> => <td>
function stylingTableSearch(indicator){
    var xxx = document.getElementById(indicator);
    var vvv = xxx.children; //retrieve one lower level children, here is Tbody element
    for (let index = 0; index < vvv.length; index++) { // Loop through every Tbody element, since there only one Tbody, therefore vvv.length return 1;
        const elementx = vvv[index]; // Locate Tbody element, here is only one tbody, index will start at 0 and condition index < 1
        elementx.parentElement.setAttribute("style","font-size:16px;width:80%"); // styling Tbody element
        var jjj = elementx.children; // Retrieve one lower level child element in Tbody element, here is Tr element
        for (let index = 0; index < jjj.length; index++) {// Loop through every Tr element
            const elementy = jjj[index]; // Locate Tr element in Tbody has located
            //Prepare styling Tr
            if(index%2==0){ // if Tr is in position even follows by array 0 -> tbody.length, does not follow order as shown in browser is 1 -> last element
                if(index==0){ // Specific the first element Tr in tbody follows by array 0 -> tbody.length, does not follow order as shown in browser is 1 -> last element
                    elementy.setAttribute("style","background:#000;color: #fff;"); // Styling this element
                }
                else{
                    elementy.setAttribute("style","background:#1f7287;color: #fff;"); // Styling not "the-first" element
                }
            }
            else{ // if Tr is in position odd follows by array 0 -> tbody.length, does not follow order as shown in browser is 1 -> last element
                elementy.setAttribute("style","background:#afefff;color: #000;");
            }

            var ccc = elementy.children; // Retrieve one lower level child element in Tr element, here is Td element
            for (let index = 0; index < ccc.length; index++) { // Loop through every Td element in Tr element
                const elementp = ccc[index]; // Specific Td element in Tr
                //Styling this Td element
                elementp.setAttribute("style","text-align: center;padding: 10px;border-bottom: none;border-top: none;border: none;");
                //Continue to loop through until the last Td element
            }
            //Continue to loop through until the last Tr element
        }
        //Continue to loop through until the last Tbody element
    }
}