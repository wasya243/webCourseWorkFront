import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Container} from 'semantic-ui-react';

import DrugsList from '../components/DrugsList';
import {drugsActions, cartActions} from '../actions';

class Home extends Component {

  componentDidMount() {
    this.props.fetchDrugs();
  }

  onAddToCart = (drug) => {
    this.props.addToCart(drug);
  };

  render() {
    const {listOfDrugs, isPending} = this.props;
    return (
      <Container>
        <Card.Group itemsPerRow={4}>
          {isPending
            ? 'Загрузка...'
            : <DrugsList listOfDrugs={listOfDrugs} onAddToCart={this.onAddToCart}/>
          }
        </Card.Group>
      </Container>
    );
  }
}

const mapStateToProps = ({drugs}) => {
  return ({
    isPending: drugs.isPending,
    listOfDrugs: drugs.items
  });
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrugs: drugsActions.fetchDrugs(dispatch),
  addToCart: cartActions.addToCart(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);