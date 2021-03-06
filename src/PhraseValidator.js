function PhraseValidator()
{
}

new PhraseValidator("");

PhraseValidator.prototype.CheckForClosedTags = function(phrase)
{
	var open = false;
	
	for (var i = 0; i < phrase.length; i++)
	{
		open = this.CheckForChar("<", phrase[i], open, true, "Nesting for delimiters is not allowed.");
		open = this.CheckForChar(">", phrase[i], open, false, "Open delimiter not found.");
	}
	
	if (open)
		throw "Close delimiter not found";
}

PhraseValidator.prototype.CheckForChar = function(modelChar, actualChar, openStatus, openStatusForError, errorText)
{
	if (actualChar == modelChar)
	{
		if (openStatus == openStatusForError)
			throw errorText;
		else
			return !openStatus;
	}
	else
		return openStatus;
}

PhraseValidator.prototype.CheckForEmptyTags = function(phrase)
{
	if (phrase.indexOf("<>") > -1)
		throw "Empty non-terminals not allowed.";
}