import {
  classes as domClasses
} from 'min-dom';

import {
  is,
  supportedElements as SUPPORTED_ELEMENTS
} from '../../util/ElementHelper';

import {
  TOGGLE_MODE_EVENT,
  GENERATE_TOKEN_EVENT
} from '../../util/EventHelper';

var IGNORED_ELEMENTS = [
  'bpmn:Process',
  'bpmn:Collaboration',
  'bpmn:Participant',
  'bpmn:Lane',
  'bpmn:TextAnnotation'
];

function isLabel(element) {
  return element.labelTarget;
}

export default function ElementSupport(
    eventBus, elementRegistry, canvas,
    notifications, elementNotifications) {

  var self = this;

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._elementNotifications = elementNotifications;
  this._notifications = notifications;

  this.canvasParent = canvas.getContainer().parentNode;

  eventBus.on(GENERATE_TOKEN_EVENT, 20000, function(context) {
    var element = context.element;

    if (!is(element, 'bpmn:StartEvent')) {
      return;
    }

    if (!self.allElementsSupported()) {
      self.showWarnings();

      domClasses(self.canvasParent).add('warning');

      // cancel event
      return true;
    }
  });

  eventBus.on(TOGGLE_MODE_EVENT, function(context) {
    var simulationModeActive = context.simulationModeActive;

    if (!simulationModeActive) {
      domClasses(self.canvasParent).remove('warning');
    }
  });
}

ElementSupport.prototype.allElementsSupported = function() {
  var allElementsSupported = true;

  this._elementRegistry.forEach(function(element) {
    if (!is(element, IGNORED_ELEMENTS)
        && !is(element, SUPPORTED_ELEMENTS)
        && !isLabel(element)
    ) {
      allElementsSupported = false;
    }
  });

  return allElementsSupported;
};

ElementSupport.prototype.showWarnings = function(elements) {
  var self = this;

  var warnings = [];

  this._elementRegistry.forEach(function(element) {
    if (!is(element, IGNORED_ELEMENTS)
        && !is(element, SUPPORTED_ELEMENTS)
        && !isLabel(element)
    ) {
      self.showWarning(element);

      if (warnings.indexOf(element.type)) {
        self._notifications.showNotification(element.type + ' not supported', 'warning');

        warnings.push(element.type);
      }
    }
  });
};

ElementSupport.prototype.showWarning = function(element) {
  this._elementNotifications.addElementNotification(element, {
    type: 'warning',
    icon: 'fa-exclamation-triangle',
    text: 'Not supported'
  });
};

ElementSupport.$inject = [
  'eventBus',
  'elementRegistry',
  'canvas',
  'notifications',
  'elementNotifications'
];