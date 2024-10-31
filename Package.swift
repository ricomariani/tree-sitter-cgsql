// swift-tools-version:5.3
import PackageDescription

let package = Package(
    name: "TreeSitterCgsql",
    products: [
        .library(name: "TreeSitterCgsql", targets: ["TreeSitterCgsql"]),
    ],
    dependencies: [
        .package(url: "https://github.com/ChimeHQ/SwiftTreeSitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterCgsql",
            dependencies: [],
            path: ".",
            sources: [
                "src/parser.c",
                // NOTE: if your language has an external scanner, add it here.
            ],
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterCgsqlTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterCgsql",
            ],
            path: "bindings/swift/TreeSitterCgsqlTests"
        )
    ],
    cLanguageStandard: .c11
)
