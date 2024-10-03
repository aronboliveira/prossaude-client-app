module.exports = {
  testPathIgnorePatterns: ["<rootDir>/node_modules", "<rootDir>/dist"],
  moduleNameMapper: {
    "@components(.*)": "<rootDir>/src/components$1",
  },
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/src/jest-setup.ts"],
};
