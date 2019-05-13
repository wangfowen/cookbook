import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux'
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {Recipe} from 'app/models/Recipe'
import { ReduxState } from 'app/CombinedReducer';
import { ComponentId } from 'app/models/common';
import { Ingredient } from 'app/models/Ingredient';
import { Tool } from 'app/models/Tool';
import styles from 'app/common/GlobalStyles'

import RecipeOverview from './RecipeOverview';
import RecipeSteps from './RecipeSteps';

interface StateProps {
  ingredients: Map<ComponentId, Ingredient>
  tools: Map<ComponentId, Tool>
}

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

interface State {
  view: number,
  imgWidth: number,
  imgHeight: number
}

class RecipeScreen extends React.Component<OuterProps & StateProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      view: 0,
      imgWidth: 0,
      imgHeight: 0
    }
  }

  getRecipe(): Recipe {
    return this.props.navigation.getParam("recipe", null)
  }

  //TODO: how prevent flash? is it better if not using data-uri image?
  componentDidMount() {
    const recipe = this.getRecipe()
    Image.getSize(recipe.heroImage, (width, height) => {
      const imgWidth = Dimensions.get('window').width
      const imgHeight = height * (imgWidth / width)
      this.setState({imgWidth, imgHeight})
    }, () => {})
  }

  render() {
    const recipe = this.getRecipe()
    const {tools, ingredients} = this.props
    const {imgWidth, imgHeight, view} = this.state

    if (recipe) {
      return <ParallaxScrollView
        parallaxHeaderHeight={imgHeight}
        contentContainerStyle={localStyles.parallaxContent}
        renderBackground={() => <View>
          <Image resizeMode='contain' source={{uri: recipe.heroImage}} style={[localStyles.heroImage, {width: imgWidth, height: imgHeight}]} />
        </View>}
      >
        <Text style={[styles.p, styles.h2]}>{recipe.title}</Text>
        <ButtonGroup 
          onPress={(i) => {this.setState({view: i})}}
          selectedIndex={view}
          buttons={["Overview", "Steps"]}
          containerStyle={localStyles.tabs}
        />
        {this.state.view === 0 ? 
          <RecipeOverview recipe={recipe} ingredients={ingredients} tools={tools} /> : 
          <RecipeSteps recipe={recipe} />
        }
      </ParallaxScrollView>
      
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

const localStyles = StyleSheet.create({
  heroImage: {
  },
  parallaxContent: {
  },
  tabs: {
    width: "100%",
    marginLeft: 0
  }
});
