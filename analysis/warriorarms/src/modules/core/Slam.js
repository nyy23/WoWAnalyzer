import { t } from '@lingui/macro';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import Enemies from 'parser/shared/modules/Enemies';

import SpellUsable from '../features/SpellUsable';
import ExecuteRange from './Execute/ExecuteRange';

class Slam extends Analyzer {
  get badCastSuggestionThresholds() {
    return {
      actual: this.badCast / this.totalCast || 0,
      isGreaterThan: {
        minor: 0,
        average: 0.05,
        major: 0.1,
      },
      style: 'percentage',
    };
  }

  static dependencies = {
    executeRange: ExecuteRange,
    enemies: Enemies,
    spellUsable: SpellUsable,
  };
  badCast = 0;
  totalCast = 0;

  constructor(...args) {
    super(...args);
    this.addEventListener(Events.cast.by(SELECTED_PLAYER).spell(SPELLS.SLAM), this._onSlamCast);
  }

  _onSlamCast(event) {
    this.totalCast += 1;
    if (
      this.spellUsable.isAvailable(SPELLS.MORTAL_STRIKE.id) &&
      !this.executeRange.isTargetInExecuteRange(event)
    ) {
      event.meta = event.meta || {};
      event.meta.isInefficientCast = true;
      event.meta.inefficientCastReason =
        'This Slam was used on a target while Mortal Strike was off cooldown.';
      this.badCast += 1;
    } else if (this.executeRange.isTargetInExecuteRange(event)) {
      event.meta = event.meta || {};
      event.meta.isEnhancedCast = true;
      event.meta.enhancedCastReason = 'This Slam consumed a Crushing Assasult buff.';
    }
  }

  suggestions(when) {
    when(this.badCastSuggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          Try to avoid using <SpellLink id={SPELLS.SLAM.id} /> when{' '}
          <SpellLink id={SPELLS.MORTAL_STRIKE.id} /> or <SpellLink id={SPELLS.EXECUTE.id} /> is
          available as it is more rage efficient.
        </>,
      )
        .icon(SPELLS.SLAM.icon)
        .actual(
          t({
            id: 'warrior.arms.suggestions.slam.efficiency',
            message: `Slam was cast ${this.badCast} times accounting for ${formatPercentage(
              actual,
            )}% of total casts, while Mortal Strike or Execute was available.`,
          }),
        )
        .recommended(`${recommended}% is recommended`),
    );
  }
}

export default Slam;
