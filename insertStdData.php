<?php 
    $id = $_REQUEST["id"];
    $name = $_REQUEST["name"];
    $age = $_REQUEST["age"];
    $address = $_REQUEST["address"];
    


    $user_name = "rin";
	$password  = "jackis1Q!";
	$database  = "rin";
	$host_name = "localhost";
    $con = mysqli_connect($host_name, $user_name, $password, $database);
    $stdid = $id;
    $stdname = $name;
    $stdaddr = $address;
    $stdage = $age;
    date_default_timezone_set("Asia/Ho_Chi_Minh");
    $dateadded = date("Y-m-d h:i:sa");
    $sqlinsertStudent = "INSERT INTO STUDENT (StudentID, StudentName, StudentAddress, StudentAge, DateAdded)
    VALUES ('".$stdid."', '".$stdname."', '".$stdaddr."', '".$stdage."', '".$dateadded."')";

    if($stdid){
        if (mysqli_query($con, $sqlinsertStudent) === TRUE) 
        {
            echo "Insert-New record created successfully";
        }
        else{
            echo "Insert-Error: " . $sqlinsertStudent . "<br>" . mysqli_error($con);
        }
    }
    else{
        echo "Student ID cannot be null";
    }
    

    mysqli_close($con);
?>