<?php

$con = mysql_connect("localhost", "root", NULL);
mysql_select_db("emotion");

if (!$con) {
    die("Connect faild" . mysqli_connect_error());
}
?>
