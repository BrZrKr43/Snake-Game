//import react, Snake and Food
import React, { Component } from 'react'
import Snake from './snake'
import Food from './food'

//create random coordinates to be used for the food 
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

//create object with the initial state 
const initialState = {
  food: getRandomCoordinates(),
  speed: 90,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}

//class App with methods to set the rules for the snake and controls of the snake
export class App extends Component {
  state =initialState;

  //method to make the moveSnake method repeat itself and also to set the controls for the snake
  componentDidMount(){
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown;
  }

  //to call the following methods
  componentDidUpdate(){
    this.checkIfOutOfBorder();
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  //get the key that is pressed down and sets what each keycode means for the direction
  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
    }
  }

  //get the coordinates of the head and the dots and check for different directions then move in that direction
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }


  //check if the snake crashes into itself
  checkIfCollapsed(){
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] == dot[0] && head[1] == dot[1]){
        this.onGameOver();
      }
    })
  }

  //check if the snake has moved beyond the border of the game area
  checkIfOutOfBorder = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length-1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0 ){
      this.onGameOver();
    }
  }


  //check if the snake has eaten the food
  checkIfEat(){
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if(head[0] == food[0] && head[1] == food[1]){
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  //add one block to the tail
  enlargeSnake(){
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    })
  }

  //increase the speed
  increaseSpeed(){
    if (this.state.speed > 10 ){
      this.setState({
        speed: this.state.speed -10
      })
    }
  }

  //when the user crashes into anything the game is over and resets
  onGameOver(){
    alert(`Game Over! Length of snake is: ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }
  render() {
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot={this.state.food}/> 
      </div>
    )
  }
}

//export the App component
export default App
