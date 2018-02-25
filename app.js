const Battle = require('./Battle/Battle.js');
const Mon    = require('./Mon/Mon.js');

const guilmon = new Mon('D-366B', 25, 'Javimon');
const vulpix = new Mon('P-396A', 25, 'Durkeemon');

const javi = {
  name: 'Javimon',
  party: [guilmon]
};
const durkee = {
  name: 'Durkeemon',
  party: [vulpix]
};

const battle = new Battle('qaion', [javi.party, durkee.party]);

battle.on('Battle_Start', () => {
  console.log('(Battle_Start)');
});
battle.on('Prep_Phase_Start', () => {
  console.log('(Prep_Phase_Start)');
  guilmon.use(1, vulpix); // params: moveIndex, target (eventually target will be a fieldIndex)
  vulpix.use(1, guilmon);
  battle.unpause();
});
battle.on('Unpaused', () => {
  console.log('(Unpaused)');
});
battle.on('Damage_Dealt', (moveCxt, damageDealt) => {
  console.log(`(Damage_Dealt): ${moveCxt.user.name} did ${damageDealt} damage to ${moveCxt.target.name} with ${moveCxt.name}`);
});
battle.on('Start_Phase_Start', () => {
  console.log(`___(Start_Phase_Start): Turn ${battle.turn}___`);
});
battle.on('Move_Phase_Start', () => {
  console.log('(Move_Phase_Start)');
});
battle.on('End_Phase_Start', () => {
  console.log('(End_Phase_Start)');
});
battle.on('Battle_End', (victor) => {
  console.log(`(Battle_End): ${victor} has won the battle`);
});

battle.on('Mon_Fainted', (mon) => {
  console.log(`(Mon_Fainted): ${mon.name} has fainted!`);
});

battle.start();
