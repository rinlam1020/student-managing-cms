//Script version 1.0.1 - Date : Nov 3 2023 20:42
var nameflag = false, ageflag = false, addressflag = false;

function showStdData(exmode){
    var xmlhttp = new XMLHttpRequest();
    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("showStdData").innerHTML = this.responseText;
            document.getElementById("searchName").innerHTML = "";
            document.getElementById("txtsearchName").value = "";
            loadStudentID();
        }
        //Getting content ready and apply pagination, parameters are Table id, data row quantity to show in one page, does table has title(true) or not(false) , total page display in section 
        paginationTableContent("tableStudent",10,true,3);

        //Check if insert mode has done, reload to the newest content
        if(exmode=="Insert"){
            SkiptoMax("showStdData",1);
        }
    };

    //Send data
    xmlhttp.open("GET", "showStdData.php?q=" , true);
    xmlhttp.send();
    
}

function insertStdData() {
    
    var xmlhttp = new XMLHttpRequest();
    var exmode, respmess,resptext,messageresponse;
    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
           
            resptext = this.responseText;
            exmode = getStringendwithCharacter(resptext,"-"); // Get insert mode identifying code
            respmess = getStringskipfromCharacter(resptext,"-"); // Get message after substring insert mode identifying code

            var showError = document.getElementById("showError");
            if(showError.getAttribute("style")!=null){
                showError.removeAttribute("style");
            }

            messageresponse = getFirstCharactersofString(respmess,5); // Get Error identifying keyword

            showError.innerHTML = respmess;
            resetFieldInsert();
            showStdData(exmode);
            
            if(messageresponse == "Error"){
                //Do something
            }
            else{
                let count = 0;
                let intervl = setInterval(function() {
                    count += 1;
                    if(count == 5){
                        clearInterval(intervl);
                    }
                    showError.setAttribute("style","display:none");
                }, 6000);
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

            //Getting content ready and apply pagination, parameters are Table id, data row quantity to show in one page, does table has title(true) or not(false) , total page display in section 
            paginationTableContent("search",5,true,4);
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

function paginationTableContent(table_id,number,hastitle,total_in_group){
    //Reassign value to number variable due to suits for loop element in array type start from zero index
    if(number==0){
        number = 5;
    }
    number = number - 1;
    //Preparing Grouping Record by section number in Table Student List
    //var tablestudent = document.getElementById(table_id); // Retrieve Table Student List
    var tablestudent = document.getElementById(table_id); // Retrieve Table Student List children element
    if(tablestudent==null){
        return;
    }
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

    activatePagination(tablestudent.parentNode);

    if(total_in_group==null){
        total_in_group =1;
    }
    //Display page quantity in one section group, parameters are Table parent selector id or class, page quantity wants to display in one section
    groupPagesinSection(tablestudent.parentNode,total_in_group);
}

function setupControls(HTMLElement, totalpages){
    var tablestudentwrapper = HTMLElement;
    var retrieveid = tablestudentwrapper.getAttribute("id");
    //console.log(retrieveid);
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
    listnumber.setAttribute("class","pagination-student"); // set id for ul element

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
    var getClassname = "";
    var totalpage = 0;
    labelLoopparent : //Create Label Loop for exitting in case
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        getClassname = element.getAttribute("class");
        switch (getClassname==="pagination-control") {
            case true:
                var getelementarray = element.children;
                labelLoopchild :
                for (let index = 0; index < getelementarray.length; index++) {
                    const elementx = getelementarray[index];
                    getClassname = elementx.getAttribute("class");
                    switch (getClassname === "pagination-student") {
                        case true:
                            var listpagenumberarray = elementx.children;
                            for (let index = 0; index < listpagenumberarray.length; index++) {
                                totalpage = index;
                            }
                            break labelLoopparent; // Exitting the loop by Label has declared
                    
                        default:
                            break;
                    }
                }
                break;
        
            default:
                break;
        }
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

function activatePagination(HTMLElement){
    var obj = HTMLElement;
    var getchildren = obj.children;
    var getPagename = "";
    var getPagenum = "";
    labelLoopparent :
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        getClassname = element.getAttribute("class");
        switch (getClassname==="tablecontent") {
            case true:
                var getelementarray = element.children;
                labelLoopchild :
                for (let index = 0; index < getelementarray.length; index++) {
                    const elementx = getelementarray[index];
                    const elementxz = elementx.children;
                    for (let index = 1; index < elementxz.length; index++) {
                        const elementxzy = elementxz[index];
                        getPagename = elementxzy.getAttribute("class");
                        getPagenum = removeFirstCharactersofString(getPagename,10);
                        if(parseInt(getPagenum)>1){
                            elementxzy.setAttribute("style","display:none");
                        }
                        if(index == elementxz.length - 1){
                            break labelLoopparent;
                        }
                    }
                    
                }
                break;
        
            default:
                break;
        }
    }
    
}

function toPagenumber(object_access,number){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    var getClassname = "";
    labelLoopparent :
    for (let index = 0; index < getchildren.length; index++) {
        const elementx = getchildren[index];
        getClassname = elementx.getAttribute("class");
        switch (true) {
            case getClassname=="tablecontent":
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
            
            case getClassname=="pagination-control":
                const currentelementchildren = getchildren[index];
                const currentelementx = currentelementchildren.children;
                for (let index = 0; index < currentelementx.length; index++) {
                    const currentelementy = currentelementx[index];
                    getClassname = currentelementy.getAttribute("class");
                    switch (true) {
                        case getClassname=="pagination-student":
                            const currentelementz = currentelementy.children;
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
                            break labelLoopparent;
                    
                        default:
                            break;
                    }
                }
                break;

            default:
                break;
        }
        
    }  
}

function groupPagesinSection(HTMLElement,section_quantity){
    var obj = HTMLElement;
    if(obj == null){
        return;
    }
    var getchildren = obj.children;
    if(getchildren == null){
        return;
    }
    var getClassname = "";
    labelLoopparent :
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        getClassname = element.getAttribute("class");
        switch (getClassname==="pagination-control") {
            case true:
                var getelementarray = element.children;
                labelLoopchild :
                for (let index = 0; index < getelementarray.length; index++) {
                    const elementx = getelementarray[index];
                    getClassname = elementx.getAttribute("class");
                    switch (getClassname === "pagination-student") {
                        case true:
                            section_quantity = section_quantity - 1;
                            var listnumber = elementx;
                            if(listnumber==null){
                                return;
                            }
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
                            break labelLoopparent;
                    
                        default:
                            break;
                    }
                }
                break;
        
            default:
                break;
        }
    }




    
}

function getActivePageNumber(object_access){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    var getClassname = "";
    var getActiveClass = "";
    labelLoopparent :
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        getClassname = element.getAttribute("class");
        switch (getClassname==="pagination-control") {
            case true:
                var getelementarray = element.children;
                labelLoopchild :
                for (let index = 0; index < getelementarray.length; index++) {
                    const elementx = getelementarray[index];
                    getClassname = elementx.getAttribute("class");
                    switch (getClassname === "pagination-student") {
                        case true:
                            var listpagenumberarray = elementx.children;
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
                            break labelLoopparent;
                    
                        default:
                            break;
                    }
                }
                break;
        
            default:
                break;
        }
    }  
}

function gotoSection(object_access,current_page,direction,gettotalpages){
    var strfindcenter = findCenter(object_access,current_page);
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
    var pagecount = 0;
    pagecount = getPagecount(object_access);
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
                    //console.log("This number is right");
                    minval = current_page - 1;
                    maxval = current_page;
                    centerval = [];
                    return minval+","+maxval+"/"+centerval;
            
                default:
                    maxval = current_page + 1;
                    minval = current_page;
                    centerval = [];
                    //console.log("This number is left");
                    return minval+","+maxval+"/"+centerval;
            }
        }
    }
    else{
        //console.log("This is one page in section ");
        minval = current_page;
        maxval = current_page;
        centerval = [];
        return minval+","+maxval+"/"+centerval;
    }
    
}

function SkipPage(object_access,current_page,direction){
    var strfindcenter = findCenter(object_access,current_page);
    var pagecount = 0;
    pagecount = getPagecount(object_access);
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
    var getClassname = "";
    if(direction==0){
        var firstsection = false;
        labelLoopparent :
        for (let index = 0; index < getchildren.length; index++) {
            const element = getchildren[index];
            getClassname = element.getAttribute("class");
            switch (true) {
                case getClassname=="pagination-control":
                    const currentelementchildren = getchildren[index];
                    const currentelementx = currentelementchildren.children;
                    labelLoop2 :
                    for (let index = 0; index < currentelementx.length; index++) {
                        const currentelementy = currentelementx[index];
                        getClassname = currentelementy.getAttribute("class");
                        switch (true) {
                            case getClassname=="pagination-student":
                                const currentelementz = currentelementy.children;
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
                                break labelLoopparent;
                        
                            default:
                                break;
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
        labelLoopparent :
        for (let index = 0; index < getchildren.length; index++) {
            const element = getchildren[index];
            getClassname = element.getAttribute("class");
            switch (true) {
                case getClassname=="pagination-control":
                    const currentelementchildren = getchildren[index];
                    const currentelementx = currentelementchildren.children;
                    for (let index = 0; index < currentelementx.length; index++) {
                        const currentelementy = currentelementx[index];
                        getClassname = currentelementy.getAttribute("class");
                        switch (true) {
                            case getClassname=="pagination-student":
                                const currentelementz = currentelementy.children;
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
                                            var checkx = ((endval + 1) + pagecount) - (currentelementz.length);
                                            switch (true) {
                                                case checkx>0:
                                                    if(index== (currentelementz.length) - 1){
                                                        setPageactive(currentelementzx,1);
                                                        toPagenumber(object_access,index + 1);
                                                    }
                                                    //console.log("This section does not have enough "+pagecount+" pages in the section, the last number is the last page of this section");
                                                    break;
                                                case checkx=0:
                                                    if(index== (endval + pagecount)){
                                                        setPageactive(currentelementzx,1);
                                                        toPagenumber(object_access,index + 1);
                                                    }
                                                    //console.log("This section has enough "+pagecount+" pages, by means this is not the last section");
                                                    break;
                                                case checkx<=0:
                                                    if(index== (endval + pagecount)){
                                                        setPageactive(currentelementzx,1);
                                                        toPagenumber(object_access,index + 1);
                                                    }
                                                    //console.log("This section has enough "+pagecount+" pages, by means this is not the last section");
                                                default:
                                                    break;
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
                                break labelLoopparent;
                        
                            default:
                                break;
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
    var pagecount = 0;
    pagecount = getPagecount(object_access);
    if(direction == 0){
        //console.log("Left");
        strfindcenter = findCenter(object_access,pagecount);
        midval = getStringskipfromCharacter(strfindcenter,"/");
        startxend = getStringendwithCharacter(strfindcenter,"/");
        startval = getStringendwithCharacter(startxend,",");
        endval = getStringskipfromCharacter(startxend,",");
        startpoint = parseInt(endval) + 1;
        //console.log(startval + "+" + endval);
        SkipPage(object_access,startpoint,direction);
    }
    else{
        //console.log("Right");
        strfindcenter = findCenter(object_access,gettotalpages);
        midval = getStringskipfromCharacter(strfindcenter,"/");
        startxend = getStringendwithCharacter(strfindcenter,"/");
        startval = getStringendwithCharacter(startxend,",");
        endval = getStringskipfromCharacter(startxend,",");
        endpoint = parseInt(startval) - 1;
        //console.log(startval + "+" + endval);
        SkipPage(object_access,endpoint,direction);
    }
}

function setPageonoff(HTMLElement,mode){
    if(HTMLElement!=null){
        if(mode == 0){
            if(HTMLElement.getAttribute("style")!=null){
                //HTMLElement.removeAttribute("style");
            }
            else{
                HTMLElement.setAttribute("style","display:none");
            }
        }
        else{
            if(HTMLElement.getAttribute("style")!=null){
                HTMLElement.removeAttribute("style");
            }
            else{
                //HTMLElement.setAttribute("style","display:none");
            }
        }
    }
}

function setPageactive(HTMLElement,mode){
    if(HTMLElement!=null){
        if(mode == 0){
            if(HTMLElement.getAttribute("class")!=null){
                HTMLElement.removeAttribute("class");
            }
        }
        else{
            HTMLElement.setAttribute("class","active");
        }
    }
}

function SkiptoMax(object_access,direction){
    var gettotalpages = getTotalStudentPage(object_access) + 1;
    toStartendpoint(object_access,direction,gettotalpages);
}

function getPagecount(object_access){
    var obj = document.getElementById(object_access);
    var getchildren = obj.children;
    var getClassname = "";
    labelLoopparent :
    for (let index = 0; index < getchildren.length; index++) {
        const element = getchildren[index];
        getClassname = element.getAttribute("class");
        switch (getClassname==="pagination-control") {
            case true:
                var getelementarray = element.children;
                labelLoopchild :
                for (let index = 0; index < getelementarray.length; index++) {
                    const elementx = getelementarray[index];
                    getClassname = elementx.getAttribute("class");
                    switch (getClassname === "pagination-student") {
                        case true:
                            pagecount = parseInt(elementx.getAttribute("pagecount"));
                            return pagecount;       
                            //break labelLoopparent;
                    
                        default:
                            break;
                    }
                }
                break;
        
            default:
                break;
        }
    }
}