import React, {Component} from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';

import { connect } from 'react-redux'; 

import RecipeItem from '../components/RecipeItem';

class RecipeIndexScreen extends Component {
  renderRecipe(item) {
    return <RecipeItem recipe={item} />;
  }

  render() {
    return (
      <View style={styles.recipes}>
        <Text style={styles.title}>Recipes</Text>
        <FlatList
          data={this.props.recipes}
          renderItem={({item}) => this.renderRecipe(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
}

export default connect(mapStateToProps)(RecipeIndexScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 30
  },
  recipes: {
    flex: 1,
    paddingTop: 20,
  }
});
