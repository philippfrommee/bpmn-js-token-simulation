import {
  TOGGLE_MODE_EVENT,
  RESET_SIMULATION_EVENT
} from '../../util/EventHelper';


export default function ProcessInstanceIds(eventBus) {
  this.nextProcessInstanceId = 1;

  eventBus.on(TOGGLE_MODE_EVENT, this.reset.bind(this));

  eventBus.on(RESET_SIMULATION_EVENT, this.reset.bind(this));
}

ProcessInstanceIds.prototype.getNext = function() {
  var processInstanceId = this.nextProcessInstanceId;

  this.nextProcessInstanceId++;

  return processInstanceId;
};

ProcessInstanceIds.prototype.reset = function() {
  this.nextProcessInstanceId = 1;
};

ProcessInstanceIds.$inject = [ 'eventBus' ];