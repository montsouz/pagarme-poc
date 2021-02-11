import pagarme from 'pagarme';
import { PagarmeDecorator } from './pargarme.decorator';

export interface PagarmeDocument {
  type: 'cpf' | 'cnpj';
  number: string;
}

export interface PagarmeTransactionRequestDto {
  customer: PagarmeCustomer;
  billing: PargarmeBillingAddress;
  items: PagarmeItem[];
  async: false;
  card_hash: string;
  amount: number;
}

export interface PagarmeItem {
  id: string;
  title: string;
  unit_price: number;
  quantity: number;
  tangible: false;
}

export interface PagarmeCustomer {
  external_id: string;
  documents: PagarmeDocument[];
  type: 'individual' | 'corporation';
  name: string;
  email: string;
  country: 'br';
  phone_numbers: string[];
}

export interface PargarmeBillingAddress {
  name: string;
  address: {
    country: 'br';
    street: string;
    complementary: string;
    street_number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

class PagarmeService {
  private readonly apiKey: string;

  //Quickiest, but not the best way to fetch api key
  constructor() {
    this.apiKey = process.env.API_KEY;
  }

  private async loginClient(): Promise<any> {
    return pagarme.client.connect({ api_key: this.apiKey });
  }

  async createUserTransaction(
    pagarmeTransactionRequest: PagarmeTransactionRequestDto,
  ): Promise<any> {
    const client = await this.loginClient();
    const pagarmeDecorator = new PagarmeDecorator(client);
    return await pagarmeDecorator.createTransaction(pagarmeTransactionRequest);
  }
}

export default new PagarmeService();
