import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import LoginForm from './components/LoginForm';
var gramophone = require("gramophone")

const styles = theme => ({
  container: {
    background:'linear-gradient(0deg, #1f5592 0%,#286ba1 37%,#3a94c0 68%,#51c4e1 100%)',
    height: '100vh'
  }
})

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      user: {
        username: '',
        password: ''
      },
      message: '',
      errors: {
        username: '',
        password: ''
      },
    }
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }

  login = () => {
    this.setState({
      user: {
        name: '',
        username: '',
        password: ''
      }
    });
  }

wordFreq = () => {
    var wordCount = this.state.user.username.split(" ").length;
    var phraseCount = 0;
    var phrase = [];
   
    for(var firstWord=0; firstWord < wordCount + 1; firstWord++)
    {
      var secondWord = firstWord +3;
      while( secondWord < wordCount +1)
      {
        var words = this.state.user.username.split(/\s+/).slice(firstWord,secondWord).join(" ");
        phrase[phraseCount] = words;
        secondWord++;
        phraseCount++;
      }
    }

    console.log(phrase)
    
    var freqMap = {};
    console.log(wordCount);

    console.log(gramophone.extract('beep and beep and beep bop boop and foo and foo bar', {ngrams: [2, 3]}))
    

    this.setState({
      user: {
        name: '',
        username: '',
        password: 'asd'
      }
    });
}

  render() {
        console.log(gramophone.extract('beep and beep and beep bop boop and foo and foo bar', {ngrams: [2, 3]}))

    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    const { translate, classes } = this.props;

   
   
      if (redirectToReferrer) {
        return (
          <Redirect to={from}/>
        );
      }

      return (
        <div className={classes.container}>
          <LoginForm
            onSubmit={this.wordFreq}
            onChange={this.changeUser}
            user={this.state.user}
            translate={translate}
            errors={this.state.errors}
            message={this.state.message}
          />
      </div>
      );
    }
  }


const mapStateToProps = state => {
  return {
    translate: getTranslate(state.get('locale')),
    currentLangugage: getActiveLanguage(state.get('locale')).code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTitle: (title) => {
      dispatch(setTitle(title));
    }
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginPage)));
