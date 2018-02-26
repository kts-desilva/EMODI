<?php

require_once 'dbConnection.php';

function addData(){
    $edate=$_POST['edate'];
    $etime=$_POST['etime'];
    $txt_emotion=$_POST['txt_emotion'];
    $img_emotion=$_POST['img_emotion'];
    $uid=$_POST['uid'];

    /*$username='jia';
    $psw='123';
    $email='jia@gmail.com';*/

    $sql = "INSERT INTO emotion (edate,etime,txt_emotion,img_emotion,uid) VALUES ('$edate' ,'$etime','$txt_emotion', '$img_emotion' , '$uid')";
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

if($action=='addData'){
    addData();
}else if($action=='login'){
    login();
}



?>
