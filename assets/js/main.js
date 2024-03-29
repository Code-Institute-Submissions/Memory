let start = true;
let select = false;
let boxToSelect = [];
let maxBoxToSelect = 0;
let currentBoxToSelect = 0;
let highestBox = 1;
let timer = 0;

$(document).ready(function() {
	
	$(".memory-select").on("click", function()
	{
		if (!select)	//Not selectable
			return;
		
		select = false;
		
		//Set all selectable tiles color from blue to grey, so green or red can be set afterward
		SetAllSelectColor("grey");
		
		if ($(this).hasClass("memory-correct"))
		{
			SetColor($(this), "green");
			
			if (currentBoxToSelect < maxBoxToSelect)
			{
				//Show green color for short time, then reset colors for next select
				setTimeout(SetNextSelect, 250);
			}
			else
			{
				//Level complete, update counters and start next level
				maxBoxToSelect++;
				if (highestBox < maxBoxToSelect)
					highestBox = maxBoxToSelect;
				
				$("#counter-current").text(currentBoxToSelect+1);
				$("#counter-highest").text(highestBox);
				timer = 0;	//pause timer
				
				currentBoxToSelect = 0;
				setTimeout(SetAllSelectColor, 250, "grey");
				setTimeout(StartDisplay, 300);
			}
		}
		else
		{
			//Wrong square pressed, set colors and end game
			SetColor($(".memory-correct"), "green");
			SetColor($(this), "red");
			
			start = true;
			SetColor($(".memory-start"), "blue");
		}
	});
	
	$(".memory-start").on("click", function()
	{
		if (!start)	//Not selectable
			return;
		
		//Restart counters and start new level
		SetColor($(this), "grey");
		$(this).text("Restart");
		
		start = false;
		boxToSelect = [];	//empty
		maxBoxToSelect = 1;
		currentBoxToSelect = 0;
		StartDisplay();
		
		$("#counter-current").text(1);
		$("#counter-highest").text(highestBox);
	});
});

function StartDisplay()
{
	if (currentBoxToSelect < maxBoxToSelect)
	{
		if (currentBoxToSelect <= boxToSelect.length)
		{
			//Add new square from list of already-selected squares to the list
			const random = Math.floor(Math.random() * $(".memory-select").length);
			boxToSelect.push(random);
		}
		
		//Display square to select green
		SetAllSelectColor("grey");
		SetColor($(".memory-select").eq(boxToSelect[currentBoxToSelect]), "green");
		
		//Add delay for next square to display
		currentBoxToSelect++;
		setTimeout(SetAllSelectColor, 300, "grey");
		setTimeout(StartDisplay, 400);
	}
	else
	{
		//Done displaying, allow player to select
		currentBoxToSelect = 0;
		SetNextSelect();
		SetTimer(maxBoxToSelect + 5);
	}
};

function SetNextSelect()
{
	//Make all squares selectable, and give class "memory-correct" to correct square
	SetAllSelectColor("blue");
	$(".memory-select").removeClass("memory-correct");
	$(".memory-select").eq(boxToSelect[currentBoxToSelect]).addClass("memory-correct");
	
	select = true;
	currentBoxToSelect++;
}

function SetColor(btn, color)
{
	//Reset all colors and set given color
	btn.removeClass("color-background-red");
	btn.removeClass("color-background-green");
	btn.removeClass("color-background-blue");
	btn.removeClass("color-background-grey");
	
	btn.addClass("color-background-" + color);
}

function SetAllSelectColor(color)
{
	//Reset all square colors and set all square given color
	$(".memory-select").removeClass("color-background-red");
	$(".memory-select").removeClass("color-background-green");
	$(".memory-select").removeClass("color-background-blue");
	$(".memory-select").removeClass("color-background-grey");
	
	$(".memory-select").addClass("color-background-" + color);
}

function SetTimer(newTimer)
{
	//Set given timer and start ticking down
	timer = newTimer;
	DoTimer(timer);
}

function DoTimer(expectedTimer)
{
	if (timer != expectedTimer || !select)	//Check if level ended, if so stop continue counting down
		return;
	
	//Display timer left
	const mins = Math.floor(timer / 60);
	const seconds = timer % 60;
	
	if (seconds >= 10)
		$("#counter-timer").text(mins + ":" + seconds);
	else
		$("#counter-timer").text(mins + ":0" + seconds);
	
	if (timer > 0)
	{
		//Tick timer down, wait 1 second to tick again
		timer--;
		setTimeout(DoTimer, 1000, timer);
	}
	else
	{
		//Reached 0, end the game
		select = false;
		SetAllSelectColor("grey");
		SetColor($(".memory-correct"), "green");
		
		start = true;
		SetColor($(".memory-start"), "blue");
	}
}