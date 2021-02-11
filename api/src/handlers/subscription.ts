import PagarmeService, {
  PagarmeTransactionRequestDto,
  PagarmeCustomer as Customer,
  PargarmeBillingAddress as BillingAddress,
  PagarmeItem as Item,
} from '../services/pagarme/pagarme.service';
import { Request, Response } from 'express';

export interface Plan {
  id: number;
  name: string;
  value: number;
}

class PlansRepository {
  private readonly AVAILABLE_PLANS: Plan[] = [
    {
      id: 1,
      name: 'Family Plan',
      value: 2990,
    },
    {
      id: 2,
      name: 'Golden Plan',
      value: 4990,
    },
  ];

  getPlanById(id: number): Plan {
    return this.AVAILABLE_PLANS.find((plan) => (plan.id = id));
  }
}

class UserRepository {
  private readonly USERS: Customer[] = [
    {
      external_id: '#0918273',
      type: 'individual',
      country: 'br',
      documents: [
        {
          type: 'cpf',
          number: '13014478032',
        },
      ],
      name: 'Customer Teste',
      email: 'customer@email.com',
      phone_numbers: ['+5511999887766'],
    },
  ];

  private readonly ADDRESS: BillingAddress = {
    name: 'Customer Teste',
    address: {
      street: 'Rua Fidêncio Ramos',
      complementary: 'apto',
      street_number: '308',
      neighborhood: 'pinheiros',
      city: 'São Paulo',
      state: 'SP',
      zipcode: '04551010',
      country: 'br',
    },
  };

  getUser() {
    return this.USERS[0];
  }

  getAddress() {
    return this.ADDRESS;
  }
}

class Subscriptions {
  constructor(
    private plansRepository: PlansRepository,
    private usersRepository: UserRepository,
  ) {}
  async createSubscription(req: Request, res: Response) {
    console.log(req.body);
    const { planId } = req.params;
    const { cardHash } = req.body;
    const plan = this.plansRepository.getPlanById(planId);
    const customer = this.usersRepository.getUser();
    const billing = this.usersRepository.getAddress();
    const items: Item[] = [
      {
        id: plan.id.toString(),
        title: plan.name,
        unit_price: plan.value,
        quantity: 1,
        tangible: false,
      },
    ];

    const payload: PagarmeTransactionRequestDto = {
      customer,
      billing,
      card_hash: cardHash,
      items,
      async: false,
      amount: plan.value,
    };

    try {
      const transactionReponse = PagarmeService.createUserTransaction(payload);
      res.send(transactionReponse);
    } catch (err) {
      res.send(err);
    }
  }
}

const userRepostory = new UserRepository();
const plansRepository = new PlansRepository();
export default new Subscriptions(plansRepository, userRepostory);
