<?php
//--------------------------------------------
$DB_HOST_MYSQLi		= "localhost";
$DB_USER_MYSQLi		= "root";
$DB_PWD_MYSQLi		= "baba";
$DATABASE_MYSQLi	= "PIRate";
$TABLE_MYSQLi		= "stat";
//--------------------------------------------

$db_MYSQLi = false;

function dbConnect_MYSQLi()
{
		global $db_MYSQLi,$DATABASE_MYSQLi,$DB_HOST_MYSQLi,$DB_USER_MYSQLi,$DB_PWD_MYSQLi;
		$db_MYSQLi = mysqli_connect($DB_HOST_MYSQLi, $DB_USER_MYSQLi, $DB_PWD_MYSQLi, $DATABASE_MYSQLi);
		if (mysqli_connect_errno()) {
    		die("Nem lehet csatlakozni: " . mysqli_connect_error());
		} else {
			mysqli_set_charset($db_MYSQLi,"utf8");
			mysqli_query($db_MYSQLi, "SET character_set_results=utf8, character_set_client = 'utf8'");
		}
}
//************************************************************************************************
function dbClose_MYSQLi()
{
	global $db_MYSQLi;
	mysqli_close($db_MYSQLi);
	$db_MYSQLi = false;
}

function __query($sql) 
{
	global $db_MYSQLi;
	return mysqli_query($db_MYSQLi, $sql);
}

function __num_rows($result) 
{
	return mysqli_num_rows($result);
}

function __fetch_assoc($result) 
{
	return mysqli_fetch_assoc($result);
}

function __fetch_array($result) 
{
	return mysqli_fetch_array($result);
}

function __free($result) 
{
	return mysqli_free_result($result);
}

function __insert_id() 
{
	global $db_MYSQLi;
	return mysqli_insert_id($db_MYSQLi);
}


function mysqli_mres($q) {
	global $db_MYSQLi;
    if(is_array($q))
        foreach($q as $k => $v)
            $q[$k] = mysqli_mres($v); //recursive
    elseif(is_string($q))
        $q = mysqli_real_escape_string($db_MYSQLi, $q);
    return $q;
}


?>