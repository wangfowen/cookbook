import React from 'react'
import {StyleSheet, Text, FlatList, View} from 'react-native'
import { connect } from 'react-redux'

import RecipeItem from './RecipeItem'
import {Recipe} from 'app/models/Recipe'

interface StateProps {
  recipes: Recipe[]
}

class RecipeIndexScreen extends React.Component<StateProps> {
  renderRecipe(item: Recipe) {
    return <RecipeItem recipe={item} key={item.id} />
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
