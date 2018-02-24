<?php

require_once 'dbConnection.php';

function registration(){
    $username=$_POST['username'];
    $psw=$_POST['psw'];
    $email=$_POST['email'];

    /*$username='jia';
    $psw='123';
    $email='jia@gmail.com';*/

    $sql = "INSERT INTO user (username,password,email) VALUES ('$username' , '$psw' , '$email')";
    $rst = mysql_query($sql);

    if($rst){
        echo 'true';
    }else{
        echo 'false';
    }
    
}

function login(){
    $username=$_POST['username'];

    /*$username='jia';
    $psw='123';
    $email='jia@gmail.com';*/

    $sql = "select password from user where username= '$username'";
    $rst = mysql_query($sql);

    if($rst){
        $row = mysql_fetch_array($rst);
        echo "$row[password]";
    }else{
        echo 'false';
    }
}

$action = $_POST['action'];
//$action ='signup';

if($action=='signup'){
    registration();
}else if($action=='login'){
    login();
}



?>
