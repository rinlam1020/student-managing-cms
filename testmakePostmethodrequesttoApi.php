<?php
    //testmakePostmethodrequesttoApi
    $url = 'localhost:3000/owners';

    $data = [
        'name' => 'Billy',
        'email' => 'billy@example.com'
    ];
    
    $curl = curl_init($url);

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

    curl_setopt($curl, CURLOPT_POST, true);

    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

    curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($curl);

    curl_close($curl);

    echo $response;
?>