import React from "react";
import SubscriptionService from "../services/subscription.service";
import '../css/Subs.css';


class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: [],
    };
  }


  componentDidMount() {
    SubscriptionService.getSubscriptionsList().then((res) => {
      this.setState({ subscriptions: res.data });
    });
  }

  render() {
    return (
      
      <div>
        <div class="container-a">
          {this.state.subscriptions.map((subscription) => (
            <div className="col" key={subscription.subscriptionId}>
              <div class="card-a">
                <h3 style={{color:"darkblue"}}>{subscription.type}</h3>
                <div class="details-a">
                  <ul className="d">
                      <li className="c">{subscription.noOfBooks} - Books</li>
                      <li className="c">{subscription.durationBooks} - Weeks</li>
                      <li className="c">{subscription.chargesBooks} LKR per day</li>
                      <li className="c">{subscription.noOfMovies} - Movies</li>
                      <li className="c">{subscription.durationMovies} - Weeks</li>
                      <li className="c">{subscription.chargesMovies} LKR per day</li>
                    <li className="c">{subscription.overDueCharges} LKR per day Overdue</li>
                  </ul>
                </div>
                <p style={{fontsize:"14px"}}>
                  <span className="sub"> {subscription.membershipFee}</span>/LKR
                </p>
                <button style={{width:"250px"}} className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Subscription;
