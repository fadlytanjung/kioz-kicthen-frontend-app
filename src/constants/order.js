const order = [
  {
    orderId: 1,
    userId: 1,
    totalItems: 2,
    amount: 70000,
    paymentStatus: 'pending',
    orderStatus: 'pending',
    details:[
      {
        id: 1,
        name: 'Anggur Merah',
        description: 'Anggur Merah Mantap',
        slug: 'anggur-merah',
        image: '/assets/anggur.png',
        price: 45000,
        stock: 22,
        unit: 'kg',
        display_price: 'Rp. 45.000',
        display_full_price: 'Rp. 45.000/kg',
        discount: 0,
      },
      {
        id: 2,
        name: 'Mangga Manis',
        image: '/assets/mangga.png',
        description: 'Mangga Manis Semanis Senyum Kamu',
        slug: 'mangga-manis',
        price: 25000,
        stock: 10,
        unit: 'kg',
        display_price: 'Rp. 25.000',
        display_full_price: 'Rp. 25.000/kg',
        discount: 10,
      }
    ],
    users: {
      id: 1,
      fullname: 'Fadly Tanjung',
      email: 'muhammad.fadly02@ui.ac.id',
      phone: '08111996557',
      address: 'Kampus MTI salemba UI',
      role: 'user',
    },
  },
  {
    orderId: 2,
    userId: 1,
    totalItems: 1,
    amount: 45000,
    paymentStatus: 'settlement',
    orderStatus: 'pending',
    details: [
      {
        id: 1,
        name: 'Anggur Merah',
        description: 'Anggur Merah Mantap',
        slug: 'anggur-merah',
        image: '/assets/anggur.png',
        price: 45000,
        stock: 22,
        unit: 'kg',
        display_price: 'Rp. 45.000',
        display_full_price: 'Rp. 45.000/kg',
        discount: 0,
      },
    ],
    users: {
      id: 1,
      fullname: 'Fadly Tanjung',
      email: 'muhammad.fadly02@ui.ac.id',
      phone: '08111996557',
      address: 'Kampus MTI salemba UI',
      role: 'user',
    },
  }
];

export default order;