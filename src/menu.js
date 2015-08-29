var food = [
  ['Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'],
  ['Ipsum', 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'],
  ['Dolor', 'Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'],
  ['Sit', 'Mauris massa. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.  Curabitur tortor. Pellentesque nibh. Aenean quam.'],
  ['Amet', 'In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.']
]

var App = React.createClass({
  getInitialState: function() {
      return {checkoutData: {}, total: 0};
  },
  handleItemSubmit: function(food, quantity) {
    var data = this.state.checkoutData;
    var total = this.state.total;
    
    if (!data[food]) data[food] = 0;
    data[food] += parseInt(quantity);
    total += parseInt(quantity);

    this.setState({checkoutData: data, total: total})
  },
  render: function() {
    return (
      <div>
        <Menu food={this.props.food} onItemSubmit={this.handleItemSubmit} />
        <Checkout checkoutData={this.state.checkoutData} total={this.state.total} />
      </div>
    );
  }
});

var Menu = React.createClass({
  handleItemSubmit: function(food, quantity) {
    this.props.onItemSubmit(food, quantity);
  },
  render: function() {
    var context = this;
    var items = this.props.food.map(function (entree) {
      return <Item food={entree[0]} description={entree[1]} onItemSubmit={context.handleItemSubmit} />;
    });
    console.log(items);
    return (
      <div className='menu'>
        <h1>Restaurant Menu</h1>
        <div className='itemList'> {items} </div>
      </div>
    );
  }
});

var Item = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var food = this.props.food;
    var quantity = React.findDOMNode(this.refs.quantity).value;
    this.props.onItemSubmit(food, quantity);
    React.findDOMNode(this.refs.quantity).value = '1';
    return;
  },
  render: function() {
    return (
      <div className='item'>
        <div className='foodDescription'>
          <h3>{this.props.food}</h3>
          <p>{this.props.description}</p>
        </div>
        <div className='addToCart'>
          <form className='updateForm' onSubmit={this.handleSubmit}>
            <input className='inputBox' type='number' defaultValue='1' ref='quantity' />
            <input type='submit' value='Add to cart' />
          </form>
        </div>
      </div>
    );
  }  
});

var Checkout = React.createClass({
  render: function() {
    return (
      <div className='checkout'>
        <h3>Cart - {this.props.total} items</h3>
        <CartItem checkoutData = {this.props.checkoutData}/>
      </div>
    );
  }
});

var CartItem = React.createClass({
  render: function() {
    var cartItemNodes = [];
    var data = this.props.checkoutData;
    for (var key in data) {
      cartItemNodes.push(<li>{data[key]} {key}</li>);
    }
    console.log(cartItemNodes);
    return (<ul> {cartItemNodes} </ul>
    );
  }
});


React.render(
  <App food={food} />,
  document.getElementById('App')
);

