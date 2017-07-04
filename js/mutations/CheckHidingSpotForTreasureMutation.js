import Relay from 'react-relay';

//Mutations and stuff
export default class CheckHidingSpotForTreasureMutation extends Relay.Mutation {
  static fragments = {
    game: () => RelayQL`
    fragment on Game {
      id,
      turnsRemaining,
    }
    `,
    hidingSpot: () => RelayQL`
    fragment on HidingSpot {
      id,
    }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{checkHidingSpotForTreasure}`;
  }

  getCollisionKey() {
    return `check_${this.props.game.id}`;
  }

  getFatQuery(){
    return Relay.QL`
    fragment on checkHidingSpotForTreasurePayload @relay(pattern: true) {
      hidingSpot {
        hasBeenChecked,
        hasTreasure,
      },
      game {
        turnsRemaining,
      },
    }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
      hidingSpot: this.props.hidingSpot.id,
      game: this.props.game.id,
    },
  }];
  }

  getVariables() {
    return {
      is. this.props.hidingSpot.id,
    };
  }

  getOptimisticRespone() {
    return {
      game: {
        turnsRemaing: this.props.game.turnsRemaining - 1,
      },
      hidingSpot: {
        id: this.props.hidingSpot.id,
        hasBeenChecked: true,
      },
    };
  }
}
