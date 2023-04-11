module.exports = {
  name: "seulgi",
  preset: "ts-jest",
  automock: false,
  collectCoverage: true,
  reporters: ["default", "jest-junit"],
  testPathIgnorePatterns: ["dist/.*"],
}
