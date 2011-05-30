<html>
	<head>
		<?php
		$kategoria = $_GET['kat'];
		echo $kategoria;
		$connection = @mysql_connect('localhost', 'root', '') 
		or die('Brak po³¹czenia z serwerem MySQL.<br />B³¹d: '.mysql_error());
		echo ' udalo sie polaczyc';	
	
		$db = @mysql_select_db('si', $connection); 	
		$query= " SELECT * from fun_przynaleznosci where kategoria like '". $kategoria."'	";
		$result=mysql_query($query);
		$num=mysql_numrows($result);
		$i=0;

	?>
<script type="text/javascript"> 
	console.log("towrzenie tab");
	var tab=[	
			<?php        
							while ($i < $num) 
							{
									
									$x1=mysql_result($result,$i,"x1");
									$x2=mysql_result($result,$i,"x2");
									$x3=mysql_result($result,$i,"x3");
									$x4=mysql_result($result,$i,"x4");
									$tab[$i][0][0]=$x1;
									$tab[$i][0][1]=0;
									$tab[$i][1][0]=$x2;
									$tab[$i][1][1]=1;
									$tab[$i][2][0]=$x3;
									$tab[$i][2][1]=1;
									$tab[$i][3][0]=$x4;
									$tab[$i][3][1]=0;
									echo '[['.$x1.', 0 ] , [ '. $x2 . ', 1] , [ ' . $x3 . ' , 1 ], ['. $x4 . ' ,0 ]]';
									if($i< ($num-1))
											{
												echo ',';			
											}
									$i++;
							}
				echo '];';
				$i=0;
			?>
	var nazwy=[
			<?php
						while ($i < $num) 
							{
								$nazwa[$i]=mysql_result($result,$i,"nazwa");
								echo "'".$nazwa[$i] . "'";
									
									if($i< ($num-1))
									{
										echo ',';			
									}
									
							$i++;
							}
				echo '];';
				mysql_close($connection);	
			?>
			
		console.log("koniec tworzenia tab");
		console.log(tab);
		console.log(nazwy);
</script>
	 	<link href="css/gaussian.css" rel="stylesheet" type="text/css">
		 <script language="javascript" src="./js/js.js"></script>
		<script language="javascript" src="./js/slider.js"></script>
		<script language="javascript" src="./js/gaussian.js"></script>
<script type="text/javascript"> 
	 console.log("konstruktor");
	 
            function makeSlider(name,lo,hi,def,val  ) {   	
                var theSlider = new Slider(name);
                theSlider.imgPath = "./img/";
                theSlider.buttonHoverImg = "sliderhoverbutton.gif"
                theSlider.onchange = val+"=this.getValue(2); update();";
                theSlider.leftValue = lo;
                theSlider.rightValue = hi;
                theSlider.defaultValue = def;
                theSlider.buttonHeight = 19;
                theSlider.buttonWidth = 19;
                theSlider.offsetX = 19;
                theSlider.offsetY = 0;
                theSlider.maxSlide = 578-17-18-19;
               
                return theSlider;
            }
            
      console.log("tworzenie sliderow");
            <?php
            		$min= 0 ; 
            		$max=200;
            		$i=0;
            		$j=0;
            		while($i< $num)
            			{
	            			while($j< 4)
	            			{
	            		
	            			echo $nazwa[$i].'sliderX' .($j+1).'=makeSlider("'.$nazwa[$i].'sliderX' .($j+1).'",'.$min .','.$max.','.$tab[$i][$j][0].','.'"document.valform.'.$nazwa[$i].'X'.($j+1) .'.value");'."\n" ;
	            			$j++;
	            			
	            			}
	            			$j=0;
	            		$i++;
            			}
  
         	?>
console.log("koniec tworzenia sliderow");
         
</script> 
</head>


<body onload="load() ; 
		<?php $i=0;
				$j=0;
				while($i<$num)
				{ 
					while($j< 4)
					{
						echo $nazwa[$i].'sliderX'.($j+1).".placeSlider('".$nazwa[$i].'X'.($j+1).'RailImg'."');";
						echo "\n"; 
						$j++;
					}
				$j=0;
				$i++; 
				}
		?>

" background="#FF00FF">

 <script type="text/javascript">console.log("koniec umieszczenie sliderow");</script> 
  
<center><br><br>
fynkcje przynaleznosci
 		
 		<div><canvas id="graph" width="800" height="300"></canvas></div> 
 		 <div id="xlabel" class="axis"></div> 
 		 <div id="ylabel" class="axis"></div> 
 		<br><br>
 		<br>
		<form name="valform"> 
	
				<?php 
					$i=0;
					$j=0;
        			while($i<$num)
					{ 
		 		?>
		 			
					 <script type="text/javascript">console.log("tworzenie inputow");</script> 
					x1: <input name="<? echo $nazwa[$i]; ?>X1" value="<?php echo $tab[$i][0][0]; ?>"/> 
			        x2: <input name="<? echo $nazwa[$i]; ?>X2" value="<?php echo $tab[$i][1][0]; ?>"/>  
			        x3: <input name="<? echo $nazwa[$i]; ?>X3" value="<?php echo $tab[$i][2][0]; ?>"/>  
			        x4: <input name="<? echo $nazwa[$i]; ?>X4" value="<?php echo $tab[$i][3][0]; ?>"/>  
			        
			        <input type="button" name="potwierdz<?php echo ($i+1); ?>" value="update" onclick="update(<?php echo ($i+1); ?>)"/> 
					<br>
					<div class="lbl">x1</div> <img class="slider" src="img/scale.gif" name="<?php echo $nazwa[$i]; ?>X1RailImg" id="<?php echo $nazwa[$i]; ?>X1RailImg" alt="Amplitude" /><br/> 
			 	 	<div class="lbl">x2</div> <img class="slider" src="img/scale.gif" name="<?php echo $nazwa[$i]; ?>X2RailImg" id="<?php echo $nazwa[$i]; ?>X2RailImg" alt="Standard Deviation" /><br/> 
			        <div class="lbl">x3</div> <img class="slider" src="img/scale.gif" name="<?php echo $nazwa[$i]; ?>X3RailImg" id="<?php echo $nazwa[$i]; ?>X3RailImg" alt="Mean" /><br/> 
			  		<div class="lbl">x4</div> <img class="slider" src="img/scale.gif" name="<?php echo $nazwa[$i]; ?>X4RailImg" id="<?php echo $nazwa[$i]; ?>X4RailImg" alt="Standard Deviation" /><br/> 
					<br>
				<?php
					$i++;
					
					}
				?>

       </form>
        <script type="text/javascript">console.log("ostatni lider");</script> 
  		<script language="javascript">
  		console.log("wpisywanie sliredow lider");
  	
  		<?php 
  				$i=0;
  				$j=0;
  				while($i<$num)
  				{ 
  						while($j< 4)
  						{
  							echo $nazwa[$i].'sliderX'.($j+1).'.writeSlider();'."\n"; 
  							$j++;
  						}
  					$j=0;
  					$i++; 
  					}	
   		?>
   		
   		
  		</script>
 </center>
<form action="strona.php" method="post">


<input type="button" name="js" value="0" onclick="zapisz()">
</noscript>
</form>

</body>

</html>
