import math
import re
from collections import Counter


SENTENCE_LIMITS = {
    "short": 1,
    "medium": 3,
    "long": 5,
    "detailed":7,
}

WORD_PATTERN = re.compile(r"[^\W_]+(?:['’-][^\W_]+)*", re.UNICODE)
SENTENCE_PATTERN = re.compile(r"(?<=[.!?。！？])\s+|\n+")
STOP_WORDS = {
    "a", "an", "and", "are", "as", "at", "be", "been", "but", "by",
    "for", "from", "had", "has", "have", "he", "her", "hers", "him",
    "his", "i", "if", "in", "into", "is", "it", "its", "me", "my",
    "of", "on", "or", "our", "ours", "she", "so", "than", "that",
    "the", "their", "theirs", "them", "then", "there", "these", "they",
    "this", "those", "to", "us", "was", "we", "were", "what", "when",
    "where", "which", "who", "will", "with", "you", "your", "yours",
}


def _tokens(sentence: str) -> list[str]:
    return [
        word.casefold()
        for word in WORD_PATTERN.findall(sentence)
        if word.casefold() not in STOP_WORDS
    ]


def _score_sentence(
    sentence: str,
    index: int,
    word_frequencies: Counter[str],
) -> float:
    tokens = _tokens(sentence)
    if not tokens:
        return 0.0

    relevance = sum(
        math.log1p(word_frequencies[word])
        for word in set(tokens)
    )
    length_normalizer = math.sqrt(len(tokens))
    position_bonus = 1 + 0.12 / (index + 1)
    return relevance / length_normalizer * position_bonus


def summarize_text(text: str, length: str = "medium") -> str:
    sentence_limit = SENTENCE_LIMITS[length]
    sentences = [
        sentence.strip()
        for sentence in SENTENCE_PATTERN.split(text.strip())
        if sentence.strip()
    ]
    if not sentences:
        return ""

    word_frequencies = Counter(
        word
        for sentence in sentences
        for word in _tokens(sentence)
    )
    ranked_sentences = sorted(
        enumerate(sentences),
        key=lambda item: (
            _score_sentence(item[1], item[0], word_frequencies),
            -item[0],
        ),
        reverse=True,
    )
    selected_indices = {
        index
        for index, _ in ranked_sentences[:sentence_limit]
    }

    return " ".join(
        sentence
        for index, sentence in enumerate(sentences)
        if index in selected_indices
    )
