import tokenSimulationViewerModule from '../lib/viewer';

import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

import exampleXML from './resources/example.bpmn';

var viewer = new BpmnViewer({
  container: '#canvas',
  additionalModules: [
    tokenSimulationViewerModule
  ],
  keyboard: {
    bindTo: document
  }
});

viewer.importXML(exampleXML, function(err) {
  if (!err) {
    viewer.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});