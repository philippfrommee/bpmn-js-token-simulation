import { is } from '../../../util/ElementHelper';

import {
  CONSUME_TOKEN_EVENT,
  GENERATE_TOKEN_EVENT
} from '../../../util/EventHelper';


export default function ParallelGatewayHandler(animation, eventBus) {
  this._animation = animation;
  this._eventBus = eventBus;
}

ParallelGatewayHandler.prototype.consume = function(context) {
  var element = context.element,
      processInstanceId = context.processInstanceId;

  if (!element.tokenCount) {
    element.tokenCount = {};
  }

  if (!element.tokenCount[processInstanceId]) {
    element.tokenCount[processInstanceId] = 0;
  }

  element.tokenCount[processInstanceId]++;

  var incoming = element.incoming;

  if (incoming.length === element.tokenCount[processInstanceId]) {
    this._eventBus.fire(GENERATE_TOKEN_EVENT, context);

    element.tokenCount[processInstanceId] = 0;
  }
};

ParallelGatewayHandler.prototype.generate = function(context) {
  var self = this;

  var element = context.element,
      processInstanceId = context.processInstanceId;

  var outgoingSequenceFlows = element.outgoing.filter(function(outgoing) {
    return is(outgoing, 'bpmn:SequenceFlow');
  });

  outgoingSequenceFlows.forEach(function(outgoing) {
    self._animation.createAnimation(outgoing, processInstanceId, function() {
      self._eventBus.fire(CONSUME_TOKEN_EVENT, {
        element: outgoing.target,
        processInstanceId: processInstanceId
      });
    });
  });
};

ParallelGatewayHandler.$inject = [ 'animation', 'eventBus' ];