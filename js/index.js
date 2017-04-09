'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeaderboardTable = function (_React$Component) {
  _inherits(LeaderboardTable, _React$Component);

  function LeaderboardTable(props) {
    _classCallCheck(this, LeaderboardTable);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.showAllTime = function () {
      console.log("showAllTime");
      var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
      _this.fetchData(url);
    };

    _this.show30Days = function () {
      var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
      _this.fetchData(url);
    };

    _this.fetchData = function (url) {
      var that = _this;
      fetch(url).then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function (res) {
          for (var i = 0; i < res.length; i++) {
            var data = new Array();
            data[0] = res[i].img;
            data[1] = res[i].username;
            data[2] = res[i].recent;
            data[3] = res[i].alltime;

            var info = that.state.data.slice();
            info.push(data);
            that.setState({ data: info });
            console.log(that.state.data[0]);
          }
        });
      }).catch(function (err) {
        console.log('Fetch Error ', err);
      });
    };

    _this.state = {
      data: []
    };
    return _this;
  }

  LeaderboardTable.prototype.componentDidMount = function componentDidMount() {
    this.fetchData('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  };

  LeaderboardTable.prototype.render = function render() {
    console.log("ee: " + this.state.data[0]);
    var listItems = this.state.data.map(function (arr) {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          React.createElement('img', { className: 'img-thumbnail img-responsive img-circle', alt: 'channel icon', src: arr[0] }),
          arr[1],
          ' '
        ),
        React.createElement(
          'td',
          null,
          ' ',
          arr[2],
          ' '
        ),
        React.createElement(
          'td',
          null,
          ' ',
          arr[3],
          ' '
        )
      );
    });
    return React.createElement(
      'table',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Username'
        ),
        '                     ',
        React.createElement(
          'th',
          { onClick: this.show30Days.bind(this) },
          'Last 30 Days Points'
        ),
        React.createElement(
          'th',
          { onClick: this.showAllTime.bind(this) },
          'All Time Points'
        ),
        '              '
      ),
      listItems
    );
  };

  return LeaderboardTable;
}(React.Component);

ReactDOM.render(React.createElement(LeaderboardTable, null), document.getElementById('container'));