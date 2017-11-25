class Customers {
  constructor() {
    this.customers = [];
  }
  addCustomer(id, room) {
    const customer = { id, room };
    this.customers.push(customer);
    return customer;
  }
  customersCount(room) {
    const customers = this.customers.filter(customer => customer.room === room);
    return customers.length;
  }
  resolveCustomer(id) {
    const customer = this.getCustomer(id);

    if (customer) {
      this.customers = this.customers.filter(current => current.id !== id);
    }

    return customer;
  }
  getCustomer(id) {
    return this.customers.filter(customer => customer.id === id)[0];
  }
  getNumber(room, id) {
    const place = this.customers.findIndex(i => i.id === id) + 1;
    return place;
    // let inc = 0;
    // for (const customer of this.customers) {
    //   inc++;
    //   if (customer.id === id) {
    //     return inc;
    //   }
    // }
  }
  getCustomerList(room) {
    const customers = this.customers.filter(customer => customer.room === room);
    const namesArray = customers.map(customer => customer.name);

    return namesArray;
  }
}

export default Customers;
