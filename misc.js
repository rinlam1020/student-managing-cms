function loadStudentID()
{
    var numbcounter = document.getElementById("numbcounter").innerText;
    var autoGenerateStudentId = document.getElementById("txtstdid");
    autoGenerateStudentId.disabled = true;
    autoGenerateStudentId.value = "S" + (parseInt(numbcounter) + 1);
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

function getStringendwithCharacter(str, characters) { // Get string until meets character parameter
    var strtest = "";
    if(str == null){
        return "";
    }
    for (let i = 0; i < str.length; i++) {
        if(str.charAt(i)!=characters){
            strtest += str.charAt(i);       
        }
        else{
            break;
        }
    }
    return strtest;
}

function getStringskipfromCharacter(str, characters) { // Get string after meets character parameter
    if(str == null){
        return "";
    }
    var strtest = "";
    var getthischar = false;
    for (let i = 0; i < str.length; i++) {
        if(str.charAt(i)==characters){
            getthischar = true;       
        }
        else{
            if(getthischar==true){
                strtest += str.charAt(i);
            }
            else{

            }
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

function resetFieldInsert(){
    document.getElementById("txtstdname").value = "";
    document.getElementById("txtstdage").value = "";
    document.getElementById("txtstdaddr").value = "";
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

function containsSpecialCharactersCheckforNumbers(str){
    return /[` !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

//Display Error when checking input from Form insert Student with parameter Error message and which input field parent which element display error child lies in
// for exp: displayError("Student Address cannot be empty","dataStudentAddress") => Show message "Student Address cannot be empty" to element Display Error lies in element id #dataStudentAddress field
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