function Parser()
{
}

new Parser("");

Parser.prototype.Evaluate = function(phrase)
{
	return this.Tokenize(phrase);	
}

Parser.prototype.Tokenize = function(phrase)
{
	var validator = new PhraseValidator();
	validator.CheckForClosedTags(phrase);
	validator.CheckForEmptyTags(phrase);
	return this.GetTokens(phrase);
}

Parser.prototype.GetTokens = function(phrase)
{
	var tokensText = this.ExtractTokenStrings(phrase);
	return this.StringsToTokens(tokensText);
}

Parser.prototype.ExtractTokenStrings = function(phrase)
{
	var index = 0;
	var slices = new Array();
	var text = "";
	
	for (var i = 0; i < phrase.length; i++)
	{
		text = this.CharTreatment(phrase[i], slices, text);
	}
	
	slices.push(text);
	
	return this.CleanSlices(slices);
}

Parser.prototype.CharTreatment = function(character, slices, text)
{
	if (character == "<")
	{
		slices.push(text);
		return "<";
	}
	else if (character == ">")
	{
		slices.push(text + ">");
		return "";
	}
	
	return text + character;
}

Parser.prototype.StringsToTokens = function(tokensText)
{
	var tokens = new Array();
	
	for (var i = 0; i < tokensText.length; i++)
	{
		if (tokensText[i][0] == "<")
			tokens.push(new NonTerminal(tokensText[i].substring(1, tokensText[i].length - 1)));
		else
			tokens.push(new Terminal(tokensText[i]));
	}
	
	return tokens;
}

Parser.prototype.CleanSlices = function(slices)
{
	var cleanSlices = new Array();
	
	for (var i = 0; i < slices.length; i++)
	{
		if (slices[i])
			cleanSlices.push(slices[i]);	
	}
	
	return cleanSlices;
}

Parser.prototype.HasNonTerminals = function(phrase)
{
	var tokens = this.Tokenize(phrase);

	for (var i = 0; i < tokens.length; i++)
	{
		if (tokens[i].Is(NonTerminal))
			return true;
	}
	
	return false;
}