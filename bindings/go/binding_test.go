package tree_sitter_cgsql_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_cgsql "github.com/ricomariani/cg-sql-author/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_cgsql.Language())
	if language == nil {
		t.Errorf("Error loading Cgsql grammar")
	}
}
