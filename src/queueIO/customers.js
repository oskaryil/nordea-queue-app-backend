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
  resolveUser(id) {
    const customer = this.getUser(id);

    if (customer) {
      this.customers = this.customers.filter(current => current.id !== id);
    }

    return customer;
  }
  getCustomer(id) {
    return this.customers.filter(customer => customer.id === id)[0];
  }
  getCustomerList(room) {
    const customers = this.customers.filter(customer => customer.room === room);
    const namesArray = customers.map(customer => customer.name);

    return namesArray;
  }
}

export default Customers;
