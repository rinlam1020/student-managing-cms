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
    $sqlinsertStudent = "INSERT INTO STUDENT (StudentID, StudentName, StudentAddress, StudentAge)
    VALUES ('".$stdid."', '".$stdname."', '".$stdaddr."', '".$stdage."')";

    if($stdid){
        if (mysqli_query($con, $sqlinsertStudent) === TRUE) 
        {
            echo "New record created successfully";
        }
        else{
            echo "Error: " . $sqlinsertStudent . "<br>" . mysqli_error($con);
        }
    }
    else{
        echo "Student ID cannot be null";
    }
    

    mysqli_close($con);
?>