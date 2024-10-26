module.exports = {
    moduleNameMapper: {
        "^app/(.*)$": "<rootDir>/src/app/$1",
        "^database/(.*)$": "<rootDir>/src/database/$1"
      },
      transform: {
        "^.+\\.jsx?$": "babel-jest"
      },
    setupFiles: ['./jest.modules.js'],
}