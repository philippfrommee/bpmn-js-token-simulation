import tokenSimulationModelerModule from '../lib/modeler';

import BpmnModeler from 'bpmn-js/lib/Modeler';

import exampleXML from './resources/example.bpmn';

var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    tokenSimulationModelerModule
  ],
  keyboard: {
    bindTo: document
  }
});

modeler.importXML(exampleXML, function(err) {
  if (!err) {
    modeler.get('canvas').zoom('fit-viewport');
  } else {
    console.log('something went wrong:', err);
  }
});