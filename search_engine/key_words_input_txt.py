from rake_nltk import Metric, Rake


def search_key_words_Text_input(text):
    words = Rake(max_length=1)
    words.extract_keywords_from_text(text)
    list_words = words.get_ranked_phrases_with_scores()
    return list_words[:5]