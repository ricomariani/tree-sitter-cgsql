import XCTest
import SwiftTreeSitter
import TreeSitterCgsql

final class TreeSitterCgsqlTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_cgsql())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Cgsql grammar")
    }
}
