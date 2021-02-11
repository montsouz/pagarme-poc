import {
  PagarmeCustomer,
  PagarmeTransactionRequestDto,
} from './pagarme.service';

class PagarmeDecorator {
  private readonly client: any;

  constructor(client: any) {
    this.client = client;
  }

  async createCustomer(customer: PagarmeCustomer): Promise<any> {
    return this.client.customers.create(customer);
  }

  async createTransaction({
    amount,
    card_hash,
    billing,
    items,
    async,
    customer,
  }: PagarmeTransactionRequestDto): Promise<any> {
    try {
      const transaction = await this.client.transactions.create({
        amount,
        customer,
        billing,
        items,
        async,
        card_hash,
        payment_method: 'credit_card',
      });
      return transaction;
    } catch (err) {
      console.log(err.response.errors);
    }
  }
}

export { PagarmeDecorator, PagarmeCustomer };
