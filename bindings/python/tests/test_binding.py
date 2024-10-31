from unittest import TestCase

import tree_sitter, tree_sitter_cgsql


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_cgsql.language())
        except Exception:
            self.fail("Error loading Cgsql grammar")
