let start = true;

$(document).ready(function() {
	
	$(".memory-start").on("click", function()
	{
		if (!start)	//Not selectable
			return;
		
		//Restart counters and start new level
		SetColor($(this), "grey");
		
		start = false;
		StartDisplay();
	});
});

function StartDisplay()
{
	const random = Math.floor(Math.random() * $(".memory-select").length);
	SetColor($(".memory-select").eq(random), "green");
};

function SetColor(btn, color)
{
	//Reset all colors and set given color
	btn.removeClass("color-background-red");
	btn.removeClass("color-background-green");
	btn.removeClass("color-background-blue");
	btn.removeClass("color-background-grey");
	
	btn.addClass("color-background-" + color);
}