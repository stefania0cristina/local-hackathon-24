from nltk.parse.generate import generate
from nltk import CFG


# Input is the result from get_keywords() function
def generate_sentence(keywords, maxWordsPerSentence = 5):

    spec = """
    S -> NP VP | VP
    NP -> PROPN | DT NN | DT JJ NN | PRP | NP PP | NP
    VP -> VBD NP | VB NP | VBD ADVP | VB ADVP | VP PP | VP CONJ VP
    PP -> IN NP
    ADVP -> RB | ADVP RB
    DT -> 'the' | 'a' | 'an' | 'this' | 'that' | 'these' | 'those' | 'my' | 'your'
    JJ -> 'big' | 'small' | 'green' | 'red' | 'beautiful' | 'old' | 'young'
    RB -> 'quickly' | 'happily' | 'very'
    PRP -> 'I' | 'you' | 'he' | 'she' | 'it' | 'we' | 'they'
    VBD -> 'chased' | 'saw' | 'read' | 'walked'
    VB -> 'chase' | 'see' | 'read' | 'walk'
    IN -> 'in' | 'on' | 'at' | 'by' | 'with'
    CONJ -> 'and' | 'or' | 'but'
    """

    keywordList = []

    for key, data in keywords[0].items():
        keywordList.append(key)

        spec += data[1] + " -> '" + key + "'"
        spec += """
        """

    for key, data in keywords[1].items():
        keywordList.append(key)

        spec += "PROPN -> '" + key + "'"
        spec += """
        """

    grammar = CFG.fromstring(spec)

    generated_sentences = generate(grammar, n = maxWordsPerSentence)

    for sentence in generated_sentences:
        return " ".join(sentence)
    
    return "" 