module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
