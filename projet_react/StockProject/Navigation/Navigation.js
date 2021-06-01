import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import AuthScene from '../components/AuthScene';
import CreateUser from '../components/CreateUser';
import LoadingScene from '../components/LoadingScene';
import Home from '../components/Home';
import Fournisseur from '../components/Fournisseur';
import Article from '../components/Article';
import Details from '../components/Details';
import Inventaire from '../components/Inventaire';
import sortie from '../components/sortie';
import Casier from '../components/Casier';
import Monnaie from '../components/Monnaie';
import Categorie from '../components/Categorie';
import Type from '../components/Type';

const stackNavigatorOptions={
    headerShown:false,
}

const AppNavigator= createStackNavigator({
    LoadingScene:{screen:LoadingScene},
    AuthScene:{screen:AuthScene},
    CreateUser:{screen:CreateUser},
    Home:{screen:Home},
    Fournisseur:{screen:Fournisseur},
    Article:{screen:Article},
    Details:{screen:Details},
    Inventaire:{screen:Inventaire},
    sortie:{screen:sortie},
    Casier:{screen:Casier},
    Monnaie:{screen:Monnaie},
    Categorie:{screen:Categorie},
    Type:{screen:Type},
},
{
    defaultNavigationOptions: stackNavigatorOptions
});

export default createAppContainer(AppNavigator);
