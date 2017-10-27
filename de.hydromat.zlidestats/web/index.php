<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>  
        <title>Zli De Royale Stat Tracker</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, width=device-width" />

        <script language="javascript" type="application/javascript" src="script.js"></script>
        <script language="javascript" type="application/javascript" src="mainmenu.js"></script>
        <script language="javascript" type="application/javascript" src="button.js"></script>
        <script language="javascript" type="application/javascript" src="graph.js"></script>
        <script language="javascript" type="application/javascript" src="timer.js"></script>
        <script language="javascript" type="application/javascript" src="iconDrawing.js"></script>
        <script language="javascript" type="application/javascript" src="stats.js"></script>
        
        <script type="text/javascript">
            var memberCount = [];
            for(var i=0; i<3; i++) {
            	memberCount[i] = [];
            }

<?php
    class MyDB extends SQLite3 {
        function __construct() {
            $this->open('../stats.db');
        }
    }
    $db = new MyDB();
    if(!$db) {
        echo $db->lastErrorMsg();
    } else {
        //echo "Opened database successfully\n";
    }
    
    $sql ='SELECT * from Clan WHERE Tag="2R92CURQ"';
    
    $arrayCount = 0;
    $ret = $db->query($sql);
    while($row = $ret->fetchArray(SQLITE3_ASSOC) ) {
        echo "memberCount[2][" . $arrayCount . "] = new DataPoint();\n";
        echo "memberCount[2][" . $arrayCount . "].init(". $row['Date'] . ", ". $row['MemberCount'] . ", 'Member');\n";
        
        $arrayCount++;
    }
    
    //echo "Operation done successfully\n";
    $db->close();
?>
            
        </script>

        <style type="text/css">  
            html, body {  
                width: 100%;  
                height: 100%;  
                padding: 0px;  
                margin: 0px;  
            }  
            #canvas {  
                padding: 0px;  
                margin: 0px;  
                top:0;  
                left:0;  
                z-index: 30;  
                position: absolute;  
                width: 100%;  
                height: 100%;
                background-color: rgb(29, 31, 32);
            }
         </style>  
    </head>  

    <body>
    	<div style="display: none;">  
            <img id="background" src="img/background.jpg">
        </div>  
        <canvas id="canvas" oncontextmenu="return false;">
            Um diese Seite korrekt sehen zu können wird ein halbwegs aktueller Browser benötigt. Du hast so etwas leider nicht.
        </canvas>
    </body>
</html> 