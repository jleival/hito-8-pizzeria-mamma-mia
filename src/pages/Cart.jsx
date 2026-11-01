import { useContext, useState } from 'react'; // 👈 1. Importamos useState para el mensaje de éxito
import { Container, Button, Row, Col, Image, Alert } from 'react-bootstrap'; // 👈 2. Importamos Alert de react-bootstrap
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cart, aumentarCantidad, disminuirCantidad, total } = useContext(CartContext);
    // Consumimos el token desde UserContext
    const { token } = useContext(UserContext);

    // 👈 3. Estado para mostrar el mensaje de éxito cuando se realiza la compra (Req 8)
    const [compraExitosa, setCompraExitosa] = useState(false);

    // 👈 4. Función para enviar el carrito al backend (Req 7)
    const handleCheckout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/checkouts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Enviamos el token JWT
                },
                body: JSON.stringify({
                    cart: cart, // Enviamos el carrito de compras
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCompraExitosa(true); // Activamos el mensaje de éxito en pantalla
            } else {
                alert(data?.error || "Error al procesar la compra");
            }
        } catch (error) {
            console.error("Error en checkout:", error);
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '600px' }}>
            <h3 className="mb-4">Detalles del pedido:</h3>

            {cart.map((item) => (
                <Row key={item.id} className="align-items-center mb-3 border-bottom pb-3">
                    <Col xs={2}>
                        <Image src={item.img} alt={item.name} fluid rounded style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                    </Col>
                    <Col xs={4}>
                        <h6 className="mb-0 fw-bold">{item.name}</h6>
                    </Col>
                    <Col xs={3}>
                        <span className="text-muted">${(item.price * item.count).toLocaleString()}</span>
                    </Col>
                    <Col xs={3} className="d-flex align-items-center justify-content-between">
                        <Button variant="outline-danger" size="sm" onClick={() => disminuirCantidad(item.id)}>-</Button>
                        <span className="fw-bold px-2">{item.count}</span>
                        <Button variant="outline-primary" size="sm" onClick={() => aumentarCantidad(item.id)}>+</Button>
                    </Col>
                </Row>
            ))}

            <h3 className="mt-4 fw-bold">Total: ${total.toLocaleString()}</h3>

            {/* 👈 5. Conectamos onClick={handleCheckout} al botón Pagar */}
            <Button
                variant="dark"
                className="mt-3 w-100"
                disabled={!token || cart.length === 0}
                onClick={handleCheckout}
            >
                Pagar
            </Button>

            {/* 👈 6. Mostramos el mensaje de éxito cuando la compra se haya realizado (Req 8) */}
            {compraExitosa && (
                <Alert variant="success" className="mt-4 text-center">
                    🎉 ¡Compra realizada con éxito! Gracias por tu pedido en Pizzería Mamma Mía.
                </Alert>
            )}
        </Container>
    );
};

export default Cart;