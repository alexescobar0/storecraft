let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.btn-carrito');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  const contadorCarrito = document.getElementById('contador-carrito');
  const iconoCarrito = document.getElementById('icono-carrito');
  const contenedorCarrito = document.getElementById('carrito');

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-id');
      const nombre = boton.getAttribute('data-nombre');
      const precio = parseInt(boton.getAttribute('data-precio'));

      const productoExistente = carrito.find(p => p.id === id);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

      actualizarCarrito(); localStorage.setItem('carrito', JSON.stringify(carrito))
    });
  });

  iconoCarrito.addEventListener('click', () => {
    document.addEventListener('click', (event) => {
    if (
      !contenedorCarrito.contains(event.target) &&
      !iconoCarrito.contains(event.target)
    ) {
      contenedorCarrito.classList.remove('mostrar');
    }
  });
    contenedorCarrito.classList.toggle('mostrar');
  });

  document.getElementById('btn-pagar').addEventListener('click', () => {
  localStorage.setItem('pagoIniciado', 'true');
  window.location.href = 'contacto.html';
  });

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrito.forEach(producto => {
      const li = document.createElement('li');
      li.textContent = `x${producto.cantidad} ${producto.nombre} - ${producto.precio * producto.cantidad} esmeraldas`;

      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'ELIMINAR';
      btnEliminar.style.marginLeft = '10px';
      btnEliminar.addEventListener('click', () => {
        carrito = carrito.filter(p => p.id !== producto.id);
        actualizarCarrito();
      });

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);

      total += producto.precio * producto.cantidad;
      totalItems += producto.cantidad;
    });

    totalSpan.textContent = total;
    contadorCarrito.textContent = totalItems;
  }
});
