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
      _this.fetchJSON(url);
      _this.setState({
        sortType: 2
      });
    };

    _this.show30Days = function () {
      var url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
      _this.fetchJSON(url);
      _this.setState({
        sortType: 1
      });
    };

    _this.fetchJSON = function (url) {
      var that = _this;
      fetch(url).then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function (res) {
          that.setState({ data: res }, function () {});
        });
      }).catch(function (err) {
        console.log('Fetch Error ', err);
      });
    };

    _this.getUsersList = function () {
      var usersData = [];
      for (var i = 0; i < _this.state.data.length; i++) {
        var infoArray = new Array();
        infoArray[0] = _this.state.data[i].img;
        infoArray[1] = _this.state.data[i].username;
        infoArray[2] = _this.state.data[i].recent;
        infoArray[3] = _this.state.data[i].alltime;
        var info = usersData.slice();
        info.push(infoArray);
        usersData = info;
      }
      return usersData;
    };

    _this.state = {
      data: [],
      sortType: 1 //1 => last 30 days, 2 => all time
    };
    return _this;
  }

  LeaderboardTable.prototype.componentDidMount = function componentDidMount() {
    this.fetchJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
  };

  LeaderboardTable.prototype.render = function render() {
    var usersArray = this.getUsersList();
    var list = usersArray.map(function (arr) {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          React.createElement('img', { className: 'img-thumbnail img-responsive img-circle', alt: 'channel icon', src: arr[0] }),
          '  ',
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
        React.createElement(
          'th',
          { onClick: this.show30Days.bind(this) },
          React.createElement(
            'div',
            { className: this.state.sortType === 1 ? "disableCursor" : " clickable" },
            'Last 30 Days Points'
          )
        ),
        React.createElement(
          'th',
          { onClick: this.showAllTime.bind(this) },
          React.createElement(
            'div',
            { className: this.state.sortType === 2 ? "disableCursor" : " clickable" },
            'All Time Points'
          )
        ),
        '   '
      ),
      list
    );
  };

  return LeaderboardTable;
}(React.Component);

ReactDOM.render(React.createElement(LeaderboardTable, null), document.getElementById('container'));