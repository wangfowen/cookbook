import React from 'react'
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, FlatList, View} from 'react-native'
import { connect } from 'react-redux'

import { ReduxState } from 'app/CombinedReducer';
import {Recipe} from 'app/models/Recipe'
import RecipeItem from './RecipeItem'
import styles from 'app/common/GlobalStyles'

interface StateProps {
  recipes: Recipe[]
}

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

class RecipeIndexScreen extends React.Component<StateProps & OuterProps> {
  navigateToRecipe(recipe: Recipe) {
    this.props.navigation.navigate("Recipe", {recipe})
  }

  renderRecipe(item: Recipe) {
    return <RecipeItem recipe={item} onPress={() => this.navigateToRecipe(item) }/>
  }

  data() {
    const data = this.props.recipes.map((recipe) => Object.assign({}, recipe, {key: recipe.id}))
    return data
  }

  render() {
    return (
      <View style={localStyles.recipes}>
        <Text style={styles.h1}>Recipes</Text>
        <FlatList
          data={this.data()}
          renderItem={({item}) => this.renderRecipe(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    recipes: Array.from(state.recipes.recipes.values())
  };
}

export default connect(mapStateToProps)(RecipeIndexScreen);

const localStyles = StyleSheet.create({
  recipes: {
    flex: 1,
    paddingTop: 20,
  }
});
