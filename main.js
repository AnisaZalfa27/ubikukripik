document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload form

    const btn = document.querySelector('button[type="submit"]'); // Mengambil tombol submit
    btn.value = 'Sending ...';

    const serviceID = 'service_cdizmdk'; // Ganti dengan ID service emailjs kamu
    const templateID = 'template_89pb8uf'; // Ganti dengan ID template emailjs kamu

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.value = 'Send Email';
            alert('Email berhasil Terkirim!');
        }, (err) => {
            btn.value = 'Send Email';
            alert(JSON.stringify(err));
        });
});

const orderTable = document.getElementById('order-table');
    const checkoutBtn = document.getElementById('checkout-btn');
    let orders = [];

    document.querySelectorAll('.add-to-order').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        const existingOrder = orders.find(order => order.name === name);
        if (existingOrder) {
          existingOrder.quantity += 1;
        } else {
          orders.push({ name, price, quantity: 1 });
        }

        renderOrders();
      });
    });

    function renderOrders() {
      if (orders.length === 0) {
        orderTable.innerHTML = '<tr><td colspan="6">Tidak ada pesanan</td></tr>';
        checkoutBtn.disabled = true;
        return;
      }

      checkoutBtn.disabled = false;
      orderTable.innerHTML = orders.map((order, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${order.name}</td>
          <td>Rp.${order.price}</td>
          <td><input type="number" min="1" value="${order.quantity}" data-index="${index}" class="quantity-input"></td>
          <td>Rp.${order.price * order.quantity}</td>
          <td>
            <button class="btn btn-danger btn-delete" data-index="${index}">Hapus</button>
          </td>
        </tr>
      `).join('');

      document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
          const index = e.target.getAttribute('data-index');
          const newQuantity = parseInt(e.target.value);
          orders[index].quantity = newQuantity > 0 ? newQuantity : 1;
          renderOrders();
        });
      });

      document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          orders.splice(index, 1);
          renderOrders();
        });
      });
    }

    checkoutBtn.addEventListener('click', () => {
      alert('Pesanan berhasil di-checkout!');
      orders = [];
      renderOrders();
    });

    let cartItems = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    
    function tambahPesanan(produk) {
        // Menambahkan produk ke keranjang
        cartItems.push(produk);
    
        // Memperbarui jumlah item pada ikon keranjang
        cartCountElement.innerText = cartItems.length;
    
        // Memperbarui daftar item di dropdown
        updateCartItems();
    }
    
    function updateCartItems() {
        if (cartItems.length === 0) {
            cartItemsElement.innerHTML = '<li>Tidak ada item apapun</li>';
        } else {
            cartItemsElement.innerHTML = ''; // Menghapus teks "Tidak ada item apapun"
            cartItems.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item;
                cartItemsElement.appendChild(li);
            });
        }
    }
    
    // Fungsi untuk mengirim email ke customer
function sendEmail(paymentDetails) {
  const templateParams = {
      name: paymentDetails.name,
      email: paymentDetails.email, // Email customer
      address: paymentDetails.address,
      paymentMethod: paymentDetails.paymentMethod,
      totalAmount: paymentDetails.totalAmount,
  };

  // Kirim email menggunakan emailjs
  emailjs.send("service_cdizmdk", "template_btqkyrb", templateParams)
      .then(function(response) {
          console.log("Email sent successfully", response);
      }, function(error) {
          console.log("Error sending email", error);
      });
}

document.addEventListener('DOMContentLoaded', function() {
  const paymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));

  if (paymentDetails) {
      const paymentInfoElement = document.getElementById('payment-details');
      paymentInfoElement.innerHTML = `
          <p><strong>Name:</strong> ${paymentDetails.name}</p>
          <p><strong>Email:</strong> ${paymentDetails.email}</p>
          <p><strong>Address:</strong> ${paymentDetails.address}</p>
          <p><strong>Payment Method:</strong> ${paymentDetails.paymentMethod}</p>
          <p><strong>Total Amount:</strong> Rp.${paymentDetails.totalAmount}</p>
          <p><strong>Payment Confirmation:</strong> Your payment has been processed successfully.</p>
      `;

      // Kirim email setelah pembayaran berhasil
      sendEmail(rS3fJpJT7Kl32B2Sv);
  } else {
      alert("No payment details found.");
  }
});
