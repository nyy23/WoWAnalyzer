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
  0.02,
  0.02,
  0.02,
  0.03,
  0.03,
  0.03,
  0.03,
  0.03,
  0.04,
  0.04,
  0.04,
  0.04,
  0.04,
  0.05,
  0.05,
];

class SiphonedMalice extends Analyzer {
  conduitRank = 0;
  bonusDamage = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasConduitBySpellID(SPELLS.SIPHONED_MALICE.id);
    this.conduitRank = this.selectedCombatant.conduitRankBySpellID(SPELLS.SIPHONED_MALICE.id);
    this.addEventListener(Events.damage.by(SELECTED_PLAYER), this.onDamage);
  }

  onDamage(event: DamageEvent) {
    const buff = this.selectedCombatant.getBuff(SPELLS.SIPHONED_MALICE_BUFF.id);
    if (!buff) {
      return;
    }
    this.bonusDamage += calculateEffectiveDamage(
      event,
      DAMAGE_BONUS[this.conduitRank] * buff.stacks,
    );
  }

  statistic() {
    return (
      <Statistic category={STATISTIC_CATEGORY.COVENANTS} size="flexible">
        <ConduitSpellText spell={SPELLS.SIPHONED_MALICE} rank={this.conduitRank}>
          <ItemDamageDone amount={this.bonusDamage} />
        </ConduitSpellText>
      </Statistic>
    );
  }
}

export default SiphonedMalice;
