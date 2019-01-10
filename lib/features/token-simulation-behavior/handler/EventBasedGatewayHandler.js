import { is } from '../../../util/ElementHelper';

import {
  UPDATE_ELEMENTS_EVENT
} from '../../../util/EventHelper';


export default function ExclusiveGatewayHandler(eventBus, animation) {
  this._eventBus = eventBus;
  this._animation = animation;
}

ExclusiveGatewayHandler.prototype.consume = function(context) {
  var element = context.element,
      processInstanceId = context.processInstanceId;

  if (!element.tokenCount) {
    element.tokenCount = {};
  }

  if (!element.tokenCount[processInstanceId]) {
    element.tokenCount[processInstanceId] = 0;
  }

  element.tokenCount[processInstanceId]++;

  var outgoing = element.outgoing,
      events = [];

  outgoing.forEach(function(outgoing) {
    var target = outgoing.target;

    if (is(target, 'bpmn:IntermediateCatchEvent')) {
      events.push(target);
    }
  });

  this._eventBus.fire(UPDATE_ELEMENTS_EVENT, {
    elements: events
  });
};

ExclusiveGatewayHandler.prototype.generate = function() {};

ExclusiveGatewayHandler.$inject = [
  'eventBus',
  'animation'
];