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
            paginationStudent(5);
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
    var listnumber = document.createElement("ul");
    var leftskiparrow = document.createElement("li");
    var leftskiparrowtextnode = document.createTextNode("<<");
    leftskiparrow.appendChild(leftskiparrowtextnode);
    listnumber.appendChild(leftskiparrow);
    var leftarrow = document.createElement("li");
    var leftarrowtextnode = document.createTextNode("<");
    leftarrow.appendChild(leftarrowtextnode);
    leftarrow.setAttribute("onclick","ArrowMoving("+(0)+")");
    listnumber.appendChild(leftarrow);
    listnumber.setAttribute("id","paginationStudent");
    for (let index = 0; index < numbbutton; index++) {
        
        var elemmm = document.createElement("li");
        if(index==0){
            elemmm.setAttribute("class","active");
        }
        elemmm.setAttribute("onclick","toPagenumber("+(index+1)+")");
        var textnode = document.createTextNode(index+1);
        elemmm.appendChild(textnode);
        listnumber.appendChild(elemmm);
    }
    var rightarrow = document.createElement("li");
    var rightarrowtextnode = document.createTextNode(">");
    rightarrow.appendChild(rightarrowtextnode);
    rightarrow.setAttribute("onclick","ArrowMoving("+(1)+")");
    listnumber.appendChild(rightarrow);
    var rightskiparrow = document.createElement("li");
    var rightskiparrowtextnode = document.createTextNode(">>");
    rightskiparrow.appendChild(rightskiparrowtextnode);
    listnumber.appendChild(rightskiparrow);
    xxx.appendChild(listnumber);
    activatePagination(numbbutton);
    getActivePageNumber();
}

function getActivePageNumber(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    for (let index = 2; index < ooo.length - 2; index++) {
        const element = ooo[index];
        var getActiveClass = element.getAttribute("class");
        if(getActiveClass == null){
            //console.log("Page"+index+" unactive");
            
        }
        else{
            //console.log("Page"+index+" active");
            return index;
        }
    }  
}

function getTotalStudentPage(){
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    var totalxxx = 0;
    for (let index = 3; index < ooo.length - 2; index++) {
        totalxxx = index;
    }
    return totalxxx;
}

function ArrowSkipping(direction){
    var getactivepage = getActivePageNumber();
    var gettotalpages = getTotalStudentPage();
    switch (direction) {

        case 0:
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

function ArrowMoving(direction){
    var getactivepage = getActivePageNumber();
    var gettotalpages = getTotalStudentPage();
    switch (direction) {

        case 0:
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

function activatePagination(number){
    for (let index = 1; index < number; index++) {
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
        if(getLastCharactersofString(nameRow,1) == number){
            element.removeAttribute("style");
        }
        else{
            element.setAttribute("style","display:none");
        }
    }
    var lll = document.getElementById("paginationStudent");
    var ooo = lll.children;
    
    for (let index = 3; index < ooo.length - 2; index++) {
        
        const element = ooo[index];
        if(index == number){
            
            element.setAttribute("class","active");
        }
        else{
            element.removeAttribute("class");
        }
    }   
}