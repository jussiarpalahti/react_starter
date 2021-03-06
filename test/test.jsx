import { expect } from 'chai';
import Note from '../app/components/Note';
import React from 'react/addons';
const TestUtils = React.addons.TestUtils;
import d3 from 'd3';
import queue from 'queue-async';

//var jsdom = require("jsdom");
//
//var jsdom = require('jsdom')
//
//// setup the simplest document possible
//var doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
//
//// get the window object out of the document
//var win = doc.defaultView
//
//// set globals for mocha that make access to document and window feel
//// natural in the test environment
//global.document = doc
//global.window = win
//
//// take all properties of the window object and also attach it to the
//// mocha global object
//propagateToGlobal(win)
//

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
//function propagateToGlobal (window) {
//    for (let key in window) {
//        if (!window.hasOwnProperty(key)) continue
//        if (key in global) continue
//
//        global[key] = window[key]
//    }
//}

var jsdom = require('mocha-jsdom');

function createComponent(component, props, ...children) {
    const shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(React.createElement(component, props, children.length > 1 ? children : children[0]));
    return shallowRenderer.getRenderOutput();
}

describe('Note component test', function() {
    let note;

    beforeEach(function() {
        note = createComponent(Note, {});
    });

    it('should render a note', function() {
        expect(note.props.children).to.equal('Learn Webpack with Mocha testing and stuff!');
    });

});

describe('React with DOM test', function() {

        jsdom();

        it('should see something', function() {

        var note = TestUtils.renderIntoDocument(
            <Note />
        );

        var elem = TestUtils.findRenderedDOMComponentWithTag(note, 'div');
        expect(elem.getDOMNode().textContent).to.equal('Learn Webpack with Mocha testing and stuff!');
    })
}
);

describe('D3 dispatch test', function () {

    let count = 0;
    let status = true;

    let dispatch = d3.dispatch("start", "end");

    dispatch.on("start", () => {
        if (status) count += 1;
    });

    dispatch.on('end', () => {
        status = false;
    });

    it('should update count when dispatch type is start', function () {
        dispatch.start();
        dispatch.start();
        expect(count).to.equal(2);
    });
    it('should stop updating count when dispatch type is end', function () {
        dispatch.end();
        dispatch.start();
        expect(count).to.equal(2);
    });
});

describe('queue test', function () {
    let test_queue = queue(1);
    let results = [];
    let update = (val) => {
        console.log("processing", val)
        process.nextTick(function() {
            results.push(val);
            console.log("update", results);
            }
        );
    };

    it('should add calls to results', function (done) {
        test_queue.defer(update, 1);
        test_queue.defer(update, 2);
        test_queue.awaitAll(function (error, results) {
            console.log("after await", error, results);
            //expect(results.length).to.equal(1);
            //expect(results[0]).to.equal(1);
            done();
        });
    });

});