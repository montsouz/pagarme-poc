import "./App.css";
import { Helmet } from "react-helmet";
import axios from "axios";

function App() {
  const pagarmeHandler = () => {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: "ek_test_Kphhpy9beCJJoeRaIHeYGPR4oTwbrO",
      success: function (data) {
        console.log(data);
        const subscriptionRequest = {
          cardHash: data.card_hash,
        };
        axios.post(`http://localhost:9000/subscribe/${1}`, subscriptionRequest);
      },
      error: function (err) {
        console.log(err);
      },
      close: function () {
        console.log("The modal has been closed.");
      },
    });

    checkout.open({
      amount: 2990,
      customerData: "false",
      createToken: "false",
      paymentMethods: "credit_card",
      items: [
        {
          id: "1",
          title: "Family Plan",
          unit_price: 2990,
          quantity: 1,
          tangible: "false",
        },
      ],
    });
  };

  return (
    <div className="App">
      <Helmet>
        <script src="https://assets.pagar.me/checkout/1.1.0/checkout.js"></script>
      </Helmet>
      <button onClick={() => pagarmeHandler()}>Pagar</button>
    </div>
  );
}

export default App;
