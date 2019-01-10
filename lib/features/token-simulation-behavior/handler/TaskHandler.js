import { is } from '../../../util/ElementHelper';

import {
  GENERATE_TOKEN_EVENT,
  CONSUME_TOKEN_EVENT
} from '../../../util/EventHelper';


export default function TaskHandler(animation, eventBus) {
  this._animation = animation;
  this._eventBus = eventBus;
}

TaskHandler.prototype.consume = function(context) {

  // fire to generate token on self
  this._eventBus.fire(GENERATE_TOKEN_EVENT, context);
};

TaskHandler.prototype.generate = function(context) {
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

TaskHandler.$inject = [ 'animation', 'eventBus' ];