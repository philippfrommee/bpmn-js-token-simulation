import { is } from '../../../util/ElementHelper';

import {
  CONSUME_TOKEN_EVENT,
  UPDATE_ELEMENT_EVENT
} from '../../../util/EventHelper';


export default function BoundaryEventHandler(
    animation, eventBus, elementRegistry) {

  this._animation = animation;
  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
}

BoundaryEventHandler.prototype.consume = function(context) {
  var element = context.element,
      processInstanceId = context.processInstanceId;

  if (!element.tokenCount) {
    element.tokenCount = {};
  }

  if (!element.tokenCount[processInstanceId]) {
    element.tokenCount[processInstanceId] = 0;
  }

  element.tokenCount[processInstanceId]++;

  this._eventBus.fire(UPDATE_ELEMENT_EVENT, {
    element: element
  });
};

BoundaryEventHandler.prototype.generate = function(context) {
  var self = this;

  var element = context.element,
      processInstanceId = context.processInstanceId;

  var outgoingSequenceFlows = element.outgoing.filter(function(outgoing) {
    return is(outgoing, 'bpmn:SequenceFlow');
  });

  outgoingSequenceFlows.forEach(function(connection) {
    self._animation.createAnimation(connection, processInstanceId, function() {
      self._eventBus.fire(CONSUME_TOKEN_EVENT, {
        element: connection.target,
        processInstanceId: processInstanceId
      });
    });
  });
};

BoundaryEventHandler.$inject = [
  'animation',
  'eventBus',
  'elementRegistry'
];