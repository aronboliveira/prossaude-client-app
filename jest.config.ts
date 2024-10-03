module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/dist"],
  moduleNameMapper: {
    "@components(.*)": "/src/components$1",
  },
  moduleDirectories: ["/node_modules", "<rootDir>/src"],
  setupFilesAfterEnv: ["../../setupTests.ts"],
};
