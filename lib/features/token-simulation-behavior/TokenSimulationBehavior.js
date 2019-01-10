import EndEventHandler from './handler/EndEventHandler';
import EventBasedGatewayHandler from './handler/EventBasedGatewayHandler';
import ExclusiveGatewayHandler from './handler/ExclusiveGatewayHandler';
import IntermediateCatchEventHandler from './handler/IntermediateCatchEventHandler';
import IntermediateThrowEventHandler from './handler/IntermediateThrowEventHandler';
import ParallelGatewayHandler from './handler/ParallelGatewayHandler';
import StartEventHandler from './handler/StartEventHandler';
import SubProcessHandler from './handler/SubProcessHandler';
import BoundaryEventHandler from './handler/BoundaryEventHandler';
import TaskHandler from './handler/TaskHandler';

import {
  GENERATE_TOKEN_EVENT,
  CONSUME_TOKEN_EVENT
} from '../../util/EventHelper';


export default function TokenSimulationBehavior(eventBus, animation, injector) {
  var self = this;

  this._injector = injector;

  this.handlers = {};

  this.registerHandler('bpmn:EndEvent', EndEventHandler);
  this.registerHandler('bpmn:EventBasedGateway', EventBasedGatewayHandler);
  this.registerHandler('bpmn:ExclusiveGateway', ExclusiveGatewayHandler);
  this.registerHandler('bpmn:IntermediateCatchEvent', IntermediateCatchEventHandler);
  this.registerHandler('bpmn:IntermediateThrowEvent', IntermediateThrowEventHandler);
  this.registerHandler('bpmn:ParallelGateway', ParallelGatewayHandler);
  this.registerHandler('bpmn:StartEvent', StartEventHandler);
  this.registerHandler('bpmn:SubProcess', SubProcessHandler);
  this.registerHandler('bpmn:BoundaryEvent', BoundaryEventHandler);
  this.registerHandler([
    'bpmn:BusinessRuleTask',
    'bpmn:Task',
    'bpmn:ManualTask',
    'bpmn:ScriptTask',
    'bpmn:ServiceTask',
    'bpmn:UserTask'
  ], TaskHandler);

  // create animations on generate token
  eventBus.on(GENERATE_TOKEN_EVENT, function(context) {
    var element = context.element;

    if (!self.handlers[element.type]) {
      throw new Error('no handler for type ' + element.type);
    }

    self.handlers[element.type].generate(context);
  });

  // call handler on consume token
  eventBus.on(CONSUME_TOKEN_EVENT, function(context) {
    var element = context.element;

    if (!self.handlers[element.type]) {
      throw new Error('no handler for type ' + element.type);
    }

    self.handlers[element.type].consume(context);
  });
}

TokenSimulationBehavior.prototype.registerHandler = function(types, handlerCls) {
  var self = this;

  var handler = this._injector.instantiate(handlerCls);

  if (!Array.isArray(types)) {
    types = [ types ];
  }

  types.forEach(function(type) {
    self.handlers[type] = handler;
  });
};

TokenSimulationBehavior.$inject = [ 'eventBus', 'animation', 'injector' ];