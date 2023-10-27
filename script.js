var nameflag = false, ageflag = false, addressflag = false;

function showStdData(){
    
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            document.getElementById("showStdData").innerHTML = this.responseText;
            var yyy = document.getElementById("showStdData");
            yyy.removeAttribute("style");
            document.getElementById("searchName").innerHTML = "";
            document.getElementById("txtsearchName").value = "";
            loadStudentID();
            paginationStudent(2);
            displayNumberinPagination(4);
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
                //Total elements in one page at order numb *
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

function getTotalStudentPage(){
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

    switch (direction) {

        case 0:
            gotoSectionleft(getactivepage);
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
            gotoSection(getactivepage);
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
            SkipLeft(getactivepage);
            // if(getactivepage==1){
            //     console.log("<<This is the first page");
            //     return;
            // }
            // toPagenumber(1);
            return;
        
        case 1:
            SkipRight(getactivepage);
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

function gotoSectionleft(x){
    
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
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
    
    var yyy = document.getElementById("paginationStudent");
    var kkk = yyy.children;
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
    if(x>4){
        if(x-right4==0){
            if(x!=kkk.length){
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
        
                for (let index = right4+4; index < kkk.length; index++) {
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

        for (let index = right4+4; index < kkk.length; index++) {
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
    if(kkk.length > right4){
        if(x!=kkk.length){
            
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
}