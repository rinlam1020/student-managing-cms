function testApiData(){
    var xmlhttp = new XMLHttpRequest();

    //Show effect on page
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(this.responseText);
            //document.getElementById("showStdData").innerHTML = this.responseText;
        }
    };
    

    //Send data
    xmlhttp.open("GET", "testmakePostmethodrequesttoApi.php" , true);
    xmlhttp.send();
}