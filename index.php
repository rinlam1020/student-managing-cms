<!DOCTYPE html>
<html>
<head>
    <title>Hello World</title>
    <link rel="icon" 
      type="image/png" 
      href="favicon.ico">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="style.less">
</head>

<body onload="showStdData()">
    <div class="body-wrapper">
        
            <div class="banner">

            </div>


            <div class="content">
                <div class="left"></div>
                <div class="right">
                    <div class="search-wrapper">
                        <div class="title">Type Student name : </div>
                        <div class="input"><input name ="txtsearchName" id="txtsearchName" onkeyup="searchStdname(this.value)"></div>
                    </div>


                    <div id="showStdData"></div>
                    <div id="searchName"></div>

                    <table id="tlbinput">
                        <tr>
                            <td>StudentID : </td>
                            <td id="dataStudentId"><input id="txtstdid" name="studentID" placeholder="Insert Student ID ..." /></td>
                        </tr>
                        <tr>
                            <td>StudentName : </td>
                            <td class="dataStudentName">
                                <input id="txtstdname" name="studentName" onkeyup="checkdata(this.value,'0')" onkeydown="checkdata(this.value,'0')"/>
                                <div class="form-insert-student-error-field-data"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>StudentAge : </td>
                            <td class="dataStudentAge">
                                <input id="txtstdage" name="studentAge" onkeyup="checkdata(this.value,'1')" onkeydown="checkdata(this.value,'1')"/>
                                <div class="form-insert-student-error-field-data"></div>
                            </td>
                        </tr>
                        <tr>
                            <td>StudentAddress : </td>
                            <td class="dataStudentAddress">
                                <input id="txtstdaddr" name="studentAddress" onkeyup="checkdata(this.value,'2')" onkeydown="checkdata(this.value,'2')"/>
                                <div class="form-insert-student-error-field-data"></div>
                            </td>
                        </tr>
                    </table>

                    <div class="buttonInsert" onclick = "insertStdData()">insert</div>
                    <div id = "showError"></div>

                </div>
            </div>
        
        <footer class="footer_custom"></footer>
    </div>



    

    <script src="script.js"></script>
</body>
</html>