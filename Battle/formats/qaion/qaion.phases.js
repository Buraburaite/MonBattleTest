const decideVictor = require('./qaion.wincon.js');

const endEnd = (battle) => {
  const victor = decideVictor(battle.mons);
  if (victor) {
    battle.emit('battleEnd', victor);
    battle._paused = true;
    return null;
  }

  battle._incrementTurn();
};

const comparePriorityInMovePhase = (a,b) => {
  if (a.priority !== b.priority) { return b.priority - a.priority; }
  return b.user.spd - a.user.spd;
};


const phases = [
  {
    name: 'Start'
  },
  {
    name: 'Prep',
    pause: true
  },
  {
    name: 'Move',
    priorityFunc: comparePriorityInMovePhase
  },
  {
    name: 'End',
    end: endEnd
  }
];

// Turn phases into a singly linked list
for (let i = 0; i < phases.length - 1; i++) {
  phases[i].next = phases[i + 1];
}
phases[phases.length - 1].next = phases[0];

module.exports = phases;
