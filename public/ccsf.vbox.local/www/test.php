<?php


function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

$time_start = microtime_float();





// Connecting, selecting database
$link = mysql_connect('localhost', 'root', 'root')
    or die('Could not connect: ' . mysql_error());
echo 'Connected successfully';
mysql_select_db('ccsf_preview') or die('Could not select database');

// Performing SQL query
$query = 'SELECT * FROM node';
$result = mysql_query($query) or die('Query failed: ' . mysql_error());

// Printing results in HTML
echo "<table>\n";
while ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {
    echo "\t<tr>\n";
    foreach ($line as $col_value) {
        echo "\t\t<td>$col_value</td>\n";
    }
    echo "\t</tr>\n";
}
echo "</table>\n";

// Free resultset
mysql_free_result($result);

// Closing connection
mysql_close($link);


$time_end = microtime_float();
$time = $time_end - $time_start;

echo "Did my query and displayed it in $time seconds\n";

?>