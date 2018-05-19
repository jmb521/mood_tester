import React, {Component} from 'react'
import Result from './result.js'


class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mood: "",
      value: "",
    }
  }

  onChange = (e) => {
    let input = e.target.value
    this.setState({
      value: input,
    })

  }
  onSubmit = (e) => {
    e.preventDefault()
    this.fetchRequest()

  }

  fetchRequest = () => {
    const data = {
          "requests":[
            {
              "image":{
                "source":{
                  "imageUri": this.state.value,
                }
              },
              "features":[
                {
                  "type":"FACE_DETECTION",
                  "maxResults":1
                }
              ]
            }
          ]
        }


      return fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/JSON'
       },
       body: JSON.stringify(data),
       mode: 'cors',

     })
     .then(response => response.json())
    //  .then(data => console.log("data", data))
     .then(data => this.moodStatus(data))

    }

    moodStatus = (data) => {

      let dataString = data.responses[0]
      // console.log("errors =>  ", dataString.error.message)
        if('error' in dataString) {
          console.log("Winning!")

      // if(dataString.error.message === "Bad image data.") {
        this.setState({
          mood: "Cannot determine mood, please try a different picture",
          value: "",
        })
      } else if('faceAnnotations' in dataString) {


          if(dataString.faceAnnotations[0].joyLikelihood === "VERY_LIKELY") {
            this.setState({
              mood: "Happy",
              value: "",
            })
          } else if (dataString.faceAnnotations[0].angerLikelihood === "VERY_LIKELY") {
            this.setState({
              mood: "Angry",
              value: "",
            })
          }
        } else {
          console.log(dataString)
        }

    }


  render() {
    return(
      <div>
        <h5> Enter the link to your picture to determine your mood</h5>
        <form onSubmit={this.onSubmit}>
          <input type="text" id="" value={this.state.value} onChange={this.onChange} />
          <br />
          <br />
          <input type="submit" name="Submit" value="Submit"/>
        </form>

        <Result mood={this.state.mood} />
      </div>
    )
  }
}
export default Form
