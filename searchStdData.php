<?php
    $key_word = $_REQUEST["q"];

    $user_name = "rin";
	$password  = "jackis1Q!";
	$database  = "rin";
	$host_name = "localhost";

    $con = mysqli_connect($host_name, $user_name, $password, $database);
    $strExec = "SELECT * FROM STUDENT WHERE StudentID LIKE '%".$key_word."%' OR StudentName LIKE '%".$key_word."%'";
	$res = mysqli_query($con, $strExec);
    $sqlgetColumnname = "SHOW COLUMNS FROM STUDENT";
    $resultColumnName = mysqli_query($con,$sqlgetColumnname);
    $strShowColumnName = "<tr>";
    while($rowColumnName = mysqli_fetch_array($resultColumnName)){
        $strShowColumnName .= "<td>".$rowColumnName['Field']."</td>";
    }
    $strShowColumnName .= "</tr>";
    
	if($res)
	{
        $numbcounter = 0;
        $strResopenTable = "<table id='search'>";
		while($rows = mysqli_fetch_row($res))
		{
			foreach($rows as $key => $row)
			{
                if($key==0){
                    $strRes .= "<tr><td>".$row."</td>";
                }
                else{
                    $strRes .= "<td>".$row."</td>";
                }
			}
			$strRes .= "</tr>";
            $numbcounter += 1;
		}
        if($numbcounter == 0){
            echo $strResopenTable.$strRes."</table><p>Found 0 Student</p>";
        }
        else{
            if($numbcounter>1){
                echo $strResopenTable.$strShowColumnName.$strRes."</table><p>Found ".$numbcounter." Students</p>";
            }
            else{
                echo $strResopenTable.$strShowColumnName.$strRes."</table><p>Found ".$numbcounter." Student</p>";
            }
        }
        
	}
    
	mysqli_close($con);
?>