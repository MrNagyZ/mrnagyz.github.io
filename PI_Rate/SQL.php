<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/html; charset=iso-8859-2");
include('mysqli_db.php');
$db_MYSQLi = mysqli_connect($DB_HOST_MYSQLi, $DB_USER_MYSQLi, $DB_PWD_MYSQLi, $DATABASE_MYSQLi);

//  ************************ RECORD OLVASAS ************************

if (isset($_GET["load"])||isset($_GET["szam"])||isset($_GET["oszlop"])) {

	$sql = "SELECT * FROM $TABLE_MYSQLi";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $sql = "SELECT ".$_GET["oszlop"]." FROM $TABLE_MYSQLi WHERE szam=".$_GET["szam"];
  $result = $db_MYSQLi->query($sql) or die($db_MYSQLi->error);
  if ($result) {
    while($row = $result->fetch_assoc()) {
    echo $row[$_GET["oszlop"]];
  }
  } else {
    echo "0 results";
  }
}

//  ************************ RECORD IRAS ************************

if (isset($_GET["update"])||isset($_GET["id"])||isset($_GET["uzenet"])) { //id: mezszam, uzenet: oszlop
  
  $sql = "UPDATE $TABLE_MYSQLi SET Rovid_nev='".$_GET["uzenet"]."' WHERE Szam=".$_GET["id"];
  
  //  ************ ELLENORZES ************
  if ($db_MYSQLi->query($sql) === TRUE) {
     //echo "Record updated successfully";
  } else {
     //echo "Error updating record: " . $db_MYSQLi->error;
  }

}

//  ************************ TABLAZAT ************************

if (isset($_GET["tableHOME"])) {
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 21 AND ID <= 70 AND Nev IS NOT NULL ORDER BY Szam ASC"; // AND Nev IS NOT NULL
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  echo "
  <tr>
  <th>Num</th>
  <th>Name</th>
  <th>G</th>
  <th>Sog</th>
  <th>Fc</th>
  <th>Yc</th>
  <th>Rc</th>
  <th>Sw</th>
  <th>Sh</th>
  <th>Sp</th>
  <th>Sc</th>
  <th>Sb</th>
  <th>Ss</th>
  <th>Cor</th>
  <th>Pk</th>
  <th>Off</th>
  
  </tr>";

  while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['Szam'] . "</td>";
  echo "<td>" . $row['Rovid_nev']. "</td>";
  echo "<td>" . $row['Goal'] . "</td>";
  echo "<td>" . $row['ShotsOnGoal'] . "</td>";
  echo "<td>" . $row['FaulsCommited'] . "</td>";
  echo "<td>" . $row['YellowCards'] . "</td>";
  echo "<td>" . $row['RedCards'] . "</td>";
  echo "<td>" . $row['ShotWide'] . "</td>";
  echo "<td>" . $row['ShotHigh'] . "</td>";
  echo "<td>" . $row['ShotPost'] . "</td>";
  echo "<td>" . $row['ShotCross'] . "</td>";
  echo "<td>" . $row['ShotBlock'] . "</td>";
  echo "<td>" . $row['ShotSave'] . "</td>";
  echo "<td>" . $row['Corner'] . "</td>";
  echo "<td>" . $row['PenaltyKick'] . "</td>";
  echo "<td>" . $row['Offside'] . "</td>";
  echo "</tr>";
  }
  echo "</table>";
  
}

if (isset($_GET["tableAWAY"])) {
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 71 AND ID <= 120 AND Nev IS NOT NULL ORDER BY Szam ASC"; // AND Nev IS NOT NULL
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $n=1;
  echo "<table class='statTable'>
  <tr>
  <th>Num</th>
  <th>Name</th>
  <th>G</th>
  <th>Sog</th>
  <th>Fc</th>
  <th>Yc</th>
  <th>Rc</th>
  <th>Sw</th>
  <th>Sh</th>
  <th>Sp</th>
  <th>Sc</th>
  <th>Sb</th>
  <th>Ss</th>
  <th>Cor</th>
  <th>Pk</th>
  <th>Off</th>
  
  </tr>";

  while($row = mysqli_fetch_array($result))
  {
    //$n++;
  echo "<tr>";
  echo "<td>" . $row['Szam'] . "</td>";
  echo "<td>" . $row['Rovid_nev']. "</td>";
  echo "<td>" . $row['Goal'] . "</td>";
  echo "<td>" . $row['ShotsOnGoal'] . "</td>";
  echo "<td>" . $row['FaulsCommited'] . "</td>";
  echo "<td>" . $row['YellowCards'] . "</td>";
  echo "<td>" . $row['RedCards'] . "</td>";
  echo "<td>" . $row['ShotWide'] . "</td>";
  echo "<td>" . $row['ShotHigh'] . "</td>";
  echo "<td>" . $row['ShotPost'] . "</td>";
  echo "<td>" . $row['ShotCross'] . "</td>";
  echo "<td>" . $row['ShotBlock'] . "</td>";
  echo "<td>" . $row['ShotSave'] . "</td>";
  echo "<td>" . $row['Corner'] . "</td>";
  echo "<td>" . $row['PenaltyKick'] . "</td>";
  echo "<td>" . $row['Offside'] . "</td>";
  echo "</tr>";
  }

  
}

//  ************************ RECORD NOVELES ************************

if (isset($_GET["noveles"])&&isset($_GET["home"])) {
  
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 5 AND ID <= 50";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $sql = "SELECT ".$_GET["akcio"]." FROM $TABLE_MYSQLi WHERE ID >= 5 AND ID <= 50 AND szam=".$_GET["mezszam"];
  $result = $db_MYSQLi->query($sql) or die($db_MYSQLi->error);
  if ($result) {
    while($row = $result->fetch_assoc()) {
    
    ++$row[$_GET["akcio"]];
    echo $row[$_GET["akcio"]];

  $sql = "UPDATE $TABLE_MYSQLi SET ".$_GET["akcio"]."='".$row[$_GET["akcio"]]."' WHERE ID >= 5 AND ID <= 50 AND Szam=".$_GET["mezszam"];
  
  //  ************ ELLENORZES ************
  if ($db_MYSQLi->query($sql) === TRUE) {
     //echo "Record updated successfully";
  } else {
     //echo "Error updating record: " . $db_MYSQLi->error;
  }
  }
  } else {
    echo "0 results";
  }

}

if (isset($_GET["noveles"])&&isset($_GET["away"])) {
  
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 51 AND ID <= 120";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $sql = "SELECT ".$_GET["akcio"]." FROM $TABLE_MYSQLi WHERE ID >= 51 AND ID <= 120 AND szam=".$_GET["mezszam"];
  $result = $db_MYSQLi->query($sql) or die($db_MYSQLi->error);
  if ($result) {
    while($row = $result->fetch_assoc()) {
    
    ++$row[$_GET["akcio"]];
    echo $row[$_GET["akcio"]];

  $sql = "UPDATE $TABLE_MYSQLi SET ".$_GET["akcio"]."='".$row[$_GET["akcio"]]."' WHERE ID >= 51 AND ID <= 120 AND Szam=".$_GET["mezszam"];
  
  //  ************ ELLENORZES ************
  if ($db_MYSQLi->query($sql) === TRUE) {
     //echo "Record updated successfully";
  } else {
     //echo "Error updating record: " . $db_MYSQLi->error;
  }
  }
  } else {
    echo "0 results";
  }

}

//  ************************ MEZSZAMOK LETÖLTESE ************************

if (isset($_GET["mezszamokHome"])) {
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 21 AND ID <= 70 AND Nev IS NOT NULL AND Allapot =0 ORDER BY Szam ASC ";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);


  while($row = mysqli_fetch_array($result))
  {
 
  echo $row['Szam'] . "/";

  }

  echo "x";
}
if (isset($_GET["mezszamokAway"])) {
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 71 AND ID <= 120 AND Nev IS NOT NULL AND Allapot =0 ORDER BY Szam ASC ";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);


  while($row = mysqli_fetch_array($result))
  {
 
  echo $row['Szam'] . "/";

  }

  echo "x";
}

//  ************************ CSAPAT OSSZESEN ************************

if (isset($_GET["homeCsapat"])) {

  foreach($db_MYSQLi->query('SELECT SUM(Goal)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo $row['SUM(Goal)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotsOnGoal) 
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotsOnGoal)'];}
  foreach($db_MYSQLi->query('SELECT SUM(FaulsCommited)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(FaulsCommited)'];}
  foreach($db_MYSQLi->query('SELECT SUM(YellowCards)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(YellowCards)'];}
  foreach($db_MYSQLi->query('SELECT SUM(RedCards)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(RedCards)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotWide)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotWide)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotHigh)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotHigh)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotPost)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotPost)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotCross)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotCross)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotBlock)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotBlock)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotSave)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(ShotSave)'];}
  foreach($db_MYSQLi->query('SELECT SUM(Corner)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(Corner)'];}
  foreach($db_MYSQLi->query('SELECT SUM(PenaltyKick)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(PenaltyKick)'];}
  foreach($db_MYSQLi->query('SELECT SUM(Offside)
  FROM stat WHERE ID >= 21 AND ID <= 70') as $row) {echo "/".$row['SUM(Offside)'];}

}

if (isset($_GET["awayCsapat"])) {

  foreach($db_MYSQLi->query('SELECT SUM(Goal)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo $row['SUM(Goal)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotsOnGoal) 
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotsOnGoal)'];}
  foreach($db_MYSQLi->query('SELECT SUM(FaulsCommited)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(FaulsCommited)'];}
  foreach($db_MYSQLi->query('SELECT SUM(YellowCards)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(YellowCards)'];}
  foreach($db_MYSQLi->query('SELECT SUM(RedCards)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(RedCards)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotWide)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotWide)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotHigh)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotHigh)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotPost)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotPost)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotCross)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotCross)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotBlock)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotBlock)'];}
  foreach($db_MYSQLi->query('SELECT SUM(ShotSave)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(ShotSave)'];}
  foreach($db_MYSQLi->query('SELECT SUM(Corner)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(Corner)'];}
  foreach($db_MYSQLi->query('SELECT SUM(PenaltyKick)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(PenaltyKick)'];}
  foreach($db_MYSQLi->query('SELECT SUM(Offside)
  FROM stat WHERE ID >= 71 AND ID <= 120') as $row) {echo "/".$row['SUM(Offside)'];}

}

//  ************************ WebSocket IRAS ************************

if (isset($_GET["WebSocketHome"])) {
  
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 5 AND ID <= 50";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $sql = "SELECT ".$_GET["Webakcio"]." FROM $TABLE_MYSQLi WHERE ID >= 5 AND ID <= 50 AND szam=".$_GET["Webmezszam"];
  $result = $db_MYSQLi->query($sql) or die($db_MYSQLi->error);
  if ($result) {
    while($row = $result->fetch_assoc()) {
    
    ++$row[$_GET["Webakcio"]];
    echo $row[$_GET["Webakcio"]];

  $sql = "UPDATE $TABLE_MYSQLi SET ".$_GET["Webakcio"]."='".$row[$_GET["Webakcio"]]."' WHERE ID >= 5 AND ID <= 50 AND Szam=".$_GET["Webmezszam"];
  
  //  ************ ELLENORZES ************
  if ($db_MYSQLi->query($sql) === TRUE) {
     //echo "Record updated successfully";
  } else {
     //echo "Error updating record: " . $db_MYSQLi->error;
  }
  }
  } else {
    echo "0 results";
  }

}

if (isset($_GET["WebSocketAway"])) {
  
  $sql = "SELECT * FROM $TABLE_MYSQLi WHERE ID >= 51 AND ID <= 120";
  $result = __query($sql) or die(''. __FILE__ .' '. __LINE__ .': '.$sql);
  $sql = "SELECT ".$_GET["WebakcioAway"]." FROM $TABLE_MYSQLi WHERE ID >= 51 AND ID <= 120 AND szam=".$_GET["WebmezszamAway"];
  $result = $db_MYSQLi->query($sql) or die($db_MYSQLi->error);
  if ($result) {
    while($row = $result->fetch_assoc()) {
    
    ++$row[$_GET["WebakcioAway"]];
    echo $row[$_GET["WebakcioAway"]];

  $sql = "UPDATE $TABLE_MYSQLi SET ".$_GET["WebakcioAway"]."='".$row[$_GET["WebakcioAway"]]."' WHERE ID >= 51 AND ID <= 120 AND Szam=".$_GET["WebmezszamAway"];
  
  //  ************ ELLENORZES ************
  if ($db_MYSQLi->query($sql) === TRUE) {
     //echo "Record updated successfully";
  } else {
     //echo "Error updating record: " . $db_MYSQLi->error;
  }
  }
  } else {
    echo "0 results";
  }

}


?>