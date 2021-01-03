import React from 'react';
import SPELLS from 'common/SPELLS';
import Analyzer, { Options } from 'parser/core/Analyzer';
import Events, { DamageEvent } from 'parser/core/Events';
import Statistic from 'interface/statistics/Statistic';
import ConduitSpellText from 'interface/statistics/components/ConduitSpellText';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';
import ItemDamageDone from 'interface/ItemDamageDone';
import { SELECTED_PLAYER } from 'parser/core/EventFilter';
import calculateEffectiveDamage from 'parser/core/calculateEffectiveDamage';

const DAMAGE_BONUS = [
  0,
  0.08,
  0.09,
  0.1,
  0.1,
  0.11,
  0.12,
  0.13,
  0.14,
  0.14,
  0.15,
  0.16,
  0.17,
  0.18,
  0.18,
  0.19,
];

class ShiveringCore extends Analyzer {
  conduitRank = 0;
  bonusDamage = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasConduitBySpellID(SPELLS.SHIVERING_CORE.id);
    this.conduitRank = this.selectedCombatant.conduitRankBySpellID(SPELLS.SHIVERING_CORE.id);
    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(SPELLS.BLIZZARD_DAMAGE),
      this.onBlizzardDamage,
    );
  }

  onBlizzardDamage(event: DamageEvent) {
    this.bonusDamage += calculateEffectiveDamage(event.amount, DAMAGE_BONUS[this.conduitRank]);
  }

  statistic() {
    return (
      <Statistic category={STATISTIC_CATEGORY.COVENANTS} size="flexible">
        <ConduitSpellText spell={SPELLS.SHIVERING_CORE} rank={this.conduitRank}>
          <ItemDamageDone amount={this.bonusDamage} />
        </ConduitSpellText>
      </Statistic>
    );
  }
}

export default ShiveringCore;
