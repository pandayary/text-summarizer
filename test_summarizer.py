import unittest

from pydantic import ValidationError

from schemas.summary_schemas import SummaryRequest
from services.summarizer import summarize_text


SAMPLE_TEXT = (
    "On Tuesday, the library opened a new exhibit. "
    "The exhibit features ancient maps from across Asia. "
    "Visitors can see rare maps from the Silk Road. "
    "The collection includes maps from Persia and India. "
    "Students can view the map collection for free. "
    "The exhibit closes at the end of the month."
)


class SummarizerTests(unittest.TestCase):
    def test_short_summary_selects_a_key_sentence_not_just_the_opening(self):
        summary = summarize_text(SAMPLE_TEXT, "short")

        self.assertEqual(summary, "The exhibit features ancient maps from across Asia.")
        self.assertNotIn("On Tuesday", summary)

    def test_summary_lengths_limit_the_number_of_sentences(self):
        short_summary = summarize_text(SAMPLE_TEXT, "short")
        medium_summary = summarize_text(SAMPLE_TEXT, "medium")
        long_summary = summarize_text(SAMPLE_TEXT, "long")

        self.assertEqual(len(short_summary.split(". ")), 1)
        self.assertLessEqual(len(medium_summary.split(". ")), 3)
        self.assertLessEqual(len(long_summary.split(". ")), 5)

    def test_selected_sentences_remain_in_their_original_order(self):
        summary = summarize_text(SAMPLE_TEXT, "medium")

        self.assertEqual(
            summary,
            "The exhibit features ancient maps from across Asia. "
            "Visitors can see rare maps from the Silk Road. "
            "The collection includes maps from Persia and India.",
        )

    def test_empty_text_returns_an_empty_summary(self):
        self.assertEqual(summarize_text(" \n ", "medium"), "")

    def test_detailed_length_is_not_a_supported_option(self):
        with self.assertRaises(ValidationError):
            SummaryRequest(text=SAMPLE_TEXT, length="detailed")


if __name__ == "__main__":
    unittest.main()
