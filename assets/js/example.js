let x = 6
const element = <h1>Привет, {x}!</h1>;

//Следующие два примера кода эквивалентны между собой:

const element = (
  <h1 className="greeting">
    Привет, мир!
  </h1>
);
//
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Привет, мир!'
);

// Состояние
/* Можно сделать функ фвызывающую каждый раз рендер(с пересозданием элемента) для обновления его состояния но
Для обновления надо использовать другую версию функции setState(), которая в качестве параметра принимает функцию. 
Данная функция имеет два параметра: предыдущее состояние объекта state и объект props на момент применения обновления: */
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
// state ток внутри компонента приватно и доступно ток там, меняются, нужно использовать при рендере
/* 
<FormattedDate date={this.state.date} />
Компонент FormattedDate получает date через пропсы, но он не знает, откуда они взялись изначально — из состояния Clock, пропсов Clock или просто JavaScript-выражения
*/


// Компонент:
//Компонент никогда не должен что-то записывать в свои пропсы

// События
render() { // в компоненте 
  //+ в конструкт: this.handleClick = this.handleClick.bind(this) 
  //либо:
  handleClick = () => { // скобки стрелки
    //либо:
    // <button onClick={(example) => this.handleClick(example)}>

    console.log('значение this:', this);
  }

  return (
    <button onClick={this.handleClick}>
      {this.state.isToggleOn ? 'Включено' : 'Выключено'}
    </button>
  );
}

// Условный рендеринг
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Попробуйте заменить на isLoggedIn={true} и посмотрите на эффект.
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);

const App = () => ( // компонент
  <div className="App">
    

  </div>
);

class Hello extends React.Component {
    constructor(props) {
        super(props);
        /* this.state = {  
             message: "my friend (from state)!"  
         }*/
         //this.press = this.press.bind(this);
    }

    press() {
        // this.setState({message: "Привет React"});
    }

    render() {  // юзать state, тогда потом будет пустой <Hello />

        
        return <h1 className={'str'}>Hello {this.props.message}!</h1>; // props(неизменный в рендере) берёт из <Hello/> + Hello.defaultProps = {message: 'str'} 
             
/* Составные компоненты:
class Item extends React.Component {
            render() {
              return <li>{this.props.name}</li>;
            }
          }
            
          class ItemsList extends React.Component {
            render() {
              return(
              <div>         
                  <h2>{this.props.title}</h2>
                  <ul>
                      <Item name="iPhone 7" />
                      <Item name="HTC U Ultra" />
                      <Item name="Google Pixel" />
                  </ul>
              </div>);
            }

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
Теперь мы включим массив listItems внутрь элемента <ul> и отрендерим его в DOM:

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
*/
    }
}


ReactDOM.render(

    <Hello message='dima' />,   // либо <h1></h1> с выражениями {} // либо переменную с элементом
    /*
    2+2={2+2} 
    let user = {id:7}
    {user.id}
    
    */
    document.getElementById("root") ,
    // callback 
);

// можно добавить второй рендер