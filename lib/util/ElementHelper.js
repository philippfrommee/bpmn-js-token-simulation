import { every, some } from 'min-dash';

export function is(element, types) {
  if (element.type === 'label') {
    return;
  }

  if (!Array.isArray(types)) {
    types = [ types ];
  }

  var isType = false;

  types.forEach(function(type) {
    if (type === element.type) {
      isType = true;
    }
  });

  return isType;
}

export function isTypedEvent(event, eventDefinitionType, filter) {

  function matches(definition, filter) {
    return every(filter, function(val, key) {

      // we want a == conversion here, to be able to catch
      // undefined == false and friends
      return definition[key] == val;
    });
  }

  return some(event.eventDefinitions, function(definition) {
    return definition.$type === eventDefinitionType && matches(event, filter);
  });
}

export function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

export function isAncestor(ancestor, descendant) {
  var childParent = descendant.parent;

  while (childParent) {
    if (childParent === ancestor) {
      return true;
    }

    childParent = childParent.parent;
  }

  return false;
}

export function getDescendants(elements, ancestor) {
  return elements.filter(function(element) {
    return isAncestor(ancestor, element);
  });
}

export var supportedElements = [
  'bpmn:Association',
  'bpmn:BusinessRuleTask',
  'bpmn:DataInputAssociation',
  'bpmn:DataOutputAssociation',
  'bpmn:DataObjectReference',
  'bpmn:DataStoreReference',
  'bpmn:EndEvent',
  'bpmn:EventBasedGateway',
  'bpmn:ExclusiveGateway',
  'bpmn:IntermediateCatchEvent',
  'bpmn:ManualTask',
  'bpmn:ParallelGateway',
  'bpmn:Process',
  'bpmn:ScriptTask',
  'bpmn:SequenceFlow',
  'bpmn:ServiceTask',
  'bpmn:StartEvent',
  'bpmn:SubProcess',
  'bpmn:Task',
  'bpmn:TextAnnotation',
  'bpmn:UserTask',
  'bpmn:BoundaryEvent'
];