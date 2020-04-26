const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');
const WordReplay = require('./WordReplay');

const Hot = hot(WordReplay);
ReactDom.render(<Hot />, document.querySelector('#root'));