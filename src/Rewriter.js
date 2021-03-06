// Rewriter

function Rewriter()
{

}

new Rewriter();

Rewriter.prototype.FullSubstitution = function(phrase, grammar)
{
	var parser = new Parser();
	var text = this.Substitute(phrase, grammar);
	
	while (parser.HasNonTerminals(text))
	{
		text = this.Substitute(text, grammar)
	}
	
	return text;
}

Rewriter.prototype.Substitute = function(phrase, grammar)
{
	var text = "";
	var tokens = new Parser().Tokenize(phrase);
	
	for (var i = 0; i < tokens.length; i++)
		text += tokens[i].Substitute(grammar);
	
	return text;
}

