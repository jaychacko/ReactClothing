import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {auth,createUserProfilDocument} from './firebase/firebase.util'
import './App.css';
import HomePage from './Pages/HomePage/homepage.component';
import ShopPage from './Pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './Pages/sign-in-sign-up/sign-in-sign-up';
import {setCurrentUser} from './redux/user/user.actions'
import { connect } from 'react-redux';
class App extends React.Component{


  constructor(){
    super();
    this.state = {
      currentUser:null
    }
  }
unSubscribeFromAuth = null;

  componentDidMount (){
    const {setCurrentUser} = this.props
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser:user});
      if (userAuth){
        const userRef = await createUserProfilDocument(userAuth)

        userRef.onSnapshot(snapshot =>{
          setCurrentUser({
            currentUser:{
              id:snapshot.id,
              ...snapshot.data()
            }
          },
          console.log("====",this.state)

          )
        })
        setCurrentUser({userAuth})
      }
    })
  }

  componentWillUnmount (){
    this.unSubscribeFromAuth()
  }
  
render () {

  return (
    <div>
      <Header  />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin'   render={()=> this.props.currentUser ?(<Redirect to="/"/>):(<SignInAndSignUp/>)}/>
      </Switch>
    </div>
  );
}
}
const mapStateToProps =  ({user})=>({

    currentUser:user.currentUser
})

const mapDispatchToProps = dispath =>({
  setCurrentUser :user=> dispath(setCurrentUser(user))
})
export default connect(mapStateToProps,mapDispatchToProps) (App);
