import animation from './animation/Animation';
import contextPads from './features/context-pads';
import disableModeling from './features/disable-modeling';
import elementNotifications from './features/element-notifications';
import elementSupport from './features/element-support';
import exclusiveGatewaySettings from './features/exclusive-gateway-settings';
import log from './features/log';
import notifications from './features/notifications';
import pauseSimulation from './features/pause-simulation';
import preserveElementColors from './features/preserve-element-colors';
import processInstanceIds from './features/process-instance-ids';
import processInstanceSettings from './features/process-instance-settings';
import processInstances from './features/process-instances';
import resetSimulation from './features/reset-simulation';
import setAnimationSpeed from './features/set-animation-speed';
import showProcessInstance from './features/show-process-instance';
import simulationState from './features/simulation-state';
import toggleMode from './features/toggle-mode/modeler';
import tokenCount from './features/token-count';
import tokenSimulationBehavior from './features/token-simulation-behavior';
import tokenSimulationEditorActions from './features/editor-actions';
import tokenSimulationKeyboardBindings from './features/keyboard-bindings';
import tokenSimulationPalette from './features/palette';


export default {
  __init__: [
    'animation',
    'contextPads',
    'disableModeling',
    'elementNotifications',
    'elementSupport',
    'exclusiveGatewaySettings',
    'log',
    'notifications',
    'pauseSimulation',
    'preserveElementColors',
    'processInstanceIds',
    'processInstanceSettings',
    'processInstances',
    'resetSimulation',
    'setAnimationSpeed',
    'showProcessInstance',
    'simulationState',
    'toggleMode',
    'tokenCount',
    'tokenSimulationBehavior',
    'tokenSimulationEditorActions',
    'tokenSimulationKeyboardBindings',
    'tokenSimulationPalette'
  ],
  'animation': [ 'type', animation ],
  'contextPads': [ 'type', contextPads ],
  'disableModeling': [ 'type', disableModeling ],
  'elementNotifications': [ 'type', elementNotifications ],
  'elementSupport': [ 'type', elementSupport ],
  'exclusiveGatewaySettings': [ 'type', exclusiveGatewaySettings ],
  'log': [ 'type', log ],
  'notifications': [ 'type', notifications ],
  'pauseSimulation': [ 'type', pauseSimulation ],
  'preserveElementColors': [ 'type', preserveElementColors ],
  'processInstanceIds': [ 'type', processInstanceIds ],
  'processInstanceSettings': [ 'type', processInstanceSettings ],
  'processInstances': [ 'type', processInstances ],
  'resetSimulation': [ 'type', resetSimulation ],
  'setAnimationSpeed': [ 'type', setAnimationSpeed ],
  'showProcessInstance': [ 'type', showProcessInstance ],
  'simulationState': [ 'type', simulationState ],
  'toggleMode': [ 'type', toggleMode ],
  'tokenCount': [ 'type', tokenCount ],
  'tokenSimulationBehavior': [ 'type', tokenSimulationBehavior ],
  'tokenSimulationEditorActions': [ 'type', tokenSimulationEditorActions ],
  'tokenSimulationKeyboardBindings': [ 'type', tokenSimulationKeyboardBindings ],
  'tokenSimulationPalette': [ 'type', tokenSimulationPalette ]
};