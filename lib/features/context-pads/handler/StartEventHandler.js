import {
  domify,
  event as domEvent
} from 'min-dom';

import { is } from '../../../util/ElementHelper';

import {
  GENERATE_TOKEN_EVENT
} from '../../../util/EventHelper';


export default function StartEventHandler(eventBus, elementRegistry, animation) {
  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._animation = animation;
}

StartEventHandler.prototype.createContextPads = function(element) {
  var tokens = false;

  this._elementRegistry.forEach(function(element) {
    if (element.tokenCount) {
      Object.values(element.tokenCount).forEach(function(tokenCount) {
        if (tokenCount) {
          tokens = true;
        }
      });
    }
  });

  if (is(element.parent, 'bpmn:SubProcess') ||
      tokens ||
      this._animation.animations.length) {
    return;
  }

  var self = this;

  var contextPad = domify('<div class="context-pad"><i class="fa fa-play"></i></div>');

  domEvent.bind(contextPad, 'click', function() {
    self._eventBus.fire(GENERATE_TOKEN_EVENT, {
      element: element
    });
  });

  return [{
    element: element,
    html: contextPad
  }];
};

StartEventHandler.$inject = [ 'eventBus', 'elementRegistry', 'animation' ];