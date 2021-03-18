let start = true;
let boxToSelect = [];
let maxBoxToSelect = 0;
let currentBoxToSelect = 0;

$(document).ready(function() {
	
	$(".memory-start").on("click", function()
	{
		if (!start)	//Not selectable
			return;
		
		//Restart counters and start new level
		SetColor($(this), "grey");
		
		start = false;
		boxToSelect = [];	//empty
		maxBoxToSelect = 1;
		currentBoxToSelect = 0;
		StartDisplay();
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
	}
};

function SetNextSelect()
{
	//Make all squares selectable, and give class "memory-correct" to correct square
	SetAllSelectColor("blue");
	$(".memory-select").removeClass("memory-correct");
	$(".memory-select").eq(boxToSelect[currentBoxToSelect]).addClass("memory-correct");
	
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