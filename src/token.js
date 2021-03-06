// Token

function Token(text)
{
	this.Text = text;
}

new Token("");

Token.prototype.Is = function(tokenType)
{
	return tokenType.prototype.isPrototypeOf(this);
}

Token.prototype.Substitute = function(grammar)
{
	throw "Substitute must be implemented in subclasses.";	
}

// Terminal

Inherit(Terminal, Token);

function Terminal(text)
{
	Token.call(this, text);
}

Terminal.prototype.Substitute = function(grammar)
{
	return this.Text;
}

// NonTerminal

Inherit(NonTerminal, Token);

function NonTerminal(text)
{
	Token.call(this, text);
}

NonTerminal.prototype.Substitute = function(grammar)
{
	var tokenSubstitution = this.GetRandomSubstitution(grammar);
	new TokensChecker().CheckForRecursivity(new Parser().Tokenize(tokenSubstitution), this);
	return tokenSubstitution;
}

NonTerminal.prototype.GetRandomSubstitution = function(grammar)
{
	var index = Math.floor(Math.random() * grammar[this.Text].length);
	return grammar[this.Text][index];	
}

// TokensChecker

function TokensChecker()
{
}

new TokensChecker();

TokensChecker.prototype.TokensHasNonTerminal = function(tokens, nonTerminal)
{
	for (var i = 0; i < tokens.length; i++)
	{
		if (tokens[i].Is(NonTerminal) && (tokens[i].Text == nonTerminal.Text))
			return true;	
	}
	
	return false;
}

TokensChecker.prototype.CheckForRecursivity = function(tokens, token)
{
	if (token.Is(NonTerminal))
	{
		if (this.TokensHasNonTerminal(tokens, token))
			throw "Recursivity is not allowed in the grammar.";
	}
}