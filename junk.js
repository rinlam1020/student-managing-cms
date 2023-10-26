var nameflag = false, ageflag = false, addressflag = false;
function testfunc(){
    console.log("xxxx");
}

function showStdData(){
    
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            //const tableStudent = document.getElementById("tableStudent");
            //tableStudent.remove();
            document.getElementById("showStdData").innerHTML = this.responseText;
            var yyy = document.getElementById("showStdData");
            yyy.removeAttribute("style");
            document.getElementById("searchName").innerHTML = "";
            document.getElementById("txtsearchName").value = "";
            loadStudentID();
            paginationStudent(2);
            displayNumberinPagination(4);
            //console.log(removeFirstCharactersofString("StudentPage11",10));
        }
    };
    

    //Send data
    xmlhttp.open("GET", "showStdData.php?q=" , true);
    xmlhttp.send();
    
}

function resetFieldInsert(){
    document.getElementById("txtstdname").value = "";
    document.getElementById("txtstdage").value = "";
    document.getElementById("txtstdaddr").value = "";
}

function insertStdData() {
    
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            //const tableStudent = document.getElementById("tableStudent");
            //tableStudent.remove();
            document.getElementById("showError").innerHTML = this.responseText;
            resetFieldInsert();
            showStdData();
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

function getLastCharactersofString(str, numbercharacterscheck) {
    var strtest = "";
    for (let i = 0; i < str.length; i++) {
        if(i>=str.length - numbercharacterscheck){
            strtest += str.charAt(i);       
        }
    }
    return strtest;
}

function getFirstCharactersofString(str, numbercharacterscheck) {
    var strtest = "";
    for (let i = 0; i < str.length; i++) {
        if(i<numbercharacterscheck){
            strtest += str.charAt(i);       
        }
    }
    return strtest;
}

function removeFirstCharactersofString(str, numberofremove){
    var strtest = "";
    for (let index = 0; index < str.length; index++) {
        if(index<=numberofremove){
            strtest += str.charAt(index);
        }
    }
    return str.replace(strtest,"");
}

function isNumber(str){
    var strtest = "";
    for (let i = 0; i < str.length; i++) {
        strtest = str.charAt(i);
        if (strtest >= '0' && strtest <= '9'){
            continue;
        }
        else{
            return false;
        }       
    }
    return true;
}

function searchStdname(str) 
{
    if (str.length == 0) 
    {
        document.getElementById("searchName").innerHTML = "Type keyword to search Student";
        var xxx = document.getElementById("showStdData");
        xxx.style.removeProperty('display');
        return;
    } 
    else 
    {
        var xmlhttp = new XMLHttpRequest();

        //Show effect on page
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) 
            {
                //const tableStudent = document.getElementById("tableStudent");
                //tableStudent.remove();
                document.getElementById("showStdData").style.display = 'none';
                document.getElementById("searchName").innerHTML = this.responseText;
                loopElementbyId("search");
            }
        };
        

        //Send data
        xmlhttp.open("GET", "searchStdData.php?q=" + str, true);
        xmlhttp.send();
    }
}

function loadStudentID()
{
    var numbcounter = document.getElementById("numbcounter").innerText;
    var autoGenerateStudentId = document.getElementById("txtstdid");
    autoGenerateStudentId.disabled = true;
    autoGenerateStudentId.value = "S" + numbcounter;
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
                    case containsLetters(str) && containsSpecialCharacters(str) && isNumber(getFirstCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows letters and special characters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsLetters(str) && containsSpecialCharacters(str) && isNumber(getLastCharactersofString(str,3)):
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


                    case containsSpecialCharacters(str) && isNumber(getLastCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows special characters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case containsSpecialCharacters(str) && isNumber(getFirstCharactersofString(str,3)):
                        displayError("Student Age has only 2 digits and not allows special characters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsLetters(str) && containsSpecialCharacters(str):
                        displayError("Student Age not allows letters and special characters","dataStudentAge");
                        ageflag = true;
                        return;
                    
                    case containsLetters(str):
                        displayError("Student Age not allows letters","dataStudentAge");
                        ageflag = true;
                        return;

                    case containsSpecialCharacters(str):
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


function containsNumbers(str) {
    return /\d/.test(str);
}

function containsLetters(str){
    return /[a-zA-Z]/g.test(str);
}

function containsSpecialCharacters(str){
    return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

function displayError(message, indicator){
    var xxx = document.getElementsByClassName(indicator);
    //var childs = xxx.childs();
    for (let index = 0; index < xxx.length; index++) {
        const element = xxx[index];
        var childss = element.children;
        for (let index = 0; index < childss.length; index++) {
            if(index==childss.length - 1){
                const elementx = childss[index];
                elementx.innerText = message;
            }
        }
    }
}

function loopElementbyId(indicator){
    var xxx = document.getElementById(indicator);
    var vvv = xxx.children;
    for (let index = 0; index < vvv.length; index++) {
        const elementx = vvv[index];
        elementx.parentElement.setAttribute("style","font-size:16px;width:80%");
        var jjj = elementx.children;
        for (let index = 0; index < jjj.length; index++) {
            const elementy = jjj[index];
            if(index%2==0){
                if(index==0){
                    elementy.setAttribute("style","background:#000;color: #fff;");
                }
                else{
                    elementy.setAttribute("style","background:#1f7287;color: #fff;");
                }
            }

            var ccc = elementy.children;
            for (let index = 0; index < ccc.length; index++) {
                const elementp = ccc[index];
                elementp.setAttribute("style","text-align: center;padding: 10px;border-bottom: none;border-top: none;border: none;");
                
            }
        }
    }
    
}

function paginationStudent(number){
    var xxx = document.getElementById("showStdData");
    var vvv = xxx.children;
    var numbbutton = 0;
    for (let index = 0; index < vvv.length; index++) {
        const elementx = vvv[index];
        var jjj = elementx.children;
        for (let index = 0; index < jjj.length; index++) {
            const elementy = jjj[index];
            var ccc = elementy.children;
            var minvalue;
            var maxvalue;
            var lapcount = 1;
            var totalelemt = 0;
            minvalue = 1;
            maxvalue = minvalue + number;
            
            for (let index = 1; index < ccc.length; index++) {
                const elementp = ccc[index];
                if(index>=minvalue && index<=maxvalue){
                    elementp.setAttribute("class","StudentPage"+lapcount);
                }
                else{
                    
                    lapcount +=1;
                    minvalue = maxvalue + 1;
                    maxvalue = minvalue + number;
                    elementp.setAttribute("class","StudentPage"+lapcount);
                }
                totalelemt +=1;
                
                //console.log(totalelemt);
                //console.log(totalelemt+"elements in order"+lapcount);
                numbbutton = lapcount;
            }
            
        }
    }


    //setup pagination-control
    var xx2 = document.createElement("div");
    xx2.setAttribute("class","pagination-control");


    //Left Arrow
    var leftarrow = document.createElement("li");
    leftarrow.setAttribute("onclick","ArrowMoving(0)");
    var leftarrowtextnode = document.createTextNode("<");
    leftarrow.appendChild(leftarrowtextnode);

    //Left Skip Arrow
    var leftskiparrow = document.createElement("li");
    leftskiparrow.setAttribute("onclick","ArrowSkipping(0)");
    var leftskiparrowtextnode = document.createTextNode("<<");
    leftskiparrow.appendChild(leftskiparrowtextnode);

    var listarrowleft = document.createElement("ul");
    listarrowleft.setAttribute("class","arrowleft");

    listarrowleft.appendChild(leftskiparrow);
    listarrowleft.appendChild(leftarrow);
    xx2.appendChild(listarrowleft);


    var listnumber = document.createElement("ul");
    listnumber.setAttribute("id","paginationStudent");
    for (let index = 0; index < numbbutton; index++) {
        
        var elemmm = document.createElement("li");
        if(index==0){
            elemmm.setAttribute("class","active");
        }
        elemmm.setAttribute("id","button"+(index+1));
        elemmm.setAttribute("onload","loadbutton("+(index+1)+")");
        elemmm.setAttribute("onclick","toPagenumber("+(index+1)+")");
        var textnode = document.createTextNode(index+1);
        elemmm.appendChild(textnode);
        listnumber.appendChild(elemmm);
    }
    xx2.appendChild(listnumber);


    //Right Arrow
    var rightarrow = document.createElement("li");
    rightarrow.setAttribute("onclick","ArrowMoving(1)");
    var rightarrowtextnode = document.createTextNode(">");
    rightarrow.appendChild(rightarrowtextnode);

    //Right Skip Arrow
    var rightskiparrow = document.createElement("li");
    rightskiparrow.setAttribute("onclick","ArrowSkipping(1)");
    var rightskiparrowtextnode = document.createTextNode(">>");
    rightskiparrow.appendChild(rightskiparrowtextnode);

    var listarrowright = document.createElement("ul");
    listarrowright.setAttribute("class","arrowright");
    listarrowright.appendChild(rightarrow);
    listarrowright.appendChild(rightskiparrow);


    //pagination-control appending
    xx2.appendChild(listarrowright);

    //divShowTable appending
    xxx.appendChild(xx2);

    activatePagination(numbbutton);
}

function getActivePageNumber(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    for (let index = 0; index < ooo.length; index++) {
        const element = ooo[index];
        var getActiveClass = element.getAttribute("class");
        if(getActiveClass == null){
            //console.log("Page"+index+" unactive");
            
        }
        else{
            //console.log("Page"+index+" active");
            return index + 1;
        }
    }  
}

function getTotalStudentPage(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    var totalxxx = 0;
    for (let index = 0; index < ooo.length; index++) {
        totalxxx = index;
    }
    return totalxxx;
}


function getActiveSection(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    for (let index = 0; index < ooo.length; index++) {
        const element = ooo[index];
        var getActiveClass = element.getAttribute("sectionactive");
        if(getActiveClass == null){
            //console.log("section"+index+getActiveClass);
            
        }
        else{
            //console.log("section"+index+getActiveClass);
            return index + 1;
        }
    } 
}

function getTotalSection(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    var totalxxx = 0;
    for (let index = 0; index < ooo.length; index++) {
        totalxxx = index;
    }
    return totalxxx;
}


function ArrowMoving(direction){
    var getactivepage = getActivePageNumber();
    var gettotalpages = getTotalStudentPage() + 1;

    var getactivesection = getActiveSection();
    var gettotalsection = getTotalSection() + 1;
    switch (direction) {

        case 0:
            //moveSection(getactivepage);
            //checkCurrentActiveNumber();
            gotoSectionleft(checkCurrentActiveNumber());
            for (let index = 0; index < gettotalpages; index++) {
                if(getactivepage == 1){
                    console.log("This is the first page");
                    return;
                }
                else{
                    toPagenumber(getactivepage - 1);
                    return;
                }
            }

            
        
        case 1:
            //checkCurrentActiveNumber();
            //moveSection(getactivepage);
            gotoSection(checkCurrentActiveNumber());
            for (let index = 0; index < gettotalpages; index++) {
                if(getactivepage == gettotalpages){
                    console.log("This is the last page");
                    return;
                }
                else{
                    toPagenumber(getactivepage + 1);
                    return;
                }
            }
            return; 

        default:
            break;
    }
}


function ArrowSkipping(direction){
    var getactivepage = getActivePageNumber();
    var gettotalpages = getTotalStudentPage() + 1;
    switch (direction) {

        case 0:
            SkipLeft(checkCurrentActiveNumber());
            // if(getactivepage==1){
            //     console.log("<<This is the first page");
            //     return;
            // }
            // toPagenumber(1);
            return;
        
        case 1:
            SkipRight(checkCurrentActiveNumber());
            // if(getactivepage==gettotalpages){
            //     console.log(">>This is the last page");
            //     return;
            // }
            // toPagenumber(gettotalpages);
            
            return;

        default:
            break;
    }
}

function activatePagination(number){
    for (let index = 1; index <= number; index++) {
        var xxx = document.getElementsByClassName("StudentPage"+index);
        if(index==1){
            for (let index = 0; index < xxx.length; index++) {
                const element = xxx[index];
                //element.setAttribute("style","display:block");
            }   
        }
        else{
            for (let index = 0; index < xxx.length; index++) {
                const element = xxx[index];
                element.setAttribute("style","display:none");
            }   
        }
    }
}


function toPagenumber(number){
    var xxx = document.getElementsByClassName("StudentPage"+number);
    var yyy;
    
    for (let index = 0; index < xxx.length; index++) {
        const element = xxx[index];
        yyy = element.parentNode;
        //console.log(yyy);
        break;
        //element.setAttribute("style","display:block");
    }
    var childsss = yyy.children;
    for (let index = 1; index < childsss.length; index++) {
        const element = childsss[index];
        var nameRow = element.getAttribute("class");
        //var getStyle = element.getAttribute("style");
        if(removeFirstCharactersofString(nameRow,10) == number){
            element.removeAttribute("style");
        }
        else{
            element.setAttribute("style","display:none");
        }
    }
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    for (let index = 0; index < ooo.length; index++) {
        const element = ooo[index];
        if(index + 1 == number){
            
            element.setAttribute("class","active");
        }
        else{
            element.removeAttribute("class");
        }
    }   
}

function displayNumberinPagination(number){
    number = number - 1;
    var xxx = document.getElementById("paginationStudent");
    var vvv = xxx.children;
    var minvalue;
    var maxvalue;
    var lapcount = 1;
    minvalue = 0;
    maxvalue = minvalue + number;
    for (let index = 0; index < vvv.length; index++) {
        const elementy = vvv[index];
        if(index>=minvalue && index<=maxvalue){
            elementy.setAttribute("name","section"+lapcount);
        }
        else{
            
            lapcount +=1;
            minvalue = maxvalue + 1;
            maxvalue = minvalue + number;
            elementy.setAttribute("name","section"+lapcount);
        }
    }
    
    for (let index = 0; index < vvv.length; index++) {
        const element = vvv[index];
        var kkk = element.getAttribute("name");
        if(removeFirstCharactersofString(kkk,6) === "1"){
            //element.setAttribute("display","block");
            //element.setAttribute("sectionactive","on");
        }
        else{
            element.setAttribute("style","display:none");
        }
    }


    //getActiveSection();
}

function checkCurrentActiveNumber(){
    var xxx = document.getElementById("paginationStudent");
    var vvv = xxx.children;
    for (let index = 0; index < vvv.length; index++) {
        const element = vvv[index];
        var isactive = element.getAttribute("class");
        if(isactive!=null){
            //console.log((index+1)+"is active");
            return index+1;
        }
    }
}

function gotoSectionleft(x){
    var xxx = document.getElementById("button"+x);
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
    var issamevalue = 0;
    var differentvalue = 0;
    var totalelementinsection = 4;
    var startelement = 0;
    var totalnum = getTotalStudentPage();
    var left4 = 0;
    var right4 = 0;

    if(x%2==0){
        var remainder = x/2;
        if(remainder%2==0){
            left4 = x-3;
            right4 = x;
            //console.log("This number is last element in section");
        }
        else{
            left4 = x -1;
            right4 = x + 2;
            //console.log("This number is in position 2 in section");
        }
    }
    else{
        var newnumb = x + 1;
        var newnumbremainder = newnumb / 2;
        if(newnumbremainder%2==0){
            //console.log("This number is in position 3 in section");
            right4 = x + 1;
            left4 = x - 2;
        }
        else{
            left4 = x;
            right4 = x +3;
            //console.log("This number is first element in section");
        }
    }

    //Reassign value to variable left4,right4 to fetch array
    left4 = left4 - 1;
    right4 = right4;
    ////////////////

    if(x<=right4&&x>0){
        if(x==right4-3&&x>1){
            for (let index = right4-4; index < right4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
            for (let index = left4-4; index < left4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    else{
                        //element.setAttribute("style","display:none");
                    }
                }
            }
            if(left4>4){
                for (let index = 0; index < right4 - left4; index++) {
                    const element = kkk[index];
                    if(element!=null){
                        if(element.getAttribute("style")!=null){
                            //element.removeAttribute("style");
                        }
                        else{
                            element.setAttribute("style","display:none");
                        }
                    }
                }
            }
            
        }
        else{
            for (let index = left4; index < right4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    else{
                        //element.setAttribute("style","display:none");
                    }
                }
            }
        
            for (let index = 0; index < left4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
        }
        
    }
    else{
        
    }
    
}
function gotoSection(x){
    var xxx = document.getElementById("button"+x);
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
    var issamevalue = 0;
    var differentvalue = 0;
    var totalelementinsection = 4;
    var startelement = 0;
    var totalnum = getTotalStudentPage();
    var left4 = 0;
    var right4 = 0;

    if(x%2==0){
        var remainder = x/2;
        if(remainder%2==0){
            left4 = x-3;
            right4 = x;
            //console.log("This number is last element in section");
        }
        else{
            left4 = x -1;
            right4 = x + 2;
            //console.log("This number is in position 2 in section");
        }
    }
    else{
        var newnumb = x + 1;
        var newnumbremainder = newnumb / 2;
        if(newnumbremainder%2==0){
            //console.log("This number is in position 3 in section");
            right4 = x + 1;
            left4 = x - 2;
        }
        else{
            left4 = x;
            right4 = x +3;
            //console.log("This number is first element in section");
        }
    }
    //console.log("left"+left4);
    //console.log("right"+right4);
    //Reassign value to variable left4,right4 to fetch array
    left4 = left4 - 1;
    right4 = right4;
    //console.log(x);
    if(x>4){
        if(x-right4==0){
            for (let index = left4; index < right4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
        
            for (let index = right4; index <= right4+3; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    else{
                        //element.setAttribute("style","display:none");
                    }
                }
            }
    
            for (let index = right4+4; index < xxx.length; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
        }
        else{
            for (let index = left4; index < right4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                }
            }
        
            for (let index = right4; index < kkk.length; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
    
            for (let index = 0; index < left4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
        }
        
    }
    else if(x-right4==0){
        for (let index = left4; index < right4; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    //element.removeAttribute("style");
                }
                else{
                    element.setAttribute("style","display:none");
                }
            }
        }
    
        for (let index = right4; index <= right4+3; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
                else{
                    //element.setAttribute("style","display:none");
                }
            }
        }

        for (let index = right4+4; index < xxx.length; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    //element.removeAttribute("style");
                }
                else{
                    element.setAttribute("style","display:none");
                }
            }
        }
    }
    else{
        for (let index = 0; index < 4; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
            }
        }
    
        for (let index = 4; index < kkk.length; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    //element.removeAttribute("style");
                }
                else{
                    element.setAttribute("style","display:none");
                }
            }
        }
    }

    //console.log("First element is "+ left4);
    //console.log("Last element is "+ right4);
    
}

function SkipLeft(x){
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;

    var left4 = 0;
    var right4 = 0;

    var activepage = 0;

    if(x%2==0){
        var remainder = x/2;
        if(remainder%2==0){
            left4 = x-3;
            right4 = x;
            //console.log("This number is last element in section");
        }
        else{
            left4 = x -1;
            right4 = x + 2;
            //console.log("This number is in position 2 in section");
        }
    }
    else{
        var newnumb = x + 1;
        var newnumbremainder = newnumb / 2;
        if(newnumbremainder%2==0){
            //console.log("This number is in position 3 in section");
            right4 = x + 1;
            left4 = x - 2;
        }
        else{
            left4 = x;
            right4 = x +3;
            //console.log("This number is first element in section");
        }
    }
    //console.log("left"+left4);
    //console.log("right"+right4);
    //Reassign value to variable left4,right4 to fetch array
    left4 = left4 - 1;
    right4 = right4;

    if(left4>0){

    
        for (let index = left4; index < right4; index++) {
            const element = kkk[index];
            if(element!=null){
                var checkactive = element.getAttribute("class");
                if(checkactive!=null){
                    element.removeAttribute("class");
                }
                if(element.getAttribute("style")!=null){
                    
                }
                else{
                    element.setAttribute("style","display:none");
                    
                }
            }
        }

        for (let index = left4-4; index < left4; index++) {
            const element = kkk[index];
            if(element!=null){
                if(index == left4 - 1 ){
                    element.setAttribute("class","active");
                    activepage = index;
                }
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
                else{
                    //element.setAttribute("style","display:none");
                }
            }
        }
        toPagenumber(activepage + 1);
        if(left4>4){
            for (let index = 0 ; index < right4-left4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        //element.removeAttribute("style");
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
                }
            }
        }
    }
}

function SkipRight(x){
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;

    var left4 = 0;
    var right4 = 0;

    var activepage = 0;

    if(x%2==0){
        var remainder = x/2;
        if(remainder%2==0){
            left4 = x-3;
            right4 = x;
            //console.log("This number is last element in section");
        }
        else{
            left4 = x -1;
            right4 = x + 2;
            //console.log("This number is in position 2 in section");
        }
    }
    else{
        var newnumb = x + 1;
        var newnumbremainder = newnumb / 2;
        if(newnumbremainder%2==0){
            //console.log("This number is in position 3 in section");
            right4 = x + 1;
            left4 = x - 2;
        }
        else{
            left4 = x;
            right4 = x +3;
            //console.log("This number is first element in section");
        }
    }
    //console.log("left"+left4);
    //console.log("right"+right4);
    //Reassign value to variable left4,right4 to fetch array
    left4 = left4 - 1;
    right4 = right4;

    if((kkk.length+1) - right4 != 0){

    
        for (let index = left4; index < right4; index++) {
            const element = kkk[index];
            if(element!=null){
                var checkactive = element.getAttribute("class");
                if(checkactive!=null){
                    element.removeAttribute("class");
                }
                if(element.getAttribute("style")!=null){
                    
                }
                else{
                    element.setAttribute("style","display:none");
                    
                }
            }
        }

        for (let index = right4; index < right4 + 4; index++) {
            const element = kkk[index];
            if(element!=null){
                if(index == right4){
                    element.setAttribute("class","active");
                    activepage = index;
                }
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
                else{
                    //element.setAttribute("style","display:none");
                }
            }
        }
        toPagenumber(activepage + 1);
        for (let index = right4 + 4 ; index < kkk.length; index++) {
            const element = kkk[index];
            if(element!=null){
                if(element.getAttribute("style")!=null){
                    //element.removeAttribute("style");
                }
                else{
                    element.setAttribute("style","display:none");
                }
            }
        }
    }
}

function gotoSection3(x){
    var xxx = document.getElementById("button"+x);
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
    var issamevalue = 0;
    var differentvalue = 0;
    var totalelementinsection = 4;
    var startelement = 0;
    var totalnum = getTotalStudentPage();
    var left4 = 0;
    var right4 = 0;
    switch (true) {
        case x<=4:
            for (let index = 0; index < x; index++) {
                const element = kkk[index];
                if(element.getAttribute("name")==xxx.getAttribute("name")){
                    //console.log("same section"+(index+1));
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                }
                else{
                    element.setAttribute("style","display:none");
                }
        
            }
            break;
        
        case x>4:

            if(x%2==0){
                var remainder = x/2;
                console.log(remainder);
                if(remainder%2==0){
                    left4 = x-3;
                    right4 = x;
                    //console.log("This number is last element in section");
                }
                else{
                    left4 = x -1;
                    right4 = x + 2;
                    //console.log("This number is in position 2 in section");
                }
            }
            else{
                var newnumb = x + 1;
                var newnumbremainder = newnumb / 2;
                if(newnumbremainder%2==0){
                    //console.log("This number is in position 3 in section");
                    right4 = x + 1;
                    left4 = x - 2;
                }
                else{
                    left4 = x;
                    right4 = x +3;
                    //console.log("This number is first element in section");
                }
            }

            
            for (let index = 0; index < left4 - 1; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    element.setAttribute("style","display:none");
                }
                
            }
            for (let index = left4 - 1; index < right4; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                }
                
            }
            

            for (let index = right4; index < totalnum; index++) {
                const element = kkk[index];
                if(element!=null){
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    element.setAttribute("style","display:none");
                }
                
            }

            break;
        
        default:
            break;
    }
    
    return;
}

function gotoSection2(x){
    var xxx = document.getElementById("button"+x);
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
    var issamevalue = 0;
    var differentvalue = 0;
    var totalelementinsection = 4;
    var startelement = 0;
    var totalnum = getTotalStudentPage();
    var left4 = 0;
    var right4 = 0;
    switch (true) {
        case x<=4:
            if(x<4){
                for (let index = 0; index < x; index++) {
                    const element = kkk[index];
                    if(element.getAttribute("name")==xxx.getAttribute("name")){
                        //console.log("same section"+(index+1));
                        if(element.getAttribute("style")!=null){
                            element.removeAttribute("style");
                        }
                    }
                    else{
                        element.setAttribute("style","display:none");
                    }
            
                }
            }
            else{
                for (let index = 4; index < 8; index++) {
                    const element = kkk[index];
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                }
                for (let index = 0; index < x; index++) {
                    const element = kkk[index];
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    element.setAttribute("style","display:none");
                }
                for (let index = 8; index < totalnum; index++) {
                    const element = kkk[index];
                    if(element.getAttribute("style")!=null){
                        element.removeAttribute("style");
                    }
                    element.setAttribute("style","display:none");
                }
            }
            break;
        

        case x>4:

            // for (let index = 0; index < x; index++) {
            //     const element = kkk[index];
            //     if(element.getAttribute("style")!=null){
            //         element.removeAttribute("style");
            //     }
            //     element.setAttribute("style","display:none");
            // }

            if(x%2==0){
                var remainder = x/2;
                console.log(remainder);
                if(remainder%2==0){
                    left4 = x-3;
                    right4 = x;
                    //console.log("This number is last element in section");
                }
                else{
                    left4 = x -1;
                    right4 = x + 2;
                    //console.log("This number is in position 2 in section");
                }
            }
            else{
                var newnumb = x + 1;
                var newnumbremainder = newnumb / 2;
                if(newnumbremainder%2==0){
                    //console.log("This number is in position 3 in section");
                    right4 = x + 1;
                    left4 = x - 2;
                }
                else{
                    left4 = x;
                    right4 = x +3;
                    //console.log("This number is first element in section");
                }
            }

            for (let index = left4; index <= right4; index++) {
                const element = kkk[index];
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
            }
            for (let index = 0; index < left4; index++) {
                const element = kkk[index];
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
                element.setAttribute("style","display:none");
            }

            

            for (let index = right4 + 1; index <= totalnum; index++) {
                const element = kkk[index];
                if(element.getAttribute("style")!=null){
                    element.removeAttribute("style");
                }
                element.setAttribute("style","display:none");
            }
            break;
        
        default:
            break;
    }
    // for (let index = 0; index < kkk.length; index++) {
    //     const element = kkk[index];
    //     if(element.getAttribute("name")==xxx.getAttribute("name")){
    //         //console.log("same section"+(index+1));
    //         if(element.getAttribute("style")!=null){
    //             element.removeAttribute("style");
    //         }
    //     }
    //     else{
    //         element.setAttribute("style","display:none");
    //     }

    // }


    // for (let index = 0; index < kkk.length; index++){
    //     const element = kkk[index];
    //     if(element.getAttribute("name")==xxx.getAttribute("name")){
    //         issamevalue = issamevalue + 1;
    //     }
    //     else{
    //         differentvalue = differentvalue + 1;
    //     }
    // }
    //console.log(issamevalue+"&"+differentvalue);
    //checkNextNumber(x);
}


function loadbutton(x){
    console.log(x+"is triggered");
}


function checkNextNumber(x){
    var xxx = document.getElementById("button"+x);
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
    for (let index = 0; index < kkk.length; index++) {
        if(x-1==index){
            const element = kkk[x];
            if(element!=null){
                if(element.getAttribute("name")==xxx.getAttribute("name")){
                    console.log("next number"+(x+1)+"is same section");
                }
                else{
                    console.log("next number"+(x+1)+"is different section");
                }
                break;
            }
        }
    }
}

function moveSection(x){
    var xxx = document.getElementById("paginationStudent");
    var vvv = xxx.children;
    var isinsection = 0;
    var checkthenextpage = 0;
    for (let index = 0; index < vvv.length; index++) {
        if(x==index+1){
            const element = vvv[index];
            var sectionposition = removeFirstCharactersofString(element.getAttribute("section"),6);
            if(removeFirstCharactersofString(element.getAttribute("section"),6) == sectionposition){
                isinsection = sectionposition;
                
                    const element2 = vvv[index+1];
                    if(element2!=null){
                        if(removeFirstCharactersofString(element2.getAttribute("section"),6) != sectionposition){
                            checkthenextpage = x + 1;
                        }
                        else{
                            checkthenextpage = 0;
                        }
                    }
                break;
            }
        }
    }
    console.log(checkthenextpage);


    
    
    
        for (let index = 0; index < vvv.length; index++) {
            const element = vvv[index];
            var mmm = element.getAttribute("section");
            if(mmm == "section"+isinsection){

                if(checkthenextpage!=0){
                    if(checkthenextpage - index == 1){
                        const element = vvv[index];
                        //element.setAttribute("style","display:none");
                        if(element.getAttribute("style")!=null){
                            element.removeAttribute("style");
                        }
                    }
                    else{
                        const element = vvv[index];
                        var mmm = element.getAttribute("section");
                        if(mmm == "section"+isinsection){
                            if(element.getAttribute("style")!=null){
                                element.removeAttribute("style");
                            }
                        }
                        else{
                            element.setAttribute("style","display:none");
                        }
                    }
                }
                else{
                    element.removeAttribute("style");
                }
            }
            else{
                element.setAttribute("style","display:none");
            }
        }
       
    // for (let index = 0; index < vvv.length; index++) {
    //     const element = vvv[index];
    //     var mmm = element.getAttribute("section");
    //     if(mmm == "section"+isinsection){
    //         if(checkthenextpage!=0){
    //             for (let index = 0; index < xxx.length; index++) {
    //                 const element = xxx[index];
    //                 if(element!=null){
    //                     element.setAttribute("style","display:none");
    //                 }
                    
    //             }
    //             checkthenextpage = 0;
    //         }
    //         // if(element.getAttribute("style")!=null){
    //         //     element.removeAttribute("style");
    //         // }
    //     }
    //     else{
    //         element.setAttribute("style","display:none");
            
    //     }
    // }

}