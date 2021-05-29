export enum WowClass {
  Warrior = 'warrior',
  Paladin = 'paladin', 
  Hunter = 'hunter', 
  Rogue = 'rogue', 
  Priest = 'priest', 
  Shaman = 'shaman', 
  Mage = 'mage', 
  Warlock = 'warlock', 
  Monk = 'monk', 
  Druid = 'druid', 
  DemonHunter = 'demon_hunter', 
  DeathKnight = 'death_knight',
  All = 'all'
}

export interface WowCharacter {
  name: string;
  server: string;
}