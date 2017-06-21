import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import axios from 'axios'
import './App.css'

function Marker(){
  return (
    <div className="marker"></div>
  )
}

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      coors: [],
      lootType: 4
    }
  }

  componentDidMount(){
    this.getCoordinates()
  }

  getCoordinates(){
    axios.get('https://staging.seek.fit/api/challenge/?loot_type=' + this.state.lootType).then(response => {
      const data = response.data.features[0].geometry.coordinates
      this.setState({coors: data})
    })
  }

  changeHandler(e){
    this.setState({lootType: Number(e.target.value)}, this.getCoordinates)
  }

  render() {
    return (
      <div className="wrap">
        <h1>Seek Coding Challenge</h1>
        <GoogleMap
          center={{lat: 40, lng: -100}}
          zoom={4}>
          {this.state.coors.map((coor, i) => {
            return (
              <Marker key={i} lat={coor[1]} lng={coor[0]} />
            )
          })}
        </GoogleMap>

        Loot Type: <select value={this.state.lootType} onChange={this.changeHandler.bind(this)} >
          <option value="4">Key</option>
          <option value="5">Coin</option>
          <option value="637">Cinemark Prize</option>
        </select>
      </div>
    )
  }
}
