var nameflag = false, ageflag = false, addressflag = false;

function showStdData(){
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("showStdData").innerHTML = this.responseText;
            document.getElementById("searchName").innerHTML = "";
            document.getElementById("txtsearchName").value = "";
            loadStudentID();
            paginationTableContent("tableStudent",5,true);
            groupPagesinSection(4);
        }
    };
    

    //Send data
    xmlhttp.open("GET", "showStdData.php?q=" , true);
    xmlhttp.send();
    
}

function insertStdData() {
    
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            var showError = document.getElementById("showError");
            if(showError.getAttribute("style")!=null){
                showError.removeAttribute("style");
            }
            var messageresponse = this.responseText;
            messageresponse = getFirstCharactersofString(messageresponse,5);
            showError.innerHTML = this.responseText;
            resetFieldInsert();
            showStdData();
            if(messageresponse == "Error"){
                //Do something
            }
            else{
                setInterval(function() {showError.setAttribute("style","display:none")}, 3000);
            }
            
        }
    };
    

    //Send data
    var txtstdid = document.getElementById("txtstdid").value;
    var txtstdname = document.getElementById("txtstdname").value;
    var txtstdage = document.getElementById("txtstdage").value;
    var txtstdaddr = document.getElementById("txtstdaddr").value;
    if(txtstdname.length == 0 && txtstdage.length==0 && txtstdaddr.length==0){
        alert("Fields are not allows empty");
        return;
    }
    if(nameflag==true || ageflag == true || addressflag == true){
        alert("Please read the warnings");
        return;
    }
    xmlhttp.open("GET", "insertStdData.php?id=" + txtstdid + "&name=" + txtstdname + "&age=" + txtstdage + "&address=" + txtstdaddr, true);
    xmlhttp.send();
    
}

function searchStdname(str) 
{
    if (str.length == 0) 
    {
        document.getElementById("searchName").innerHTML = "Type keyword to search Student";
        var showdatawrapper = document.getElementById("showStdData");
        showdatawrapper.style.removeProperty('display');
        return;
    } 
    else 
    {
        var xmlhttp = new XMLHttpRequest();

        //Show effect on page
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("showStdData").style.display = 'none';
                document.getElementById("searchName").innerHTML = this.responseText;
                //Styling the Search table when it has shown after successfully found, loop element order : <table> => <tbody> => <tr> => <td>
                //stylingTableSearch("search");
            }
        };
        

        //Send data
        xmlhttp.open("GET", "searchStdData.php?q=" + str, true);
        xmlhttp.send();
    }
}

function checkdata(str,fieldIdentify){
        switch (fieldIdentify) {
            case "0":
                switch (true) {
                    case containsNumbers(str) && containsSpecialCharacters(str):
                        displayError("Student Name not allows numbers and special characters","dataStudentName");
                        nameflag = true;
                        return;
                
                    case containsNumbers(str):
                        displayError("Student Name not allows numbers","dataStudentName");
                        nameflag = true;
                        return;

                    case containsSpecialCharacters(str):
                        displayError("Student Name not allows special characters","dataStudentName");
                        nameflag = true;
                        return;

                    case str.length == 0:
                        displayError("Student Name cannot be empty","dataStudentName");
                        nameflag = true;
                        return;
                        
                    default:
                        displayError("","dataStudentName");
                        nameflag = false;
                        return;
                }

            case "1":
                
                switch (true) {
                    case containsLetters(str) && containsSpecialCharactersCheckforNumbers(str) && isNumber(getFirstCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows letters and special characters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsLetters(str) && containsSpecialCharactersCheckforNumbers(str) && isNumber(getLastCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows letters and special characters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsLetters(str) && isNumber(getLastCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows letters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case containsLetters(str) && isNumber(getFirstCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows letters","dataStudentAge");
                        ageflag = true;
                        return;


                    case containsSpecialCharactersCheckforNumbers(str) && isNumber(getLastCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows special characters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case containsSpecialCharactersCheckforNumbers(str) && isNumber(getFirstCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows special characters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsLetters(str) && containsSpecialCharactersCheckforNumbers(str):
                        displayError("Student Age not allows letters and special characters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case containsLetters(str):
                        displayError("Student Age not allows letters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsSpecialCharactersCheckforNumbers(str):
                        displayError("Student Age not allows special characters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case isNumber(str) && str.length > 2:
                        displayError("Student Age not allows more than 2 digits","dataStudentAge");
                        ageflag = true;
                        return;

                    case str.length == 0:
                        displayError("Student Age cannot be empty","dataStudentAge");
                        ageflag = true;
                        return;

                    case isNumber(str) && getFirstCharactersofString(str,2) == 0:
                        displayError("Student Age cannot be Zero","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    default:
                        ageflag = false;
                        displayError("","dataStudentAge");
                        return;
                }
                
            
            case "2":
                if(str.length == 0){
                    displayError("Student Address cannot be empty","dataStudentAddress");
                    addressflag = true;
                        return;
                }
                else{
                    displayError("","dataStudentAddress");
                    addressflag = false;
                    return;
                }

            default:
                break;
        }
}

function paginationTableContent(table_id,number,hastitle){
    //Reassign value to number variable due to suits for loop element in array type start from zero index
    if(number==0){
        number = 1;
    }
    number = number - 1;
    //Preparing Grouping Record by section number in Table Student List
    //var tablestudent = document.getElementById(table_id); // Retrieve Table Student List
    var tablestudent = document.getElementById(table_id); // Retrieve Table Student List children element
    var tablechildren = tablestudent.children;
    var totalpages = 0; // get total section that Every Record has group by
    var minvalue;
    var maxvalue;
    var currentpage = 1;
    var totalrows = 0;
    var remainder = 0; // The remainder from operator of maxvalue minus minvalue
    minvalue = 1;
    maxvalue = minvalue + number;
    for (let index = 0; index < tablechildren.length; index++) { // Loop through every children
        const tbodyxelement = tablechildren[index]; //Retrieve current children, here is tbody
        var tbodyxelementchildren = tbodyxelement.children; //Retrieve children of current loop position tbody
        if(hastitle == true){
            hastitle = 1;
        }
        for (let index = hastitle; index < tbodyxelementchildren.length; index++) { // Loop through every children of tbody, skipping zero index if this table has title
            const trxelement = tbodyxelementchildren[index]; // Retrieve current children, here is tr
            if(index>=minvalue && index<=maxvalue){
                trxelement.setAttribute("class","StudentPage"+currentpage);
            }
            else{   
                currentpage +=1;
                totalrows = 0;
                minvalue = maxvalue + 1;
                maxvalue = minvalue + number;
                trxelement.setAttribute("class","StudentPage"+currentpage);
            }
            //Total elements in one page at order numb *
            // if(totalrows==0){
            //     remainder = ((maxvalue-minvalue)+1);
            //     if(remainder>1){
            //         console.log("There are "+remainder+" rows in page order "+currentpage);
            //     }
            //     else{
            //         console.log("There is "+remainder+" row page in order "+currentpage);
            //     }
                
            // }
            totalrows +=1;
        }
        totalpages = currentpage;
    }


    //setup pagination-control
    setupControls(tablestudent.parentNode,totalpages);
    
    activatePagination(totalpages);
}

function setupControls(HTMLElement, totalpages){
    var tablestudentwrapper = HTMLElement;
    var retrieveid = tablestudentwrapper.getAttribute("id");
    console.log(retrieveid);
    //create element div class pagination-control wrapper
    var classpagecontrol = document.createElement("div");
    classpagecontrol.setAttribute("class","pagination-control");

    //Left Max Arrow
    var leftmaxarrow = document.createElement("li"); //create li element
    leftmaxarrow.setAttribute("onclick","SkiptoMax('"+retrieveid+"',0)"); // add function to li element's attribute onclick
    var leftmaxarrowtext = document.createTextNode("|<<"); // create textnode Previous text <
    leftmaxarrow.appendChild(leftmaxarrowtext); // add textnode to li element Previous

    //Left Arrow
    var leftarrow = document.createElement("li"); //create li element
    leftarrow.setAttribute("onclick","ArrowMoving('"+retrieveid+"',0)"); // add function to li element's attribute onclick
    var leftarrowtext = document.createTextNode("<"); // create textnode Previous text <
    leftarrow.appendChild(leftarrowtext); // add textnode to li element Previous

    //Left Skip Arrow
    var leftskiparrow = document.createElement("li");
    leftskiparrow.setAttribute("onclick","ArrowSkipping('"+retrieveid+"',0)");
    var leftskiparrowtext = document.createTextNode("<<");
    leftskiparrow.appendChild(leftskiparrowtext);

    //Create Left control wrapper
    var listarrowleft = document.createElement("ul"); //Create left control ul element
    listarrowleft.setAttribute("class","arrowleft"); // set class name for ul element

    //Append li to ul element
    listarrowleft.appendChild(leftmaxarrow);
    listarrowleft.appendChild(leftskiparrow);
    listarrowleft.appendChild(leftarrow);
    classpagecontrol.appendChild(listarrowleft);// Add left control wrapper to pagination-control

    //Create List number Navigation
    var listnumber = document.createElement("ul");// Create ul element
    listnumber.setAttribute("id","paginationStudent"); // set id for ul element

    //Loop through 
    for (let index = 0; index < totalpages; index++) {
        var elemmm = document.createElement("li");
        if(index==0){
            elemmm.setAttribute("class","active");
        }
        elemmm.setAttribute("onclick","toPagenumber('"+retrieveid+"',"+(index+1)+")");
        var txt = document.createTextNode(index+1);
        elemmm.appendChild(txt);
        listnumber.appendChild(elemmm);
    }
    classpagecontrol.appendChild(listnumber);


    //Right Arrow
    var rightarrow = document.createElement("li");
    rightarrow.setAttribute("onclick","ArrowMoving('"+retrieveid+"',1)");
    var rightarrowtext = document.createTextNode(">");
    rightarrow.appendChild(rightarrowtext);

    //Right Skip Arrow
    var rightskiparrow = document.createElement("li");
    rightskiparrow.setAttribute("onclick","ArrowSkipping('"+retrieveid+"',1)");
    var rightskiparrowtext = document.createTextNode(">>");
    rightskiparrow.appendChild(rightskiparrowtext);

    //Right Max Arrow
    var rightmaxarrow = document.createElement("li");
    rightmaxarrow.setAttribute("onclick","SkiptoMax('"+retrieveid+"',1)");
    var rightmaxarrowtext = document.createTextNode(">>|");
    rightmaxarrow.appendChild(rightmaxarrowtext);

    var listarrowright = document.createElement("ul");
    listarrowright.setAttribute("class","arrowright");
    listarrowright.appendChild(rightarrow);
    listarrowright.appendChild(rightskiparrow);
    listarrowright.appendChild(rightmaxarrow);

    //pagination-control appending
    classpagecontrol.appendChild(listarrowright);

    //divShowTable appending
    tablestudentwrapper.appendChild(classpagecontrol);
}

function getTotalStudentPage(object_access){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    var listpagenumber;
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        var getelementarray = element.children;
        for (let index = 1; index < getelementarray.length; index++) {
            listpagenumber = getelementarray[index];
            break;
        }
    }
    
    var listpagenumberarray = listpagenumber.children;
    var totalpage = 0;
    for (let index = 0; index < listpagenumberarray.length; index++) {
        totalpage = index;
    }
    return totalpage;
}

function ArrowMoving(object_access,direction){
    var getactivepage = getActivePageNumber(object_access);
    var gettotalpages = getTotalStudentPage(object_access) + 1;
    gotoSection(object_access,getactivepage,direction,gettotalpages);
}

function ArrowSkipping(object_access, direction){
    var getactivepage = getActivePageNumber(object_access);
    var gettotalpages = getTotalStudentPage(object_access) + 1;
    SkipPage(object_access,getactivepage,direction);
    //toStartendpoint(object_access,direction,gettotalpages);
}

function activatePagination(number){
    for (let index = 1; index <= number; index++) {
        var pagecollection = document.getElementsByClassName("StudentPage"+index); // Retrieve collection of specific page index, here is class name
        if(index==1){ // Find all table record belong to page index 1
            for (let index = 0; index < pagecollection.length; index++) {
                // Set all the record belong to page index 1 do nothing, the default page shown is here
                const currentpage = pagecollection[index]; 
                //element.setAttribute("style","display:block");
            }   
        }
        else{
            // Find all table record belong to page index except 1
            for (let index = 0; index < pagecollection.length; index++) {
                // Set all the record belong to page index except 1 to display none
                const currentpage = pagecollection[index];
                currentpage.setAttribute("style","display:none");
            }   
        }
    }
}

function toPagenumber(object_access,number){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    for (let index = 0; index < getchildren.length; index++) {
        switch (index) {
            case 0:
                const gettable = getchildren[index];
                const elementx = gettable.children;
                for (let index = 0; index < elementx.length; index++) {
                    const elementy = elementx[index];
                    const gettbody = elementy.children;
                    for (let index = 1; index < gettbody.length; index++) {
                        const elementz = gettbody[index];
                        const getpagenum = elementz.getAttribute("class");
                        if(removeFirstCharactersofString(getpagenum,10) == number){
                            elementz.removeAttribute("style");
                        }
                        else{
                            elementz.setAttribute("style","display:none");
                        }
                    }
                    
                }
                break;
            
            case 2:
                const currentelementchildren = getchildren[index];
                const currentelementx = currentelementchildren.children;
                for (let index = 0; index < currentelementx.length; index++) {
                    const currentelementy = currentelementx[index];
                    const currentelementz = currentelementy.children;
                    if(index == 1){
                        for (let index = 0; index < currentelementz.length; index++) {
                            const currentelementzx = currentelementz[index];
                            //console.log(currentelementzx); 
                            if(index + 1 == number){
            
                                currentelementzx.setAttribute("class","active");
                            }
                            else{
                                currentelementzx.removeAttribute("class");
                            }                             
                        }
                    }
                }
                break;

            default:
                break;
        }
        
    }  
}

function groupPagesinSection(section_quantity){
    section_quantity = section_quantity - 1;
    var listnumber = document.getElementById("paginationStudent");
    listnumber.setAttribute("pagecount",section_quantity + 1);
    var listnumberarray = listnumber.children;
    var minvalue;
    var maxvalue;
    var currentsection = 1;
    minvalue = 0;
    maxvalue = minvalue + section_quantity;
    for (let index = 0; index < listnumberarray.length; index++) {
        const currentnumber = listnumberarray[index];
        if(index>=minvalue && index<=maxvalue){
            currentnumber.setAttribute("name","section"+currentsection);
        }
        else{
            
            currentsection +=1;
            minvalue = maxvalue + 1;
            maxvalue = minvalue + section_quantity;
            currentnumber.setAttribute("name","section"+currentsection);
        }
    }
    
    for (let index = 0; index < listnumberarray.length; index++) {
        const currentnumber = listnumberarray[index];
        var retrievename = currentnumber.getAttribute("name");
        if(removeFirstCharactersofString(retrievename,6) === "1"){
            //currentnumber.setAttribute("display","block");
        }
        else{
            currentnumber.setAttribute("style","display:none");
        }
    }
}

function getActivePageNumber(object_access){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    var listpagenumber;
    for (let index = 0; index < getchildren.length; index++) {
        const getelement = getchildren[index];
        var getelementarray = getelement.children;
        for (let index = 1; index < getelementarray.length; index++) {
            listpagenumber = getelementarray[index];
            break;
        }
    }
    var listpagenumberarray = listpagenumber.children;
    for (let index = 0; index < listpagenumberarray.length; index++) {
        const currentpage = listpagenumberarray[index]; // Retrieve current page in collection
        var getActiveClass = currentpage.getAttribute("class");
        if(getActiveClass == null){
            //console.log("Page"+index+" unactive");
            
        }
        else{
            //console.log("Page"+index+" active");
            return index + 1;
        }
    }  
}

function gotoSection(object_access,current_page,direction,gettotalpages){
    var strfindcenter = findCenter("paginationStudent",current_page);
    var midval = getStringskipfromCharacter(strfindcenter,"/");
    var startxend = getStringendwithCharacter(strfindcenter,"/");
    var startval = getStringendwithCharacter(startxend,",");
    var endval = getStringskipfromCharacter(startxend,",");
    if(direction == 0){
        if(current_page == "1"){
            return;
        }
        if(current_page == startval){
            SkipPage(object_access,current_page,direction);
        }
        toPagenumber(object_access,current_page - 1);
    }
    else{
        if(current_page == gettotalpages){
            return;
        }
        if(current_page == endval){
            SkipPage(object_access,current_page,direction);
        }
        toPagenumber(object_access,current_page + 1);
    }
}

function findCenter(object_access,current_page){
    var yyy = document.getElementById(object_access);
    var pagecount = parseInt(yyy.getAttribute("pagecount"));
    var minval = 0;
    var centerval = [];
    var maxval = 0;
    if(pagecount>1){
        if(pagecount>=3){
            if(current_page<=pagecount){
                var isinsection = false;
                minval =  1;
                maxval = pagecount;
                centerval = [];
                for (let index = minval; index <= maxval; index++) {
                    if(current_page>=minval&&current_page<=maxval){
                        isinsection = true;
                        break;
                        
                    }
                    if(index==maxval){
                        if(isinsection==false){
                            minval = maxval;
                            maxval = maxval + pagecount;
                            centerval = [];
                        }
                        else{
        
                        }
                    }
                    minval++;
                }
        
                
                var i  = 0;
                for (let index = minval; index <= maxval; index++) {
                    switch (index>minval&&index<maxval) {
                        case true:
                            centerval[i] = index;
                            i++;
                            break;
                    
                        default:
                            break;
                    }
                }
                return minval+","+maxval+"/"+centerval;
            }
            else{
                var isinsection = false;
                minval = pagecount + 1;
                maxval = pagecount + pagecount;
                centerval = [];
                for (let index = minval; index <= maxval; index++) {
                    if(current_page>=minval&&current_page<=maxval){
                        isinsection = true;
                        break;
                        
                    }
                    if(index==maxval){
                        if(isinsection==false){
                            minval = maxval;
                            maxval = maxval + pagecount;
                            centerval = [];
                        }
                        else{
        
                        }
                    }
                    minval++;
                }
        
                
                var j  = 0;
                for (let index = minval; index <= maxval; index++) {
                    switch (index>minval&&index<maxval) {
                        case true:
                            centerval[j] = index;
                            j++;
                            break;
                    
                        default:
                            break;
                    }
                }
                return minval+","+maxval+"/"+centerval;
            }
        }
        else{
            switch (current_page%2==0) {
                case true:
                    console.log("This number is right");
                    minval = current_page - 1;
                    maxval = current_page;
                    centerval = [];
                    return minval+","+maxval+"/"+centerval;
            
                default:
                    maxval = current_page + 1;
                    minval = current_page;
                    centerval = [];
                    console.log("This number is left");
                    return minval+","+maxval+"/"+centerval;
            }
        }
    }
    else{
        console.log("This is one page in section ");
        minval = current_page;
        maxval = current_page;
        centerval = [];
        return minval+","+maxval+"/"+centerval;
    }
    
}

function SkipPage(object_access,current_page,direction){
    var strfindcenter = findCenter("paginationStudent",current_page);
    var yyy = document.getElementById("paginationStudent");
    var pagecount = parseInt(yyy.getAttribute("pagecount"));
    var midval = getStringskipfromCharacter(strfindcenter,"/");
    var startxend = getStringendwithCharacter(strfindcenter,"/");
    var startval = getStringendwithCharacter(startxend,",");
    var endval = getStringskipfromCharacter(startxend,",");
    //Reassign value to fit array type
    startval = startval - 1;
    endval = endval - 1;
    // console.log("First element is "+startval);
    // console.log("Center element is "+midval);
    // console.log("Last element is "+endval);
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;

    if(direction==0){
        var firstsection = false;
        for (let index = 0; index < getchildren.length; index++) {
            switch (index) {
                case 2:
                    const currentelementchildren = getchildren[index];
                    const currentelementx = currentelementchildren.children;
                    labelLoop2 :
                    for (let index = 0; index < currentelementx.length; index++) {
                        const currentelementy = currentelementx[index];
                        const currentelementz = currentelementy.children;
                        if(index == 1){
                            if(((endval + 1)- (startval + 1)) >= ((endval + 1) - pagecount)){
                                firstsection = true;
                                break labelLoop2;
                            }

                            for (let index = startval; index <= endval; index++) {
                                const currentelementzx = currentelementz[index];
                                if(currentelementzx!=null){
                                    setPageonoff(currentelementzx, 0);
                                    if(index + 1 == current_page){
                                        setPageactive(currentelementzx,0);
                                    }
                                } 
                                
                            }
                            
                            //console.log("Going next from here");
                            
                            
                            if(firstsection==false){
                                for (let index = (startval- pagecount); index <= (endval - pagecount); index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 1);
                                        if(index== (startval- pagecount)){
                                            setPageactive(currentelementzx,1);
                                            toPagenumber(object_access,index + 1);
                                        }
                                    }  
                                }
                                //console.log("These last "+pagecount+"is off")
                                // for (let index = 0; index <= endval - startval; index++) {
                                //     const currentelementzx = currentelementz[index];
                                //     if(currentelementzx!=null){
                                //         setPageonoff(currentelementzx, 0);
                                //     } 
                                // }
                                for (let index = startval; index < currentelementz.length ; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 0);
                                        if(index== startval){
                                            setPageactive(currentelementzx,0);
                                        }
                                    } 
                                }
                                //console.log("These first "+pagecount+" (if available) is off")
                            }
                            else{
                                for (let index = 0; index <= endval - startval; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 1);
                                        if(index== 0){
                                            setPageactive(currentelementzx,1);
                                            toPagenumber(object_access,index + 1);
                                        }
                                    } 
                                }
                                for (let index = startval; index < currentelementz.length ; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 0);
                                        if(index== 0){
                                            setPageactive(currentelementzx,0);
                                            toPagenumber(object_access,index + 1);
                                        }
                                    } 
                                }
                            }
                        }
                    }
                    break;

                default:
                    break;
            }
            
        }  
    }
    else{
        var lastsection = false;
        for (let index = 0; index < getchildren.length; index++) {
            switch (index) {
                case 2:
                    const currentelementchildren = getchildren[index];
                    const currentelementx = currentelementchildren.children;
                    for (let index = 0; index < currentelementx.length; index++) {
                        const currentelementy = currentelementx[index];
                        const currentelementz = currentelementy.children;
                        if(index == 1){
                            labelLoop1 :
                            for (let index = startval; index <= endval; index++) {
                                switch (pagecount) {
                                    case 1:
                                        if(currentelementz.length > endval + 1){
                                            const currentelementzx = currentelementz[index];
                                            if(currentelementzx!=null){
                                                setPageonoff(currentelementzx, 0);
                                                if(index == current_page){
                                                    setPageactive(currentelementzx,0);
                                                }
                                            }    
                                        }
                                        else{
                                            lastsection = true; 
                                        }
                                        break;
                                
                                    default:
                                        if(currentelementz.length <= endval + 1){
                                            lastsection = true;
                                            break labelLoop1;     
                                        }
                                        else{
                                            const currentelementzx = currentelementz[index];
                                            if(currentelementzx!=null){
                                                setPageonoff(currentelementzx, 0);
                                                if(index == current_page){
                                                    setPageactive(currentelementzx,0);
                                                }
                                            } 
                                        }
                                        break;
                                }
                                
                                
                            }
                            
                            //console.log("Going next from here");
                            if(lastsection == false){
                                for (let index = endval + 1; index <= endval + pagecount; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 1);
                                        if(index== endval + 1){
                                            setPageactive(currentelementzx,1);
                                            toPagenumber(object_access,index + 1);
                                        }
                                    }  
                                }
                                //console.log("Next "+pagecount+"is here")
                                for (let index = endval + pagecount + 1; index < currentelementz.length; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 0);
                                    }  
                                }
                                //console.log("These last "+pagecount+"is off")
                                for (let index = 0; index <= startval; index++) {
                                    const currentelementzx = currentelementz[index];
                                    if(currentelementzx!=null){
                                        setPageonoff(currentelementzx, 0);
                                    } 
                                }
                            }
                            //console.log("These first "+pagecount+" (if available) is off")
                        }
                    }
                    break;

                default:
                    break;
            }
            
        } 
    } 
}

function toStartendpoint(object_access,direction,gettotalpages){
    var strfindcenter,midval, startxend, startval, endval, startpoint, endpoint;
    var yyy = document.getElementById("paginationStudent");
    var pagecount = parseInt(yyy.getAttribute("pagecount"));
    if(direction == 0){
        console.log("Left");
        strfindcenter = findCenter("paginationStudent",pagecount);
        midval = getStringskipfromCharacter(strfindcenter,"/");
        startxend = getStringendwithCharacter(strfindcenter,"/");
        startval = getStringendwithCharacter(startxend,",");
        endval = getStringskipfromCharacter(startxend,",");
        startpoint = parseInt(endval) + 1;
        console.log(startval + "+" + endval);
        SkipPage(object_access,startpoint,direction);
    }
    else{
        console.log("Right");
        strfindcenter = findCenter("paginationStudent",gettotalpages);
        midval = getStringskipfromCharacter(strfindcenter,"/");
        startxend = getStringendwithCharacter(strfindcenter,"/");
        startval = getStringendwithCharacter(startxend,",");
        endval = getStringskipfromCharacter(startxend,",");
        endpoint = parseInt(startval) - 1;
        console.log(startval + "+" + endval);
        SkipPage(object_access,endpoint,direction);
    }
}

function setPageonoff(element,mode){
    if(mode == 0){
        if(element.getAttribute("style")!=null){
            //element.removeAttribute("style");
        }
        else{
            element.setAttribute("style","display:none");
        }
    }
    else{
        if(element.getAttribute("style")!=null){
            element.removeAttribute("style");
        }
        else{
            //element.setAttribute("style","display:none");
        }
    }
}

function setPageactive(element,mode){
    if(mode == 0){
        element.removeAttribute("class");
    }
    else{
        element.setAttribute("class","active");
    }
}

function SkiptoMax(object_access,direction){
    var gettotalpages = getTotalStudentPage(object_access) + 1;
    toStartendpoint(object_access,direction,gettotalpages);
}