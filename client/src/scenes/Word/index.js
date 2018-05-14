import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setTitle } from '../../redux/navigation';
import CalculateButton from './components/CalculateButton';

const styles = theme => ({
  header: {
    paddingTop: 20
  },
  button : {
    color: '#ffffff',
    margin: 20,
    display: 'block',
    position: 'relative',
    textTransform: 'uppercase',
    width: 225,
    height: 46,
    border: 0,
    background:'linear-gradient(0deg, #5481ae 0%, #7faaca 100%)',
    fontFamily: theme.typography.button.fontFamily,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
    '&:focus': {
      outline: 0
    }
  }
})

class WordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        input: '',
        output: ''
      }
    }
    this.wordFreq = this.wordFreq.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser = (event) => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }


  wordFreq() {
    alert("hi")
    
      var phraseCount = 0;
      var phrase = [];
      var sentenceArray =0;
      var sentence = [];
      sentence = this.state.user.input.split(". ");
      var sentenceCount = sentence.length;
      var freqMap = [];
      var frequentPhrases = [];
      var frequentPhraseMap=[];
      var sentenceWordCount;
      var commonPhrases=[];

      //group every 3 word phrase and store into phrase array
      for(var count = 0; count < sentenceCount; count++)
      {
        sentenceWordCount = sentence[count].split(" ").length
        for(var firstWord=0; firstWord < sentenceWordCount + 1; firstWord++)
        {
          var secondWord = firstWord + 3;

          while( secondWord < sentenceWordCount +1)
          {
            sentenceArray=sentence[count]
            var words = sentenceArray.split(/\s+/).slice(firstWord,secondWord).join(" ");
            words = words.replace(/\./g,'')
            words = words.replace(/,/g,'')
            words = words.toLowerCase()
            phrase[phraseCount] = words;
            secondWord++;
            phraseCount++;
          }
        }
      }

      //count every phrase occurence
      phrase.forEach(function(w) {
          if (!freqMap[w]) {
              freqMap[w] = 0;
          }
          freqMap[w] += 1;
      });

      //if count of a phrase is greater than 1 store in frequentPhrases array
      Object.keys(freqMap).sort().forEach(function(word) {
        if(freqMap[word] > 1)
        {
          frequentPhraseMap.push(freqMap[word])
          frequentPhrases.push(word)
        }
      });

        //omit phrase if it is a subset of another, store most frequent phrases into commonPhrases array
        var duplicate =0;
        var frequentPhraseCount = frequentPhrases.length
        for(var count1 = 0; count1 < frequentPhraseCount; count1++)
        {
          for(var count2 = 0; count2 < frequentPhraseCount; count2++)
          {
            var duplicateCheck = frequentPhrases[count2]
            if(duplicateCheck.includes(frequentPhrases[count1]))
            {
              duplicate++;
            }
          }
          if(duplicate === 1)
          {
            commonPhrases.push(frequentPhrases[count1])
          }

          duplicate = 0;
        }
    
      this.setState({
        user: {
          input: '',
          output: commonPhrases
        }
      });
  }

  render() {
    const { translate, classes, onSubmit } = this.props;
      return (
        <div>
          <center>
            <h1 className={classes.header}>
              Most Frequent Phrases
            </h1>
            <div class="form-group">
            <label for="exampleTextarea">
            {translate('input.text')}
            </label>
            <div/>
            <textarea 
              onChange={this.changeUser.bind(this)} 
              value= {this.state.user.input} 
              class="form-control" 
              id="exampleTextarea" 
              rows="7">
            </textarea>
            </div>
            <button 
              className={classes.button}
              onClick={this.wordFreq.bind(this)}>
              {translate('buttons.calculate')}
            </button>
            <div class="form-group">
            <label for="exampleTextarea">{translate('output.text')}</label>
            <div/>
            <textarea 
              value={this.state.user.output} 
              class="form-control" 
              id="exampleTextarea" 
              rows="7">
            </textarea>
            </div>
          </center>
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
)(withStyles(styles)(WordPage)));
