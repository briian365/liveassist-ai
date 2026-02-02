export const mockOrders = {
  'ORD-12345': {
    id: 'ORD-12345',
    status: 'In Transit',
    items: ['Wireless Headphones', 'Protective Case'],
    deliveryDate: '2023-10-25',
    courier: 'FedEx',
    progress: 75
  },
  'ORD-98765': {
    id: 'ORD-98765',
    status: 'Delivered',
    items: ['Smart Watch Gen 2'],
    deliveryDate: '2023-10-20',
    courier: 'UPS',
    progress: 100
  },
  'ORD-45678': {
    id: 'ORD-45678',
    status: 'Processing',
    items: ['Mechanical Keyboard'],
    deliveryDate: 'Est. 2023-11-01',
    courier: 'DHL',
    progress: 25
  }
};

export const findOrder = (text) => {
  const match = text.match(/ORD-\d{5}/i);
  if (match) {
    const orderId = match[0].toUpperCase();
    return mockOrders[orderId] || null;
  }
  return null;
};
