<?php
	
	//mysqli_report(MYSQLI_REPORT_STRICT);
	$user_name = "rin";
	$password  = "jackis1Q!";
	$database  = "rin";
	$host_name = "localhost";
	/*
	$connectmotherdatabase = mysqli_connect($host_name, $user_name, $password);
	$find_db = mysqli_select_db($connectmotherdatabase, $database);
	echo "Connection Opened\n";
	if($find_db)
	{
		echo "Database exists\n";
	}
	else
	{
		echo "Database does not exist\n".$connectmotherdatabase;
	}
	*/
	

	$con = mysqli_connect($host_name, $user_name, $password, $database);
	$res = mysqli_query($con, "SELECT * FROM `STUDENT` ");
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
        $strResopenTable = "<table id='tableStudent'>";
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
        echo $strResopenTable.$strShowColumnName.$strRes."</table><p style='display:none;' id='numbcounter'>".$numbcounter."</p>";
	}
    
	mysqli_close($con);
?>