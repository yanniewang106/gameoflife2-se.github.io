function RandomInit()
{
	for(var i = 0 ; i <= initradius * 2 ; i++)
					for(var j = 0 ; j <= initradius * 2 ; j++)
						initpos[i][j] = false
				for(var i = 0 ; i < initnumber ; i++)
				{
					var success = false
					while(!success)
					{
						var temp
						temp = parseInt(Math.random() * (2 * initradius + 1) * (2 * initradius + 1))
						//alert(temp)
						//debugger
						if(initpos[parseInt(temp / (2 * initradius + 1))][temp % (2 * initradius + 1)] == false)
						{
							initpos[parseInt(temp / (2 * initradius + 1))][temp % (2 * initradius + 1)] = true
							success = true
						}
					}
				}
				for(var i = 0 ; i <= initradius * 2 ; i++)
					for(var j = 0 ; j <= initradius * 2 ; j++)
					{
						cell[0][i + midx - initradius][j + midy - initradius] = initpos[i][j]
						cell[1][i + midx - initradius][j + midy - initradius] = initpos[i][j] ^ 1
					}
			}

var midx = 50
			var midy = 50
			var LogicBorderx = 99
			var LogicBordery = 99
			var width = 10
			var height = 10
			var initnumber = 20
			var initradius = 3
			var gamestatus = 0
			var loop = -1
			var time = 0
			
			cell = new Array(2);
			cell[0] = new Array(LogicBorderx + 2)
			cell[1] = new Array(LogicBorderx + 2)
			for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
			{
				cell[0][i] = new Array(LogicBordery + 2)
				cell[1][i] = new Array(LogicBordery + 2)
			}
			var initpos = new Array(initradius * 2 + 1)
			for(var i = 0 ; i <= initradius * 2 ; i++)
				initpos[i] = new Array(initradius * 2 + 1)
			
			for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
				for(var j = 0 ; j <= LogicBordery + 1 ; j++)
				{
						cell[0][i][j] = false
						cell[1][i][j] = true
				}

			block = new Array(2);
			block[0] = new Array(LogicBorderx + 2)
			block[1] = new Array(LogicBorderx + 2)
			for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
			{
				block[0][i] = new Array(LogicBordery + 2)
				block[1][i] = new Array(LogicBordery + 2)
			}
			var initpos = new Array(initradius * 2 + 1)
			for(var i = 0 ; i <= initradius * 2 ; i++)
				initpos[i] = new Array(initradius * 2 + 1)
			
			for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
				for(var j = 0 ; j <= LogicBordery + 1 ; j++)
				{
						block[0][i][j] = false
						block[1][i][j] = true
				}

				function restart()
			{
				for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
					for(var j = 0 ; j <= LogicBordery + 1 ; j++)
					{
						cell[0][i][j] = false
						cell[1][i][j] = true
					}
				time = 0
				drawCells(15)
				gamestatus = 0
				if(loop != -1)
				{
					clearInterval(loop)
					loop = -1
				}
			}
			function check()
			{
				for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
					for(var j = 0 ; j <= LogicBordery + 1 ; j++)
						if(cell[0][i][j] == 1)
							return true
				return false
			}
			function start()
			{
				if(gamestatus != 0)
					return;
				if(check())
				{
					loop = setInterval("refresh()", 600)
					for(var i = 0 ; i <= LogicBorderx + 1 ; i++)
						for(var j = 0 ; j <= LogicBordery + 1 ; j++)
							cell[1][i][j] = false
					gamestatus = 1
				}
			}
			function addBlock()
			{
				drawBlock(15);
			}
			function CellsRandom()
			{
				if(gamestatus != 0)
					return
				//debugger;
				RandomInit()
				drawCells(15)
			}
			function Pause()
			{
				if(gamestatus == 0) return;
				if(gamestatus == 1)
				{
					gamestatus = 2
					clearInterval(loop)
					loop = -1
				}
				else
				{
					gamestatus = 1
					loop = setInterval("refresh()" , 600)
				}
			}
			function setCells(event)
			{
				if(gamestatus != 0) return
				e = window.event || event
				
				canvas = document.getElementById("myCanvas")
				var bbox =canvas.getBoundingClientRect()
				
				
				
				x = e.clientX - bbox.left
				y = e.clientY - bbox.top
				
				//debugger
				if(x <= 9 || x >=629) return
				if(y <= 30 || y >= 650) return
				
				x = parseInt((x - 9) / 20)
				y = parseInt((y - 30) / 20)
				
				cxt = canvas.getContext("2d")
				cell[1][x - 15 + midx][y - 15 + midy] = cell[0][x - 15 + midx][y - 15 + midy]
				cell[0][x - 15 + midx][y - 15 + midy] ^= 1
				
				if(cell[0][x - 15 + midx][y - 15 + midy] == true)
				{
					cxt.fillStyle = "#000000"
					cxt.beginPath()
					cxt.arc(9 + x * 20 + 10 , 30 + y * 20 + 10 , 6 , 0 , 2 * Math.PI , true)
					cxt.fill()
				}
				else
				{
					cxt.fillStyle = "#FFFFFF"
					cxt.beginPath()
					cxt.arc(9 + x * 20 + 10 , 30 + y * 20 + 10 , 7 , 0 , 2 * Math.PI , true)
					cxt.fill()
				}
			}

			ipt type = "text/javascript">
			function drawCells(border)
			{
				var c = document.getElementById("myCanvas");
				var cxt = c.getContext("2d");
				for(var i = midx - border ; i <= midx + border ; i++)
					for(var j = midy - border ; j <= midy + border ; j++)
					{
						nowx = i - midx + border
						nowy = j - midy + border
						
						if(cell[time & 1][i][j] != cell[time & 1 ^ 1][i][j])
						{
							if(cell[time & 1][i][j] == true)
							{
								cxt.fillStyle = "#000000"
								cxt.beginPath()
								cxt.arc(9 + nowx * 20 + 10 , 30 + nowy * 20 + 10 , 6 , 0 , 2 * Math.PI , true)
								cxt.fill()
							}
							else
							{
								cxt.fillStyle = "#FFFFFF"
								cxt.beginPath()
								cxt.arc(9 + nowx * 20 + 10 , 30 + nowy * 20 + 10 , 7 , 0 , 2 * Math.PI , true)
								cxt.fill()
							}
						}
					}
			}
			function drawBlock(border)
			{
				var c = document.getElementById("myCanvas");
				var cxt = c.getContext("2d");
				for(var i = midx - border ; i <= midx + border ; i++)
					for(var j = midy - border ; j <= midy + border ; j++)
					{
						nowx = i - midx + border
						nowy = j - midy + border
						
						if(block[time & 1][i][j] != block[time & 1 ^ 1][i][j])
						{
							if(cell[time & 1][i][j] == true)
							{
								cxt.fillStyle = "#FF0000"
								cxt.beginPath()
								cxt.arc(9 + nowx * 20 + 10 , 30 + nowy * 20 + 10 , 6 , 0 , 2 * Math.PI , true)
								cxt.fill()
							}
							else
							{
								cxt.fillStyle = "#FFFFFF"
								cxt.beginPath()
								cxt.arc(9 + nowx * 20 + 10 , 30 + nowy * 20 + 10 , 7 , 0 , 2 * Math.PI , true)
								cxt.fill()
							}
						}
					}
			}
			function refresh()
			{
				drawCells(15)
				GetCell();
				time ++;
			}

			function GetCell()
			{
				for(var i = 1 ; i <= LogicBorderx ; i++)
					for(var j = 1 ; j <= LogicBordery ; j++)
					{
						var number = 0
						number += cell[time & 1][i - 1][j - 1]
						number += cell[time & 1][i][j - 1]
						number += cell[time & 1][i + 1][j - 1]
						number += cell[time & 1][i - 1][j + 1]
						number += cell[time & 1][i][j + 1]
						number += cell[time & 1][i + 1][j + 1]
						number += cell[time & 1][i - 1][j]
						number += cell[time & 1][i + 1][j]
						
						if (block == false)
						{
							if(number == 3)
								cell[time & 1 ^ 1][i][j] = true
							else if(number == 2)
								cell[time & 1 ^ 1][i][j] = cell[time & 1][i][j]
							else cell[time & 1 ^ 1][i][j] = false
						}
						else
							cell[time & 1 ^ 1][i][j] = false
					}
			}