<?php
/*
//
// this is the order of entries in each $rows
//

Array
(
    [0] => Array
        (
(node table)    [0] => Permit Type 
(tag) 			[1] => Agency 
(tag)  			[2] => Division
(node table)  	[3] => Permit/License Name 
(node table)	[4] => Form Title
(node table)    [5] => Form PDF
	            [6] => L123 Description
(node table)    [7] => Department Description
	            [8] => Description Link
(node table)    [9] => Biz Portal Description
(node table)    [10] => Application Fee
(node table)    [11] => License Fee
(node table)    [12] => Renewal Fee
(node table)    [13] => Time Frame
(tag)           [14] => Industry or Sector (as in Lic123: e.g. automotive, consulting, education, food and drink, business services)
(tag)           [15] => Business Types_Level 1 (e.g. cafe, design studio, 
	            [16] => Requirements Link
(tag)           [17] => Tag
	            [18] => Tasks
	            [19] => Notes:
	            [20] => 
        )
	[1]
	[2]
	[etc...]
*/


$CSVrows = array();

if (($handle = fopen("CCSF_Permits & Licenses_test.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 10000, ",")) !== FALSE) {
        array_push($CSVrows,$data);
    }
    fclose($handle);
}
/*
echo '<pre>';
print_r($CSVrows);
echo '</pre>';
*/

/*
* insert into the tabels
*/
$con=mysqli_connect('localhost','root','root','ccsf_preview');

if(mysqli_connect_errno()){
	echo 'Failed to Connect to Database '. mysqli_connect_error();
}else{
	echo 'Successfully Connected to Database';
	echo '</br>';

	
	
	
	//$newNode = mysqli_query($con,);
	
	foreach($CSVrows as $key){
		$max_id = mysqli_query($con,"SELECT nid FROM node ORDER BY nid DESC LIMIT 1"); 
		$row = mysqli_fetch_array($max_id);
		$new_id = $row['nid'] +1;//the new node #id to use

		//Node Table Vars
		$nid = $new_id;
		$vid = $new_id;
		$type = 'permit';
		$language = 'und';
		$title = $key['4'];
		$uid = 1;
		$status = 1;
		$created = 1397679999;
		$changed = 1397679999;
		$comment = 1;
		$promote = 0;
		$sticky = 0;
		$tnid = 0;
		$translate = 0;
		/*
		//items for the node table
		$type = '"'. $key['0'] .'"';
		$permitName = '"'. $key['3'].'"';
		$formTitle = 
		$pdf = '"'. $key['5'].'"';
		$deptDesc = '"'. $key['7'].'"';
		$bizDesc = '"'. $key['9'].'"';
		$appFee = '"'. $key['10'].'"';
		$licenceFee = '"'. $key['11'].'"';
		$renewFee = '"'. $key['12'].'"';
		$time = '"'. $key['13'].'"';

		//items for the tags table
		$agency = '"'. $key['1'].'"';
		$division = '"'. $key['2'].'"';
		$industry = '"'. $key['14'].'"';
		$busType = '"'. $key['15'].'"';
		$tag = '"'. $key['17'].'"';
		*/
		//$sql="INSERT INTO testTable (foobar,blork) VALUES ($newItem,$newItemTwo)";
		
		//insert into node table
		$nodeSQL = "INSERT INTO node (nid,vid,type,language,title,uid,status,created,changed,comment,promote,sticky,tnid,translate) VALUES ($nid,$vid,'$type','$language','$title',12,1,$created,$changed,1,0,0,0,0)";
		if(!mysqli_query($con,$nodeSQL)){
			die('Error Inserting Into Node Table: '. mysqli_error($con));
		}else{
			echo 'inserted into node table';
			echo '</br>';
		}
		$nodeRevisionSQL = "INSERT INTO node_revision (nid,vid,uid,title,log,timestamp,status,comment,promote,sticky) VALUES ($nid, $vid,12,'$title','',$created,1,1,0,0)";
		if(!mysqli_query($con,$nodeRevisionSQL)){
			die('Error Inserting Into Node Revision Table: '. mysqli_error($con));
		}else{
			echo 'inserted into node revision table';
			echo '</br>';
		}
	}
	
	
}

mysqli_close($con);



/*
echo '<pre>';
print_r($rows);
echo '</pre>';
*/