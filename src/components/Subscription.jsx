import React from "react";
import SubscriptionService from "../services/subscription.service";
import "../css/Subs.css";
import AuthService from "../services/auth.service";

let user = AuthService.getCurrentUser();

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
    };
    this.updateSubs = this.updateSubs.bind(this);
  }

  componentDidMount() {
    SubscriptionService.getSubscriptionsList().then((res) => {
      this.setState({ subscriptions: res.data });
    });
    //

    console.log(user.subType);
  }

  updateSubs(subscriptionId) {
    this.props.history.push(`/updateSubs/${subscriptionId}`);
  }
  displayType(type) {
    if (user.subType == type) {
      return { color: "red" };
    }
  }
  displaySubsBtn(){
    if (user) {
      
    }
  }

  render() {
    return (
      <div>
        <div class="container">
          <div className="row">
            {this.state.subscriptions.map((subscription) => (
              <div
                className="col"
                style={{ padding: "30px" }}
                key={subscription.type}
              >
                <div
                  class="card-a"
                  style={
                    user.subType == subscription.type
                      ? { border: "red 2px solid" }
                      : { color: "darkblue" }
                  }
                >
                  <h3 style={this.displayType(subscription.type)}>
                    {subscription.type}
                  </h3>
                  <div class="details-a">
                    <ul className="d">
                      <li className="c">{subscription.noOfBooks} - Books</li>
                      <li className="c">
                        {subscription.durationBooks} - Weeks
                      </li>
                      <li className="c">
                        {subscription.chargesBooks} LKR per day
                      </li>
                      <li className="c">{subscription.noOfMovies} - Movies</li>
                      <li className="c">
                        {subscription.durationMovies} - Weeks
                      </li>
                      <li className="c">
                        {subscription.chargesMovies} LKR per day
                      </li>
                      <li className="c">
                        {subscription.overDueCharges} LKR per day Overdue
                      </li>
                    </ul>
                  </div>
                  <p style={{ fontsize: "14px" }}>
                    <span className="sub"> {subscription.membershipFee}</span>
                    /LKR
                  </p>
                  {user.subType == subscription.type ? (
                    <button
                      disabled
                      style={{ width: "220px" }}
                      className="btn btn-primary"
                      onClick={() =>
                        this.updateSubs(subscription.subscriptionId)
                      }
                    >
                      Subscribe
                    </button>
                  ) : (
                    <button
                      style={{ width: "220px" }}
                      className="btn btn-primary"
                      onClick={() =>
                        this.updateSubs(subscription.subscriptionId)
                      }
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Subscription;
