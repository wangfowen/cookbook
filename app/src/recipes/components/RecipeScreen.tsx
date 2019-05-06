import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, View} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux'

import {Recipe} from 'app/models/Recipe'
import RecipeOverview from './RecipeOverview';
import RecipeSteps from '../RecipeSteps';
import { ReduxState } from 'app/CombinedReducer';
import { ComponentId } from 'app/models/common';
import { Ingredient } from 'app/models/Ingredient';
import { Tool } from 'app/models/Tool';

interface StateProps {
  ingredients: Map<ComponentId, Ingredient>
  tools: Map<ComponentId, Tool>
}

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

interface State {
  view: number
}

class RecipeScreen extends React.Component<OuterProps & StateProps, State> {
  constructor(props) {
    super(props)

    this.state = {view: 0}
  }

  getRecipe(): Recipe {
    return this.props.navigation.getParam("recipe", null)
  }

  render() {
    const recipe = this.getRecipe()
    const {tools, ingredients} = this.props

    if (recipe) {
      return (
        <View>
          <Text style={[styles.text, styles.title]}>{recipe.title}</Text>
          <ButtonGroup 
            onPress={(i) => {this.setState({view: i})}}
            selectedIndex={this.state.view}
            buttons={["Overview", "Steps"]}
            containerStyle={styles.tabs}
          />
          {this.state.view === 0 ? 
            <RecipeOverview recipe={recipe} ingredients={ingredients} tools={tools} /> : 
            <RecipeSteps recipe={recipe} />
          }
        </View>
      );
    } else {
      return null
    }
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    ingredients: state.recipes.ingredients,
    tools: state.recipes.tools
  };
}

export default connect(mapStateToProps)(RecipeScreen);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 10,
    height: 40,
    paddingLeft: 5
  },
  text: {
    fontSize: 16,
    height: 32,
    color: '#111',
    paddingRight: 10
  },
  tabs: {
    width: "100%",
    marginLeft: 0
  }
});
