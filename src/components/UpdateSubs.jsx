import React from "react";
import SubscriptionService from "../services/subscription.service";
import UserService from "../services/user.service";
import "../css/updateSubs.css"

//const currentUser = SubscriptionService.getCurrentUser();

class UpdateSubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionId: this.props.match.params.subscriptionId,
      membershipFee: "",
     // id:currentUser.id,
    };
    this.changeMembershipFeeHandler =
      this.changeMembershipFeeHandler.bind(this);
  }

  componentDidMount() {
    SubscriptionService.getSearchSubscription(this.state.subscriptionId).then(
      (res) => {
        let subscription = res.data;
        this.setState({
          subscriptionId: subscription.subscriptionId,
          membershipFee: subscription.membershipFee,
        });
      }
    );
   }  

  updateSubscription = (e) => {
    e.preventDefault();
    let sub={
      subscriptionId: this.state.subscriptionId,
    }

    UserService.putSubscription(
      sub,
      this.state.subscriptionId
      //  this.state.id,
    )
      .then((response) => {
        console.log("response" + response);
         this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  changeMembershipFeeHandler = (event) => {
    this.setState({ membershipFee: event.target.value });
  };

  render() {
    return (
      <div>
        <div class="container-b p-0">
          <div class="card-b px-4">
            <p class="h8 py-3">Upgrade Your Plan</p>
            <div class="row gx-3">
              <div class="col-12">
                <div class="d-flex flex-column">
                  <p class="text mb-1">Person Name</p>
                  <input
                    class="form-control-b mb-3"
                    type="text"
                    placeholder="Name"
                    value="Saman Kumara"
                  />
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex flex-column">
                  <p class="text mb-1">Card Number</p>
                  <input
                    class="form-control-b mb-3"
                    type="text"
                    placeholder="1234 5678 435678"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex flex-column">
                  <p class="text mb-1">Expiry</p>
                  <input
                    class="form-control-b mb-3"
                    type="text"
                    placeholder="MM/YYYY"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="d-flex flex-column">
                  <p class="text mb-1">CVV/CVC</p>
                  <input
                    class="form-control-b mb-3 pt-2 "
                    type="password"
                    placeholder="***"
                  />
                </div>
              </div>
              <div class="col-12">
                <button
                  class="btn-b btn-primary mb-3"
                  onClick={this.updateSubscription}
                >
                  <span class="ps-3">Pay {this.state.membershipFee}</span>{" "}LKR
                  <span class="fas fa-arrow-right"></span>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateSubs;

/* 
 
*/
