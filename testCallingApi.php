<?php
    $number = 23;
    $url = 'localhost:3000/owners/'.$number;
    
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    //curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($path_variables));

    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($curl);

    curl_close($curl);

    echo $response;
    
?>