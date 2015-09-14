var food = [
  ['Lorem', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'],
  ['Ipsum', 'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.'],
  ['Dolor', 'Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'],
  ['Sit', 'Mauris massa. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.  Curabitur tortor. Pellentesque nibh. Aenean quam.'],
  ['Amet', 'In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.']
]

var App = React.createClass({
  getInitialState: function() {
      var data = {checkoutData: {}, total: 0};

      this.props.food.forEach(function(item) {
        if (localStorage[item[0]] > 0) {
          var count = parseInt(localStorage[item[0]]);
          data.checkoutData[item[0]] = count;
          data.total += count;
        } else {
          localStorage.setItem(item[0], 0);
        }
      });

      return data;
  },

  handleItemSubmit: function(food, quantity) {
    var data = this.state.checkoutData;
    var total = this.state.total;
    
    if (!data[food]) data[food] = 0;
    quantity = parseInt(quantity)
    data[food] += quantity;
    total += quantity;
    localStorage[food] = parseInt(localStorage[food]) + quantity;

    this.setState({checkoutData: data, total: total})
  },

  handleCheckout: function() {
    localStorage.clear();
    this.setState({checkoutData: {}, total: 0});
  },

  render: function() {
    return (
      <div className='app'>
        <Menu food={this.props.food} onItemSubmit={this.handleItemSubmit} />
        <Checkout checkoutData={this.state.checkoutData} total={this.state.total} onCheckout={this.handleCheckout} />
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
    return (
      <div className='menu'>
        <h1>The Fluc Restaurant Menu</h1>
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
            <input className='inputBox' type='number' min='1' defaultValue='1' ref='quantity' />
            <input type='submit' value='Add to cart' />
          </form>
        </div>
      </div>
    );
  }  
});

var Checkout = React.createClass({
  handleClick: function() {
    alert('Fluc yeah!')
    this.props.onCheckout();
  },

  render: function() {
    return (
      <div className='checkout'>
        <h3>Cart - {this.props.total} items</h3>
        <CartItem checkoutData = {this.props.checkoutData}/>
        <input type="button" value='Finish' onClick={this.handleClick} />
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
    return (<ul> {cartItemNodes} </ul>
    );
  }
});

React.render(
  <App food={food} />,
  document.getElementById('Container')
);

